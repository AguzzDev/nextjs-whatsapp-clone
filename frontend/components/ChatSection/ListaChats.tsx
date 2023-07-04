import React, { useEffect, useRef, useState } from "react"

import { IconSm } from "components/Icons"
import { Chat } from "./Chat"
import { UpdateChatsDocument, useAllChatsQuery } from "generated/graphql"
import SearchIcon from "public/SearchIcon"

export function ListaChat() {
  const [query, setQuery] = useState("")
  const debounceRef = useRef<NodeJS.Timeout>()

  const { data, loading, subscribeToMore } = useAllChatsQuery()

  const handleSearch = (e) => {
    if (debounceRef.current) {
      debounceRef.current.clearTimeout()
    }
    setTimeout(() => {
      setQuery(e.target.value)
    }, 500)
  }

  const filtered = (data) => {
    if (!loading) {
      const result = data?.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      )

      return !result ? (
        <div className="p-2">
          <p>No hay chats</p>
        </div>
      ) : (
        result.map((data, i) => <Chat key={i} data={data} />)
      )
    }
  }

  const AllChats = ({ data, subscribe }) => {
    useEffect(() => subscribe(), [])

    return (
      <>
        {query === ""
          ? data?.map((data, i) => <Chat key={i} data={data} />)
          : filtered(data)}
      </>
    )
  }

  return (
    <div className="flex flex-col overflow-y-hidden select-none h-full">
      <div className="bg-black1 p-2 border-b border-border">
        <div className="flex w-11/12 p-2 rounded-md bg-gray1">
          <div className="my-auto pl-3 pr-5 text-gray4">
            <IconSm Icon={SearchIcon} />
          </div>
          <input
            onChange={(e) => handleSearch(e)}
            className="bg-gray1 w-full text-gray4 text-sm outline-none"
            placeholder="Busca un chat o inicia uno nuevo"
          />
        </div>
      </div>
      <div className="bg-black1 px-1 h-full overflow-y-scroll">
        {!loading && (
          <AllChats
            data={data?.allChats}
            subscribe={() =>
              subscribeToMore({
                document: UpdateChatsDocument,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev
                  const newFeedItem = subscriptionData.data.updateChats

                  return Object.assign(
                    {},
                    prev,
                    newFeedItem.type === "delete"
                      ? {
                          allChats: prev.allChats.filter(
                            ({ id }) => !id.includes(newFeedItem.id)
                          ),
                        }
                      : {
                          allChats: [newFeedItem, ...prev.allChats],
                        }
                  )
                },
              })
            }
          />
        )}
      </div>
    </div>
  )
}
