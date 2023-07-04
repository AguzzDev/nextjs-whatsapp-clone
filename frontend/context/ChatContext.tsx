import {
  NewMessageDocument,
  useNewMessageSubscription,
  useSendMessageMutation,
  useUserLeaveChatMutation,
} from "generated/graphql"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

interface ChatProps {
  chatId: string
  setChatId: Dispatch<SetStateAction<string>>
  sendMessage: Function
  removeParticipant: Function
  removeChat: Function
}

const ChatContext = createContext<ChatProps>({
  chatId: "",
  setChatId: () => {},
  sendMessage: Function,
  removeParticipant: Function,
  removeChat: Function,
})

const ChatProvider = ({ children }) => {
  const [send] = useSendMessageMutation()
  const [removeP] = useUserLeaveChatMutation()

  const [chatId, setChatId] = useState<string>("")

  const sendMessage = async (args) => {
    await send({ variables: args })
  }
  const removeParticipant = async (args) => {
    await removeP({ variables: args })
  }
  const removeChat = async (args) => {
    await removeP({ variables: args })
  }

  return (
    <ChatContext.Provider
      value={{ chatId, setChatId, sendMessage, removeParticipant, removeChat }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
export default ChatProvider
