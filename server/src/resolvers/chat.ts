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
} from "type-graphql";
import { Resolver } from "type-graphql";

import { createChatInput } from "./inputs/createChatInput";
import { Chat, Participant, updateChat } from "../models/chat";
import { Message } from "../models/messages";
import { Context } from "../types";

import { createChatModule } from "../modules/createChatModule";
import {
  addOrRemoveAdmin,
  addOrRemoveParticipantInput,
  connectOrDisconnectChatInput,
  filterMessagesInput,
  modifyChatInput,
  sendMessageInput,
  userChatsInput,
} from "./inputs";
import {
  allChatsModule,
  joinChatModule,
  sendMessageModule,
  addOrRemoveParticipantModule,
  changeOptionsChatModule,
  removeChatModule,
  filterMessagesModule,
  messagesModule,
  findParticipantsModule,
  addOrRemoveAdminModule,
  disconnectChatsModule,
} from "../modules";
import { User } from "../models/user";
import {
  NEW_MESSAGES,
  UPDATE_CHAT,
  UPDATE_PARTICIPANTS,
  UPDATE_USERS_TO_INVITE,
} from "../constants";

@Resolver()
export class ChatResolver {
  @Mutation(() => Chat, { nullable: true })
  async createChat(
    @Ctx() ctx: Context,
    @Args() args: createChatInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await createChatModule({ ctx, args, pubsub });
  }

  @Mutation(() => Boolean)
  async addOrRemoveParticipant(
    @Ctx() ctx: Context,
    @Args() args: addOrRemoveParticipantInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await addOrRemoveParticipantModule({ ctx, args, pubsub });
  }

  @Mutation(() => User || null)
  async addOrRemoveAdmin(
    @Ctx() ctx: Context,
    @Args() args: addOrRemoveAdmin,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await addOrRemoveAdminModule({ ctx, args, pubsub });
  }

  @Mutation(() => Boolean)
  async changeOptionsChat(@Ctx() ctx: Context, @Args() args: modifyChatInput) {
    return await changeOptionsChatModule({ ctx, args });
  }

  @Mutation(() => Boolean)
  async removeChat(
    @Ctx() ctx: Context,
    @Arg("id") id: string,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await removeChatModule({ ctx, id, pubsub });
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Ctx() ctx: Context,
    @Args() args: sendMessageInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await sendMessageModule({ args, pubsub, ctx });
  }

  @Query(() => [Message])
  async filterMessages(@Ctx() ctx: Context, @Args() args: filterMessagesInput) {
    return await filterMessagesModule({ ctx, args });
  }

  @Query(() => [Message])
  async messages(@Ctx() ctx: Context, @Arg("chatId") chatId: string) {
    return await messagesModule({ ctx, chatId });
  }

  @Query(() => Chat)
  async joinChat(
    @Ctx() ctx: Context,
    @Args() args: connectOrDisconnectChatInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    return await joinChatModule({ args, ctx, pubsub });
  }

  @Mutation(() => Boolean)
  async disconnectChats(@Ctx() ctx: Context, @PubSub() pubsub: PubSubEngine) {
    return await disconnectChatsModule({ ctx, pubsub });
  }

  @Query(() => [Chat], { nullable: true })
  async allChats(@Ctx() ctx: Context) {
    return await allChatsModule({ ctx });
  }

  @Query(() => [Participant])
  async findParticipants(
    @Ctx() ctx: Context,
    @Arg("id") id: string
  ): Promise<Participant[]> {
    return await findParticipantsModule({ ctx, id });
  }

  @Subscription(() => [User], {
    topics: UPDATE_USERS_TO_INVITE,
  })
  updateUsersToInvite(
    @Root() payload: any,
    @Args() args: connectOrDisconnectChatInput
  ): User[] {
    return payload;
  }

  @Subscription(() => Message, {
    topics: NEW_MESSAGES,
    filter: ({ payload, args }) => {
      return payload.chatId === args.chatId;
    },
  })
  newMessages(
    @Root() payload: any,
    @Args() args: connectOrDisconnectChatInput
  ): Message {
    return payload;
  }

  @Subscription(() => [Participant], {
    topics: UPDATE_PARTICIPANTS,
    filter: ({ payload, args }) => {
      return payload.every(
        ({ chatId }: { chatId: string }) => chatId === args.chatId
      );
    },
  })
  updateParticipants(
    @Root() payload: [Participant],
    @Args() args: connectOrDisconnectChatInput
  ): Participant[] {
    return payload;
  }

  @Subscription(() => updateChat, {
    topics: UPDATE_CHAT,
    filter: ({ payload, args }) => {
      return payload.chat.participants.some(
        ({ userId }: { userId: string }) => userId === args.userId
      );
    },
  })
  updateChats(
    @Root() payload: updateChat,
    @Args() args: userChatsInput
  ): updateChat {
    return payload;
  }
}
