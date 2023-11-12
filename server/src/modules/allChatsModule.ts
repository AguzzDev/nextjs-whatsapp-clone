import { Chat } from "../models/chat";
import { Context } from "../types";

export const allChatsModule = async ({
  ctx,
}: {
  ctx: Context;
}): Promise<Chat[] | null> => {
  const chat = await ctx.prisma.chat.findMany({
    where: {
      participants: {
        some: { userId: { equals: ctx.req.session.userId } },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      owner: true,
      messages: {
        orderBy: { timestamp: "asc" },
        include: { user: true, chat: true, viewedBy: true },
      },
      participants: { include: { user: true, chat: true } },
      usersOnline: true,
    },
  });

  return chat;
};
