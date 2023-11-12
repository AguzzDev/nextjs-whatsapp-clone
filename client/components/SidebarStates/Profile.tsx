import React, { useEffect, useRef, useState } from "react";

import { userCookie } from "utils/userCookie";
import Image from "next/image";
import { imageToBase64 } from "utils/imageToBase64";
import { useChat } from "context/ChatContext";
import { useGlobalState } from "context/GlobalStateContext";
import { ButtonOne } from "components/UI/Buttons/ButtonOne";
import { InputTwo } from "components/UI/Inputs/InputTwo";

export const Profile = () => {
  const { user } = userCookie();
  const { setSidebar } = useGlobalState();

  const [preview, setPreview] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);

  const { changeProfile } = useChat();

  const saveChanges = async () => {
    await changeProfile({
      name: nameRef?.current?.value || user?.name,
      bio: bioRef?.current?.value || user?.bio,
      image: preview,
    });

    setSidebar(0);
  };

  useEffect(() => {
    if (user) {
      setPreview(user.image!);
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex flex-col w-3/4 mx-auto pt-10 space-y-5">
          <div className="mx-auto relative w-32 h-32 rounded-full">
            <Image
              src={preview}
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />

            <div className="absolute top-0 w-full h-full">
              <input
                className="w-full h-full opacity-0"
                onChange={async (e) => {
                  if (!e.target.files) return;
                  await imageToBase64(e.target.files[0], (r: string) =>
                    setPreview(r)
                  );
                }}
                name="profile-picture"
                type="file"
              />
            </div>
          </div>

          <>
            <InputTwo
              id="name"
              name={nameRef}
              value={user.name}
              label="Cambia tu nombre"
            />
            <InputTwo
              id="bio"
              name={bioRef}
              value={user.bio}
              label="Cambia tu bio"
            />
          </>

          <ButtonOne onClick={() => saveChanges()}>Guardar</ButtonOne>
        </div>
      )}
    </>
  );
};
