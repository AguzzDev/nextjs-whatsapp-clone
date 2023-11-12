import { Message } from "../models/messages";
import { filterMessagesInput } from "../resolvers/inputs";
import { Context } from "../types";

export const filterMessagesModule = async ({
  ctx,
  args,
}: {
  ctx: Context;
  args: filterMessagesInput;
}): Promise<Message[] | []> => {
  if (args.words.length === 0) return [];

  const messages = await ctx.prisma.message.findMany({
    where: {
      chatId: args.chatId,
      type: "message",
      message: { contains: args.words, mode: "insensitive" },
    },
    orderBy: { timestamp: "asc" },
    include: {
      chat: true,
      user: true,
      viewedBy: true,
    },
  });

  return messages;
};
