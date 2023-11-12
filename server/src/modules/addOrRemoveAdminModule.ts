import { PubSubEngine } from "type-graphql";
import { NEW_MESSAGES, UPDATE_CHAT, UPDATE_PARTICIPANTS } from "../constants";
import { findChatById } from "../helpers/findChatById";
import { addOrRemoveAdmin } from "../resolvers/inputs";
import { Context } from "../types";
import { findUserById } from "../helpers/findUserById";
import { User } from "../models/user";

export const addOrRemoveAdminModule = async ({
  ctx,
  args,
  pubsub,
}: {
  ctx: Context;
  args: addOrRemoveAdmin;
  pubsub: PubSubEngine;
}): Promise<User | null> => {
  if (!ctx.req.session.chatId) return null;
  const findUser = await findUserById({ id: args.userId });

  await ctx.prisma.chat.update({
    where: { id: ctx.req.session.chatId },
    data: {
      messages: {
        create: {
          user: { connect: { id: ctx.req.session.userId } },
          message:
            args.type === "ADD_ADMIN"
              ? `${findUser!.name} ahora es admin`
              : `${findUser!.name} ya no es admin`,
          type: "notification",
        },
      },
      participants: {
        update: {
          where: {
            chatId_userId: {
              userId: args.userId,
              chatId: ctx.req.session.chatId!,
            },
          },
          data: { role: args.type === "ADD_ADMIN" ? "ADMIN" : "USER" },
        },
      },
    },
  });

  const chat = await findChatById({ id: ctx.req.session.chatId });

  await pubsub.publish(NEW_MESSAGES, chat!.messages.slice(-1)[0]);
  await pubsub.publish(UPDATE_CHAT, {
    type: { action: args.type },
    chat,
    by: ctx.req.session.userId,
  });
  await pubsub.publish(UPDATE_PARTICIPANTS, chat!.participants);

  return findUser;
};
