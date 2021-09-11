import Image from "next/image";

import { DropdownMenuNavUser } from "./Dropdown"
import { DrawerNewChatNavUser, DrawerPerfilNavUser } from "./Drawer"

export function NavUser() {
    return (
        <>
            <div className="flex flex-row justify-between items-center py-3 px-5 bg-gray3 select-none my-auto">
                <div>
                    <DrawerPerfilNavUser />
                </div>
                <div className="flex flex-row space-x-5 items-center">
                    <div className="hover:bg-gray-700 rounded-full p-1 items-center flex">
                        <Image src="/navuser1.svg" height={25} width={25} className="cursor-pointer" />
                    </div>
                    <DrawerNewChatNavUser />
                    <DropdownMenuNavUser />
                </div>
            </div>
        </>
    )
}
