import { usePreload } from "hooks/usePreload";
import Image from "next/image";

export const Preload = () => {
  const { percent } = usePreload();

  return (
    <section className="grid w-screen h-screen place-content-center">
      <div className="flex flex-col items-center justify-center text-center">
        <div>
          <Image
            src="/whatsapp.svg"
            width={50}
            height={50}
            className="animate__animated animate__flash animate__slower animate__infinite"
          />
        </div>

        <div className="h-2 my-5 overflow-hidden bg-transparent bg-gray-500 rounded-md w-96">
          <div
            className="h-full duration-500 transform bg-green1"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div>
          <h4>WhatsApp</h4>
          <p className="text-gray-400">Cifrado de extremo a extremo</p>
        </div>
      </div>
    </section>
  );
};
