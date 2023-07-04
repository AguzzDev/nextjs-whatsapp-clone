const formatTime = (time) => {
  return new Date(time).toLocaleString("es-AR",{
    hour: "numeric",
    minute: "numeric"
  })
}

export { formatTime }
