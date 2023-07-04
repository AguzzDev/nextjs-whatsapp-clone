import React, { useEffect } from "react"

import { useSidebar } from "context/SidebarContext"
import { formatTime } from "utils/format"
import { useChat } from "context/ChatContext"
import { Avatar } from "components/Avatar"
import { NewMessagesDocument, useMessagesQuery } from "generated/graphql"

export const Chat = ({ data }) => {
  const { setChatId, chatId } = useChat()
  const {
    subscribeToMore,
    loading,
    data: lastMessage,
  } = useMessagesQuery({
    variables: { messagesId: data.id },
  })

  const { setWindowRight } = useSidebar()

  const Message = ({ messages, subscribe }) => {
    useEffect(() => {
      if (messages.id === chatId) {
        subscribe()
      }
    }, [])

    return (
      <>
        <Avatar img={data.image} />

        <div className="flex justify-between w-full ml-3">
          <div className="flex flex-col">
            <h1 className="text-white">{data.name}</h1>

            {messages ? (
              <p className="text-gray-500">
                {messages.type == "gif"
                  ? `${messages.user.name}: Mando un Gif`
                  : messages.type == "notification"
                  ? messages.message
                  : `${messages.user.name}: ${messages.message}`}
              </p>
            ) : null}
          </div>

          <div className="flex items-start">
            <p className="text-gray-500">
              {messages ? formatTime(messages.timestamp) : null}
            </p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {!loading && (
        <div
          onClick={() => {
            setChatId(data.id)
            setWindowRight("ChatActivo")
          }}
          className="flex items-center px-3 py-2 border-b cursor-pointer hover:bg-gray1 border-border"
        >
          <Message
            messages={lastMessage.messages[lastMessage.messages.length - 1]}
            subscribe={() =>
              subscribeToMore({
                document: NewMessagesDocument,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev
                  const newFeedItem = subscriptionData.data.newMessages

                  return Object.assign({}, prev, {
                    messages: [prev.messages, newFeedItem],
                  })
                },
              })
            }
          />
        </div>
      )}
    </>
  )
}
