import React, { useEffect, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { motion } from "framer-motion";
import { FieldArray, Form, Formik } from "formik";

import { IconMd } from "components/Icons";
import { formatDate } from "utils/formatDate";
import { InviteToGroup } from "components/UI/InviteToGroup";
import { useDebounce } from "hooks/useDebounce";
import { userCookie } from "utils/userCookie";
import { useChat } from "context/ChatContext";
import {
  ParticipantFragment,
  UserFragment,
  useAllUsersToInviteQuery,
  useFindParticipantsQuery,
} from "generated/graphql";
import { TopComponent } from "components/UI/TopComponent";
import { useGlobalState } from "context/GlobalStateContext";
import { ButtonOne } from "components/UI/Buttons/ButtonOne";

export const ChatDetails = () => {
  const { user } = userCookie();
  const [me, setMe] = useState<ParticipantFragment>();
  const {
    chat,
    addOrRemoveParticipant,
    addOrRemoveAdmin,
    subscribeToUpdateParticipants,
    subscribeToMoreUsersToInvite,
    removeChat,
  } = useChat();
  const { setWindowRight } = useGlobalState();

  const { data: dataUsers, subscribeToMore: subscribeToMoreUsers } =
    useAllUsersToInviteQuery({ variables: { chatId: chat.id } });

  const {
    data,
    loading,
    subscribeToMore: subscribeToMoreParticipants,
  } = useFindParticipantsQuery({
    variables: { findParticipantsId: chat.id },
  });

  useEffect(() => {
    if (data) {
      const findMe = data!.findParticipants.filter(
        (res) => res.user.id === user?.id
      )[0];

      setMe(findMe);
    }
  }, [loading]);

  const Participants = ({
    data,
    subscribe,
  }: {
    data: ParticipantFragment[];
    subscribe: Function;
  }) => {
    useEffect(() => {
      subscribe();
    }, []);

    return (
      <>
        {me &&
          user &&
          data.map(({ user: userH, role }, i) => {
            const userIsAdmin = role === "ADMIN";
            const meAdmin = me.role === "ADMIN";
            const participantIsntMe = userH.id !== user.id;
            const participantIsntOwner = userH.id !== chat.owner.id;
            const meIsOwner = me.user.id === chat.owner.id;
            const removeToChat =
              meAdmin && participantIsntOwner && participantIsntMe;
            const addAdminButtonVisible =
              participantIsntOwner &&
              participantIsntMe &&
              me.role === "ADMIN" &&
              role === "USER";
            const removeAdminButtonVisible =
              participantIsntOwner &&
              meIsOwner &&
              participantIsntMe &&
              me.role === "ADMIN" &&
              role === "ADMIN";

            return (
              <div className="flex justify-between" key={i}>
                <div className="flex items-center space-x-3">
                  <Image
                    className="rounded-full"
                    objectFit="cover"
                    src={userH.image}
                    width={50}
                    height={50}
                  />

                  <div>
                    <h4>
                      {userH.name}{" "}
                      <span className="text-xs">
                        #{userH.id.split("-").slice(3)}
                      </span>
                    </h4>
                    <p>{userH.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  {userIsAdmin && (
                    <div className="px-2 py-1 rounded-md bg-gray3 w-max">
                      <p className="text-xs">Admin</p>
                    </div>
                  )}

                  {addAdminButtonVisible && (
                    <button
                      data-test-id="set_admin"
                      onClick={async () =>
                        await addOrRemoveAdmin({
                          type: "ADD_ADMIN",
                          userId: userH.id,
                        })
                      }
                    >
                      Darle admin
                    </button>
                  )}

                  {removeAdminButtonVisible && (
                    <button
                      data-test-id="remove_admin"
                      onClick={async () =>
                        await addOrRemoveAdmin({
                          type: "REMOVE_ADMIN",
                          userId: userH.id,
                        })
                      }
                    >
                      Eliminar admin
                    </button>
                  )}

                  {removeToChat && (
                    <button
                      data-test-id="remove_user"
                      onClick={() =>
                        addOrRemoveParticipant({
                          type: "REMOVE_USER",
                          participants: [{ userId: userH.id }],
                          chatId: chat.id,
                          removedByAdmin: true,
                        })
                      }
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const ParticipantsList = ({
    data,
    subscribe,
  }: {
    data: UserFragment[];
    subscribe: Function;
  }) => {
    useEffect(() => {
      subscribe();
    });

    return (
      <>
        {data && me?.role === "ADMIN" && (
          <div className="mt-5">
            <h3 className="my-2 font-bold">Invitar al grupo</h3>

            {data?.length === 0 ? (
              <p className="text-sm">No hay usuarios para invitar</p>
            ) : (
              <Formik
                initialValues={{
                  participants: [] as Array<{ id: string; name: string }>,
                }}
                onSubmit={(values) =>
                  addOrRemoveParticipant({
                    type: "ADD_USER",
                    chatId: chat.id,
                    participants: values.participants.map((v) => ({
                      userId: v.id,
                    })),
                  })
                }
              >
                {({ values }) => (
                  <Form data-test-id="participants-form" className="space-y-3">
                    <FieldArray
                      name="participants"
                      render={(render) => (
                        <InviteToGroup
                          data={data}
                          render={render}
                          participants={values.participants}
                        />
                      )}
                    />
                    {values.participants.length > 0 ? (
                      <div className="mt-5">
                        <button
                          type="submit"
                          className="w-full px-5 py-2 rounded-md bg-green1 bg-opacity-20 font-white"
                        >
                          Invitar a
                          <span className="text-green1 font-bold px-1">
                            {values.participants.length <= 1
                              ? `${values.participants.map(({ name }) => name)}`
                              : `${values.participants
                                  .slice(0, -1)
                                  .map(({ name }) => name)
                                  .join(", ")} y ${values.participants
                                  .slice(-1)
                                  .map(({ name }) => name)}`}
                          </span>
                          al grupo
                        </button>
                      </div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            )}
          </div>
        )}
      </>
    );
  };
  return (
    <>
      {!loading && user && me ? (
        <motion.section
          data-test-id="details_group"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          exit={{ width: "0%" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col absolute top-0 right-0 h-full bg-black1"
        >
          <TopComponent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { delay: 0, duration: 0.3 },
              }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex py-2 space-x-3"
            >
              <button onClick={() => setWindowRight("ChatActivo")}>
                <IconMd Icon={XIcon} />
              </button>
              <p>Info del grupo</p>
            </motion.div>
          </TopComponent>

          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pb-5 flex flex-col space-y-5 overflow-y-scroll h-full"
          >
            <div className="mt-5 text-center">
              <div className="relative w-32 h-32 mx-auto mb-1">
                <Image
                  src={chat.image}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <h1>{chat.name}</h1>
              <h3>{chat?.description}</h3>
              <p>Grupo - {chat?.participants.length} participantes</p>

              <div className="py-2 my-3 bg-gray3">
                <p>
                  Grupo creado por
                  <span className="text-green1"> {chat.owner.name}</span>{" "}
                  <span className="text-xs">
                    #{chat.owner.id.split("-").slice(3)}
                  </span>
                </p>
                <p className="text-sm">{formatDate(chat?.createdAt)}</p>
              </div>
            </div>

            <div className="px-5">
              <h3 className="my-2 font-bold">Participantes</h3>

              <div className="pr-2">
                <div
                  data-test-id="participants-list"
                  className="grid grid-cols-1 gap-x-2 gap-y-4 "
                >
                  <Participants
                    data={data!.findParticipants}
                    subscribe={() =>
                      subscribeToUpdateParticipants({
                        id: chat.id,
                        subscribe: subscribeToMoreParticipants,
                      })
                    }
                  />
                </div>
              </div>

              {dataUsers && (
                <ParticipantsList
                  data={dataUsers!.allUsersToInvite}
                  subscribe={() =>
                    subscribeToMoreUsersToInvite({
                      id: chat.id,
                      subscribe: subscribeToMoreUsers,
                    })
                  }
                />
              )}

              <div className="mt-5">
                <ButtonOne
                  data-test-id="details-group-button"
                  onClick={() => {
                    user.id === chat.owner.id
                      ? removeChat(chat.id)
                      : addOrRemoveParticipant({
                          type: "REMOVE_USER",
                          participants: [{ userId: user.id }],
                          chatId: chat.id,
                        });
                    setWindowRight("ChatInactivo");
                  }}
                >
                  {user.id === chat.owner.id
                    ? "Eliminar grupo"
                    : "Salir del grupo"}
                </ButtonOne>
              </div>
            </div>
          </motion.section>
        </motion.section>
      ) : null}
    </>
  );
};
