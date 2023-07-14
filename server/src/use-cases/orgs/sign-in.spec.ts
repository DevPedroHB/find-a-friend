import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { makeOrg } from "@/utils/test/factories/make-org";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { SignInUseCase } from "./sign-in";

let orgsRepository: InMemoryOrgsRepository;
let sut: SignInUseCase;

describe("Sign-In Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new SignInUseCase(orgsRepository);
  });

  it("should be able to sign-in", async () => {
    const orgCreated = await makeOrg(orgsRepository);

    const { org } = await sut.execute({
      email: orgCreated.email,
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to sign-in with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "jhondoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to sign-in with wrong password", async () => {
    const orgCreated = await makeOrg(orgsRepository);

    await expect(() =>
      sut.execute({
        email: orgCreated.email,
        password: "654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
