import { prisma } from "@/lib/prisma";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async create(requirements: string[], pet_id: string) {
    const data = requirements.map((requirement) => ({
      title: requirement,
      pet_id,
    }));

    await prisma.adoptionRequirements.createMany({
      data,
    });

    const adoption_requirements = await this.findManyByPetId(pet_id);

    return adoption_requirements;
  }

  async findManyByPetId(pet_id: string) {
    const adoption_requirements = await prisma.adoptionRequirements.findMany({
      where: {
        pet_id,
      },
    });

    return adoption_requirements;
  }
}
