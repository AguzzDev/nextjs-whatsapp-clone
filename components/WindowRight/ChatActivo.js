import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import ClipIcon from "public/ClipIcon"
import MicIcon from "public/MicIcon"
import SmileIcon from "public/SmileIcon"
import SearchIcon from "public/SearchIcon"
import { DropdownMenuMenu } from "components/Dropdown"
import { useSockets } from "context/SocketContext"
import { formatTime } from "utils/format"
import { textFormat } from "utils/textFormat"
import APITENOR from "lib/apiTenor"
import { userCookie } from "utils/userCookie"

export function ChatActivo() {
  const { messages, rooms, sendMessage, roomActive } = useSockets()
  const user = userCookie()

  const [message, setMessage] = useState("")
  const [menu, setMenu] = useState(false)
  const [listGifs, setListGifs] = useState([])
  const [media, setMedia] = useState(null)

  const scrollRef = useRef()
  const searchGifRef = useRef()
  const debounceRef = useRef()

  const findRoom = rooms.filter(({ _id }) => _id === roomActive)

  const typeMessage = (message) => {
    return (
      <>
        {typeof message === "object" ? (
          <img src={message[0]} className="w-52 h-42" />
        ) : (
          <p className="break-words w-full">{message}</p>
        )}
      </>
    )
  }

  const searchGif = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(async () => {
      const { data } = await APITENOR.get(`/search`, {
        params: {
          q: searchGifRef.current.value,
          limit: 20,
          key: "GKR149X8LSDJ",
        },
      })
      const dataBody = data.results.map(({ media }) =>
        media.map(({ gif }) => gif.url)
      )
      setListGifs(dataBody)
    }, 700)
  }

  const submitMessage = async (e) => {
    e.preventDefault()

    await sendMessage(roomActive, message)

    setMessage("")
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getMedia = navigator.mediaDevices.getUserMedia({ audio: true })
      setMedia(getMedia)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col select-none h-full w-screen relative">
      {/* Top */}
      <div
        className="flex justify-between items-center my-auto bg-gray1 px-5 select-none"
        style={{ paddingTop: "13px", paddingBottom: "13px" }}
      >
        {/* Left */}
        <div className="flex cursor-pointer">
          <div
            className="bg-white rounded-full"
            style={{ height: "42px", width: "42px" }}
          >
            <img
              src={findRoom[0]?.image}
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <div className="text-white font-medium flex items-center ml-3">
            <h1 className="text-xl font-bold">{findRoom[0]?.name}</h1>
          </div>
        </div>
        {/* Right */}
        <div className="flex space-x-5">
          <SearchIcon />
          {user?.name === findRoom[0]?.own.name && (
            <DropdownMenuMenu roomActive={roomActive} />
          )}
        </div>
      </div>

      {/* Center */}
      <div className="select-none relative h-full overflow-y-scroll">
        {user?.backgroundChat && (
          <div className="sticky top-0 left-0 w-full h-full">
            <Image
              src={user.backgroundChat}
              layout="fill"
              className="opacity-60"
            />
          </div>
        )}
        <div className="absolute top-0 flex flex-col space-y-3 p-5 w-full">
          {messages?.map(({ message, timestamp, username }, i) => (
            <div
              ref={scrollRef}
              key={i}
              className={`${
                username == user.name && "flex-row-reverse"
              } flex flex-row`}
            >
              <div
                style={{ clipPath: "polygon(0 0%, 100% 100%, 100% 0)" }}
                className={`${
                  username === user.name
                    ? "-translate-x-1 -rotate-90"
                    : "translate-x-2"
                } transform w-5 h-5 bg-green1`}
              />

              <div className="flex flex-col text-white p-2 bg-green1 rounded-md">
                <p className="font-medium">{username}</p>
                {typeMessage(message)}
                <p className="flex items-end justify-end text-xs tracking-tight">
                  {formatTime(timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center  bg-gray1 py-4 px-5">
        {/* Left */}
        <div className="flex space-x-4">
          <button onClick={() => setMenu(!menu)}>
            <SmileIcon />
          </button>
          <ClipIcon />
        </div>
        {/* Center */}
        <div className="bg-blue2 rounded-md w-full py-2 mx-3">
          <form onSubmit={submitMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(textFormat(e.target.value))}
              className="w-full outline-none bg-transparent px-4 text-white"
              placeholder="Escribe tu mensaje aqui"
            />
          </form>
        </div>
        {/* Right */}
        <div>
          <button
            hidden
            disabled={!messages}
            onClick={submitMessage}
            type="submit"
          >
            Send
          </button>
          <MicIcon />
        </div>
      </div>

      {/* Menu */}
      {menu && (
        <div className="absolute bottom-16 left-0 z-50 w-full h-72 bg-gray1 overflow-y-scroll">
          <input
            placeholder="Busca un gif"
            ref={searchGifRef}
            onChange={searchGif}
            className="bg-gray7 rounded-md w-1/4 py-1 m-3"
          />
          {listGifs.length > 0 && (
            <div className="grid grid-cols-6 gap-5">
              {listGifs.map((gif, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sendMessage(roomActive, gif)
                    setMenu(false)
                  }}
                >
                  <img src={gif} className="w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
