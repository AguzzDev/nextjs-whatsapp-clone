import React, { useEffect, useRef } from "react"
import { formatTime } from "utils/format"

export const Messages = ({ messages, subscribeToNewComments, user }) => {
  const scrollRef = useRef<any>()

  const typeMessage = (message) => {
    return (
      <>
        {message.slice(-4) === ".gif" ? (
          <img src={message} className="w-52 h-42" />
        ) : (
          <p className="break-words w-full">{message}</p>
        )}
      </>
    )
  }
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => subscribeToNewComments(), [])

  return (
    <>
      {messages &&
        messages.map(({ message, timestamp, user: userH, type }, i) => (
          <div
            ref={scrollRef}
            key={i}
            className={`${
              userH.id == user.id ? "flex-row-reverse" : null
            } flex flex-row`}
          >
            {type === "notification" ? (
              <div className="w-5/12 mx-auto bg-green1 text-center rounded-md">
                <p className="py-1">{message}</p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    clipPath: "polygon(0 0%, 100% 100%, 100% 0)",
                  }}
                  className={`${
                    userH.id == user.id
                      ? "-translate-x-2 -rotate-90"
                      : "translate-x-2"
                  } transform w-5 h-5 bg-green1`}
                />

                <div className="flex flex-col text-white p-2 bg-green1 rounded-md max-w-[50%] min-w-[10%]">
                  <p className="font-medium">{userH.name}</p>
                  {typeMessage(message)}
                  <p className="flex items-end justify-end text-xs tracking-tight">
                    {formatTime(timestamp)}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
    </>
  )
}
