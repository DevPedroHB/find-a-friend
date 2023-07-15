import { AdoptionRequirements, Pet, PetGallery, Prisma } from "@prisma/client";

export interface PetParams {
  age?: "cub" | "adolescent" | "elderly";
  energy?: number;
  independence?: "low" | "medium" | "high";
  size?: "small" | "medium" | "big";
  type?: "dog" | "cat";
}

export interface PetsRepository {
  findById(id: string): Promise<
    | (Pet & {
        adoption_requirements: AdoptionRequirements[];
        pet_galleries: PetGallery[];
      })
    | null
  >;
  searchMany(city: string, params?: PetParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
