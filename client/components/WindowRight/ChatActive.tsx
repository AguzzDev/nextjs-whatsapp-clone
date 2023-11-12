import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import ClipIcon from "public/ClipIcon";
import MicIcon from "public/MicIcon";
import SmileIcon from "public/SmileIcon";
import SearchIcon from "public/SearchIcon";
import { DropdownMenuMenu } from "components/Dropdown";
import { textFormat } from "utils/textFormat";

import { MenuGifs } from "components/UI/MenuGifs";
import { useChat } from "context/ChatContext";
import {
  JoinChatDocument,
  NewMessagesDocument,
  useJoinChatQuery,
  useMessagesQuery,
} from "generated/graphql";
import { Messages } from "components/UI/Messages";
import { AnimatePresence } from "framer-motion";
import { userCookie } from "utils/userCookie";
import { TopComponent } from "components/UI/TopComponent";
import { ChatDetails } from "./ChatDetails";
import { useGlobalState } from "context/GlobalStateContext";

export function ChatActive() {
  const { user } = userCookie();
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<Date | null>(
    null
  );
  const { chatId, sendMessage, setChat, subscribeToNewMessages } = useChat();
  const { windowRight, setWindowRight } = useGlobalState();

  const { data, loading } = useJoinChatQuery({
    variables: { joinChatId: chatId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setChat(data.joinChat);
    }
  }, [loading]);

  const { subscribeToMore, ...results } = useMessagesQuery({
    variables: { chatId },
  });

  const chat = data?.joinChat;

  const [details, setDetails] = useState(false);
  const [menu, setMenu] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  const submitMessage = async (e: any) => {
    e.preventDefault();

    const currentTime: Date = new Date();

    if (message.message.length === 0) return;

    if (
      !lastMessageTimestamp ||
      currentTime.getTime() - lastMessageTimestamp.getTime() >= 1000
    ) {
      await sendMessage({
        chatId,
        type: message.type,
        message: message.message,
      });
      setLastMessageTimestamp(currentTime);
      setMessage({ message: "", type: "" });
    }
  };

  return (
    <main className="flex w-full bg-gray7">
      {!loading && chat && (
        <>
          <section className="relative flex flex-col w-full h-full select-none">
            {/* Top */}
            <TopComponent>
              {/* Left */}
              <button
                data-test-id="open_details_group"
                onClick={() => setWindowRight("chatDetails")}
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
                  <h3 data-test-id="name-group" className="font-bold">{chat.name}</h3>
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
                {!results.loading && (
                  <Messages
                    messages={results.data!.messages}
                    subscribe={() =>
                      subscribeToNewMessages({
                        id: chatId,
                        subscribe: subscribeToMore,
                      })
                    }
                    user={user!}
                  />
                )}
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
                <form onSubmit={submitMessage} data-test-id="message-form">
                  <input
                    type="text"
                    value={
                      message.type === "gif" ? "Enviar Gif" : message.message
                    }
                    onChange={(e) => {
                      setMessage({
                        type: "message",
                        message: textFormat(e.target.value),
                      });
                    }}
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
              <AnimatePresence>
                {windowRight === "chatDetails" && <ChatDetails />}
              </AnimatePresence>
            </div>

            {/* Menu */}
            <AnimatePresence>
              {menu && <MenuGifs setMenu={setMenu} />}
            </AnimatePresence>
          </section>
        </>
      )}
    </main>
  );
}
