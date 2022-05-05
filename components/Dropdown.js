import Image from "next/image"
import { Menu } from "@headlessui/react"
import MenuIcon from "public/MenuIcon"
import { useRouter } from "next/router"
import { useSidebar } from "../context/SidebarContext"
import { useSockets } from "context/SocketContext"

export function DropdownMenuNavUser() {
  const { setSidebar, setWindowRight } = useSidebar()
  const router = useRouter()

  const Logout = () => {
    window.localStorage.removeItem("profile")
    router.push("/")
  }

  const NavItems = ({ handler, title, test }) => {
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
      <Menu.Items className="flex flex-col list-none text-gray4 cursor-pointer absolute top-14 right-0 z-50 bg-gray1">
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
            setWindowRight(2)
          }}
        />
        <NavItems title="Cerrar sesión" handler={() => Logout()} />
      </Menu.Items>
    </Menu>
  )
}
export function DropdownMenuMenu({ roomActive }) {
  const { removeRoom } = useSockets()

  return (
    <Menu>
      <Menu.Button>
        <MenuIcon />
      </Menu.Button>
      <Menu.Items className="absolute transform -translate-x-5 xl:-translate-x-16 translate-y-11 z-50 flex flex-col text-gray4 bg-gray1">
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={() => removeRoom(roomActive)}
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
