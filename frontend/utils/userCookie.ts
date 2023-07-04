import { useMeQuery } from "generated/graphql"
import { UserType } from "interface"
import { parseCookies } from "nookies"

export const userCookie = (): UserType | null => {
  const { areUser } = parseCookies()

  if (areUser) {
    const { data, loading } = useMeQuery()
    if (!loading) {
      return data?.me
    }
    return null
  } else {
    return null
  }
}
