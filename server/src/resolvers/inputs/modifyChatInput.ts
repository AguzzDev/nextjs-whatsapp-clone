import { ArgsType, Field } from "type-graphql";
import { MaxLength } from "class-validator";

@ArgsType()
export class modifyChatInput {
  @Field(() => String, { nullable: true })
  @MaxLength(50)
  name?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(250)
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
