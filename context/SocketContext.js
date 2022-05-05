import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { SOCKET_URL } from "../config/default"
import EVENTS from "../config/events"
import { userCookie } from "utils/userCookie"

const socket = io(SOCKET_URL)

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("")
  const [roomActive, setRoomActive] = useState(null)
  const [rooms, setRooms] = useState([])
  const [messages, setMessages] = useState([])

  const router = useRouter()
  const user = userCookie()

  useEffect(() => {
    if (user) {
      socket.emit(EVENTS.CLIENT.GET_ROOMS, user.name)
      socket.on(EVENTS.SERVER.SEND_ROOMS, (allRooms) => {
        setRooms(allRooms)
      })
    }
  }, [])

  const createRoom = ({ name, desc, image, participants }) => {
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, {
      name,
      desc,
      image,
      own: user.name,
      participants,
    })
    socket.on(EVENTS.SERVER.SEND_ROOMS, (data) => {
      setRooms((prev) => [...prev, data])
    })
  }

  const joinRoom = (roomId) => {
    socket.emit(EVENTS.CLIENT.JOINED_ROOM, roomId)
    socket.on(EVENTS.SERVER.JOINED_ROOM, ({ roomId, roomData }) => {
      setRoomActive(roomId)
      setMessages(roomData.messages)
    })
  }

  const sendMessage = (roomId, message) => {
    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {
      message,
      username: user.name,
      room: roomId,
      timestamp: Date.now(),
    })

    socket.once(
      EVENTS.SERVER.ROOM_MESSAGES,
      ({ message, timestamp, username }) => {
        setMessages((prevState) => [
          ...prevState,
          { message, timestamp, username },
        ])
      }
    )
  }

  const removeRoom = (roomId) => {
    socket.emit(EVENTS.CLIENT.REMOVE_ROOM, roomId, user.name)
    router.push("/")

    socket.on(EVENTS.SERVER.SEND_ROOMS, (data) => {
      setRooms(data)
    })
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        roomActive,
        rooms,
        messages,
        joinRoom,
        setMessages,
        createRoom,
        sendMessage,
        removeRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
export const useSockets = () => useContext(SocketContext)
export default SocketProvider
