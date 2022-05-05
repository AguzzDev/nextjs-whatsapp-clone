import { useSidebar } from "context/SidebarContext"
import { useSockets } from "context/SocketContext"
import { useEffect } from "react"
import { formatTime } from "utils/format"

export const Conversacion = ({ room }) => {
  const { name, image, _id: id, messages } = room
  const { joinRoom } = useSockets()
  const { setWindowRight } = useSidebar()

  const messageStatus = () => {
     if (typeof messages[messages.length - 1].message == "object") {
      return `${messages[messages.length - 1]?.username}: Mando un Gif`
    } else {
      return `${messages[messages.length - 1]?.username}: ${
        messages[messages.length - 1]?.message
      }`
    }
  }

  useEffect(() => {
    if (messages?.length > 0) {
      messageStatus()
    }
  }, [messages])

  return (
    <>
      {messages?.length > 0 && (
        <div
          onClick={() => {
            joinRoom(id)
            setWindowRight(1)
          }}
          className="px-3 py-2 flex items-center hover:bg-gray1 cursor-pointer border-b border-border"
        >
          <div className="w-11 h-10 rounded-full bg-white">
            <img src={image} className="object-cover w-full h-full" />
          </div>

          <div className="flex ml-3 justify-between w-full">
            <div className="flex flex-col">
              <h1 className="text-white">{name}</h1>
              <p className="text-gray-500">{messageStatus()}</p>
            </div>

            <div className="flex items-start">
              <p className="text-gray-500">
                {formatTime(messages[messages?.length - 1]?.timestamp)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
