import { PubSubEngine } from "type-graphql";
import { Chat } from "../models/chat";
import { Context } from "../types";
import { connectOrDisconnectChatInput } from "../resolvers/inputs";

export const joinChatModule = async ({
  args,
  ctx,
  pubsub,
}: {
  args: connectOrDisconnectChatInput;
  ctx: Context;
  pubsub: PubSubEngine;
}): Promise<Chat | null> => {
  if (!ctx.req.session.userId) return null;

  //Find user online in another chat
  const onlineInChat = await ctx.prisma.chat.findFirst({
    where: { usersOnline: { some: { id: ctx.req.session.userId } } },
  });

  if (onlineInChat) {
    await ctx.prisma.chat.update({
      where: { id: onlineInChat.id },
      data: { usersOnline: { disconnect: { id: ctx.req.session.userId } } },
    });
  }

  await ctx.prisma.chat.update({
    where: { id: args.chatId },
    data: { usersOnline: { connect: { id: ctx.req.session.userId } } },
  });

  const unviewedMessages = await ctx.prisma.message.findMany({
    where: {
      chatId: args.chatId,
      NOT: {
        viewedBy: {
          some: { id: ctx.req.session.userId },
        },
      },
    },
  });

  for (const message of unviewedMessages) {
    await ctx.prisma.message.update({
      where: { id: message.id },
      data: {
        viewedBy: {
          connect: { id: ctx.req.session.userId },
        },
      },
    });
    await ctx.prisma.participant.update({
      where: {
        chatId_userId: {
          chatId: message.chatId,
          userId: ctx.req.session.userId,
        },
      },
      data: {
        unViewedMessages: { decrement: 1 },
      },
    });
  }

  const chat = await ctx.prisma.chat.findUnique({
    where: { id: args.chatId },
    include: {
      owner: true,
      messages: { include: { user: true, chat: true, viewedBy: true } },
      participants: { include: { user: true, chat: true } },
      usersOnline: true,
    },
  });

  ctx.req.session.chatId = chat!.id;

  return chat;
};
