import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";
import { Chat } from "./chat";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;
  @Field()
  type: string;
  @Field()
  message: string;
  @Field(() => User)
  user: User;
  @Field()
  userId: string;
  @Field(() => Chat)
  chat: Chat;
  @Field()
  chatId: string;
  @Field()
  timestamp: Date;
  @Field(() => [User])
  viewedBy: User[];
}
