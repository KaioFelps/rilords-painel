'use client'

import Link from "next/link";
import Drawer from "rsuite/Drawer"
import Button from "./Button";
import { useState } from "react"
import { ArrowSquareOut, List, X } from "phosphor-react";

export default function Header() {
    const [ isDrawerOpened, setIsDrawerOpened ] = useState(false)

    return (
        <>
            <header className="w-full flex items-center justify-between px-6 py-3">
                <h1
                className="text-2xl text-secondary font-bold uppercase"
                >
                    Rilords::admin
                </h1>

                <div className="flex items-center gap-4">
                    <nav className="max-md:hidden">
                        <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Início</Link>
                        <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Adicionar projeto</Link>
                        <Link className="py-2 px-4 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in" href="/">Gerenciar projetos</Link>
                    </nav>

                    <div className="flex flex-row gap-1">
                        <Button variant="primary" size="sm" asChild>
                        <Link href="/">Ir ao site <ArrowSquareOut size={24} weight="bold" /></Link>
                        </Button>

                        <Button
                            className="md:hidden"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setIsDrawerOpened(true)
                            }}
                        >
                            <List size={24} weight="bold" />
                        </Button>
                    </div>
                </div>
            </header>
            <Drawer
                backdrop={true}
                size="full"
                keyboard
                placement="right"
                open={isDrawerOpened}
                onClose={() => setIsDrawerOpened(false)}
                className="
                fixed right-0 top-0 w-full h-screen bg-gray-100
                "
            >
                <header className="bg-gray-200 p-6 w-full flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-gray-800 font-bold">Menu de navegação</h2>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setIsDrawerOpened(false)}
                    >
                        <X size={24} weight="bold" />
                    </Button>
                </header>
                <nav className="flex flex-col gap-2 px-6 pb-6">
                    <Link className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75" href="/">Início</Link>
                    <Link className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75" href="/">Início</Link>
                    <Link className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75" href="/">Início</Link>
                </nav>
            </Drawer>
        </>
    )
}