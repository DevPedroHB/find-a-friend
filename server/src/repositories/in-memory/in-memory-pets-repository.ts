import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetParams, PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
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
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      energy: data.energy,
      size: data.size,
      independence: data.independence,
      type: data.type,
      image_url: data.image_url,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
