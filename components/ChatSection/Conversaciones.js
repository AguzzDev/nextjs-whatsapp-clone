import { Conversacion } from "./Conversacion"

export const Conversaciones = () => {
  const convers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  return (
    <>
      {convers.map(conv => (
        <div key={conv.id}>
          <Conversacion />
        </div>
      )

      )}
    </>
  )
}
