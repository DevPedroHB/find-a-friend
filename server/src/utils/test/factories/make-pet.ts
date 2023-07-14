import { customFaker } from "@/lib/faker";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

export async function makePet(
  petsRepository: PetsRepository,
  override: Partial<Pet> = {}
) {
  const type = customFaker.helpers.arrayElement(["dog", "cat"]);

  const pet = await petsRepository.create({
    name: customFaker.animal.dog(),
    description: customFaker.lorem.text(),
    city: customFaker.location.city(),
    age: customFaker.helpers.arrayElement(["cub", "adolescent", "elderly"]),
    energy: customFaker.number.int({ min: 1, max: 5 }),
    size: customFaker.helpers.arrayElement(["small", "medium", "big"]),
    independence: customFaker.helpers.arrayElement(["low", "medium", "high"]),
    type,
    image_url: customFaker.image.urlLoremFlickr({ category: `${type}s` }),
    org_id: customFaker.string.uuid(),
    ...override,
  });

  return pet;
}
