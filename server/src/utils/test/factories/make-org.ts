import { customFaker } from "@/lib/faker";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

export async function makeOrg(
  orgsRepository: OrgsRepository,
  override: Partial<Org> = {}
) {
  const org = await orgsRepository.create({
    name: customFaker.company.name(),
    email: customFaker.internet.email(),
    address: customFaker.location.streetAddress({ useFullAddress: true }),
    cep: 13346360,
    phone: Number(customFaker.phone.number("###########")),
    password_hash: await hash("123456", 6),
    ...override,
  });

  return org;
}
