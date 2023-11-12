import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcrypt";

import { User, UserResponse } from "../models/user";
import { createUserInput, userLoginInput } from "./inputs";
import { Context } from "../types";
import { changeProfileInput } from "./inputs/changeProfileInput";
import { listOfUsersToInvite } from "../helpers/listOfUsersToInvite";
import { findChatById } from "../helpers/findChatById";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me(
    @Ctx() { req, prisma }: Context,
    @Arg("id", { nullable: true }) id: string
  ): Promise<User | null> {
    if (!req.session.userId) return null;
    const user = await prisma.user.findUnique({
      where: { id: id ? id : req.session.userId },
    });
    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("userCookie");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async changeBackground(
    @Ctx() { req, prisma }: Context,
    @Arg("image") image: string
  ): Promise<Boolean> {
    await prisma.user.update({
      where: { id: req.session.userId },
      data: { backgroundImage: image },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async changeProfile(
    @Ctx() { req, prisma }: Context,
    @Args() args: changeProfileInput
  ): Promise<Boolean> {
    await prisma.user.update({
      where: { id: req.session.userId },
      data: args,
    });

    return true;
  }

  @Query(() => [User])
  async allUsers(@Ctx() { req, prisma }: Context) {
    return await prisma.user.findMany({
      where: { id: { not: req.session.userId } },
    });
  }

  @Query(() => [User])
  async allUsersToInvite(@Arg("chatId") chatId: string) {
    const chat = await findChatById({ id: chatId });

    return await listOfUsersToInvite({
      participants: chat!.participants,
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { req, prisma }: Context,
    @Args() { email, password }: userLoginInput
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { chatsAll: true },
    });
    if (!user)
      return {
        errors: [
          {
            field: "email",
            message: "No existe este usuario",
          },
        ],
      };

    const dehash = await bcrypt.compare(password, user.password);
    if (!dehash)
      return {
        errors: [
          { field: "password", message: "La contraseña no es correcta" },
        ],
      };

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { req, prisma }: Context,
    @Args() { password, name, email }: createUserInput
  ): Promise<UserResponse> {
    const findUser = await prisma.user.findUnique({
      where: { email },
      include: { chatsAll: true },
    });

    if (findUser)
      return {
        errors: [
          {
            field: "email",
            message: "El mail ya fue usado",
          },
        ],
      };

    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });
    req.session.userId = user.id;

    return { user };
  }
}
