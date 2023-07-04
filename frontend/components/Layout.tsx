import React from "react"
import Head from "next/head"
import { AnimatePresence } from "framer-motion"

import { NavUser } from "components/NavUser"
import { useSidebar } from "context/SidebarContext"
import { Profile } from "components/SidebarStates/Profile"
import { CreateRoom } from "components/SidebarStates/CreateRoom"
import { LayoutState } from "components/SidebarStates/LayoutState"
import { BackgroundPicture } from "components/SidebarStates/BackgroundPicture"
import { ListaChat } from "./ChatSection/ListaChats"

export const Layout = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  const { sidebar } = useSidebar()

  return (
    <>
      <Head>
        <title>{title} Whatsapp Clone</title>
        <link rel="icon" href="/whatsappLogo.svg" />
      </Head>

      <main className="flex items-center justify-center h-screen">
        <div className="flex flex-row overflow-hidden max-w-fullW max-h-fullH min-w-fullW min-h-fullH">
          <div className="relative flex flex-col w-2/6 border-r border-border">
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
          <div className="flex flex-row w-4/6">{children}</div>
        </div>
      </main>
    </>
  )
}
