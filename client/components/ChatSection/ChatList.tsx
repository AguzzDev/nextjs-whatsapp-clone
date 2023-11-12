import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

import { IconSm } from "components/Icons";
import { ChatFragment, useAllChatsQuery } from "generated/graphql";
import SearchIcon from "public/SearchIcon";
import { userCookie } from "utils/userCookie";
import { useChat } from "context/ChatContext";
import { Chat } from "./Chat";
import { useDebounce } from "hooks/useDebounce";
import { TextRefProps } from "interface";

export function ChatList() {
  const { subscribeToUpdateChats } = useChat();

  const sound = new Howl({
    src: ["/sounds/messageReceive.mp3"],
  });

  const { user } = userCookie();
  const { data, loading, subscribeToMore } = useAllChatsQuery();

  const searchRef = useRef<TextRefProps>(null);
  const { handleChange, input: query } = useDebounce(searchRef);

  const filtered = (data: ChatFragment[]) => {
    if (!loading) {
      const result = data?.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      );

      return !result ? (
        <div className="p-2">
          <p>No hay chats</p>
        </div>
      ) : (
        result.map((data, i) => <Chat key={i} data={data} />)
      );
    }
  };

  const AllChats = ({
    data,
    subscribe,
  }: {
    data: ChatFragment[] | null;
    subscribe: Function;
  }) => {
    useEffect(() => {
      subscribe();
    }, []);

    return (
      <>
        {data
          ? query === ""
            ? data.map((d, i) => <Chat key={i} data={d} />)
            : filtered(data)
          : null}
      </>
    );
  };

  return (
    <section className="flex flex-col overflow-y-hidden select-none h-full">
      <div className="bg-black1 p-2 border-b border-border">
        <div className="flex p-2 rounded-md bg-gray1">
          <div className="my-auto pl-3 pr-5 text-gray4">
            <IconSm Icon={SearchIcon} />
          </div>
          <input
            ref={searchRef}
            onChange={handleChange}
            className="bg-gray1 w-full text-gray4 text-sm outline-none"
            placeholder="Busca un chat o inicia uno nuevo"
          />
        </div>
      </div>
      <div
        data-test-id="list-of-all-chats"
        className="bg-black1 px-1 h-full overflow-y-scroll"
      >
        {!loading && user && (
          <AllChats
            data={data!.allChats || null}
            subscribe={() =>
              subscribeToUpdateChats({
                id: user.id,
                subscribe: subscribeToMore,
                sound,
              })
            }
          />
        )}
      </div>
    </section>
  );
}
