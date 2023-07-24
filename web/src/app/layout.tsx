import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FindAFriend",
  description:
    "FindAFriend é um projeto que visa facilitar a adoção de animais, conectando pessoas interessadas em adotar com animais disponíveis para adoção. A plataforma oferece uma maneira fácil e intuitiva de encontrar um novo amigo peludo para se juntar à sua família.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={nunito.className}>
      <body className="scrollbar-thin scrollbar-track-coral-600 scrollbar-thumb-butter-yellow-400 scrollbar-thumb-rounded-full hover:scrollbar-thumb-butter-yellow-500">
        {children}
      </body>
    </html>
  );
}
