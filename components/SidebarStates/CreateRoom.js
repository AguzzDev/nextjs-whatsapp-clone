import { useRef, useState } from "react"
import { motion } from "framer-motion"

import AvatarEditor from "react-avatar-editor"
import { imageToBase64 } from "utils/imageToBase64"
import { useSockets } from "context/SocketContext"
import { useSidebar } from "context/SidebarContext"
import { userCookie } from "utils/userCookie"

export const CreateRoom = () => {
  const user = userCookie()
  const [preview, setPreview] = useState("/groupIcon.png")
  const [participants, setParticipants] = useState([user.name])

  const { createRoom } = useSockets()
  const { setSidebar } = useSidebar()

  const nameRef = useRef()
  const descRef = useRef()
  const imageRef = useRef()
  const participantRef = useRef()

  const addParticipant = (e) => {
    e.preventDefault()
    if (!participantRef.current.value) return
    if (participants.includes(participantRef.current.value)) return

    setParticipants([...participants, participantRef.current.value])
    participantRef.current.value = ""
  }

  const handleCreate = () => {
    if (!nameRef.current.value || participants.length === 0) return

    createRoom({
      name: nameRef.current.value,
      desc: descRef.current.value,
      image: preview,
      participants,
    })
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

      <input
        id="input-name-group"
        ref={nameRef}
        placeholder="Nombre del grupo"
      />
      <input
        id="input-desc-group"
        ref={descRef}
        placeholder="Descripción del grupo"
      />

      <form onSubmit={addParticipant}>
        <input
          id="input-invite-group"
          ref={participantRef}
          autoComplete="off"
          placeholder="Escribe el nombre del que quieras invitar"
        />
        <button type="submit">Invitar</button>
      </form>

      <div>
        {participants.map((participant, i) => (
          <div key={i}>
            <h2>{participant === user.name ? "Tú" : participant}</h2>
          </div>
        ))}
      </div>
      <button
        className="bg-green1 rounded-md px-10 py-3 text-white font-bold"
        onClick={() => handleCreate()}
      >
        Guardar
      </button>
    </motion.div>
  )
}
