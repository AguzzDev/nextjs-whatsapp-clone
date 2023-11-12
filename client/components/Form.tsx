import { Form, Formik } from "formik";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

import { toErrorMap } from "utils/toErrorMap";
import { loginSchema, registerSchema } from "utils/validate";
import { InputField } from "./Input/InputField";
import { useLoginMutation, useRegisterMutation } from "generated/graphql";
import { StepEnum } from "interface";
import { ButtonOne } from "./UI/Buttons/ButtonOne";

export const FormComponent = ({
  type,
  setStep,
}: {
  type: StepEnum;
  setStep: React.Dispatch<StepEnum>;
}) => {
  const ToggleFormTypeButton = ({ reset }: { reset: Function }) => (
    <div className="flex items-end h-full text-sm space-x-3">
      <p>
        {type === StepEnum.login ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
      </p>
      <button
        className="font-bold text-green1"
        onClick={() => {
          reset();
          setStep(type === StepEnum.login ? StepEnum.register : StepEnum.login);
        }}
      >
        Click aca
      </button>
    </div>
  );

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const router = useRouter();

  let form;

  if (type === StepEnum.login) {
    form = (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (v, { setErrors, setSubmitting }) => {
          const response = await login({
            variables: {
              email: v.email,
              password: v.password,
            },
          });
          setSubmitting(false);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login) {
            setCookie(null, "areUser", "yes", {
              maxAge: 30 * 24 * 60 * 60,
            });

            router.reload();
          }
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <>
            <Form className="flex flex-col space-y-5">
              <InputField label="Email" name="email" />
              <InputField label="Contraseña" name="password" />

              <ButtonOne
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-[.625rem] font-bold bg-green1 rounded-xl"
              >
                Entrar
              </ButtonOne>
            </Form>

            <ToggleFormTypeButton reset={resetForm} />
          </>
        )}
      </Formik>
    );
  } else if (type === StepEnum.register) {
    form = (
      <Formik
        validationSchema={registerSchema}
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (v, { setErrors, setSubmitting }) => {
          const response = await register({
            variables: {
              name: v.name,
              email: v.email,
              password: v.password,
            },
          });
          setSubmitting(false);

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register) {
            setCookie(null, "areUser", "yes", {
              maxAge: 30 * 24 * 60 * 60,
            });

            router.reload();
          }
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <>
            <Form className="flex flex-col space-y-5">
              <InputField name="name" label="Nombre" />
              <InputField name="email" label="Email" />
              <InputField name="password" label="Contraseña" />

              <ButtonOne
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-[.625rem] bg-green1 rounded-xl"
              >
                Crear cuenta
              </ButtonOne>
            </Form>

            <ToggleFormTypeButton reset={resetForm} />
          </>
        )}
      </Formik>
    );
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <h1>
        {type === StepEnum.login ? "Bienvenido de nuevo" : "Crea tu cuenta"}
      </h1>

      {form}
    </div>
  );
};
