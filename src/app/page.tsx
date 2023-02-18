import Box from "@/components/Box";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import TullaLuanaPensando from "../assets/tulla-luana.png"

export default function Home() {
  return (
    <main className="max-w-[992px] w-[calc(100%_-_48px)] m-auto">
      <div
        className="relative mt-12 w-full"
      >
        <Image className="max-[640px]:mx-auto max-[640px]:w-full max-[640px]:rounded-xl" src={TullaLuanaPensando} alt="Tulla luana pensativa" />
        <Box size="lg" asChild>
          <div className="flex flex-col gap-6 max-w-[600px] min-[640px]:absolute right-0 min-[640px]:bottom-1/2 min-[640px]:translate-y-1/2 sm:w-2/3 max-[640px]:w-[calc(100%_-_64px)] max-[640px]:-mt-16 max-[640px]:mx-auto max-[640px]:relative max-[320px]:mt-4 max-[320px]:w-full">
            <h2 className="text-4xl font-bold max-[320px]:text-xl">Olá galalau de porra do caralho!</h2>

            <p>
            Você anda muito vagabundo, até o presente momento só tem <strong>12 projetos publicados</strong>. E digo mais, você não posta um joguinho de merda seu há <strong>8 dias</strong>.
            </p>
          </div>
        </Box>
      </div>

      <section className="mt-16 mb-24">
        <h3 className="text-2xl font-bold mb-4">O que você vai fazer sobre isso, hein culords?</h3>

        <div className="flex flex-row gap-3 h-[120px] max-[640px]:flex-col">
          <Button variant="ghost" size="lg" wFull hFull asChild>
            <Link href="/">
              Gerenciar jogos
            </Link>
          </Button>

          <Button variant="ghost" size="lg" wFull hFull asChild>
            <Link href="/">
              Adicionar um novo jogo
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
