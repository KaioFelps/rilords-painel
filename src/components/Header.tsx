'use client'

import Link from "next/link";
import Drawer from "rsuite/Drawer"
import Button from "./Button";
import { useState } from "react"
import { ArrowSquareOut, List, X } from "phosphor-react";

export default function Header() {
    const [ isDrawerOpened, setIsDrawerOpened ] = useState(false)

    function handleOpenDrawer() {
        setIsDrawerOpened(true)
        document.querySelector("body")!.classList.add("over")
    }

    function handleCloseDrawer() {
        setIsDrawerOpened(false)
        document.querySelector("body")!.classList.remove("hidden")
    }

    return (
        <>
            <header className="w-full flex items-center justify-between px-6 py-3">
                <h1
                className="text-2xl text-secondary font-bold uppercase"
                >
                    Rilords 
                </h1>

                <div className="flex items-center gap-4">
                    <nav className="max-md:hidden">
                        <Link href="/" className="py-3 px-3 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in">Início</Link>
                        <Link href="/newproject" className="py-3 px-3 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in">Adicionar projeto</Link>
                        <Link href="/manageprojects" className="py-3 px-3 rounded-full font-medium text-sm hover:bg-gray-200 active:brightness-90 transition-all delay-75 ease-in">Gerenciar projetos</Link>
                    </nav>

                    <div className="flex flex-row gap-1">
                        <Button className="max-md:hidden" variant="primary" size="sm" asChild>
                            <Link href="/">Ir ao site <ArrowSquareOut size={24} weight="bold" /></Link>
                        </Button>

                        <Button
                            className="md:hidden"
                            size="sm"
                            variant="ghost"
                            onClick={handleOpenDrawer}
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
                onClose={handleCloseDrawer}
                className="
                fixed right-0 top-0 w-full h-screen bg-gray-100
                "
            >
                <header className="bg-gray-200 p-6 w-full flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-gray-800 font-bold">Menu de navegação</h2>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleCloseDrawer}
                    >
                        <X size={24} weight="bold" />
                    </Button>
                </header>
                <nav className="flex flex-col gap-2 px-6 pb-6">
                    <Link href="/" className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75">Início</Link>
                    <Link href="/newproject" className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75">Início</Link>
                    <Link href="/manageprojects" className="py-3 px-6 rounded-full bg-primary/10 hover:bg-primary/25 hover:ring hover:ring-inset hover:ring-primary/25 active:bg-primary/40 text-lg font-medium transition-all delay-75">Início</Link>
                </nav>
                <Button className="w-[calc(100%_-_40px)] mx-auto" variant="primary" size="sm" asChild>
                    <Link href="/">Ir ao site <ArrowSquareOut size={24} weight="bold" /></Link>
                </Button>
            </Drawer>
        </>
    )
}