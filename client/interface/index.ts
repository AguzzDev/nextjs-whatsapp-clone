import { FieldAttributes } from "formik";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export type TextRefProps = HTMLInputElement | null;
export type ButtonRefProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type InputFormikProps = FieldAttributes<any>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}
export interface UserType {
  name: string;
  backgroundImage: string;
  bio: string;
  chats: string | null;
  createdAt: string;
  email: string;
  id: string;
  image: string;
  password: string;
  role: string;
}

export enum StepEnum {
  login,
  register,
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
