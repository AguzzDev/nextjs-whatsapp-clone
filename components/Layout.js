import Head from "next/head"
import { AnimatePresence } from "framer-motion"

import { ListaChat } from "components/ListaChats"
import { NavUser } from "components/NavUser"
import { useSidebar } from "context/SidebarContext"
import { Profile } from "components/SidebarStates/Profile"
import { CreateRoom } from "components/SidebarStates/CreateRoom"
import { LayoutState } from "components/SidebarStates/LayoutState"
import { BackgroundPicture } from "components/SidebarStates/BackgroundPicture"

export const Layout = ({ title, children }) => {
  const { sidebar } = useSidebar()

  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <link rel="icon" href="/whatsappLogo.svg" />
      </Head>

      <div className="grid place-content-center h-screen">
        <div style={{ width: "87vw", height: "95vh" }}>
          <div className="flex flex-row h-full w-full">
            <div className="relative flex flex-col w-3/6 border-r border-border">
              <NavUser />
              <ListaChat />

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
            </div>
            <div className="flex flex-row">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
