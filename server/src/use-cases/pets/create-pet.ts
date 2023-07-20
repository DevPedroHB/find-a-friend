import { env } from "@/env";
import { LocationsRepository } from "@/repositories/locations-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { titleize } from "@/utils/titleize";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  description: string;
  age: "cub" | "adolescent" | "elderly";
  energy: number;
  size: "small" | "medium" | "big";
  independence: "low" | "medium" | "high";
  type: "dog" | "cat";
  image_url: string;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
    private locationsRepository: LocationsRepository
  ) {}

  async execute({
    name,
    description,
    age,
    energy,
    size,
    independence,
    type,
    image_url,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const location = await this.locationsRepository.findGeoLocationByCEP(
      org.cep
    );

    if (!location) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      city: titleize(location.city),
      age,
      energy,
      size,
      independence,
      type,
      image_url,
      org_id: org.id,
    });

    return {
      pet: {
        ...pet,
        image_url: `${env.RENDER_EXTERNAL_URL}/images/${pet.image_url}`,
      },
    };
  }
}
