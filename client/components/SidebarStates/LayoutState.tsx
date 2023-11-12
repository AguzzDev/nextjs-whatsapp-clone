import { ChevronLeftIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";

import animations from "config/animations";
import { IconMd } from "components/Icons";
import { ChildrenProps } from "interface";
import { useGlobalState } from "context/GlobalStateContext";

interface Props extends ChildrenProps {
  title: string;
}
export const LayoutState = ({ children, title }: Props) => {
  const sidebarAnimations = animations.sidebar;
  const { sidebar, setSidebar, setWindowRight } = useGlobalState();

  const handleAction = () => {
    if (sidebar === 3) {
      setWindowRight("ChatInactivo");
    }

    setSidebar(0);
  };

  return (
    <motion.div
      data-test-id="sidebar-container"
      {...sidebarAnimations.container}
      className="absolute top-0 left-0 z-50 max-h-screen overflow-y-hidden bg-black1"
    >
      <div className="px-3 h-16 bg-gray1">
        <motion.div
          {...sidebarAnimations.header}
          className="flex h-full items-center space-x-3"
        >
          <button onClick={() => handleAction()}>
            <IconMd Icon={ChevronLeftIcon} props="text-white" />
          </button>

          <h4>{title}</h4>
        </motion.div>
      </div>

      <motion.div {...sidebarAnimations.content} className="h-screen">
        {children}
      </motion.div>
    </motion.div>
  );
};
