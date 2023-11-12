export const formatDate = (date: Date) => {
  const dateObj = new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return dateObj;
};
