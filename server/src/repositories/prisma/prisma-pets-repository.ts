import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetParams, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        adoptionRequirements: true,
        petGalleries: true,
      },
    });

    return pet;
  }

  async searchMany(city: string, params?: PetParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...params,
      },
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
