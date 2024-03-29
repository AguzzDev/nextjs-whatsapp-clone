import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";

import { Menu } from "@headlessui/react";
import MenuIcon from "public/MenuIcon";
import { useChat } from "context/ChatContext";
import { useLogoutMutation } from "generated/graphql";
import { useGlobalState } from "context/GlobalStateContext";

interface NavItemsProps {
  handler?: () => void;
  title?: string;
}

export function DropdownMenuNavUser() {
  const { setSidebar, setWindowRight } = useGlobalState();
  const router = useRouter();

  const [logout] = useLogoutMutation();

  const Logout = async () => {
    const cookies = parseCookies();

    for (const cookieName in cookies) {
      destroyCookie(null, cookieName);
    }
    await logout();
    router.reload();
  };

  const NavItems = ({ handler, title }: NavItemsProps): JSX.Element => {
    return (
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handler}
            className={`py-3 px-5 ${active && "bg-gray3 cursor-pointer"}`}
          >
            {title}
          </button>
        )}
      </Menu.Item>
    );
  };

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
        <NavItems title="Crear sala" handler={() => setSidebar(1)} />
        <NavItems title="Perfil" handler={() => setSidebar(2)} />
        <NavItems
          title="Fondo de pantalla"
          handler={() => {
            setSidebar(3);
            setWindowRight("PreviewBackground");
          }}
        />
        <NavItems title="Cerrar sesión" handler={() => Logout()} />
      </Menu.Items>
    </Menu>
  );
}
export function DropdownMenuMenu({ roomActive }: { roomActive: string }) {
  const { removeChat } = useChat();
  const { setWindowRight } = useGlobalState();

  return (
    <Menu as="div">
      <Menu.Button data-test-id="group-options">
        <MenuIcon />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 flex flex-col top-14 text-gray4 bg-gray1">
        <Menu.Item data-test-id="delete-group">
          {({ active }) => (
            <a
              onClick={async () => {
                await removeChat({ removeChatId: roomActive });
                setWindowRight("ChatInactivo");
              }}
              className={`p-3 ${active && "bg-gray3 cursor-pointer"}`}
            >
              Eliminar Chat
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
