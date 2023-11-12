import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class filterMessagesInput {
  @Field(() => String)
  chatId: string

  @Field(() => String)
  words: string
}
