import { DesktopComputerIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { Avatar } from "./Avatar"
import { IconSm } from "./Icons"

import ClipIcon from "../public/ClipIcon"
import MicIcon from "../public/MicIcon"
import SmileIcon from "../public/SmileIcon"
import SearchIcon from "../public/SearchIcon"
import MenuIcon from "../public/MenuIcon"

export function ChatInactivo() {
    return (
        <>
            <div className="flex flex-col bg-gray1 select-none h-full">
                <div className="flex flex-col text-center justify-center items-center" style={{ height: "90%" }}>
                    <div className="w-3/6 mx-auto text-gray2 mt-20 mb-10 border-b border-gray-500">
                        <Image src="/chatimagemain.jpg" height={250} width={250} className="rounded-full" />
                        <h1 className="text-3xl my-5">Mantén tu teléfono conectado</h1>
                        <p className="text-sm mb-10">WhatsApp se conecta a tu teléfono para sincronizar los mensajes. Para reducir el consumo de tus datos, conecta tu teléfono a una red Wi-Fi</p>
                    </div>
                    <div className="flex flex-row text-sm text-gray2 mx-auto">
                        <div className="my-auto">
                            <IconSm Icon={DesktopComputerIcon} className="text-gray2" />
                        </div>
                        <p className="mx-2">WhatsApp está disponible para Windows.</p>
                        <span className="text-green1">Obtenlo aquí.</span>
                    </div>
                </div>
                <div className="flex items-end border-green1 w-full" style={{ height: "10%", borderBottomWidth: "8px" }}></div>
            </div>
        </>
    )
}
export function ChatActivo() {
    return (
        <>
            <div className="flex flex-col  select-none h-full w-full" >

                <div className="flex justify-between items-center my-auto bg-gray3 py-4 px-5 select-none">
                    {/* Left */}
                    <div className="flex cursor-pointer">
                        <Avatar />

                        <div className="text-white font-medium flex items-center ml-3">
                            <h1>Name</h1>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="flex space-x-5">
                        <SearchIcon />
                        <MenuIcon />
                    </div>

                </div>

                <div className="relative bg-backgroundChat opacity-10 w-full h-full"></div>

                <div className="flex justify-between items-center  bg-gray3 py-4 px-5">
                    {/* Left */}
                    <div className="flex space-x-4">
                        <SmileIcon />
                        <ClipIcon />
                    </div>
                    {/* Center */}
                    <div className="bg-gray6 rounded-full w-full py-2 mx-3">
                        <input
                            className="outline-none bg-transparent pl-4 text-white"
                            placeholder="Escribe tu mensaje aqui"
                        >
                        </input>
                    </div>
                    {/* Right */}
                    <div>
                        <MicIcon />
                    </div>
                </div>
            </div>
        </>
    )
}
