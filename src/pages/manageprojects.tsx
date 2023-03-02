import ProjectCard from "@/components/ProjectCard";
import { api } from "@/lib/axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "phosphor-react";

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get("projects", {
        headers: {
            token: process.env.API_TOKEN
        },
    });

    const projects = await response.data

    return {
        props: {
            projects
        }
    }
}

type projectPropsType = {
    id: number;
    title: string;
    description: string;
    tags: string;
    image: string;
}

export default function ManageProjects({projects}: {projects: projectPropsType[]}) {
    // const currentPage = 1;
    
    return (
        <main className="w-[calc(100%_-_40px)] mx-auto max-w-4xl">
            <header className="my-12">
                <h1 className="text-2xl font-bold">Gerenciar projetos</h1>
                <p>Abaixo, todos os projetos até o momento.</p>
            </header>

            <section className="rounded-3xl border-gray-600 border flex flex-col mb-12">
                {projects.map(({ id, tags, title, image }) => {
                    const tagsArray = JSON.parse(tags)

                    return (
                        <ProjectCard
                            key={id}
                            projectId={id}
                            projectName={title}
                            image={image}
                            tags={tagsArray}
                        />
                    )
                })}
            </section>

            <section className="flex flex-row justify-between items-center border-t border-gray-300 mb-24">
                <button className="flex flex-row gap-6 items-center text-sm font-medium text-gray-700">
                    <ArrowLeft size={16} weight="bold" />
                    Página anterior
                </button>

                <div className="flex flex-row">
                    {/* <Link href="/"
                        className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 1 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}
                    >1</Link> */}
                    {/* <Link href="/" className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 2 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}>2</Link>
                    <Link href="/" className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 3 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}>3</Link>
                    <span className={clsx("relative text-lg py-[6px] px-[17px]")}>...</span>
                    <Link href="/" className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 4 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}>4</Link>
                    <Link href="/" className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 5 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}>5</Link>
                    <Link href="/" className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === 6 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}>6</Link> */}
                </div>
                
                <button className="flex flex-row gap-6 items-center text-sm font-medium text-gray-700">
                    Página posterior
                    <ArrowRight size={16} weight="bold" />
                </button>
            </section>
        </main>
    )
}