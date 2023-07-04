import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Root,
  Subscription,
} from "type-graphql"
import { Resolver } from "type-graphql"

import { createChatInput } from "./inputs/createChatInput"
import { Chat, Message, Participant } from "../models/chat"
import { Context } from "../types"
import {
  addOrRemoveAdmin,
  modifyChatInput,
  userLeaveChatInput,
  sendMessageInput,
  updateChatInput,
  filterMessagesInput,
  addOrRemoveParticipantInput,
} from "./inputs"

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat)
  async createChat(
    @Ctx() { req, prisma }: Context,
    @Args() args: createChatInput,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Chat> {
    const chat = await prisma.chat.create({
      data: {
        ...args,
        owner: {
          connect: {
            id: req.session.userId,
          },
        },
        participants: {
          create: { role: "ADMIN", ...args.participants[0] },
          createMany: { data: args.participants.slice(1) },
        },
        messages: {
          create: {
            user: { connect: { id: req.session.userId } },
            message: `Grupo creado`,
            type: "notification",
          },
        },
      },
      include: {
        owner: true,
        participants: { include: { user: true } },
      },
    })

    await pubsub.publish("UPDATE_CHATS", { type: "created", id: chat.id })
    return chat
  }

  @Mutation(() => Boolean)
  async addParticipant(
    @Ctx() { req, prisma }: Context,
    @Args() { participants }: addOrRemoveParticipantInput // @PubSub() pubsub: PubSubEngine
  ) {
    await prisma.participant.updateMany({
      where: { chatId: req.session.chatId! },
      data: participants.map(({ userId }) => {
        return { userId, chatId: req.session.chatId! }
      }),
    })

    return true
  }

  @Mutation(() => Boolean)
  async addAdmin(
    @Ctx() { req, prisma }: Context,
    @Args() { userId }: addOrRemoveAdmin
  ) {
    await prisma.chat.update({
      where: { id: req.session.chatId! },
      data: {
        participants: {
          update: {
            where: { chatId_userId: { userId, chatId: req.session.chatId! } },
            data: { role: "ADMIN" },
          },
        },
      },
    })

    return true
  }
  @Mutation(() => Boolean)
  async removeAdmin(
    @Ctx() { req, prisma }: Context,
    @Args() { userId }: addOrRemoveAdmin
  ) {
    await prisma.chat.update({
      where: { id: req.session.chatId! },
      data: {
        participants: {
          update: {
            where: { chatId_userId: { userId, chatId: req.session.chatId! } },
            data: { role: "USER" },
          },
        },
      },
    })

    return true
  }

  @Mutation(() => Boolean)
  async changeOptionsChat(
    @Ctx() { req, prisma }: Context,
    @Args() args: modifyChatInput
  ) {
    await prisma.chat.update({
      where: { id: req.session.chatId! },
      data: { ...args },
    })
    return true
  }

  @Mutation(() => Boolean)
  async userLeaveChat(
    @Ctx() { prisma, req }: Context,
    @Args() { userId, chatId }: userLeaveChatInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    const user = await prisma.user.findFirst({ where: { id: userId } })
    const chat = await prisma.chat.update({
      where: { id: chatId },
      data: {
        messages: {
          create: {
            user: { connect: { id: req.session.userId } },
            message: `${user!.name} ha salido del grupo`,
            type: "notification",
          },
        },
      },
      include: {
        messages: {
          select: {
            message: true,
            id: true,
            chat: true,
            chatId: true,
            timestamp: true,
            type: true,
            user: true,
            userId: true,
          },
        },
      },
    })
    const participants = await prisma.participant.delete({
      where: { chatId_userId: { chatId: chatId, userId } },
      include: { user: true },
    })

    await pubsub.publish("NEW_MESSAGES", chat.messages.pop())
    await pubsub.publish("UPDATE_PARTICIPANTS", participants)
    return true
  }

  @Mutation(() => Boolean)
  async removeChat(
    @Ctx() { prisma }: Context,
    @Arg("id") id: string,
    @PubSub() pubsub: PubSubEngine
  ) {
    const chatDeleted = await prisma.chat.delete({
      where: { id },
      include: {
        owner: true,
        participants: { include: { user: true, chat: true } },
      },
    })

    await pubsub.publish("UPDATE_CHATS", {
      type: "delete",
      id: chatDeleted.id,
    })
    return true
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Ctx() { req, prisma }: Context,
    @Args() args: sendMessageInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    const chat = await prisma.chat.update({
      where: { id: args.chatId },
      data: {
        messages: {
          create: {
            user: { connect: { id: req.session.userId } },
            message: args.message,
            type: args.type,
          },
        },
      },
      include: {
        messages: {
          select: {
            message: true,
            id: true,
            chat: true,
            chatId: true,
            timestamp: true,
            type: true,
            user: true,
            userId: true,
          },
        },
      },
    })
    await pubsub.publish("NEW_MESSAGES", chat.messages.pop())

    return true
  }

  @Query(() => [Message])
  async filterMessages(
    @Ctx() { prisma }: Context,
    @Args() { id, message }: filterMessagesInput
  ): Promise<Message[] | []> {
    const messages = await prisma.chat.findFirst({
      where: { id },
      include: {
        messages: {
          where: { message: { contains: message } },
          select: {
            message: true,
            id: true,
            chat: true,
            chatId: true,
            timestamp: true,
            type: true,
            user: true,
            userId: true,
          },
        },
      },
    })

    return messages!.messages
  }

  @Query(() => [Message])
  async messages(
    @Ctx() { prisma }: Context,
    @Arg("id") id: string
  ): Promise<Message[]> {
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            timestamp: "asc",
          },
          select: {
            message: true,
            id: true,
            chat: true,
            chatId: true,
            timestamp: true,
            type: true,
            user: true,
            userId: true,
          },
        },
      },
    })

    return chat!.messages
  }

  @Query(() => Chat)
  async joinChat(
    @Ctx() { prisma }: Context,
    @Arg("id") id: string
  ): Promise<Chat | null> {
    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        participants: { include: { user: true } },
        owner: true,
      },
    })

    return chat
  }

  @Query(() => [Chat], { nullable: true })
  async allChats(@Ctx() { req, prisma }: Context): Promise<Chat[] | null> {
    const chat = await prisma.chat.findMany({
      where: {
        participants: {
          some: { userId: { equals: req.session.userId } },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        owner: true,
        messages: {
          select: {
            message: true,
            id: true,
            chat: true,
            chatId: true,
            timestamp: true,
            type: true,
            user: true,
            userId: true,
          },
        },
        participants: { include: { user: true, chat: true } },
      },
    })

    return chat
  }

  @Query(() => [Participant])
  async findParticipants(
    @Ctx() { prisma }: Context,
    @Arg("id") id: string
  ): Promise<Participant[]> {
    const chat = await prisma.chat.findFirst({
      where: { id },
      include: {
        owner: true,
        participants: { include: { user: true, chat: true } },
      },
    })
    return chat!.participants
  }

  @Subscription({
    topics: "NEW_MESSAGES",
  })
  newMessages(@Root() payload: Message): Message {
    return payload
  }
  @Subscription({
    topics: "UPDATE_PARTICIPANTS",
  })
  updateParticipants(@Root() payload: Participant): Participant {
    return payload
  }
  @Subscription({
    topics: "UPDATE_CHATS",
  })
  updateChats(@Root() payload: updateChatInput): updateChatInput {
    return payload
  }
}
