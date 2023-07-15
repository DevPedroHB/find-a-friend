import { customFaker } from "@/lib/faker";
import { PetGalleriesRepository } from "@/repositories/pet-galleries-repository";
import { PetGallery } from "@prisma/client";

export async function makePetGalleries(
  petGalleriesRepository: PetGalleriesRepository,
  quantity = 1,
  override: Partial<PetGallery> = {}
) {
  const images: string[] = [];
  const pet_id = override.pet_id ? override.pet_id : customFaker.string.uuid();

  for (let i = 0; i < quantity; i++) {
    images.push(
      override.image_url
        ? override.image_url
        : customFaker.image.urlLoremFlickr({ category: "animals" })
    );
  }

  const pet_galleries = await petGalleriesRepository.create(images, pet_id);

  return pet_galleries;
}
