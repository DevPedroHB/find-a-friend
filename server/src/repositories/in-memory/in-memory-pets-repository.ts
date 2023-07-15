import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";
import { PetGalleriesRepository } from "../pet-galleries-repository";
import { PetParams, PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private petGalleriesRepository: PetGalleriesRepository
  ) {}

  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    const adoptionRequirements =
      await this.adoptionRequirementsRepository.findManyByPetId(id);
    const petGalleries = await this.petGalleriesRepository.findManyByPetId(id);

    const petWithAdoptionRequirementsAndPetGalleries = {
      ...pet,
      adoptionRequirements,
      petGalleries,
    };

    return petWithAdoptionRequirementsAndPetGalleries;
  }

  async searchMany(city: string, params?: PetParams) {
    const pets = this.items.filter((item) => {
      return (
        item.city === city &&
        (!params ||
          Object.entries(params).every(
            ([key, value]) => item[key as keyof typeof item] === value
          ))
      );
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(pet);

    return pet;
  }
}
