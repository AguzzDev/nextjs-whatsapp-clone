import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class addOrRemoveAdmin {
  @Field()
  userId: string
}
