import { findChatById } from "../helpers/findChatById";
import { Participant } from "../models/chat";
import { Context } from "../types";

export const findParticipantsModule = async ({
  ctx,
  id,
}: {
  ctx: Context;
  id: string;
}): Promise<Participant[]> => {
  const chat = await findChatById({ id });
  return chat!.participants;
};
