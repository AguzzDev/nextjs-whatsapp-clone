import { Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "../types";

@Resolver()
export class ResetResolver {
  @Mutation(() => Boolean)
  async resetDatabase(@Ctx() { prisma }: Context): Promise<Boolean> {
    if (!process.env.NODE_ENV!.includes("test")) return false;

    await prisma.chat.deleteMany({});
    await prisma.user.deleteMany({});
    return true;
  }
}
