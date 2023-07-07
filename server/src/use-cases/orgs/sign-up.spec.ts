import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";
import { SignUpUseCase } from "./sign-up";

let orgsRepository: InMemoryOrgsRepository;
let sut: SignUpUseCase;

describe("Sign-Up Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new SignUpUseCase(orgsRepository);
  });

  it("should be able to sign-up", async () => {
    const { org } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash user password upon sign-up", async () => {
    const { org } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able sign-up with same email twice", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Jhon Doe",
      email,
      address: "123 Main Street",
      cep: 13346360,
      phone: 19991994368,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Jhon Doe",
        email,
        address: "123 Main Street",
        cep: 13346360,
        phone: 19991994368,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
