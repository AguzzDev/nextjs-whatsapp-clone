import { Field } from "formik";
import { InputFormikProps } from "interface";

export const InputOne = (props: InputFormikProps) => {
  return (
    <div className="flex flex-col">
      <label className="ml-1 mb-1 text-sm">{props.label}</label>

      <Field
        autoComplete="off"
        {...props}
        className="flex p-3 bg-gray1 rounded-md"
      />
    </div>
  );
};
