const animations = {
  sidebar: {
    container: {
      initial: { width: "0%" },
      animate: { width: "100%" },
      exit: { width: "0%" },
      transition: { duration: 0.7 },
    },
    header: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0.3, display: "none" },
      },
      transition: { delay: 0.5, duration: 0.7 },
    },
    content: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0.2 },
      },
      transition: { delay: 0.7, duration: 0.5 },
    },
  },
  gifsMenu: {
    container: {
      initial: {
        height: "0%",
      },
      animate: { height: "55%" },
      exit: { height: "0%" },
      transition: { duration: 0.7 },
    },
    header: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0.3, display: "none" },
      },
      transition: { delay: 0.5, duration: 0.7 },
    },
    content: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0 },
      },
      transition: { delay: 0.8, duration: 1 },
    },
  },
};

export default animations;
