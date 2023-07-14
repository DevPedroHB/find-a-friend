import { AdoptionRequirements, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = [];

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput[]) {
    const adoption_requirements: AdoptionRequirements[] = data.map((item) => ({
      id: randomUUID(),
      title: item.title,
      pet_id: item.pet_id,
    }));

    this.items.push(...adoption_requirements);

    return adoption_requirements;
  }

  async findManyByPetId(petId: string) {
    const adoption_requirements = this.items.filter(
      (ar) => ar.pet_id === petId
    );

    return adoption_requirements;
  }
}
