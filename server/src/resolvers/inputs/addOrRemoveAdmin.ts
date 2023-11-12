import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class addOrRemoveAdmin {
  @Field()
  type: string
  @Field()
  userId: string
}
