 const chatIncludeOptions = {
  participants: { include: { user: true } },
  owner: true,
  messages: {
    orderBy: { timestamp: "asc" },
    include: { chat: true, user: true, viewedBy: true },
  },
};

export default chatIncludeOptions