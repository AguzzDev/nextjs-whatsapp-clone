import { createContext, useContext, useState } from "react"
import { BackgroundPictureData } from "data/imagesBackground"

const SidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(0)
  const [windowRight, setWindowRight] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState(
    BackgroundPictureData[0].image
  )

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        setSidebar,
        backgroundImage,
        setBackgroundImage,
        windowRight,
        setWindowRight,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
export default SidebarProvider
