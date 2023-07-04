import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from "type-graphql"
import * as bcrypt from "bcrypt"

import { User, UserResponse } from "../models/user"
import { createUserInput, userLoginInput } from "./inputs"
import { Context } from "../types"
import { changeProfileInput } from "./inputs/changeProfileInput"

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me(@Ctx() { req, prisma }: Context): Promise<User | null> {
    console.log(req.session.userId)
    if (!req.session.userId) return null
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    })
    return user
  }

  @Mutation(() => Boolean)
  async changeBackground(
    @Ctx() { req, prisma }: Context,
    @Arg("image") image: string
  ): Promise<Boolean> {
    const user = await prisma.user.update({
      where: { id: req.session.userId },
      data: { backgroundImage: image },
    })

    req.session.userId = user.id

    return true
  }

  @Mutation(() => Boolean)
  async changeProfile(
    @Ctx() { req, prisma }: Context,
    @Args() args: changeProfileInput,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Boolean> {
    const user = await prisma.user.update({
      where: { id: req.session.userId },
      data: args,
    })
    req.session.userId = user.id

    pubsub.publish("UPDATE_DETAILS_GROUP", true)
    return true
  }

  @Query(() => [User])
  async allUsers(@Ctx() { req, prisma }: Context) {
    return prisma.user.findMany({ where: { id: { not: req.session.userId } } })
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { req, prisma }: Context,
    @Args() { email, password }: userLoginInput
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { chatsAll: true },
    })
    if (!user)
      return {
        errors: [
          {
            field: "user",
            message: "No existe este usuario",
          },
        ],
      }

    const dehash = await bcrypt.compare(password, user.password)
    if (!dehash)
      return {
        errors: [
          { field: "password", message: "La contraseña no es correcta" },
        ],
      }

    console.log(user)
    req.session.userId = user.id
    return { user }
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { req, prisma }: Context,
    @Args() { password, name, email }: createUserInput
  ): Promise<UserResponse> {
    const findUser = await prisma.user.findUnique({
      where: { email },
      include: { chatsAll: true },
    })

    if (findUser)
      return {
        errors: [
          {
            field: "user",
            message: "El mail ya fue usado",
          },
        ],
      }

    const hash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, password: hash },
    })
    req.session.userId = user.id

    return { user }
  }
}
