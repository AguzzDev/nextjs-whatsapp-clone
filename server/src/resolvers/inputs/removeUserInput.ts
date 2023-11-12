import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class removeUserInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  chatId: string;

  @Field(() => String)
  removedByAdmin: string;
}
