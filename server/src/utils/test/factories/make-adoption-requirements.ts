import { customFaker } from "@/lib/faker";
import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { AdoptionRequirements } from "@prisma/client";

export async function makeAdoptionRequirements(
  adoptionRequirementsRepository: AdoptionRequirementsRepository,
  quantity = 1,
  override: Partial<AdoptionRequirements> = {}
) {
  const adoptionRequirements = [];

  for (let i = 0; i < quantity; i++) {
    const newRequirement = {
      title: customFaker.lorem.text(),
      pet_id: customFaker.string.uuid(),
      ...override,
    };

    adoptionRequirements.push(newRequirement);
  }

  const createdRequirements = await adoptionRequirementsRepository.create(
    adoptionRequirements
  );

  return createdRequirements;
}
