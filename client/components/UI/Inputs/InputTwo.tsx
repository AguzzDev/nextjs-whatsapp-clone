import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";

import { IconMd } from "components/Icons";
import { InputFormikProps } from "interface";

export const InputTwo = (props: InputFormikProps) => {
  const [edit, setEdit] = useState(false);

  const { id, name, label, value } = props;

  return (
    <div className="flex flex-col">
      <label className="mb-1">{label}</label>

      <div className="flex py-3 px-3 bg-gray1 rounded-md w-full">
        <div className="w-full">
          {!edit ? (
            <p data-test-id={`input-${id}-p`}>{value}</p>
          ) : (
            <input
              data-test-id={`input-${id}`}
              autoFocus
              disabled={!edit}
              ref={name}
            />
          )}
        </div>

        <button
          data-test-id={`button-input-${id}`}
          onClick={() => setEdit(!edit)}
        >
          {edit ? <IconMd Icon={XIcon} /> : <IconMd Icon={PencilIcon} />}
        </button>
      </div>
    </div>
  );
};
