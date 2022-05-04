import { motion } from "framer-motion"
import { BackgroundPictureData } from "data/imagesBackground"
import Image from "next/image"
import { useSidebar } from "context/SidebarContext"
import { useState } from "react"
import API from "lib/api"
import { userCookie } from "utils/userCookie"

export const BackgroundPicture = () => {
  const { backgroundImage, setBackgroundImage, setSidebar, setWindowRight } =
    useSidebar()

  const user = userCookie()
  const [hover, setHover] = useState(null)

  const selectBackground = async () => {
    const { data } = await API.put("/user/updateUser", {
      id: user._id,
      backgroundChat: backgroundImage,
    })
    window.localStorage.setItem("profile", JSON.stringify(data))

    setSidebar(0)
    setWindowRight(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col px-5"
    >
      <div className="grid grid-cols-3 gap-5 mt-5" style={{ height: "75vh" }}>
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

      <div className="mt-5 text-center">
        <button onClick={() => selectBackground()}>Usar imagen</button>
      </div>
    </motion.div>
  )
}
