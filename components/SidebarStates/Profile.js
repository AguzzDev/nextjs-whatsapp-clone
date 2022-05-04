import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { imageToBase64 } from "utils/imageToBase64"
import AvatarEditor from "react-avatar-editor"
import { IconMd } from "components/Icons"
import { PencilIcon } from "@heroicons/react/solid"
import API from "lib/api"
import { userCookie } from "utils/userCookie"
import { useSidebar } from "context/SidebarContext"

export const Profile = () => {
  const user = userCookie()
  const [edit, setEdit] = useState(false)
  const [preview, setPreview] = useState(user?.image)

  const imageRef = useRef()
  const bioRef = useRef()
  const { setSidebar } = useSidebar()

  const saveChanges = async () => {
    const { data } = await API.put("/user/updateUser", {
      id: user._id,
      bio: bioRef?.current?.value === "" ? null : bioRef?.current?.value,
      image: preview,
    })
    setEdit(false)

    window.localStorage.setItem("profile", JSON.stringify(data))
    setSidebar(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col space-y-5 pt-10 items-center"
    >
      <div className="w-32 h-32 rounded-full relative">
        <div className="absolute top-0 w-full h-full">
          <AvatarEditor
            image={preview}
            width={130}
            height={130}
            border={0}
            scale={1}
            rotate={0}
          />
        </div>
        <input
          className="opacity-0 z-50 w-full h-full"
          ref={imageRef}
          onChange={() =>
            imageToBase64(imageRef.current.files[0]).then((data) =>
              setPreview(data)
            )
          }
          type="file"
        />
      </div>
      <h2>{user?.name}</h2>
      <div className="flex space-x-3">
        {edit ? (
          <input ref={bioRef} placeholder="Cambia tu descripcion" />
        ) : (
          <h2>{user?.bio}</h2>
        )}
        <button onClick={() => setEdit(!edit)}>
          <IconMd Icon={PencilIcon} />
        </button>
      </div>

      <button
        className="bg-green1 rounded-md px-10 py-3 text-white font-bold"
        onClick={() => saveChanges()}
      >
        Guardar
      </button>
    </motion.div>
  )
}
