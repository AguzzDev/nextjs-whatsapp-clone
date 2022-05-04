import { Conversacion } from "./Conversacion"
import { useSockets } from "context/SocketContext"

export const Conversaciones = ({ search }) => {
  const { rooms } = useSockets()
  const searchLower = search.toLowerCase()

  const orderByTime = rooms.sort((a, b) => {
    const aTime = a.messages[a.messages.length - 1]?.timestamp
    const bTime = b.messages[b.messages.length - 1]?.timestamp

    return aTime < bTime ? 1 : -1
  })
  console.log(rooms);

  return (
    <>
      {!search
        ? orderByTime.map((room, i) => <Conversacion key={i} room={room} />)
        : orderByTime
            ?.filter(({ name }) => name.toLowerCase().includes(searchLower))
            .map((room, i) => <Conversacion key={i} room={room} />)}
    </>
  )
}
