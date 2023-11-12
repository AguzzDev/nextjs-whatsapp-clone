import { setCookie } from "nookies";

import { formatTime } from "utils/format";
import { useChat } from "context/ChatContext";
import { Avatar } from "components/Avatar";
import { userCookie } from "utils/userCookie";
import { ChatFragment, MessagesFragment } from "generated/graphql";
import { useGlobalState } from "context/GlobalStateContext";

export const Chat = ({ data }: { data: ChatFragment }) => {
  const { user } = userCookie();
  const { setChatId, chatId } = useChat();
  const { setWindowRight } = useGlobalState();

  const Message = ({ message }: { message: MessagesFragment }) => {
    const unViewedMessages = data.participants?.filter(
      (args) => args.user.id === user?.id
    )[0]?.unViewedMessages;
    if (unViewedMessages === undefined) return null;

    return (
      <>
        <Avatar img={data.image} />

        <div className="flex justify-between w-full ml-3">
          <div className="flex flex-col">
            <h4 className="font-bold">{data.name}</h4>

            {message ? (
              <p className="text-gray4">
                {message.type == "gif"
                  ? `${message.user.name}: Mando un Gif`
                  : message.type == "notification"
                  ? message.message
                  : `${message.user.name}: ${message.message}`}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-center">
            <p
              className={`${
                unViewedMessages > 0 ? "text-green1" : "text-gray4"
              }`}
            >
              {message ? formatTime(message.timestamp) : null}
            </p>
            {unViewedMessages > 0 ? (
              <div className="mt-1 bg-green1 w-6 h-6 flex items-center justify-center rounded-full">
                <p className="text-sm">{unViewedMessages}</p>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      onClick={() => {
        setChatId(data.id);
        setCookie(null, "cookieChatId", data.id);
        setWindowRight("ChatActivo");
      }}
      className={`${
        chatId === data.id ? "bg-gray1" : null
      } flex items-center px-3 py-2 border-b cursor-pointer hover:bg-gray1 border-border`}
    >
      {data && <Message message={data.messages![data.messages!.length - 1]} />}
    </div>
  );
};
