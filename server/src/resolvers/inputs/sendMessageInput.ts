import { ArgsType, Field } from "type-graphql"
import { MaxLength } from "class-validator"

@ArgsType()
export class sendMessageInput {
  @Field(() => String)
  chatId: string
  
  @Field(() => String)
  type: string

  @Field(() => String)
  @MaxLength(250)
  message: string
}
