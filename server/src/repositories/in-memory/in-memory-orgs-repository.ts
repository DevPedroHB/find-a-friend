import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: BigInt(data.cep),
      phone: BigInt(data.phone),
      password_hash: data.password_hash,
    };

    this.items.push(org);

    return org;
  }
}
