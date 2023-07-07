import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SignInUseCase } from "../orgs/sign-in";
import { SignUpUseCase } from "../orgs/sign-up";

const orgsRepository = new PrismaOrgsRepository();

export function makeSignUpUseCase() {
  const signUpUseCase = new SignUpUseCase(orgsRepository);

  return signUpUseCase;
}

export function makeSignInUseCase() {
  const signInUseCase = new SignInUseCase(orgsRepository);

  return signInUseCase;
}
