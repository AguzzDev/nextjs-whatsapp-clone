import React, { useRef, useState } from "react";
import Image from "next/image";
import { Field, FieldArray, Form, Formik } from "formik";

import { imageToBase64 } from "utils/imageToBase64";
import { userCookie } from "utils/userCookie";
import { InviteToGroup } from "components/UI/InviteToGroup";
import { useDebounce } from "hooks/useDebounce";
import { useAllUsersQuery, useCreateChatMutation } from "generated/graphql";
import { useChat } from "context/ChatContext";
import { useGlobalState } from "context/GlobalStateContext";
import { InputOne } from "components/UI/Inputs/InputOne";
import { ButtonOne } from "components/UI/Buttons/ButtonOne";
import { ChangeEvent } from "interface";

export const CreateRoom = () => {
  const [img, setImg] = useState("/groupIcon.png");
  const { user } = userCookie();
  const { setSidebar } = useGlobalState();

  const { data } = useAllUsersQuery();

  const { createChat } = useChat();

  return (
    <>
      {user && data && (
        <Formik
          initialValues={{
            name: "",
            description: "",
            search: "",
            participants: [{ id: user.id }],
          }}
          onSubmit={async (values) => {
            console.log(values);
            await createChat({
              ...values,
              image: img,
              participants: values.participants.map((p) => {
                return {
                  userId: p.id,
                };
              }),
            });
            setSidebar(0);
          }}
        >
          {({ values }) => (
            <Form className="h-full">
              <section className="px-10 flex flex-col h-3/4 overflow-hidden overflow-y-scroll">
                <div className="relative w-20 h-20 mx-auto rounded-full mt-5 mb-14">
                  <div className="absolute top-0 w-full h-full">
                    <Image
                      src={img}
                      width={130}
                      height={130}
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <Field
                    name="image"
                    className="z-50 w-full h-full opacity-0"
                    onChange={async (e: ChangeEvent) => {
                      if (!e.target.files) return;
                      await imageToBase64(e.target.files[0], (r: string) =>
                        setImg(r)
                      );
                    }}
                    type="file"
                  />
                </div>

                <div className="flex flex-col mb-3 space-y-5">
                  <InputOne
                    name="name"
                    value={values.name}
                    label="Nombre del grupo"
                  />
                  <InputOne
                    name="description"
                    value={values.description}
                    label="Descripción del grupo"
                  />
                  <InputOne
                    name="search"
                    value={values.search}
                    label="Busca un usuario"
                  />
                </div>

                <h4 className="font-bold pb-2">Invita a un usuario</h4>
                <div className="flex flex-col space-y-3">
                  <FieldArray
                    name="participants"
                    render={(render) => (
                      <InviteToGroup
                        data={
                          values.search
                            ? data!.allUsers.filter(({ name }) =>
                                name.includes(values.search)
                              )
                            : data!.allUsers
                        }
                        render={render}
                        participants={values.participants}
                      />
                    )}
                  />
                </div>
              </section>

              <section className="mx-10 mt-5">
                <ButtonOne type="submit">Crear grupo</ButtonOne>
              </section>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
