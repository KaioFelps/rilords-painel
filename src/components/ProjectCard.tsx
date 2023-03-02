import Image from "next/image";
import Tag from "rsuite/Tag";
import Button from "./Button";

type ProjectCardPropsType = {
    image: string;
    projectName: string;
    tags: Array<string>;
    projectId: number;
}

export default function ProjectCard({ image, projectId, projectName, tags }: ProjectCardPropsType) {
    return (
        <article className="flex flex-row justify-between items-center p-4 border-b-gray-600 [&:not(:last-child)]:border-b">
            <div className="flex flex-row gap-3 items-center flex-1">
                <Image src={image} alt="" width={48} height={48} className="rounded-full bg-gray-400 border-0 object-cover h-[48px] w-[48px]" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-base text-primary">
                        {projectName}
                    </h2>
                    <div className="flex flex-row gap-1">
                        {tags.map(tag => {
                            return (
                                <Tag
                                    key={tag}
                                    className="bg-gray-300 rounded-full text-sm font-medium text-gray-800 w-fit px-3 py-1"
                                >
                                    {tag}
                                </Tag>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-1">
                <Button variant="simple" size="xs">Editar</Button>
                <Button variant="simple" size="xs" className="text-danger outline-danger/40">Apagar</Button>
            </div>
        </article>
    )
}