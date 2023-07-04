import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

interface Props {
  sidebar: number
  windowRight: string
  backgroundImage: string
  setSidebar: Dispatch<SetStateAction<number>>
  setWindowRight: Dispatch<SetStateAction<string>>
  setBackgroundImage: Dispatch<SetStateAction<string>>
}

export const SidebarContext = createContext<Props>({
  sidebar: 0,
  windowRight: "",
  backgroundImage: "",
  setSidebar: () => 0,
  setWindowRight: () => "",
  setBackgroundImage: () => "",
})

const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState<number>(0)
  const [backgroundImage, setBackgroundImage] = useState<string>("")
  const [windowRight, setWindowRight] = useState<string>("ChatInactivo")

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        setSidebar,
        windowRight,
        setWindowRight,
        backgroundImage,
        setBackgroundImage,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
export default SidebarProvider
