import { AdoptionRequirements } from "@prisma/client";

export interface AdoptionRequirementsRepository {
  create(
    requirements: string[],
    pet_id: string
  ): Promise<AdoptionRequirements[]>;
  findManyByPetId(pet_id: string): Promise<AdoptionRequirements[]>;
}
