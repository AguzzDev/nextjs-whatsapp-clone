import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import { Menu } from "@headlessui/react"
import MenuIcon from "public/MenuIcon"
import { useSidebar } from "../context/SidebarContext"
import { destroyCookie } from "nookies"
import { useRemoveChatMutation } from "generated/graphql"

interface NavItemsProps {
  handler?: () => void
  title?: string
  test?: string
}

export function DropdownMenuNavUser() {
  const { setSidebar, setWindowRight } = useSidebar()
  const router = useRouter()

  const Logout = () => {
    destroyCookie(null, "areUser")
    destroyCookie(null, "userCookie")
    router.reload()
  }

  const NavItems = ({ handler, title, test }: NavItemsProps): JSX.Element => {
    return (
      <Menu.Item>
        {({ active }) => (
          <button
            data-test-id={test}
            onClick={handler}
            className={`py-3 px-5 ${active && "bg-black1 cursor-pointer"}`}
          >
            {title}
          </button>
        )}
      </Menu.Item>
    )
  }

  return (
    <Menu as="div">
      <Menu.Button
        data-test-id="user-nav-options"
        className="flex items-center"
      >
        <Image
          src="/navuser3.svg"
          height={25}
          width={25}
          className="cursor-pointer"
        />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 flex flex-col list-none cursor-pointer text-gray4 top-14 bg-gray1">
        <NavItems
          test="create-group"
          title="Crear sala"
          handler={() => setSidebar(1)}
        />
        <NavItems title="Perfil" handler={() => setSidebar(2)} />
        <NavItems
          title="Fondo de pantalla"
          handler={() => {
            setSidebar(3)
            setWindowRight("PreviewBackground")
          }}
        />
        <NavItems title="Cerrar sesión" handler={() => Logout()} />
      </Menu.Items>
    </Menu>
  )
}
export function DropdownMenuMenu({ roomActive }) {
  const [removeChat] = useRemoveChatMutation()
  const { setWindowRight } = useSidebar()

  return (
    <Menu as="div">
      <Menu.Button>
        <MenuIcon />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 flex flex-col top-14 text-gray4 bg-gray1">
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={async () => {
                await removeChat({ variables: { removeChatId: roomActive } })
                setWindowRight("ChatInactivo")
              }}
              className={`p-3 ${active && "bg-black1 cursor-pointer"}`}
            >
              Eliminar Chat
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
