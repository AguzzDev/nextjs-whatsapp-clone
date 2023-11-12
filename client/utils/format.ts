const formatTime = (time: Date) => {
  return new Date(time).toLocaleString("es-AR", {
    hour: "numeric",
    minute: "numeric",
  });
};

export { formatTime };
