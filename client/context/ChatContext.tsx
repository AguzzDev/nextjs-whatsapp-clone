import {
  MeDocument,
  useChangeBackgroundMutation,
  useChangeProfileMutation,
  useCreateChatMutation,
  useRemoveChatMutation,
  useSendMessageMutation,
  useAddOrRemoveParticipantMutation,
  AddOrRemoveParticipantMutationVariables,
  SendMessageMutationVariables,
  RemoveChatMutationVariables,
  ChangeBackgroundMutationVariables,
  CreateChatMutationVariables,
  ChangeProfileMutationVariables,
  useAddOrRemoveAdminMutation,
  AddOrRemoveAdminMutationVariables,
  UpdateUsersToInviteDocument,
  UpdateParticipantsDocument,
  UpdateChatsDocument,
  NewMessagesDocument,
  Participant,
  UpdateChatsSubscription,
  UpdateUsersToInviteSubscription,
  UpdateParticipantsSubscription,
  NewMessagesSubscription,
  ChatFragment,
  MessagesFragment,
} from "generated/graphql";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useGlobalState } from "./GlobalStateContext";
import client from "graphql/client";
import { ChildrenProps } from "interface";

interface SubscriptionType {
  id: string;
  subscribe: Function;
}
interface chatSubscription extends SubscriptionType {
  sound: any;
}

interface ChatProps {
  chatId: string;
  chat: any;
  setChatId: Dispatch<SetStateAction<string>>;
  setChat: Dispatch<SetStateAction<any>>;
  sendMessage: (args: SendMessageMutationVariables) => void;
  removeChat: (args: RemoveChatMutationVariables) => void;
  changeBackground: (args: ChangeBackgroundMutationVariables) => void;
  createChat: (args: CreateChatMutationVariables) => void;
  changeProfile: (args: ChangeProfileMutationVariables) => void;
  addOrRemoveParticipant: (
    args: AddOrRemoveParticipantMutationVariables
  ) => void;
  addOrRemoveAdmin: (args: AddOrRemoveAdminMutationVariables) => void;
  subscribeToUpdateParticipants: (args: SubscriptionType) => void;
  subscribeToMoreUsersToInvite: (args: SubscriptionType) => void;
  subscribeToUpdateChats: (args: chatSubscription) => void;
  subscribeToNewMessages: (args: SubscriptionType) => void;
}

const ChatContext = createContext<ChatProps>({
  chatId: "",
  chat: null,
  setChatId: () => {},
  setChat: () => {},
  sendMessage: () => {},
  removeChat: () => {},
  changeBackground: () => {},
  createChat: () => {},
  changeProfile: () => {},
  addOrRemoveParticipant: () => {},
  addOrRemoveAdmin: () => {},
  subscribeToUpdateParticipants: () => {},
  subscribeToMoreUsersToInvite: () => {},
  subscribeToUpdateChats: () => {},
  subscribeToNewMessages: () => {},
});

const ChatProvider = ({ children }: ChildrenProps) => {
  const [sendMessageM] = useSendMessageMutation();
  const [addOrRemoveParticipantM] = useAddOrRemoveParticipantMutation();
  const [addOrRemoveAdminM] = useAddOrRemoveAdminMutation();
  const [changeBackgroundM] = useChangeBackgroundMutation();
  const [createChatM] = useCreateChatMutation();
  const [changeProfileM] = useChangeProfileMutation();
  const [removeChatM] = useRemoveChatMutation();

  const [chatId, setChatId] = useState<string>("");
  const [chat, setChat] = useState<any>(null);

  const { setWindowRight } = useGlobalState();

  const addOrRemoveParticipant = async (
    args: AddOrRemoveParticipantMutationVariables
  ) => {
    await addOrRemoveParticipantM({
      variables: args,
      refetchQueries: [{ query: MeDocument }],
    });
  };
  const addOrRemoveAdmin = async (args: AddOrRemoveAdminMutationVariables) => {
    const result = await addOrRemoveAdminM({
      variables: args,
    });

    await client.query({
      query: MeDocument,
      variables: { id: result?.data?.addOrRemoveAdmin.id },
    });
  };
  const changeProfile = async (args: ChangeProfileMutationVariables) => {
    await changeProfileM({
      variables: args,
      refetchQueries: [{ query: MeDocument }],
    });
  };
  const removeChat = async ({ removeChatId }: RemoveChatMutationVariables) => {
    await removeChatM({ variables: { removeChatId } });
  };
  const changeBackground = async ({
    image,
  }: ChangeBackgroundMutationVariables) => {
    await changeBackgroundM({
      variables: { image },
      refetchQueries: [{ query: MeDocument }],
    });
  };
  const sendMessage = async (args: SendMessageMutationVariables) => {
    await sendMessageM({ variables: args });
  };
  const createChat = async (args: CreateChatMutationVariables) => {
    await createChatM({ variables: args });
  };

  //Subscriptions
  const subscribeToUpdateParticipants = ({
    id,
    subscribe,
  }: SubscriptionType) => {
    subscribe({
      document: UpdateParticipantsDocument,
      variables: { chatId: id },
      updateQuery: (
        prev: Participant[],
        {
          subscriptionData,
        }: { subscriptionData: { data: UpdateParticipantsSubscription } }
      ) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.updateParticipants;

        return Object.assign({}, prev, {
          findParticipants: [newFeedItem],
        });
      },
    });
  };

  const subscribeToMoreUsersToInvite = ({
    id,
    subscribe,
  }: SubscriptionType) => {
    subscribe({
      document: UpdateUsersToInviteDocument,
      variables: { chatId: id },
      updateQuery: (
        prev: Participant[],
        {
          subscriptionData,
        }: {
          subscriptionData: { data: UpdateUsersToInviteSubscription };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.updateUsersToInvite;

        return Object.assign({
          allUsersToInvite: newFeedItem,
        });
      },
    });
  };

  const subscribeToUpdateChats = ({
    id,
    subscribe,
    sound,
  }: SubscriptionType & { sound: any }) => {
    subscribe({
      document: UpdateChatsDocument,
      variables: { userId: id },
      updateQuery: (
        prev: { allChats: ChatFragment[] },
        {
          subscriptionData,
        }: { subscriptionData: { data: UpdateChatsSubscription } }
      ) => {
        if (!subscriptionData.data) return prev;

        const newFeedItem = subscriptionData.data.updateChats;
        const isUserAction = newFeedItem.type.user?.id === id;
        const isNotUserAction = newFeedItem.by !== id;
        const isAddActionOrRemoveAdmin =
          newFeedItem.type.action.includes("ADD") ||
          newFeedItem.type.action === "REMOVE_ADMIN";
        const isRemoveChat = newFeedItem.type.action === "REMOVE_CHAT";

        let updatedChats = [...prev.allChats];

        if (isUserAction) {
          setWindowRight("ChatInactivo");
          updatedChats = updatedChats.filter(
            ({ id }) => !id.includes(newFeedItem.chat.id)
          );
        } else if (isAddActionOrRemoveAdmin) {
          updatedChats = [
            ...updatedChats.filter(
              ({ id }) => !id.includes(newFeedItem.chat.id)
            ),
            newFeedItem.chat,
          ];
        } else if (isRemoveChat) {
          updatedChats = updatedChats.filter(
            ({ id }) => !id.includes(newFeedItem.chat.id)
          );
        } else if (isNotUserAction) {
          // sound.play();
        }

        updatedChats.sort((a, b) =>
          new Date(a.updatedAt) < new Date(b.updatedAt) ? 1 : -1
        );

        return { ...prev, allChats: updatedChats };
      },
    });
  };

  const subscribeToNewMessages = ({ id, subscribe }: SubscriptionType) => {
    subscribe({
      document: NewMessagesDocument,
      variables: { chatId: id },
      updateQuery: (
        prev: { messages: MessagesFragment[] },
        {
          subscriptionData,
        }: { subscriptionData: { data: NewMessagesSubscription } }
      ) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newMessages;

        return Object.assign(
          {},
          {
            messages: [...prev.messages, newFeedItem],
          }
        );
      },
    });
  };
  return (
    <ChatContext.Provider
      value={{
        chatId,
        chat,
        setChatId,
        setChat,
        sendMessage,
        removeChat,
        changeBackground,
        createChat,
        changeProfile,
        addOrRemoveParticipant,
        addOrRemoveAdmin,
        subscribeToUpdateParticipants,
        subscribeToMoreUsersToInvite,
        subscribeToUpdateChats,
        subscribeToNewMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatProvider;
