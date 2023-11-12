import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email no valido")
    .required("Requerido"),
  password: yup.string().required("Requerida"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().max(30, "Maximo 30 caracteres").required("Requerido"),
  email: yup.string().email("Email no valido").required("Requerido"),
  password: yup
    .string()
    .min(6, "Entre 6-50 caracteres")
    .max(50, "Entre 6-50 caracteres")
    .required("Requerido"),
});
