import Image from "next/image";
import Tag from "rsuite/Tag";
import Button from "./Button";

type ProjectCardPropsType = {
    image: string;
    projectName: string;
    tags: Array<string>;
    projectId: string;
}

export default function ProjectCard() {
    return (
        <article className="flex flex-row justify-between items-center p-4 border-b-gray-600 [&:not(:last-child)]:border-b">
            <div className="flex flex-row gap-3 items-center flex-1">
                <Image src="" alt="" width={48} height={48} className="rounded-full bg-gray-400 border-0" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-base text-primary">Nome do projeto</h2>
                    <div>
                        <Tag
                            className="bg-gray-300 rounded-full text-sm font-medium text-gray-800 w-fit px-3 py-1"
                        >Iron</Tag>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-1">
                <Button variant="simple" size="xs">Editar</Button>
                <Button variant="simple" size="xs">Apagar</Button>
            </div>
        </article>
    )
}