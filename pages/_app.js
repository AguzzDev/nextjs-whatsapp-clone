import "styles/globals.css"
import "styles/scrollbar.css"
import SocketProvider from "context/SocketContext"
import SidebarProvider from "context/SidebarContext"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <SidebarProvider>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </SidebarProvider>
    </SocketProvider>
  )
}

export default MyApp
