import Image from 'next/image';
import { useEffect } from 'react';

export function DropdownMenuNavUser() {
    useEffect(() => {
        const dropdown = document.getElementById("nav-dropdown")
        const button = document.getElementById("nav-button-dropdown")

        button.addEventListener("click", () => {
            dropdown.classList.add("activonavdropdown")
        })
        dropdown.addEventListener("mouseleave", () => {
            dropdown.classList.remove("activonavdropdown")
        })
    }, [])
    return (
        <div>
            <button id="nav-button-dropdown" className="hover:bg-gray-700 rounded-full p-1 items-center flex">
                <Image src="/navuser3.svg" height={25} width={25} className="cursor-pointer" />
            </button>

            <div id="nav-dropdown" className="nav-dropdown">
                <div className="flex flex-col py-2 list-none text-gray4 cursor-pointer">
                    <li className="hover:bg-black1 pl-5 py-3">Nuevo grupo</li>
                    <li className="hover:bg-black1 pl-5 py-3">Crear una sala</li>
                    <li className="hover:bg-black1 pl-5 py-3">Perfil</li>
                    <li className="hover:bg-black1 pl-5 py-3">Archivados</li>
                    <li className="hover:bg-black1 pl-5 py-3">Destacados</li>
                    <li className="hover:bg-black1 pl-5 py-3">Configuración</li>
                    <li className="hover:bg-black1 pl-5 py-3">Cerrar sesión</li>
                </div>
            </div>
        </div>
    )
}
