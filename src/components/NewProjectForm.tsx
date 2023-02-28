"use client"

import { BookmarksSimple, Check, FileText, ImageSquare, UploadSimple } from "phosphor-react"
import { FormEvent, useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import clsx from "clsx"
import Button from "./Button"

type labelString = "Fã-sites" | "AeA" | "Projetos" | "Habblet" | "Iron Hotel"
type checkedLabelsArray = Array<labelString>

export default function Form() {
    const [ checkedLabels, setCheckedLabels ] = useState<checkedLabelsArray>([])

    function handleToggleCheckbox(label: labelString) {
        if (checkedLabels.includes(label)) {
            setCheckedLabels(prevState => prevState.filter(stateLabel => stateLabel !== label))
            return;
        }

        setCheckedLabels(prevState => [...prevState, label])
    }

    function handleFormSubmit(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-center justify-center">
                    <BookmarksSimple size={24} stroke="1.5px" />
                </span>
                <input
                    type="text"
                    placeholder="Título"
                    className="
                    py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75
                    focus:ring-4
                    "
                />
            </label>

            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-center justify-center">
                    <ImageSquare size={24} stroke="1.5px" />
                </span>
                <input
                    type="text"
                    placeholder="Link da imagem (imgur)"
                    className="
                    py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75
                    focus:ring-4
                    "
                />
            </label>

            <label className="
                bg-gray-100 border border-gray-400 rounded-3xl
                flex flex-row
            ">
                <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-center justify-center">
                    <FileText size={24} stroke="1.5px" />
                </span>
                <textarea
                    placeholder="Descreva o jogo"
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
                <div className="
                    bg-gray-100 border border-gray-400 rounded-xl p-3
                    flex flex-col gap-2
                ">
                    {["Fã-sites", "AeA", "Projetos", "Habblet", "Iron Hotel"].map((label, index) => {
                        return (
                            <label key={index} className="text-base font-medium text-gray-800 flex flex-row gap-2 items-center">
                                <Checkbox.Root
                                    value={label}
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

                                {label}
                            </label>
                        )
                    })}
                </div>
            </div>

            <Button className="mt-6">
                <UploadSimple size={24} weight="bold" /> Adicionar
            </Button>
        </form>
    )
}