import { Field, ID, ObjectType } from "type-graphql";

import { User } from "./user";
import { Message } from "./messages";

enum Actions {
  ADD_MESSAGE = "ADD_MESSAGE",
  ADD_USER = "ADD_USER",
  ADD_ADMIN = "ADD_ADMIN",
  REMOVE_ADMIN = "REMOVE_ADMIN",
  REMOVE_USER = "REMOVE_USER",
  REMOVE_CHAT = "REMOVE_CHAT",
}

@ObjectType()
export class Chat {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  image: string;
  @Field(() => User)
  owner?: User | null;
  @Field(() => ID)
  ownerId?: string | null;
  @Field(() => [Participant], { nullable: true })
  participants?: Participant[];
  @Field(() => [Message], { nullable: true })
  messages?: Message[];
  @Field(() => [User], { nullable: true })
  usersOnline?: User[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Participant {
  @Field(() => User)
  user?: User;
  @Field()
  userId: string;
  @Field(() => Chat)
  chat?: Chat;
  @Field()
  chatId: string;
  @Field()
  role: string;
  @Field()
  unViewedMessages: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
@ObjectType()
class UserSub {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field(() => String, { nullable: true })
  image?: string | null;
}
@ObjectType()
export class MessageSub {
  @Field(() => ID)
  id: string;
  @Field()
  type: string;
  @Field()
  message: string;
  @Field(() => UserSub)
  user: UserSub;
  @Field()
  timestamp: Date;
}

@ObjectType()
class ActionType {
  @Field()
  action: Actions;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class updateChat {
  @Field()
  type: ActionType;
  @Field()
  chat: Chat;
  @Field()
  by: string;
}
