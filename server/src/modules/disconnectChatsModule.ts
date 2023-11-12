import { PubSubEngine } from "type-graphql";
import { Context } from "../types";

export const disconnectChatsModule = async ({
  ctx,
  pubsub,
}: {
  ctx: Context;
  pubsub: PubSubEngine;
}): Promise<Boolean> => {
  if (!ctx.req.session.userId) return false;

  const onlineInChat = await ctx.prisma.chat.findMany({
    where: { usersOnline: { some: { id: ctx.req.session.userId } } },
  });

  for (const chat of onlineInChat) {
    await ctx.prisma.chat.update({
      where: { id: chat.id },
      data: { usersOnline: { disconnect: { id: ctx.req.session.userId } } },
    });
  }

  return true;
};
