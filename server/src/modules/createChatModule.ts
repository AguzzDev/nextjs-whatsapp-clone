import { PubSubEngine } from "type-graphql";
import { createChatInput } from "../resolvers/inputs";
import { Context } from "../types";
import { Chat } from "../models/chat";
import { UPDATE_CHAT } from "../constants";

export const createChatModule = async ({
  ctx,
  args,
  pubsub,
}: {
  ctx: Context;
  args: createChatInput;
  pubsub: PubSubEngine;
}): Promise<Chat | null> => {
  if (!ctx.req.session.userId) return null;

  const chat = await ctx.prisma.chat.create({
    data: {
      ...args,
      owner: {
        connect: {
          id: ctx.req.session.userId,
        },
      },
      messages: {
        create: {
          user: { connect: { id: ctx.req.session.userId } },
          message: `Grupo creado`,
          type: "notification",
          viewedBy: { connect: { id: ctx.req.session.userId } },
        },
      },
      participants: {
        create: { role: "ADMIN", ...args.participants[0] },
        createMany: { data: args.participants.slice(1) },
      },
    },
    include: {
      owner: true,
      participants: { include: { user: true } },
      messages: {
        include: { chat: true, user: true, viewedBy: true },
      },
    },
  });

  //Updating unviewed messages for all participants of chat
  await ctx.prisma.participant.updateMany({
    where: {
      chatId: chat.id,
      NOT: { userId: ctx.req.session.userId },
    },
    data: { unViewedMessages: { increment: 1 } },
  });

  await pubsub.publish(UPDATE_CHAT, {
    chat,
    type: {
      action: "ADD_USER",
    },
    by: ctx.req.session.userId,
  });
  return chat;
};
