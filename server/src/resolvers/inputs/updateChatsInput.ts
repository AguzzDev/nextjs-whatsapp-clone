import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class updateChatInput {
  @Field()
  id: string
  @Field()
  type: string
}
