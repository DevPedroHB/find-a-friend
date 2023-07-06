import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

interface SignUpUseCaseRequest {
  name: string;
  email: string;
  address: string;
  cep: number;
  phone: number;
  password: string;
}

interface SignUpUseCaseResponse {
  org: Org;
}

export class SignUpUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    address,
    cep,
    phone,
    password,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      phone,
      password_hash,
    });

    return {
      org,
    };
  }
}
