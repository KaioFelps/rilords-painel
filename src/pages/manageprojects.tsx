import ProjectCard from "@/components/ProjectCard";
import ProjectsPagination from "@/components/projectsPagination";
import { api } from "@/lib/axios";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps<any, {query?: string;}> = async ({query}) => {
    const { page } = query
    
    const response = await api.get("projects", {
        headers: {
            token: process.env.API_TOKEN
        },
        params: {
            page: page || null
        }
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
                <ProjectsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </section>
        </main>
    )
}