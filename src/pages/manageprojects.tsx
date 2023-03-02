import ProjectCard from "@/components/ProjectCard";
import { api } from "@/lib/axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "phosphor-react";


type projectPropsType = {
    id: number;
    title: string;
    description: string;
    tags: string;
    image: string;
}

type ManageProjectsPropsType = {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalProjectsLength: number;
    responseLength: number;
    projects: projectPropsType[];
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get("projects", {
        headers: {
            token: process.env.API_TOKEN
        },
    });

    const { currentPage, perPage, responseLength, data, totalProjectsLength, totalPages } = await response.data

    return {
        props: {
            currentPage,
            perPage,
            totalPages,
            responseLength,
            projects: data,
            totalProjectsLength,
        } as ManageProjectsPropsType
    }
}

export default function ManageProjects({ projects, currentPage, perPage, responseLength, totalProjectsLength, totalPages }: ManageProjectsPropsType) {
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

                    {[0, 1].map((page: number) => {
                        return (
                            <Link href="#"
                                key={page + 1}
                                className={clsx("relative text-lg py-[6px] px-[17px]", currentPage === page + 1 && "before:w-full before:bg-primary before:h-[2px] before:absolute before:-top-[2px] before:right-0")}
                            >
                                {page + 1}
                            </Link>
                        )
                    })}
                    
                    {/* <span className={clsx("relative text-lg py-[6px] px-[17px]")}>...</span> */}
                </div>
                
                <button className="flex flex-row gap-6 items-center text-sm font-medium text-gray-700">
                    Página posterior
                    <ArrowRight size={16} weight="bold" />
                </button>
            </section>
        </main>
    )
}