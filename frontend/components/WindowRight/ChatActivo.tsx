import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"

import ClipIcon from "public/ClipIcon"
import MicIcon from "public/MicIcon"
import SmileIcon from "public/SmileIcon"
import SearchIcon from "public/SearchIcon"
import { DropdownMenuMenu } from "components/Dropdown"
import { textFormat } from "utils/textFormat"
import { userCookie } from "utils/userCookie"
import { DetailsGroup } from "components/UI/DetailsGroup"
import { MenuGifs } from "components/UI/MenuGifs"
import { useChat } from "context/ChatContext"
import {
  NewMessagesDocument,
  useJoinChatQuery,
  useMessagesQuery,
} from "generated/graphql"
import { UserType } from "interface"
import { Messages } from "components/UI/Messages"

export function ChatActivo() {
  const user = userCookie() as UserType
  const { chatId, sendMessage } = useChat()
  const { data, loading } = useJoinChatQuery({
    variables: { joinChatId: chatId },
  })
  const { subscribeToMore, ...results } = useMessagesQuery({
    variables: { messagesId: chatId },
  })
  const chat = data?.joinChat

  const [details, setDetails] = useState(false)
  const [menu, setMenu] = useState(false)
  const [message, setMessage] = useState({ type: "", message: "" })

  const submitMessage = async (e: any) => {
    e.preventDefault()
    if (!message) return
    await sendMessage({
      chatId: chat.id,
      type: message.type,
      message: message.message,
    })
    setMessage({ message: "", type: "" })
  }

  const TopComponent = ({ children }) => {
    return (
      <div className="flex justify-between items-center my-auto bg-gray1 px-5 h-[10.3vh] select-none">
        {children}
      </div>
    )
  }

  return (
    <main className="flex w-full bg-gray7">
      {!loading && (
        <>
          <div className="relative flex flex-col w-full h-full select-none">
            {/* Top */}
            <TopComponent>
              {/* Left */}
              <button
                onClick={() => setDetails(!details)}
                className="flex items-center cursor-pointer"
              >
                {chat.image === "/groupIcon.png" ? (
                  <div
                    className="bg-white rounded-full"
                    style={{ height: "42px", width: "42px" }}
                  >
                    <Image
                      src={chat.image}
                      alt="logo-img"
                      objectFit="cover"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <Image
                    src={chat.image}
                    alt="logo-img"
                    objectFit="cover"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}

                <div className="flex items-center ml-3 font-medium text-white">
                  <h1 className="text-xl font-bold">{chat.name}</h1>
                </div>
              </button>
              {/* Right */}
              <div className="flex items-center space-x-5">
                <SearchIcon />
                {user?.id === chat.owner.id && (
                  <DropdownMenuMenu roomActive={chat.id} />
                )}
              </div>
            </TopComponent>

            {/* Center */}
            <div className="relative w-full h-full">
              {user?.backgroundImage && (
                <div className="select-none">
                  <Image
                    src={user.backgroundImage}
                    layout="fill"
                    className="opacity-60"
                  />
                </div>
              )}
              <div className="absolute top-0 flex flex-col w-full h-full px-2 py-3 space-y-3 overflow-y-scroll">
                <Messages
                  messages={results.data.messages}
                  subscribeToNewComments={() =>
                    subscribeToMore({
                      document: NewMessagesDocument,
                      variables: { messagesId: chatId },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev
                        const newFeedItem = subscriptionData.data.newMessage

                        return Object.assign({}, prev, {
                          messages: {
                            messages: [...prev.messages, newFeedItem],
                          },
                        })
                      },
                    })
                  }
                  user={user}
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between px-5 py-2 bg-gray1">
              {/* Left */}
              <div className="flex space-x-4">
                <button onClick={() => setMenu(!menu)}>
                  <SmileIcon />
                </button>
                <ClipIcon />
              </div>
              {/* Center */}
              <div className="w-full py-2 mx-3 rounded-md bg-blue2">
                <form onSubmit={submitMessage}>
                  <input
                    type="text"
                    value={
                      message.type === "gif" ? "Enviar Gif" : message.message
                    }
                    onChange={(e) =>
                      setMessage({
                        type: "message",
                        message: textFormat(e.target.value),
                      })
                    }
                    className="w-full px-4 text-white bg-transparent outline-none"
                    placeholder="Escribe tu mensaje aqui"
                    autoFocus
                  />
                </form>
              </div>
              {/* Right */}
              <button>
                <MicIcon />
              </button>
              {/* Details Group */}
              {details && (
                <DetailsGroup
                  chat={chat}
                  setDetails={setDetails}
                  TopComponent={TopComponent}
                  user={user}
                />
              )}
            </div>

            {/* Menu */}
            <MenuGifs menu={menu} setMenu={setMenu} setMessage={setMessage} />
          </div>
        </>
      )}
    </main>
  )
}
