'use client'

import Link from "next/link";
import { ArrowSquareOut } from "phosphor-react";
import Button from "./Button";

export default function Header() {
    return (
        <header className="w-full flex items-center justify-between px-6 py-3">
            <h1
            className="text-2xl text-secondary font-bold uppercase"
            >
                Rilords::admin
            </h1>

            <div className="flex items-center gap-4">
                <nav>
                <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Início</Link>
                <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Adicionar projeto</Link>
                <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Gerenciar projetos</Link>
                </nav>

                <Button variant="primary" size="sm" asChild>
                <Link href="/">Ir ao site <ArrowSquareOut size={24} weight="bold" /></Link>
                </Button>
            </div>
        </header>
    )
}