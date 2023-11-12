import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import { NavUser } from "components/NavUser";
import { Profile } from "components/SidebarStates/Profile";
import { CreateRoom } from "components/SidebarStates/CreateRoom";
import { LayoutState } from "components/SidebarStates/LayoutState";
import { BackgroundPicture } from "components/SidebarStates/BackgroundPicture";
import { ChatList } from "./ChatSection/ChatList";
import { useGlobalState } from "context/GlobalStateContext";

export const Layout = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const { sidebar } = useGlobalState();
  return (
    <>
      <Head>
        <title>{title} Whatsapp Clone</title>
        <link rel="icon" href="/whatsappLogo.svg" />
      </Head>

      <main className="flex items-center justify-center h-screen">
        <section className="relative flex flex-col w-2/6 border-r border-border h-full">
          <NavUser />
          <ChatList />

          <AnimatePresence>
            {sidebar === 1 ? (
              <LayoutState title="Crear grupo">
                <CreateRoom />
              </LayoutState>
            ) : sidebar === 2 ? (
              <LayoutState title="Mi perfil">
                <Profile />
              </LayoutState>
            ) : sidebar === 3 ? (
              <LayoutState title="Cambiar fondo de pantalla">
                <BackgroundPicture />
              </LayoutState>
            ) : null}
          </AnimatePresence>
        </section>

        <section className="flex flex-row w-4/6 h-full">{children}</section>
      </main>
    </>
  );
};
