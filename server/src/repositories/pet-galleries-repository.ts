import { PetGallery } from "@prisma/client";

export interface PetGalleriesRepository {
  create(images: string[], pet_id: string): Promise<PetGallery[]>;
  findManyByPetId(pet_id: string): Promise<PetGallery[]>;
}
