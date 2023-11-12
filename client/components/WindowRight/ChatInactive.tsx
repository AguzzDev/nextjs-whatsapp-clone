import React, { useEffect } from "react";
import { DesktopComputerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { parseCookies, destroyCookie } from "nookies";

import { IconSm } from "components/Icons";
import { useDisconnectChatsMutation } from "generated/graphql";

export function ChatInactive() {
  const { cookieChatId } = parseCookies();
  const [disconnect] = useDisconnectChatsMutation();

  useEffect(() => {
    const fn = async () => {
      if (cookieChatId) {
        await disconnect();
        destroyCookie(null, "cookieChatId");
      }
    };
    fn();
  }, []);

  return (
    <section className="bg-gray1 select-none">
      <div className="flex flex-col text-center justify-center items-center h-[99%]">
        <div className="w-7/12 mx-auto">
          <Image
            src="/chatimagemain.jpg"
            height={300}
            width={300}
            className="object-cover rounded-full"
          />
          <h1 className="my-5">Mantén tu teléfono conectado</h1>
          <p className="text-sm mb-10 text-grayfont3">
            WhatsApp se conecta a tu teléfono para sincronizar los mensajes.
            Para reducir el consumo de tus datos, conecta tu teléfono a una red
            Wi-Fi
          </p>
        </div>
        <div className="flex flex-row text-sm text-grayfont3 mx-auto mb-5">
          <div className="my-auto">
            <IconSm Icon={DesktopComputerIcon} props="text-gray2" />
          </div>
          <p className="mx-2 text-grayfont3">
            WhatsApp está disponible para Windows.
          </p>
          <span className="text-green1">Obtenlo aquí.</span>
        </div>
      </div>
      <div className="flex items-end bg-green1 h-full"></div>
    </section>
  );
}
