import { TPet } from "@/models/pets";
import Image from "next/image";
import logoImg from "public/images/logo.svg";

interface ICard {
  pet: TPet;
}

export function Card({ pet }: ICard) {
  return (
    <div className="group flex w-full flex-col items-center overflow-hidden rounded-3xl bg-white transition-colors hover:bg-midnight-blue-800 hover:text-white">
      <div className="w-full">
        <Image
          className="h-[12.5rem] w-full object-cover"
          src={pet.image_url}
          alt={`Foto de ${pet.name}`}
          width={200}
          height={200}
        />
      </div>
      <div>
        <div className="mx-auto mt-[-1.5625rem] flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-[.125rem] transition-colors group-hover:bg-midnight-blue-800">
          <div
            className={`flex h-full w-full items-center justify-center rounded-xl ${
              pet.type === "dog" ? "bg-coral-500" : "bg-butter-yellow-400"
            }`}
          >
            <Image className="w-4" src={logoImg} alt="Logotipo FindAFriend" />
          </div>
        </div>
        <p className="mx-auto mb-4 mt-2 text-lg font-bold">{pet.name}</p>
      </div>
    </div>
  );
}
