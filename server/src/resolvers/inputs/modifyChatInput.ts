import { ArgsType, Field } from "type-graphql"
import { MaxLength } from "class-validator"

@ArgsType()
export class modifyChatInput {
  @Field(() => String)
  @MaxLength(50)
  name: string

  @Field(() => String)
  @MaxLength(250)
  description: string

  @Field(() => String)
  image: string
}
