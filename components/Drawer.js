import Image from 'next/image';
import { useEffect } from 'react';
import { Avatar } from "./Avatar";

import { ArrowLeftIcon, CheckIcon, PencilIcon, SearchIcon } from '@heroicons/react/solid'
import { IconMd, IconSm } from './Icons';

export function DrawerNewChatNavUser() {
    useEffect(() => {
        const drawer = document.getElementById("nav-drawer")
        const button = document.getElementById("nav-button-drawer")
        const buttontwo = document.getElementById("nav-buttonclose")

        button.addEventListener("click", () => {
            drawer.classList.add("activonavdrawer")
        })
        buttontwo.addEventListener("click", () => {
            drawer.classList.remove("activonavdrawer")
        })
    }, [])

    return (
        <div>
            <button id="nav-button-drawer" className="hover:bg-gray-700 rounded-full p-1 items-center flex">
                <Image src="/navuser2.svg" height={25} width={25} className="cursor-pointer" />
            </button>

            <div id="nav-drawer" className="nav-drawer">
                <div className="flex flex-col pt-14 pb-4 list-none text-gray2 bg-gray6">
                    <div className="flex flex-row my-auto" style={{ paddingLeft: "33px" }}>
                        <button id="nav-buttonclose" >
                            <IconMd Icon={ArrowLeftIcon} />
                        </button>
                        <h1 className="pl-5 font-bold text-lg">Nuevo Chat</h1>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-row bg-black1 py-2 border-b border-gray-600">
                    <div className="flex flex-row w-11/12 mx-auto rounded-2xl bg-gray6" style={{ padding: "8px" }}>
                        <div className="my-auto pl-3 pr-5 text-gray4">
                            <IconSm Icon={SearchIcon} />
                        </div>
                        <input className="bg-gray6 w-full text-gray4 text-sm outline-none" placeholder="Buscar contactos"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function DrawerPerfilNavUser() {
    useEffect(() => {
        const drawer = document.getElementById("nav-drawer2")
        const button = document.getElementById("nav-button-drawer2")
        const buttontwo2 = document.getElementById("nav-buttonclose2")
        const editarInput = document.getElementById("editar-boton")
        const editarInput2 = document.getElementById("editar-boton-2")
        const guardarInput = document.getElementById("guardar-boton")
        const guardarInput2 = document.getElementById("guardar-boton-2")
        const editarActivo = document.getElementById("editar-activo")
        const editarActivo2 = document.getElementById("editar-activo-2")


        button.addEventListener("click", () => {
            drawer.classList.add("activonavdrawer2")
        })
        buttontwo2.addEventListener("click", () => {
            drawer.classList.remove("activonavdrawer2")
        })
        //Boton Editar
        editarInput.addEventListener("click", () => {
            editarInput.classList.add("inactivo")
            guardarInput.classList.add("activo")
            editarActivo.removeAttribute("disabled")
        })
        editarInput2.addEventListener("click", () => {
            editarInput2.classList.add("inactivo")
            guardarInput2.classList.add("activo")
            editarActivo.removeAttribute("disabled")
        })
        guardarInput.addEventListener("click", () => {
            editarInput.classList.add("activo")
            guardarInput.classList.add("inactivo")
            editarActivo2.setAttribute("disabled")
        })
        guardarInput2.addEventListener("click", () => {
            editarInput2.classList.add("activo")
            guardarInput2.classList.add("inactivo")
            editarActivo2.setAttribute("disabled")
        })


    }, [])

    return (
        <div>
            <button id="nav-button-drawer2" >
                <Avatar />
            </button>

            <div id="nav-drawer2" className="nav-drawer">
                <div className="flex flex-col pt-14 pb-4 list-none text-gray2 bg-gray6">
                    <div className="flex flex-row my-auto" style={{ paddingLeft: "33px" }}>
                        <button id="nav-buttonclose2" >
                            <IconMd Icon={ArrowLeftIcon} />
                        </button>
                        <h1 className="pl-5 font-bold text-lg">Perfil</h1>
                    </div>
                    <div></div>
                </div>
                <div className="flex flex-col bg-black1 h-full">
                    <div className="flex justify-center items-center h-2/6">
                        <div className="w-48 h-48 rounded-full bg-white"></div>
                    </div>
                    <div className="p-8 h-2/4">
                        <div className="flex flex-col">
                            <label className="text-green1 text-sm mb-3">Tu nombre</label>
                            <div className="flex flex-row justify-between border-b border-gray-700">
                                <input id="editar-activo" disabled autoComplete="off" className="bg-black1 outline-none text-gray2 pb-1 w-11/12"></input>
                                <div className="text-gray2 mb-1 p-1 rounded-full hover:bg-gray3" title="Editar" id="editar-boton">
                                    <IconMd Icon={PencilIcon} />
                                </div>
                                <div className="opacity-0 text-gray2 mb-1 p-1 rounded-full hover:bg-gray3" title="Editar" id="guardar-boton">
                                    <IconMd Icon={CheckIcon} />
                                </div>
                            </div>
                            <p className="text-sm mt-3 text-gray2">Este no es tu nombre de usuario ni un PIN.Este nombre será visible para tus contactos de WhatsApp</p>
                        </div>
                        <div className="flex flex-col mt-10">
                            <label className="text-green1 text-sm mb-3">Info.</label>
                            <div className="flex flex-row justify-between border-b border-gray-700">
                                <input id="editar-activo-2" disabled autoComplete="off" className="bg-black1 outline-none text-gray2 pb-1 w-11/12"></input>
                                <div className="text-gray2 mb-1 p-1 rounded-full hover:bg-gray3" title="Editar" id="editar-boton-2">
                                    <IconMd Icon={PencilIcon} />
                                </div>
                                <div className="opacity-0 text-gray2 mb-1 p-1 rounded-full hover:bg-gray3" title="Editar" id="guardar-boton-2">
                                    <IconMd Icon={CheckIcon} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
