import Image from "next/image";
import React, { useState } from "react";

import { backgrounds } from "data/settings.json";
import { useChat } from "context/ChatContext";
import { useGlobalState } from "context/GlobalStateContext";
import { ButtonOne } from "components/UI/Buttons/ButtonOne";

export const BackgroundPicture = () => {
  const [hover, setHover] = useState<number | null>(null);

  const { changeBackground } = useChat();
  const { setSidebar, setWindowRight, setBackgroundImage, backgroundImage } =
    useGlobalState();

  const selectBackground = async () => {
    await changeBackground({ image: backgroundImage });

    setSidebar(0);
    setWindowRight("ChatInactivo");
  };

  return (
    <>
      <div
        data-test-id="background-images"
        className="grid grid-cols-3 gap-5 mt-5 px-3 overflow-y-scroll h-3/4"
      >
        {backgrounds.map(({ name, image }, i) => (
          <button
            className={`${hover === i ? "border-2 border-green1" : ""}`}
            key={name}
            onClick={() => {
              setBackgroundImage(image);
              setHover(i);
            }}
          >
            <Image
              alt={name}
              src={image}
              height={400}
              width={300}
              objectFit="cover"
            />
          </button>
        ))}
      </div>

      <div className="my-3 mx-3 h-1/4">
        <ButtonOne
          data-test-id="button-background-images"
          onClick={() => selectBackground()}
        >
          Usar imagen
        </ButtonOne>
      </div>
    </>
  );
};
