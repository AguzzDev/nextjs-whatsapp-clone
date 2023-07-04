import { Field, ID, ObjectType } from "type-graphql"

import { User } from "./user"

@ObjectType()
export class Chat {
  @Field(() => ID)
  id: string
  @Field()
  name: string
  @Field()
  description: string
  @Field()
  image: string
  @Field(() => User)
  owner?: User
  @Field()
  ownerId?: string
  @Field(() => [Participant], { nullable: true })
  participants?: Participant[]
  @Field(() => [Message], { nullable: true })
  messages?: Message[]
  @Field()
  createdAt: Date
  @Field()
  updatedAt: Date
}

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string
  @Field()
  type: string
  @Field()
  message: string
  @Field(() => User)
  user: User
  @Field()
  userId: string
  @Field(() => Chat)
  chat: Chat
  @Field()
  chatId: string
  @Field()
  timestamp: Date
}

@ObjectType()
export class Participant {
  @Field(() => User)
  user?: User
  @Field()
  userId: string
  @Field(() => Chat)
  chat?: Chat
  @Field()
  chatId: string
  @Field()
  role: string
}

