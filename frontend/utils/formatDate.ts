export const formatDate = (date) => {
  const dateObj = new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return dateObj
}
