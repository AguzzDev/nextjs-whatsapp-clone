import { ArgsType, Field, InputType } from "type-graphql"

@ArgsType()
export class addOrRemoveParticipantInput {
  @Field(() => [ParticipantInput])
  participants: ParticipantInput[]
}

@InputType()
export class ParticipantInput {
  @Field(() => String)
  userId: string
}