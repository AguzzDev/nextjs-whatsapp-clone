import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { useChat } from "context/ChatContext";
import animations from "config/animations";
import { searchGifs } from "utils/searchGifs";
import { IconSm } from "components/Icons";
import SearchIcon from "public/SearchIcon";
import { TextRefProps } from "interface";

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuGifs = ({ setMenu }: Props) => {
  const [listGifs, setListGifs] = useState<string[]>();
  const searchGifRef = useRef<TextRefProps>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { chatId, sendMessage } = useChat();
  const gifsMenu = animations.gifsMenu;

  const searchGif = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      setListGifs([]);
    }
    debounceRef.current = setTimeout(async () => {
      const inputGif = searchGifRef.current!.value;

      const gifs = await searchGifs(inputGif);

      setListGifs(gifs);
    }, 700);
  };

  useEffect(() => {
    if (searchGifRef.current) {
      searchGifRef.current.focus();
    }
    (async () => {
      setListGifs(await searchGifs());
    })();
  }, []);

  return (
    <motion.div
      {...gifsMenu.container}
      className="absolute left-0 w-full h-full bottom-14 bg-gray1 overflow-y-hidden"
    >
      <div className="sticky top-0 w-full h-[20%] flex items-center pl-4 bg-gray1">
        <motion.div
          {...gifsMenu.header}
          className="flex items-center w-2/4 py-1 pl-3 rounded-md bg-gray7"
        >
          <IconSm Icon={SearchIcon} />
          <input
            placeholder="Buscar gif ..."
            ref={searchGifRef}
            onChange={searchGif}
            className="w-full px-3"
          />
        </motion.div>
      </div>
      <AnimatePresence>
        <motion.div
          {...gifsMenu.content}
          className="grid grid-cols-6 gap-5 mx-4 h-full overflow-y-scroll"
        >
          {listGifs?.map((gif, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <button
                onClick={() => {
                  sendMessage({ chatId, type: "gif", message: gif[0] });
                  setMenu(false);
                }}
              >
                <img src={gif} alt="gif" className="w-32 h-32" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
