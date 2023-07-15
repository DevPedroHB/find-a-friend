import { customFaker } from "@/lib/faker";
import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { AdoptionRequirements } from "@prisma/client";

export async function makeAdoptionRequirements(
  adoptionRequirementsRepository: AdoptionRequirementsRepository,
  quantity = 1,
  override: Partial<AdoptionRequirements> = {}
) {
  const requirements: string[] = [];
  const pet_id = override.pet_id ? override.pet_id : customFaker.string.uuid();

  for (let i = 0; i < quantity; i++) {
    requirements.push(
      override.title ? override.title : customFaker.lorem.text()
    );
  }

  const adoption_requirements = await adoptionRequirementsRepository.create(
    requirements,
    pet_id
  );

  return adoption_requirements;
}
