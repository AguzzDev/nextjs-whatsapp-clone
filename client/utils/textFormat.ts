export const textFormat = (text: string) => {
  const dictionary = [
    { shortcut: ":D", emoji: "😃" },
    { shortcut: ":)", emoji: "😃" },
    { shortcut: ":(", emoji: "😔" },
    { shortcut: ":P", emoji: "😛" },
    { shortcut: ":o", emoji: "😮" },
    { shortcut: ":|", emoji: "😐" },
    { shortcut: ";)", emoji: "😉" },
    { shortcut: ":*", emoji: "😘" },
    { shortcut: ":^)", emoji: "😜" },
    { shortcut: ":^(", emoji: "😭" },
    { shortcut: ":-)", emoji: "😊" },
    { shortcut: ":O", emoji: "😲" },
    { shortcut: "8-)", emoji: "😎" },
    { shortcut: ":-D", emoji: "😄" },
    { shortcut: "<3", emoji: "❤️" },
    { shortcut: ":/", emoji: "😕" },
    { shortcut: ":S", emoji: "😖" },
    { shortcut: ":$", emoji: "🤑" },
    { shortcut: ":-*", emoji: "😗" },
    { shortcut: ":-P", emoji: "😜" },
    { shortcut: "^_^", emoji: "😊" },
    { shortcut: ":-|", emoji: "😐" },
    { shortcut: ":-(", emoji: "☹️" },
    { shortcut: ":-O", emoji: "😲" },
  ];

  for (let entry of dictionary) {
    const shortcut = entry.shortcut;
    const emoji = entry.emoji;
    text = text.replace(shortcut, emoji);
  }

  return text;
};
