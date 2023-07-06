import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SignUpUseCase } from "../orgs/sign-up";

export function makeSignUpUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const signUpUseCase = new SignUpUseCase(orgsRepository);

  return signUpUseCase;
}
