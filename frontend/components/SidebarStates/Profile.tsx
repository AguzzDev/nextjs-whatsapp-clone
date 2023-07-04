import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { PencilIcon, XIcon } from "@heroicons/react/solid"

import { IconMd } from "components/Icons"
import { userCookie } from "utils/userCookie"
import { useSidebar } from "context/SidebarContext"
import { MeDocument, useChangeProfileMutation } from "generated/graphql"
import Image from "next/image"
import { imageToBase64 } from "utils/imageToBase64"

export const Profile = () => {

  const user = userCookie()
  const { setSidebar } = useSidebar()

  const [preview, setPreview] = useState(user.image)
  const editor = useRef(null)
  const nameRef = useRef(null)
  const bioRef = useRef(null)

  const [changeProfile] = useChangeProfileMutation()

  const saveChanges = async () => {
    await changeProfile({
      variables: {
        name: nameRef?.current?.value ? nameRef?.current?.value : user.name,
        bio: bioRef?.current?.value ? bioRef?.current?.value : user.bio,
        image: preview,
      },
      refetchQueries: [{ query: MeDocument }],
    })

    setSidebar(0)
  }

  const InputField = ({ reference, title, value }) => {
    const [edit, setEdit] = useState(false)

    return (
      <div className="flex space-x-3 w-3/4">
        <div className="flex py-3 px-3 bg-gray1 rounded-md w-full">
          <div className="w-full">
            {!edit ? (
              <p>{value}</p>
            ) : (
              <input
                autoFocus
                disabled={!edit}
                ref={reference === "name" ? nameRef : bioRef}
                placeholder={title}
              />
            )}
          </div>

          <button onClick={() => setEdit(!edit)}>
            {edit ? <IconMd Icon={XIcon} /> : <IconMd Icon={PencilIcon} />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center pt-10 space-y-5"
    >
      <div className="relative w-32 h-32 rounded-full">
        <Image
          src={preview}
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />

        <div className="absolute top-0 flex justify-center items-center w-full h-full">
          <input
            className="w-full h-full opacity-0"
            onChange={async (e) => {
              await imageToBase64(e.target.files[0], (r) => setPreview(r))
            }}
            name="profile-picture"
            type="file"
          />
        </div>
      </div>
      <>
        <InputField
          reference="name"
          value={user.name}
          title="Cambia tu nombre"
        />
        <InputField reference="bio" value={user.bio} title="Cambia tu bio" />
      </>

      <button
        className="px-10 py-3 font-bold text-white rounded-md bg-green1"
        onClick={() => saveChanges()}
      >
        Guardar
      </button>
    </motion.div>
  )
}
