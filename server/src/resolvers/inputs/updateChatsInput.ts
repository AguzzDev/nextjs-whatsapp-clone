import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class updateChatInput {
  @Field()
  type: string
  @Field()
  id: string
}
