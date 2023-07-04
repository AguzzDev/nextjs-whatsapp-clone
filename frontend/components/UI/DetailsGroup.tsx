import React, { useEffect, useRef } from "react"
import { XIcon } from "@heroicons/react/solid"
import Image from "next/image"

import { IconMd } from "components/Icons"
import { formatDate } from "utils/formatDate"
import { InviteToGroup } from "components/UI/InviteToGroup"
import { useDebounce } from "hooks/useDebounce"
import SearchIcon from "public/SearchIcon"
import { useSidebar } from "context/SidebarContext"
import { useChat } from "context/ChatContext"
import {
  UpdateParticipantsDocument,
  useFindParticipantsQuery,
} from "generated/graphql"

export const DetailsGroup = ({ chat, setDetails, TopComponent, user }) => {
  const addGroupRef = useRef()

  const { data, loading, subscribeToMore } = useFindParticipantsQuery({
    variables: { findParticipantsId: chat.id },
  })

  const { removeParticipant } = useChat()

  const { setWindowRight } = useSidebar()
  const { handleChange, input } = useDebounce(addGroupRef)

  const Participants = ({ data, subscribe }) => {
    useEffect(() => {
      subscribe()
    }, [])

    return (
      <>
        {data?.map(({ user: userH }, i) => (
          <div className="flex justify-between" key={i}>
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src={userH.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <h2>{userH.name}</h2>
                <p className="text-xs">#{userH.id.split("-").slice(3)}</p>
              </div>
            </div>
            <div>
              {userH.id === chat?.owner.id && (
                <div className="px-2 py-1 rounded-md bg-gray3">
                  <p className="text-xs">Admin del grupo</p>
                </div>
              )}
              {chat.owner.id == user.id && userH.id !== user.id && (
                <button
                  onClick={() =>
                    removeParticipant({
                      userId: userH.id,
                      chatId: chat.id,
                    })
                  }
                >
                  Eliminar del grupo
                </button>
              )}
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {!loading ? (
        <section className="absolute top-0 right-0 w-2/4 h-full border-l bg-gray1 border-border">
          <TopComponent>
            <div className="flex py-2 space-x-3">
              <button onClick={() => setDetails(false)}>
                <IconMd Icon={XIcon} />
              </button>
              <p>Info del grupo</p>
            </div>
          </TopComponent>

          <section className="flex flex-col">
            <div className="py-5 text-center">
              <div className="relative w-32 h-32 mx-auto mb-1">
                <Image
                  src={chat?.image}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <h1>{chat?.name}</h1>
              <p>Grupo - {chat?.participants.length} participantes</p>

              <div className="py-2 my-3 bg-gray3">
                <p>Grupo creado por {chat?.owner.name}</p>
                <p>{chat.bio}</p>
                <p className="text-sm">{formatDate(chat?.createdAt)}</p>
              </div>
            </div>

            <div className="px-5">
              {/* Invitar */}

              <h2 className="my-2 font-bold">Participantes</h2>

              <div className="pr-2 py-2 h-[28vh] overflow-y-scroll">
                <div className="grid grid-cols-1 gap-x-2 gap-y-4 ">
                  <Participants
                    data={data.findParticipants}
                    subscribe={() =>
                      subscribeToMore({
                        document: UpdateParticipantsDocument,
                        variables: { findParticipantsId: chat.id },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev
                          const newFeedItem =
                            subscriptionData.data.updateParticipants

                          return Object.assign({}, prev, {
                            findParticipants: [newFeedItem],
                          })
                        },
                      })
                    }
                  />
                </div>
              </div>

              {chat.owner.name !== user.name && (
                <div className="flex items-end mt-2">
                  <button
                    onClick={() => {
                      // leaveGroup(chat.id)
                      setWindowRight("ChatInactivo")
                    }}
                    className="w-full px-5 py-2 rounded-md bg-green1 font-white"
                  >
                    Salir del grupo
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
      ) : null}
    </>
  )
}
