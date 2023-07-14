import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { AdoptionRequirements, Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateAdoptionRequirementsUseCaseRequest {
  adoptionRequirements: Prisma.AdoptionRequirementsUncheckedCreateInput[];
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
    adoptionRequirements,
  }: CreateAdoptionRequirementsUseCaseRequest): Promise<CreateAdoptionRequirementsUseCaseResponse> {
    const pet = await this.petsRepository.findById(
      adoptionRequirements[0].pet_id
    );

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const adoption_requirements =
      await this.adoptionRequirementsRepository.create(adoptionRequirements);

    return {
      adoption_requirements,
    };
  }
}
