import Image from "next/image";

import { Avatar } from "./Avatar";

import { DropdownMenuNavUser } from "./Dropdown";
import { userCookie } from "utils/userCookie";

export function NavUser() {
  const { user } = userCookie();

  return (
    <section className="h-18 flex flex-row justify-between items-center py-3 px-5 bg-gray1 select-none my-auto">
      <div className="flex items-center space-x-3">
        <Avatar img={user?.image} />
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
    </section>
  );
}
