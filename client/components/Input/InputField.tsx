import { Field, useField } from "formik";
import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { IconSm } from "components/Icons";
import { InputFieldProps } from "interface";

export const InputField = (props: InputFieldProps) => {
  const [field, meta] = useField(props);

  const [show, setShow] = useState<Boolean>(false);

  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{props.label}</label>
      <div className="flex justify-between px-5 py-2 rounded-xl focus:outline-none border-2 border-gray7">
        <Field
          className="w-full pr-3"
          autoComplete="off"
          type={field.name !== "password" ? "text" : show ? "text" : "password"}
          {...props}
          {...field}
        />
        {field.name === "password" ? (
          <button onClick={() => setShow(!show)}>
            {show ? <IconSm Icon={EyeIcon} /> : <IconSm Icon={EyeOffIcon} />}
          </button>
        ) : null}
      </div>
      {meta.touched && meta.error ? (
        <p className="mt-1 text-xs text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};
