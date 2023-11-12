import { ChildrenProps } from "interface";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Props {
  sidebar: number;
  windowRight: string;
  backgroundImage: string;
  setSidebar: Dispatch<SetStateAction<number>>;
  setWindowRight: Dispatch<SetStateAction<string>>;
  setBackgroundImage: Dispatch<SetStateAction<string>>;
}

const GlobalStateContext = createContext<Props>({
  backgroundImage: "",
  sidebar: 0,
  windowRight: "",
  setBackgroundImage: () => {},
  setSidebar: () => {},

  setWindowRight: () => {},
});

const GlobalStateProvider = ({ children }: ChildrenProps) => {
  const [sidebar, setSidebar] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [windowRight, setWindowRight] = useState<string>("ChatInactivo");

  const contextValues = {
    sidebar,
    setSidebar,
    backgroundImage,
    setBackgroundImage,
    windowRight,
    setWindowRight,
  };

  return (
    <GlobalStateContext.Provider value={contextValues}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export default GlobalStateProvider;
