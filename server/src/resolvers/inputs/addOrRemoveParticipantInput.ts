import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
export class addOrRemoveParticipantInput {
  @Field()
  type: string;

  @Field()
  chatId: string;

  @Field(() => [ParticipantInput])
  participants: ParticipantInput[];

  @Field(() => Boolean, { nullable: true })
  removedByAdmin?: boolean;
}

@InputType()
export class ParticipantInput {
  @Field(() => String)
  userId: string;
}
