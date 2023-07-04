import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class filterMessagesInput {
  @Field(() => String)
  id: string

  @Field(() => String)
  message: string
}
