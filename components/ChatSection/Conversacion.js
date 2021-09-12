export const Conversacion = () => {
  return (
    <div className="flex  items-center hover:bg-gray1 cursor-pointer">
      <div className="w-14 h-12 rounded-full bg-white m-2"></div>

      <div className="flex justify-between w-full border-b border-gray-600">
        <div className="flex flex-col p-2">
          <h1 className="text-white">Nombre</h1>
          <p className="text-gray-500">message</p>
        </div>

        <div className="flex  items-start p-2">
          <h1 className="text-gray-500">Hora</h1>
        </div>
      </div>
    </div>
  )
}
