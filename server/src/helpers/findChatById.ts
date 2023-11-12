import { prisma } from "../prisma";

export const findChatById = async ({ id }: { id: string }) =>
  await prisma.chat.findFirst({
    where: { id },
    include: {
      owner: true,
      participants: {
        orderBy: [{ createdAt: "asc" }, { updatedAt: "desc" }],
        include: { user: true, chat: true },
      },
      messages: {
        orderBy: { timestamp: "asc" },
        include: { chat: true, user: true, viewedBy: true },
      },
    },
  });
