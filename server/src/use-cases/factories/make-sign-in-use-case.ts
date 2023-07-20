import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SignInUseCase } from "../orgs/sign-in";

export function makeSignInUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const signInUseCase = new SignInUseCase(orgsRepository);

  return signInUseCase;
}
