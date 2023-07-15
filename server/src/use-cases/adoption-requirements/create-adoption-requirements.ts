import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { AdoptionRequirements } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateAdoptionRequirementsUseCaseRequest {
  requirements: string[];
  pet_id: string;
}

interface CreateAdoptionRequirementsUseCaseResponse {
  adoption_requirements: AdoptionRequirements[];
}

export class CreateAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    requirements,
    pet_id,
  }: CreateAdoptionRequirementsUseCaseRequest): Promise<CreateAdoptionRequirementsUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const adoption_requirements =
      await this.adoptionRequirementsRepository.create(requirements, pet_id);

    return {
      adoption_requirements,
    };
  }
}
