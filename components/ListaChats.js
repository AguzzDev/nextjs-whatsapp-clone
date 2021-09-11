import Image from "next/image";
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/solid'

import { IconSm } from "./Icons";
import { Conversaciones } from "./ChatSection/Conversaciones";

export function ListaChat() {
    return (
        <div className="flex flex-col h-full select-none">
            <div className="flex flex-row py-5 px-5 bg-blue1 cursor-pointer">
                <div className="mr-5">
                    <Image src="/notification.svg" height={45} width={45} className="object-cover" />
                </div>
                <div>
                    <h1 className="text-gray5">Recibe notificaciones de mensajes nuevos</h1>
                    <div className="flex flex-row">
                        <p className="text-gray4 text-sm">Activar notificaciones de escritorio</p>
                        <div className="my-auto text-gray4">
                            <IconSm Icon={ChevronRightIcon} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row bg-black1 py-2 border-b border-gray-600">
                <div className="flex flex-row w-11/12 mx-auto rounded-2xl bg-gray1" style={{ padding: "8px" }}>
                    <div className="my-auto pl-3 pr-5 text-gray4">
                        <IconSm Icon={SearchIcon} />
                    </div>
                    <input className="bg-gray1 w-full text-gray4 text-sm outline-none" placeholder="Busca un chat o inicia uno nuevo"></input>
                </div>
            </div>
            <div className="bg-black1 h-5/6 overflow-y-scroll">
                <Conversaciones />
            </div>
        </div>
    )
}
