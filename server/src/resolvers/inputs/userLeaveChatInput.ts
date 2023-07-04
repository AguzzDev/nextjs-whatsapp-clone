import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class userLeaveChatInput {
  @Field(() => String)
  userId: string

  @Field(() => String)
  chatId: string
}
