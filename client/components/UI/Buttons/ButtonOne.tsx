import { ButtonRefProps } from "interface";

export const ButtonOne = (props: ButtonRefProps) => {
  return (
    <button
      {...props}
      className="w-full px-5 py-[.625rem] bg-green1 rounded-xl"
    >
      {props.children}
    </button>
  );
};
