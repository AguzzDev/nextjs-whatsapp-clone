import { PubSubEngine } from "type-graphql";
import { Context } from "../types";
import { findChatById } from "../helpers/findChatById";

export const removeChatModule = async ({
  ctx,
  id,
  pubsub,
}: {
  ctx: Context;
  id: string;
  pubsub: PubSubEngine;
}): Promise<Boolean> => {
  const chat = await findChatById({ id });

  await ctx.prisma.chat.delete({ where: { id } });

  await pubsub.publish("UPDATE_CHAT", {
    type: { action: "REMOVE_CHAT" },
    chat,
    by: ctx.req.session.userId,
  });
  return true;
};
