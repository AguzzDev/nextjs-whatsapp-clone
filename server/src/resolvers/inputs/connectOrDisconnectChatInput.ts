import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class connectOrDisconnectChatInput {
  @Field()
  chatId: string;
}
