import { Conversacion } from "./Conversacion"
import { useSockets } from "context/SocketContext"
import { useEffect } from "react"

export const Conversaciones = ({ search }) => {
  const { rooms } = useSockets()
  const searchLower = search.toLowerCase()

  const orderByTime = () =>
    rooms?.sort((a, b) => {
      if (a?.messages?.length > 0 && b?.messages?.length > 0) {
        const aTime = a.messages[a.messages.length - 1]?.timestamp
        const bTime = b.messages[b.messages.length - 1]?.timestamp

        return aTime < bTime ? 1 : -1
      }
    })

  useEffect(() => {
    if (rooms.length > 0) {
      orderByTime()
    }
  }, [rooms])

  return (
    <>
      {!search
        ? orderByTime().map((room, i) => <Conversacion key={i} room={room} />)
        : orderByTime()
            ?.filter(({ name }) => name.toLowerCase().includes(searchLower))
            .map((room, i) => <Conversacion key={i} room={room} />)}
    </>
  )
}
