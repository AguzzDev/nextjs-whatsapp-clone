import { IsEmail } from "class-validator"
import { ArgsType, Field } from "type-graphql"

@ArgsType()
export class userLoginInput {
  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  password: string
}
