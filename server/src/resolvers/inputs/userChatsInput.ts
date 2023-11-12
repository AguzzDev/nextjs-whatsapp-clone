import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class userChatsInput {
  @Field()
  userId: string
}
