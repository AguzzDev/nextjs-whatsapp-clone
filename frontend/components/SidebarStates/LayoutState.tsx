import React from "react"
import { ChevronLeftIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"

import { IconMd } from "components/Icons"
import { useSidebar } from "context/SidebarContext"

export const LayoutState = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  const { sidebar, setSidebar, setWindowRight } = useSidebar()

  const handleAction = () => {
    if (sidebar === 3) {
      setWindowRight("ChatInactivo")
      setSidebar(0)
    }
    setSidebar(0)
  }

  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      exit={{ width: "0%" }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 left-0 z-50 w-full h-full bg-black1 overflow-y-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-3 px-3 py-4 bg-gray1"
      >
        <button onClick={() => handleAction()}>
          <IconMd Icon={ChevronLeftIcon} props="text-white" />
        </button>

        <h1>{title}</h1>
      </motion.div>

      {children}
    </motion.div>
  )
}
