import { PubSubEngine } from "type-graphql";
import { addOrRemoveParticipantInput } from "../resolvers/inputs";
import { Context } from "../types";
import { findChatById } from "../helpers/findChatById";
import { findUserById } from "../helpers/findUserById";
import { updateAddOrRemovePartipants } from "../helpers/updateAddOrRemovePartipants";
import {
  NEW_MESSAGES,
  UPDATE_CHAT,
  UPDATE_PARTICIPANTS,
  UPDATE_USERS_TO_INVITE,
} from "../constants";
import { listOfUsersToInvite } from "../helpers/listOfUsersToInvite";

export const addOrRemoveParticipantModule = async ({
  ctx,
  args,
  pubsub,
}: {
  ctx: Context;
  args: addOrRemoveParticipantInput;
  pubsub: PubSubEngine;
}): Promise<Boolean> => {
  if (!ctx.req.session.chatId) return false;

  const participantsBeforeToUpdateChat = await findChatById({
    id: args.chatId,
  });

  switch (args.type) {
    case "ADD_USER": {
      if (args.participants.length <= 1) {
        const findUser = await findUserById({
          id: args.participants[0].userId,
        });

        await updateAddOrRemovePartipants({
          participants: args.participants,
          message: `Se agrego a ${findUser!.name}`,
          ctx,
          args: { id: args.chatId },
        });
      } else {
        let participantsName: string[] = [];

        await Promise.all(
          args.participants.map(async ({ userId }) => {
            const findUser = await findUserById({ id: userId });
            participantsName.push(findUser!.name);
          })
        );

        await updateAddOrRemovePartipants({
          participants: args.participants,
          message: `Se agregaron a ${participantsName
            .slice(0, -1)
            .join(", ")} y ${participantsName[participantsName.length - 1]}`,
          ctx,
          args: { id: args.chatId },
        });
      }

      break;
    }

    case "REMOVE_USER": {
      const findAdmin = await findUserById({
        id: ctx.req.session.userId!,
      });
      const findUser = await findUserById({
        id: args.participants[0].userId,
      });

      await updateAddOrRemovePartipants({
        participants: args.participants,
        message: args.removedByAdmin
          ? `${findAdmin!.name} ha eliminado a ${findUser!.name}`
          : `${findUser!.name} ha salido del grupo!`,
        ctx,
        args: { id: args.chatId, userId: findUser!.id },
      });

      break;
    }

    default:
      break;
  }

  const chat = await findChatById({ id: ctx.req.session.chatId });

  await pubsub.publish(UPDATE_CHAT, {
    chat:
      args.type === "REMOVE_USER"
        ? {
            ...chat,
            participants: participantsBeforeToUpdateChat!.participants,
          }
        : chat,
    type: {
      action: args.type,
      user:
        args.type === "REMOVE_USER"
          ? await findUserById({
              id: args.participants[0].userId,
            })
          : null,
    },
    by: ctx.req.session.userId,
  });
 
  await pubsub.publish(NEW_MESSAGES, chat!.messages.slice(-1)[0]);
  await pubsub.publish(UPDATE_PARTICIPANTS, chat!.participants);
  await pubsub.publish(
    UPDATE_USERS_TO_INVITE,
    await listOfUsersToInvite({
      participants: chat!.participants,
    })
  );
  return true;
};
