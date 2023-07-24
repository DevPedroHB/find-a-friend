import { Pet } from "@/functions";

interface ICard {
  pet: Pet;
}

export function Card({ pet }: ICard) {
  return <div>{JSON.stringify(pet)}</div>;
}
