import { ArgsType, Field } from "type-graphql"
import { MaxLength } from "class-validator"
import { ParticipantInput } from "./addOrRemoveParticipantInput"

@ArgsType()
export class createChatInput {
  @Field(() => String)
  @MaxLength(50)
  name: string

  @Field(() => String, { nullable: true })
  @MaxLength(250)
  description?: string | undefined

  @Field(() => String)
  image: string

  @Field(() => [ParticipantInput])
  participants: ParticipantInput[]
}
