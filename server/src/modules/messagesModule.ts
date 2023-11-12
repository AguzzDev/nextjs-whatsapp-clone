import { Message } from "../models/messages";
import { Context } from "../types";

export const messagesModule = async ({
  ctx,
  chatId,
}: {
  ctx: Context;
  chatId: string;
}): Promise<Message[] | null> => {
  if (!ctx.req.session.userId) return null;

  await ctx.prisma.participant.update({
    where: { chatId_userId: { chatId, userId: ctx.req.session.userId } },
    data: { unViewedMessages: { decrement: 1 } },
  });

  const chat = await ctx.prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      owner: true,
      messages: {
        orderBy: {
          timestamp: "asc",
        },
        include: { user: true, chat: true, viewedBy: true },
      },
      participants: { include: { user: true, chat: true } },
    },
  });

  return chat!.messages;
};
