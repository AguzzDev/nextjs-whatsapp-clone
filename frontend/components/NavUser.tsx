import { UserType } from "interface"
import Image from "next/image"
import { userCookie } from "utils/userCookie"
import { Avatar } from "./Avatar"

import { DropdownMenuNavUser } from "./Dropdown"

export function NavUser() {
  const user = userCookie() as UserType

  return (
    <div className="flex flex-row justify-between items-center py-3 px-5 bg-gray1 select-none my-auto">
      <div className="flex items-center space-x-3">
        <Avatar img={user.image} title={user.name} />
      </div>
      <div className="flex flex-row space-x-5 items-center">
        <div className="hover:bg-gray-700 rounded-full p-1 items-center flex">
          <Image
            src="/navuser1.svg"
            height={25}
            width={25}
            className="cursor-pointer"
          />
        </div>

        <DropdownMenuNavUser />
      </div>
    </div>
  )
}
