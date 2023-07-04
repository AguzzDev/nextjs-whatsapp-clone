import React from "react"
import { DesktopComputerIcon } from "@heroicons/react/solid"
import Image from "next/image"

import { IconSm } from "components/Icons"

export function ChatInactivo() {
  return (
    <div className="flex flex-col bg-white1 dark:bg-gray1 select-none h-full w-screen">
      <div
        className="flex flex-col text-center justify-center items-center"
        style={{ height: "90%" }}
      >
        <div className="w-7/12 mx-auto dark:text-gray2 mt-20 mb-10 border-b border-border">
          <Image
            src="/chatimagemain.jpg"
            height={350}
            width={350}
            className="object-cover rounded-full"
          />
          <h1 className="text-4xl my-5 font-thin text-white">
            Mantén tu teléfono conectado
          </h1>
          <p className="text-sm mb-10 text-grayfont3">
            WhatsApp se conecta a tu teléfono para sincronizar los mensajes.
            Para reducir el consumo de tus datos, conecta tu teléfono a una red
            Wi-Fi
          </p>
        </div>
        <div className="flex flex-row text-sm text-grayfont3 dark:text-gray2 mx-auto">
          <div className="my-auto">
            <IconSm Icon={DesktopComputerIcon} className="text-gray2" />
          </div>
          <p className="mx-2 text-grayfont3">
            WhatsApp está disponible para Windows.
          </p>
          <span className="text-green1">Obtenlo aquí.</span>
        </div>
      </div>
      <div
        className="flex items-end border-green1 w-full"
        style={{ height: "10%", borderBottomWidth: "8px" }}
      ></div>
    </div>
  )
}
