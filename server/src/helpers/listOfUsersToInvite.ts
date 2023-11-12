import { prisma } from "../prisma";

export const listOfUsersToInvite = async ({
  participants,
}: {
  participants: { userId: string; chatId: string }[];
}) => {
  return await prisma.user.findMany({
    where: { NOT: { id: { in: participants.map((p) => p.userId) } } },
  });
};
