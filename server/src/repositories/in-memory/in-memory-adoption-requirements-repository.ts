import { AdoptionRequirements } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = [];

  async create(requirements: string[], pet_id: string) {
    const adoption_requirements = requirements.map((requirement) => ({
      id: randomUUID(),
      title: requirement,
      pet_id,
    }));

    this.items.push(...adoption_requirements);

    return adoption_requirements;
  }

  async findManyByPetId(pet_id: string) {
    const adoption_requirements = this.items.filter(
      (item) => item.pet_id === pet_id
    );

    return adoption_requirements;
  }
}
