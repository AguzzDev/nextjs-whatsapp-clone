export const textFormat = (text) => {
  const dictionary = {
    ":D": "😃",
    ":)": "😃",
    ":(": "😔",
    ":P": "😛",
    ":o": "😮",
    ":|": "😐",
    ";)": "😉",
    ":*": "😘",
    ":^)": "😜",
    ":^(": "😭",
  }

  for (let key in dictionary) {
    if(text.includes(key)) {
      text = text.replace(key, dictionary[key])
    }
  }

  return text
}
