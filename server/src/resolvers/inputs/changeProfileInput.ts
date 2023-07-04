import { ArgsType, Field } from "type-graphql"
import { MaxLength } from "class-validator"

@ArgsType()
export class changeProfileInput {
  @Field(() => String, { nullable: true })
  @MaxLength(30, { message: "Maximo 30 caracteres" })
  name?: string | undefined

  @Field(() => String, { nullable: true })
  image?: string | undefined

  @Field(() => String, { nullable: true })
  @MaxLength(50, { message: "Maximo 50 caracteres" })
  bio?: string | undefined
}
