import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { setCookie } from "nookies"

import API from "lib/api"

export default function Preload() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(false)
  const [values, setValues] = useState({
    name: "",
    password: "",
  })

  const [completed, setCompleted] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, status } = await API.post(
      `/user/${step ? "login" : "register"}`,
      {
        name: values.username,
        password: values.password,
      }
    )

    if (status === 200) {
      window.localStorage.setItem("profile", JSON.stringify(data))
      router.push("/")
    }
  }

  useEffect(() => {
    setInterval(() => setCompleted((prevState) => prevState + 5.5), 200)
    setTimeout(() => {
      setLoading(false)
      clearInterval()
    }, 5000)
  }, [])

  return (
    <>
      {loading ? (
        <>
          <div className="grid place-content-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center text-center">
              <div>
                <Image
                  src="/whatsapp.svg"
                  width={50}
                  height={50}
                  className="animate__animated animate__flash animate__slower animate__infinite"
                />
              </div>

              <div className="w-96 h-2 bg-gray-500 my-5 overflow-hidden rounded-md bg-transparent">
                <div
                  className="bg-green1 h-full transform duration-500"
                  style={{ width: `${completed}%` }}
                />
              </div>
              <div>
                <h1 className="text-white text-lg">WhatsApp</h1>
                <p className="text-gray-500">Cifrado de extremo a extremo</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid place-content-center min-h-screen">
          <div className="flex justify-between bg-gray1 p-10 rounded-md">
            <div className="flex flex-col items-center justify-center">
              <Image src="/whatsappLogo.svg" height={80} width={80} />
            </div>

            <div className="px-20">
              {step ? (
                <>
                  <h1>Bienvenido de nuevo</h1>
                  <form
                    className="flex flex-col space-y-3 my-3"
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="px-5 py-2 focus:outline-none rounded-md bg-gray7"
                      placeholder="Nombre"
                      value={values.username}
                      onChange={(e) =>
                        setValues({ ...values, username: e.target.value })
                      }
                    />
                    <input
                      className="px-5 py-2 focus:outline-none rounded-md bg-gray7"
                      placeholder="Contraseña"
                      value={values.password}
                      type="password"
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                    <button className="w-full bg-green1 text-white font-bold text-md  px-5 py-2  rounded-xl">
                      Entrar
                    </button>
                  </form>
                  <div className="flex space-x-3">
                    <p>No tenes cuenta?</p>
                    <button
                      className="text-green1 font-bold"
                      onClick={() => setStep(false)}
                    >
                      Click aca
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1>Crea tu cuenta</h1>
                  <form
                    className="flex flex-col space-y-3 my-3"
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="px-5 py-2 focus:outline-none rounded-md bg-gray7"
                      placeholder="Nombre"
                      value={values.username}
                      onChange={(e) =>
                        setValues({ ...values, username: e.target.value })
                      }
                    />
                    <input
                      className="px-5 py-2 focus:outline-none rounded-md bg-gray7"
                      placeholder="Contraseña"
                      value={values.password}
                      type="password"
                      onChange={(e) =>
                        setValues({ ...values, password: e.target.value })
                      }
                    />
                    <button className="w-full bg-green1 text-white font-bold text-md  px-5 py-2  rounded-xl">
                      Entrar
                    </button>
                  </form>
                  <div className="flex space-x-3">
                    <p>Ya tenes cuenta?</p>
                    <button
                      className="text-green1 font-bold"
                      onClick={() => setStep(true)}
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
