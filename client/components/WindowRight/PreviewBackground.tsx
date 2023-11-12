import { userCookie } from "utils/userCookie";
import Image from "next/image";

import { UserType } from "interface";
import { useGlobalState } from "context/GlobalStateContext";

export const PreviewBackground = () => {
  const { backgroundImage } = useGlobalState();
  const { user } = userCookie();

  return (
    <section className="flex flex-col select-none w-full">
      <div className="flex items-center bg-gray1 px-5 select-none h-20">
        <h4>Vista previa</h4>
      </div>
      <div className="relative h-full">
        <Image
          data-test-id="preview-background-image"
          src={backgroundImage || user!.backgroundImage!}
          alt={`image-${user?.backgroundImage?.split("/").slice(-1)}`}
          layout="fill"
          className="opacity-60"
        />
      </div>
      <div className="flex items-end h-16 bg-gray1 px-5 select-none py-4" />
    </section>
  );
};
