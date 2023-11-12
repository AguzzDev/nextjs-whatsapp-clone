import { PubSubEngine } from "type-graphql";
import { sendMessageInput } from "../resolvers/inputs";
import { Context } from "../types";
import { findChatById } from "../helpers/findChatById";
// import { findChatById } from "../helpers/findChatById";

export const sendMessageModule = async ({
  args,
  ctx,
  pubsub,
}: {
  ctx: Context;
  args: sendMessageInput;
  pubsub: PubSubEngine;
}): Promise<Boolean> => {
  //Users Online
  const getUsersInChat = await ctx.prisma.chat.findFirst({
    where: { id: args.chatId },
    include: { usersOnline: true },
  });

  await ctx.prisma.chat.update({
    where: { id: args.chatId },
    data: {
      messages: {
        create: {
          user: { connect: { id: ctx.req.session.userId } },
          message: args.message,
          type: args.type,
          viewedBy: {
            connect: getUsersInChat?.usersOnline.map((user) => ({
              id: user.id,
            })),
          },
        },
      },
      participants: {
        updateMany: {
          where: {
            chatId: args.chatId,
            NOT: { userId: ctx.req.session.userId },
          },
          data: { unViewedMessages: { increment: 1 } },
        },
      },
      updatedAt: new Date(),
    },
  });

  const findChat = await findChatById({ id: args.chatId });

  await pubsub.publish("NEW_MESSAGES", findChat!.messages.slice(-1)[0]);
  await pubsub.publish("UPDATE_CHAT", {
    chat: findChat,
    type: { action: "ADD_MESSAGE" },
    by: ctx.req.session.userId,
  });

  return true;
};
