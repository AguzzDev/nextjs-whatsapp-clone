import { useSidebar } from "context/SidebarContext"
import Image from "next/image"

export const PreviewBackground = () => {
  const { backgroundImage } = useSidebar()

  return (
    <div className="flex flex-col select-none h-full w-screen">
      <div
        className="flex bg-gray1 px-5 select-none"
        style={{ paddingTop: "18px", paddingBottom: "18px" }}
      >
        <h1>Vista previa</h1>
      </div>
      <div style={{ height: "90vh" }} className="relative">
        <Image src={backgroundImage} layout="fill" className="opacity-60" />
      </div>
      <div
        className="flex items-end h-20 bg-gray1 px-5 select-none"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      />
    </div>
  )
}
