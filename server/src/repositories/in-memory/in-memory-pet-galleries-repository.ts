import { PetGallery } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetGalleriesRepository } from "../pet-galleries-repository";

export class InMemoryPetGalleriesRepository implements PetGalleriesRepository {
  public items: PetGallery[] = [];

  async create(images: string[], pet_id: string) {
    const pet_galleries = images.map((image) => ({
      id: randomUUID(),
      image_url: image,
      pet_id,
    }));

    this.items.push(...pet_galleries);

    return pet_galleries;
  }

  async findManyByPetId(pet_id: string) {
    const pet_galleries = this.items.filter((item) => item.pet_id === pet_id);

    return pet_galleries;
  }
}
