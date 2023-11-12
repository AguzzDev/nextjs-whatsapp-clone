import { MeFragment, MessagesFragment, UserFragment } from "generated/graphql";
import CheckMessageIcon from "public/CheckMessageIcon";
import React, { useEffect, useRef } from "react";
import { formatTime } from "utils/format";

interface Props {
  messages: MessagesFragment[];
  subscribe: Function;
  user: MeFragment;
}

export const Messages = ({ messages, subscribe, user }: Props) => {
  const scrollRef = useRef<any>();

  const typeMessage = (message: string) => {
    const isOnlyEmojis = (message:string) => {
      const emojiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF]|\u0023\u20E3|[\u2702-\u27B0]|[\uD83C][\uDDE6-\uDDEC]|[\uD83D][\uDC00-\uDD3C\uDD49-\uDD9E\uDDA8\uDDC0-\uDDC9\uDDCD-\uDDDE\uDE01\uDE70-\uDEAA\uDF00-\uDF2F\uDFE0]|\uD83E[\uDD10-\uDD1E\uDD20-\uDD2F\uDD30-\uDD6F\uDD70\uDD73\uDD76\uDD7A-\uDD7E\uDD80-\uDDFA\uDE80-\uDE9F\uDEF0-\uDEF5])/;
    
      return !message.replace(emojiRegex, "").trim();
    };

    return (
      <>
        {message.slice(-4) === ".gif" ? (
          <img src={message} className="w-52 h-42" />
        ) : isOnlyEmojis(message) ? (
          <p className="text-4xl break-words w-full">{message}</p>
        ) : (
          <p className="break-words w-full">{message}</p>
        )}
      </>
    );
  };

  const CheckMessage = ({
    userM,
    viewedBy,
  }: {
    userM: UserFragment;
    viewedBy: UserFragment[];
  }) => {
    if (userM.id != user.id) return null;
    return (
      <div>
        {viewedBy.length === 2 ? (
          <CheckMessageIcon className="fill-current text-blue3" />
        ) : (
          <CheckMessageIcon className="fill-current text-gray-400" />
        )}
      </div>
    );
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <>
      {messages?.map(
        ({ message, timestamp, user: userM, type, viewedBy }, i) => (
          <div
            ref={scrollRef}
            key={i}
            className={`${
              userM.id == user.id ? "flex-row-reverse" : null
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
                    userM.id == user.id
                      ? "-translate-x-2 -rotate-90"
                      : "translate-x-2"
                  } transform w-5 h-5 bg-green1`}
                />

                <div className="flex flex-col text-white p-2 bg-green1 rounded-md max-w-[50%] min-w-[10%]">
                  <p className="font-medium">{userM.name}</p>
                  {typeMessage(message)}
                  <div className="flex justify-end items-center space-x-2">
                    <p className="text-xs tracking-tight">
                      {formatTime(timestamp)}
                    </p>

                    <CheckMessage userM={userM} viewedBy={viewedBy} />
                  </div>
                </div>
              </>
            )}
          </div>
        )
      )}
    </>
  );
};
