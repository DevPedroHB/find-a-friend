"use client";

import { Card } from "@/components/Card";
import { Select } from "@/components/Select";
import { Pet, getPets } from "@/functions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IParams {
  city: string;
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const params = useParams() as unknown as IParams;

  async function handleGetPets() {
    const { pets } = await getPets(params.city);

    setPets(pets);
  }

  useEffect(() => {
    handleGetPets();
  }, []);

  return (
    <div className="flex">
      <aside className="min-h-screen w-96 bg-coral-500 text-white">Aside</aside>
      <div className="h-screen flex-1 overflow-y-scroll bg-baby-pink-100 px-8 pb-12 pt-36 text-midnight-blue-800">
        <header className="mb-11 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xl font-normal italic">
            Encontre <strong>324 amigos</strong> em sua cidade
          </span>
          <Select.Root idHtmlFor="types" defaultValue="all" variant="tertiary">
            <Select.Item value="all" variant="tertiary">
              Gatos e Cachorros
            </Select.Item>
            <Select.Item value="dog" variant="tertiary">
              Cachorros
            </Select.Item>
            <Select.Item value="cat" variant="tertiary">
              Gatos
            </Select.Item>
          </Select.Root>
        </header>
        <main className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-8">
          {pets.map((pet) => (
            <Card key={pet.id} pet={pet} />
          ))}
        </main>
      </div>
    </div>
  );
}
