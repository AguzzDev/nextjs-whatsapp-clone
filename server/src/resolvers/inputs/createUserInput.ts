import { ArgsType, Field } from "type-graphql"
import { IsEmail, Length, MaxLength } from "class-validator"

@ArgsType()
export class createUserInput {
  @Field(() => String)
  @MaxLength(30, { message: "Maximo 30 caracteres" })
  name: string

  @Field(() => String)
  @IsEmail()
  email: string

  @Field(() => String)
  @Length(6, 50 , {message: "Entre 6-50 caracteres"})
  password: string
}
