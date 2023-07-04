import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import AvatarEditor from "react-avatar-editor"

import { imageToBase64 } from "utils/imageToBase64"
import { useSidebar } from "context/SidebarContext"
import { InviteToGroup } from "components/UI/InviteToGroup"
import { useDebounce } from "hooks/useDebounce"
import { useAllUsersQuery, useCreateChatMutation } from "generated/graphql"
import { Field, FieldArray, Form, Formik } from "formik"
import { userCookie } from "utils/userCookie"
import Image from "next/image"
import { IconSm } from "components/Icons"
import { TrashIcon, UserAddIcon } from "@heroicons/react/solid"

export const CreateRoom = () => {
  const [img, setImg] = useState("/groupIcon.png")
  const user = userCookie()
  const { setSidebar } = useSidebar()

  const { data } = useAllUsersQuery()
  const [createChat] = useCreateChatMutation()

  const participantRef = useRef()
  const { input } = useDebounce(participantRef)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col w-3/4 h-full mx-auto"
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
          participants: [user.id],
        }}
        onSubmit={async ({ name, description, participants }) => {
          const values = {
            name,
            description,
            image: img,
            participants: participants.map((p) => {
              return {
                userId: p,
              }
            }),
          }
          await createChat({
            variables: values,
          })
          setSidebar(0)
        }}
      >
        {({ values }) => (
          <Form className="h-full pt-5">
            <div>
              <div className="relative w-32 h-32 mx-auto rounded-full">
                <div className="absolute top-0 w-full h-full">
                  <Image
                    src={img}
                    width={130}
                    height={130}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <Field
                  name="image"
                  className="z-50 w-full h-full opacity-0"
                  onChange={async (e) => {
                    await imageToBase64(e.target.files[0], (r) => setImg(r))
                  }}
                  type="file"
                />
              </div>

              <div className="flex flex-col mt-10 mb-3 space-y-5">
                <Field
                  name="name"
                  value={values.name}
                  autoComplete="off"
                  placeholder="Nombre del grupo"
                />
                <Field
                  name="description"
                  value={values.description}
                  autoComplete="off"
                  placeholder="Descripción del grupo"
                />
                <input
                  id="input-invite-group"
                  ref={participantRef}
                  autoComplete="off"
                  placeholder="Invitar a..."
                />
              </div>
            </div>

            <h2 className="font-bold pb-2">Invita a un usuario</h2>
            <div className="flex flex-col space-y-3 h-44 overflow-y-scroll">
              <FieldArray
                name="participants"
                render={(render) => (
                  <InviteToGroup
                    data={data?.allUsers}
                    render={render}
                    participants={values.participants}
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="px-10 py-3 font-bold text-white w-full rounded-md bg-green1 mt-5"
            >
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}
