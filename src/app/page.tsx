import Box from "@/components/Box";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import TullaLuanaPensando from "../assets/tulla-luana.png"

export default function Home() {
  return (
    <main className="max-w-[992px] w-[calc(100%_-_48px)] m-auto">
      <div
        className="relative mt-12"
      >
        <Image src={TullaLuanaPensando} alt="Tulla luana pensativa" />
        <Box size="lg" asChild>
          <div className="flex flex-col gap-6 max-w-[600px] absolute right-0 top-1/2 -translate-y-1/2">
            {/* <h2 className="text-4xl font-bold">Olá galalau de porra do caralho!</h2> */}

            <p>
            Você anda muito vagabundo, até o presente momento só tem <strong>12 projetos publicados</strong>. E digo mais, você não posta um joguinho de merda seu há <strong>8 dias</strong>.
            </p>
          </div>
        </Box>  
      </div>

      <section className="mt-16">
        <h3 className="text-2xl font-bold mb-4">O que você vai fazer sobre isso, hein culords?</h3>

        <div className="flex flex-row gap-3 h-[120px]">
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
