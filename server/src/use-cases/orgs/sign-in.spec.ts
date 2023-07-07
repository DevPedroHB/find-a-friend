import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
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
    await orgsRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password_hash: await hash("123456", 6),
    });

    const { org } = await sut.execute({
      email: "jhondoe@example.com",
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
    await orgsRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "jhondoe@example.com",
        password: "654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
