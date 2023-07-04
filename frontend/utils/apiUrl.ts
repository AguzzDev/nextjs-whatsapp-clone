export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wsp-clone.herokuapp.com"
    : "http://localhost:5000"
