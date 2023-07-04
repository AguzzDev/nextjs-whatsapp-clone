import { motion } from "framer-motion"
import Image from "next/image"
import React, { useState } from "react"

import { BackgroundPictureData } from "data/imagesBackground"
import { useSidebar } from "context/SidebarContext"
import { userCookie } from "utils/userCookie"
import { MeDocument, useChangeBackgroundMutation } from "generated/graphql"

export const BackgroundPicture = () => {
  const { setSidebar, setWindowRight, setBackgroundImage, backgroundImage } =
    useSidebar()
  const [hover, setHover] = useState(null)

  const [changeBackground] = useChangeBackgroundMutation()

  const selectBackground = async () => {
    await changeBackground({
      variables: { image: backgroundImage },
      refetchQueries: [{ query: MeDocument }],
    })

    setSidebar(0)
    setWindowRight("ChatInactivo")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <div className="grid grid-cols-3 gap-5 mt-5 px-3 overflow-y-scroll h-3/4">
        {BackgroundPictureData.map(({ name, image }, i) => (
          <button
            className={`${hover === i ? "border-2 border-green1" : null}`}
            key={name}
            onClick={() => {
              setBackgroundImage(image)
              setHover(i)
            }}
          >
            <Image
              alt={name}
              src={image}
              height={400}
              width={300}
              objectFit="cover"
            />
          </button>
        ))}
      </div>

      <div className="mt-5 mx-3">
        <button
          className="w-full text-center py-3 bg-green1 rounded-md font-bold"
          onClick={() => selectBackground()}
        >
          Usar imagen
        </button>
      </div>
    </motion.div>
  )
}
