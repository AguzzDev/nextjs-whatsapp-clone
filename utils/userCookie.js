export const userCookie = () => {
  if (typeof window !== "undefined") {
    const account = window.localStorage.getItem("profile")
    if (account) {
      return JSON.parse(account)
    }
  }
}
