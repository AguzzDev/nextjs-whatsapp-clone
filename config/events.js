const EVENTS = {
  connection: "connection",
  CLIENT: {
    GET_ROOMS: "GET_ROOMS",
    CREATE_ROOM: "CREATE_ROOM",
    JOINED_ROOM: "JOINED_ROOM",
    SEND_MESSAGE: "SEND_MESSAGE",
    REMOVE_ROOM: "REMOVE_ROOM",
  },
  SERVER: {
    SEND_ROOMS: "SEND_ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGES: "ROOM_MESSAGES",
  },
}

export default EVENTS
