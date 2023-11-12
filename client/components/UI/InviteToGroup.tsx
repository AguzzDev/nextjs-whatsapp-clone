import Image from "next/image";

import { IconSm } from "components/Icons";
import { CheckIcon, TrashIcon, UserAddIcon } from "@heroicons/react/solid";
import { UserFragment } from "generated/graphql";
import { FieldArrayRenderProps } from "formik";

interface Props {
  data: UserFragment[];
  render: FieldArrayRenderProps;
  participants: Array<{ id: string }>;
}

export const InviteToGroup = ({ data, render, participants }: Props) => {
  const handleRemove = (index: number) => {
    render.remove(index);
  };

  return (
    <>
      {data.map((userV, i) => (
        <div key={i} className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full">
              <Image
                className="rounded-full"
                objectFit="cover"
                src={userV.image}
                width={50}
                height={50}
              />
            </div>
            <h2 className="overflow-x-hidden w-44">{userV.name}</h2>
          </div>
          <div className="flex items-center space-x-3">
            {participants.some(({ id }) => id === userV.id) ? (
              <div className="flex space-x-3">
                <IconSm Icon={CheckIcon} />
                <button
                  title="Eliminar"
                  type="button"
                  onClick={() => {
                    handleRemove(i);
                  }}
                >
                  <IconSm Icon={TrashIcon} />
                </button>
              </div>
            ) : (
              <button
                title="Agregar"
                type="button"
                onClick={() => render.push({ id: userV.id, name: userV.name })}
              >
                <IconSm Icon={UserAddIcon} />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
