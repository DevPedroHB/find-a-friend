import { prisma } from "@/lib/prisma";
import { PetGalleriesRepository } from "../pet-galleries-repository";

export class PrismaPetGalleriesRepository implements PetGalleriesRepository {
  async create(images: string[], pet_id: string) {
    const data = images.map((image) => ({
      image_url: image,
      pet_id,
    }));

    await prisma.petGallery.createMany({
      data,
    });

    const pet_galleries = await this.findManyByPetId(pet_id);

    return pet_galleries;
  }

  async findManyByPetId(pet_id: string) {
    const pet_galleries = await prisma.petGallery.findMany({
      where: {
        pet_id,
      },
    });

    return pet_galleries;
  }
}
