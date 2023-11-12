import { modifyChatInput } from "../resolvers/inputs";
import { Context } from "../types";

export const changeOptionsChatModule = async ({
  ctx,
  args,
}: {
  ctx: Context;
  args: modifyChatInput;
}): Promise<Boolean> => {
  await ctx.prisma.chat.update({
    where: { id: ctx.req.session.chatId! },
    data: { ...args },
  });
  return true;
};
