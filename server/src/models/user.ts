import { Field, ID, ObjectType } from "type-graphql";

import { Chat } from "./chat";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  image: string;
  @Field(() => String, { nullable: true })
  backgroundImage?: string | null;
  @Field(() => String, { nullable: true })
  bio?: string | null;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field(() => [Chat], { nullable: true })
  chats?: Chat[];
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: [FieldError];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field: string;
  @Field(() => String)
  message: string;
}
