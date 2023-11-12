import { ParticipantInput } from "../resolvers/inputs";
import { Context } from "../types";

export const updateAddOrRemovePartipants = async ({
  args,
  ctx,
  message,
  participants,
}: {
  args: { id: string; userId?: string };
  ctx: Context;
  message: any;
  participants: ParticipantInput[];
}) => {
  await ctx.prisma.chat.update({
    where: { id: args.id },
    data: {
      messages: {
        create: {
          user: { connect: { id: ctx.req.session.userId } },
          message,
          type: "notification",
        },
      },
      participants: !args.userId
        ? { create: participants }
        : {
            delete: {
              chatId_userId: { chatId: args.id, userId: args.userId },
            },
          },
    },
  });
};
