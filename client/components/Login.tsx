import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { StepEnum } from "interface";
import { FormComponent } from "./Form";

export const Login = () => {
  const [step, setStep] = useState<StepEnum>(StepEnum.login);

  return (
    <section
      data-test-id="login-div"
      className="p-5 grid md:grid-cols-2 min-h-screen"
    >
      <section className="flex flex-col my-4 pl-5">
        {/* Top */}
        <div className="flex justify-between relative py-4">
          <div className="flex items-center space-x-3">
            <Image src="/whatsappLogo.svg" height={20} width={20} />
            <h5>Whatsapp Clone</h5>
          </div>

          <div className="flex items-center h-full px-4 space-x-2 absolute top-0 -right-3 z-10 bg-body rounded-full">
            <h5>
              By <span className="text-green1 tracking-tighter">AguzzDev</span>
            </h5>
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/me.jpg" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>

        <main className="w-3/4 h-full mt-4">
          {step === StepEnum.login ? (
            <FormComponent setStep={setStep} type={StepEnum.login} />
          ) : (
            <FormComponent setStep={setStep} type={StepEnum.register} />
          )}
        </main>
      </section>

      <section className="hidden md:block relative rounded-xl overflow-hidden">
        <Image src="/auth-image.jpg" layout="fill" />

        <div className="absolute bottom-4 left-4">
          <p>Imagen de</p>
          <Link href="https://dribbble.com/kzhz" passHref>
            <a target="_blank" rel="noopener noreferrer" className="font-bold">
              Kenzo Hamazaki
            </a>
          </Link>
        </div>
      </section>
    </section>
  );
};
