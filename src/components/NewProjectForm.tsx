"use client"

import { BookmarksSimple, Check, FileText, ImageSquare, UploadSimple, XCircle } from "phosphor-react"
import { useEffect, useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import clsx from "clsx"
import Button from "../ui/Button"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { Message } from "rsuite"
import { api } from "@/lib/axios"

type labelString = "Fã-sites" | "AeA" | "Projetos" | "Habblet" | "Iron Hotel"
type checkedLabelsArray = Array<labelString>

type formValuesType = {
    title: string;
    imageUrl: string;
    description: string;
}

export default function Form() {
    const [ checkedLabels, setCheckedLabels ] = useState<checkedLabelsArray>([])
    const [ hasNotCheckedAny, setHasNotCheckedAny ] = useState(false)
    const { register, handleSubmit, formState: {isLoading, isValid, errors} } = useForm<formValuesType>()
    
    const handlePostNewProject: SubmitHandler<formValuesType> = (data) => {
        setHasNotCheckedAny(false)

        if(checkedLabels.length <= 0) {
            setHasNotCheckedAny(true)
            return;
        }

        const dataObject = {
            ...data,
            tags: checkedLabels
        }
    }
    
    function handleToggleCheckbox(label: labelString) {
        if (checkedLabels.includes(label)) {
            setCheckedLabels(prevState => prevState.filter(stateLabel => stateLabel !== label))
            return;
        }

        setCheckedLabels(prevState => {
            const newState = [...prevState, label]
            return newState
        })
    }

    return (
        <form onSubmit={handleSubmit(handlePostNewProject)} className="flex flex-col gap-6">
            {/* TITLE */}

            {errors.title ?
                <Message
                    type="error"
                    className="text-gray-500 bg-danger/10 rounded-2xl p-4 mb-1">
                    <header
                        className="flex flex-row items-center gap-2 mb-2 text-danger"
                    >
                        <XCircle size={24} weight="fill" />
                        <span>Erro no título</span>
                    </header>

                    <p>O título do projeto é obrigatório e deve ter no máximo 128 letras.</p>
                </Message>
            : null}

            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-start justify-center">
                    <BookmarksSimple size={24} stroke="1.5px" />
                </span>
                <input
                    type="text"
                    placeholder="Título"
                    {...register("title", {
                        min: 1,
                        max: 128,
                        required: true,
                    })}
                    className="py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75 focus:ring-4"
                />
            </label>

            {/* IMAGE URL */}

            {errors.imageUrl ?
                <Message
                    type="error"
                    className="text-gray-500 bg-danger/10 rounded-2xl p-4 mb-1">
                    <header
                        className="flex flex-row items-center gap-2 mb-2 text-danger"
                    >
                        <XCircle size={24} weight="fill" />
                        <span>Erro na imagem</span>
                    </header>

                    <p>É obrigatório colocar o link direto da imagem / gif do seu jogo. Recomenda-se o imgur.</p>
                </Message>
            : null}

            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-start justify-center">
                    <ImageSquare size={24} stroke="1.5px" />
                </span>
                <input
                    type="text"
                    placeholder="Link da imagem (imgur)"
                    {...register("imageUrl", {
                        required: true
                    })}
                    className="
                    py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75
                    focus:ring-4
                    "
                />
            </label>

            {/* DESCRIPTION */}

            {errors.description ?
                <Message
                    type="error"
                    className="text-gray-500 bg-danger/10 rounded-2xl p-4 mb-1">
                    <header
                        className="flex flex-row items-center gap-2 mb-2 text-danger"
                    >
                        <XCircle size={24} weight="fill" />
                        <span>Erro na descrição</span>
                    </header>

                    <p>Você precisa descrever o seu jogo em entre 5 e 256 palavras.</p>
                </Message>
            : null}

            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-start justify-center">
                    <FileText size={24} stroke="1.5px" />
                </span>
                <textarea
                    placeholder="Descreva o jogo"
                    {...register("description", {
                        required: true,
                        min: 5,
                        max: 256
                    })}
                    rows={4}
                    className="
                    py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75
                    focus:ring-4
                    resize-none
                    "
                />
            </label>

            <div>
                <label className="font-medium mb-3 block">Marcadores</label>

                {hasNotCheckedAny ?
                    <Message
                        type="error"
                        className="text-gray-500 bg-danger/10 rounded-2xl p-4 mb-3">
                        <header
                            className="flex flex-row items-center gap-2 mb-2 text-danger"
                        >
                            <XCircle size={24} weight="fill" />
                            <span>Erro nas categorias</span>
                        </header>

                        <p>Você precisa selecionar ao menos uma categoria, cururu</p>
                    </Message>
                : null}

                <div className="
                    bg-gray-100 border border-gray-400 rounded-xl p-3
                    flex flex-col gap-2
                ">
                    {["fs", "aea", "projetos", "habblet", "iron"].map((label: string, index: number) => {
                        // fs - aea - projetos - habblet - iron

                        const values = {
                            "fs": "Fa-sites",
                            "aea": "AeA",
                            "projetos": "Projetos",
                            "habblet": "Habblet",
                            "iron": "Iron Hotel",
                        } as {
                            [key: string]: string;
                        }
                                                 
                        return (
                            <label key={index} className="text-base font-medium text-gray-800 flex flex-row gap-2 items-center">
                                <Checkbox.Root
                                    title={`Checkbox para ${values[label]}`}
                                    value={label}
                                    name="tags"
                                    onCheckedChange={() => handleToggleCheckbox(label as labelString)}
                                    className={
                                        clsx(`
                                        bg-white w-8 h-8 rounded-lg ring-0 shadow-primary/25 flex items-center justify-center outline-none outline-transparent transition-all delay-75
                                        focus:ring-4 focus:ring-primary/50
                                        `,
                                        checkedLabels.includes(label as labelString) && "shadow-md",
                                        !checkedLabels.includes(label as labelString) && "shadow-sm ring-1 ring-gray-300"
                                    )}
                                >
                                    <Checkbox.Indicator>
                                        <Check size={16} weight="bold" className="text-primary" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>

                                {values[label]}
                            </label>
                        )
                    })}
                </div>
            </div>

            <Button
                type="submit"
                className="mt-6"
                disabled={ !isValid || checkedLabels.length <= 0 }
            >
                {isLoading ?
                    <>
                        <UploadSimple size={24} weight="bold" /> Adicionar
                    </>
                :
                    "Adicionando..."
                }
            </Button>
        </form>
    )
}