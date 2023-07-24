import { FetchAFriendForm } from "@/components/FetchAFriendForm";
import { getStates } from "@/functions";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroImg from "public/images/hero.svg";
import logoWithTextImg from "public/images/logo-with-text.svg";

export const metadata: Metadata = {
  title: "FindAFriend | Home",
};

export default async function Home() {
  const { states } = await getStates();

  return (
    <div className="flex min-h-screen justify-center bg-coral-500 text-white">
      <div className="mx-auto flex w-full max-w-[calc(76rem+6rem)] flex-col gap-12 px-12 py-28">
        <header className="flex items-center gap-3">
          <Image
            src={logoWithTextImg}
            alt="Logotipo FindAFriend"
            className="h-auto w-full max-w-[13.4375rem]"
          />
          <div className="ml-auto flex gap-3 ">
            <Link
              className="text-xl font-bold transition-all hover:brightness-90"
              href="/sign-in"
            >
              Entrar
            </Link>
            <Link
              className="text-xl font-bold transition-all hover:brightness-90"
              href="/sign-up"
            >
              Inscrever-se
            </Link>
          </div>
        </header>
        <main className="flex items-end justify-between gap-8">
          <strong className="max-w-[30.4375rem] text-7xl font-extrabold leading-[90%]">
            Leve a felicidade para o seu lar
          </strong>
          <Image
            src={heroImg}
            alt="Ilustração estilo cartoon de cachorros."
            className="w-full max-w-lg"
          />
        </main>
        <footer className="mt-28 flex items-center justify-between gap-4">
          <span className="max-w-[407px] text-2xl font-semibold leading-8">
            Encontre o animal de estimação ideal para seu estilo de vida!
          </span>
          <FetchAFriendForm states={states} />
        </footer>
      </div>
    </div>
  );
}
