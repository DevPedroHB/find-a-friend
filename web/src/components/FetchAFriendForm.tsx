"use client";

import { Select } from "@/components/Select";
import { Cities, States, getCities } from "@/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import searchIcon from "public/images/search-icon.svg";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface IFetchAFriendForm {
  states: States[];
}

const FetchAFriendFormSchema = z.object({
  uf_code: z.string(),
  city: z.string(),
});

export type FetchAFriendFormData = z.infer<typeof FetchAFriendFormSchema>;

export function FetchAFriendForm({ states }: IFetchAFriendForm) {
  const [cities, setCities] = useState<Cities[]>([]);
  const router = useRouter();

  const { handleSubmit, control, reset, watch, setValue } =
    useForm<FetchAFriendFormData>({
      resolver: zodResolver(FetchAFriendFormSchema),
      defaultValues: {
        uf_code: "SP",
        city: "INDAIATUBA",
      },
    });

  const uf_code = watch("uf_code");

  const handleGetCities = useCallback(async () => {
    const { cities } = await getCities(uf_code);

    setCities(cities);
  }, [uf_code]);

  useEffect(() => {
    handleGetCities();
  }, [uf_code, handleGetCities]);

  useEffect(() => {
    if (cities.length > 0) {
      setValue("city", cities[0].nome);
    } else {
      setValue("city", "");
    }
  }, [cities]);

  function handleFetchAFriend(data: FetchAFriendFormData) {
    router.push(`/pets/${data.city}`);

    reset();
  }

  return (
    <form
      className="flex items-center"
      onSubmit={handleSubmit(handleFetchAFriend)}
    >
      <label className="mr-6 font-light" htmlFor="cities">
        Busque um amigo:
      </label>
      <div className="flex items-center gap-3">
        <Controller
          name="uf_code"
          control={control}
          render={({ field }) => {
            return (
              <Select.Root
                idHtmlFor="states"
                defaultValue={field.value}
                onValueChange={(selected) => {
                  field.onChange(selected);
                }}
                value={field.value}
              >
                {states.map((state) => (
                  <Select.Item key={state.id} value={state.sigla}>
                    {state.sigla}
                  </Select.Item>
                ))}
              </Select.Root>
            );
          }}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => {
            return (
              <Select.Root
                idHtmlFor="cities"
                variant="secondary"
                defaultValue={field.value}
                onValueChange={(selected) => {
                  field.onChange(selected);
                }}
                value={field.value}
              >
                {cities.map((city) => (
                  <Select.Item
                    key={city.codigo_ibge}
                    value={city.nome}
                    variant="secondary"
                  >
                    {city.nome}
                  </Select.Item>
                ))}
              </Select.Root>
            );
          }}
        />
      </div>
      <button
        className="ml-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl bg-butter-yellow-400 transition-colors hover:bg-butter-yellow-500"
        type="submit"
      >
        <Image
          src={searchIcon}
          alt="Um ícone de lupa."
          className="h-[1.625rem] w-[1.625rem]"
        />
      </button>
    </form>
  );
}
