import React from "react"

import { useSidebar } from "context/SidebarContext"
import Image from "next/image"
import { userCookie } from "utils/userCookie"
import { UserType } from "interface"

export const PreviewBackground = () => {
  const { backgroundImage } = useSidebar()
  const user = userCookie() as UserType

  return (
    <div className="flex flex-col select-none h-full w-screen">
      <div className="flex bg-gray1 px-5 select-none py-4">
        <h1>Vista previa</h1>
      </div>
      <div className="relative h-[90vh]">
        <Image
          src={backgroundImage || user.backgroundImage}
          layout="fill"
          className="opacity-60"
        />
      </div>
      <div className="flex items-end h-20 bg-gray1 px-5 select-none py-4" />
    </div>
  )
}
