import { prisma } from "../prisma";

export const findUserById = async ({ id }: { id: string }) =>
  await prisma.user.findFirst({
    where: { id },
  });
