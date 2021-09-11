import { DesktopComputerIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { IconSm } from "./Icons"

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
