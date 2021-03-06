import Head from "next/head"

import Login from "components/Login"
import { useSockets } from "context/SocketContext"
import { Layout } from "components/Layout"
import { ChatActivo } from "components/WindowRight/ChatActivo"
import { ChatInactivo } from "components/WindowRight/ChatInactivo"
import { PreviewBackground } from "components/WindowRight/PreviewBackground"
import { useSidebar } from "context/SidebarContext"
import { userCookie } from "utils/userCookie"
import { useEffect, useState } from "react"

export default function Inicio() {
  const user = userCookie()
  const { windowRight } = useSidebar()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <>
        {!loading && (
          <main>
            {!user ? (
              <Login />
            ) : (
              <Layout>
                {windowRight === 0 ? (
                  <ChatInactivo />
                ) : windowRight === 1 ? (
                  <ChatActivo />
                ) : windowRight === 2 ? (
                  <PreviewBackground />
                ) : null}
              </Layout>
            )}
          </main>
        )}
      </>
    </>
  )
}
