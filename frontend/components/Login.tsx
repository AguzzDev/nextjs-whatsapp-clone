import { Field, Form, Formik } from "formik"
import { useLoginMutation, useRegisterMutation } from "generated/graphql"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { setCookie } from "nookies"
import { loginSchema, registerSchema } from "utils/validate"
import { InputField } from "./Input/InputField"

const Preload = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState("LOGIN")
  const [completed, setCompleted] = useState(0)

  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()

  useEffect(() => {
    setInterval(() => setCompleted((prevState) => prevState + 5.5), 200)
    setTimeout(() => {
      setLoading(false)
      clearInterval(1)
    }, 5000)
  }, [])

  return (
    <>
      {loading ? (
        <>
          <div className="grid w-screen h-screen place-content-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div>
                <Image
                  src="/whatsapp.svg"
                  width={50}
                  height={50}
                  className="animate__animated animate__flash animate__slower animate__infinite"
                />
              </div>

              <div className="h-2 my-5 overflow-hidden bg-transparent bg-gray-500 rounded-md w-96">
                <div
                  className="h-full duration-500 transform bg-green1"
                  style={{ width: `${completed}%` }}
                />
              </div>
              <div>
                <h1 className="text-lg text-white">WhatsApp</h1>
                <p className="text-gray-500">Cifrado de extremo a extremo</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid min-h-screen place-content-center">
          <div className="flex justify-between p-10 rounded-md bg-gray1">
            <div className="flex flex-col items-center justify-center">
              <Image src="/whatsappLogo.svg" height={80} width={80} />
            </div>

            <div className="px-20">
              {error ? <p>{error}</p> : null}
              {step === "LOGIN" ? (
                <div>
                  <h1>Bienvenido de nuevo</h1>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={async (data, actions) => {
                      const response = await login({
                        variables: {
                          email: data.email,
                          password: data.password,
                        },
                      })
                      actions.setSubmitting(false)

                      if (response.errors) {
                        setError("Hubo un error")
                      } else if (response.data.login) {
                        setCookie(null, "areUser", "yes", {
                          maxAge: 30 * 24 * 60 * 60,
                        })
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="flex flex-col my-3 space-y-3">
                        <InputField name="email" placeholder="Email" />
                        <InputField
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-5 py-2 font-bold text-white bg-green1 text-md rounded-xl"
                        >
                          Entrar
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <div className="flex space-x-3">
                    <p>No tenes cuenta?</p>
                    <button
                      className="font-bold text-green1"
                      onClick={() => setStep("REGISTER")}
                    >
                      Click aca
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1>Crea tu cuenta</h1>
                  <Formik
                    validationSchema={registerSchema}
                    initialValues={{ name: "", email: "", password: "" }}
                    onSubmit={async (data) => {
                      const response = await register({
                        variables: {
                          name: data.name,
                          email: data.email,
                          password: data.password,
                        },
                      })
                      if (response.errors) {
                        setError("Hubo un error")
                      } else if (response.data.register) {
                        setCookie(null, "areUser", "yes", {
                          maxAge: 30 * 24 * 60 * 60,
                        })
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="flex flex-col my-3 space-y-3">
                        <InputField name="name" placeholder="Nombre" />
                        <InputField name="email" placeholder="Email" />
                        <InputField
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-5 py-2 font-bold text-white bg-green1 text-md rounded-xl"
                        >
                          Entrar
                        </button>
                      </Form>
                    )}
                  </Formik>
                  <div className="flex space-x-3">
                    <p>Ya tenes cuenta?</p>
                    <button
                      className="font-bold text-green1"
                      onClick={() => setStep("LOGIN")}
                    >
                      Click aca
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Preload
