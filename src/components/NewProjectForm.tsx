"use client"

import { BookmarksSimple, Check, FileText, ImageSquare, Key, UploadSimple, XCircle } from "phosphor-react"
import { ChangeEvent, useRef, useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import clsx from "clsx"
import Button from "../ui/Button"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { Message } from "rsuite"
import { api } from "@/lib/axios"
import Dialog, { CloseButton } from "@/ui/Dialog"
import Image from "next/image"
import Box from "@/ui/Box"

import TullaDedoNaCara from "../assets/tulla-dedo-na-cara.png"
import TullaMaoNoQueixo from "../assets/tulla-mao-no-queixo.png"

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
    const { register, handleSubmit, formState: {isValid, errors}, reset } = useForm<formValuesType>()
    const [ formStep, setFormStep ] = useState(0)
    const [ newProjectData, setNewProjectData ] = useState({})
    const [ dialogPassword, setDialogPassword ] = useState("")

    const passwordInputRef = useRef<HTMLInputElement>(null)
    
    async function handlePostNewProject() {
        try {
            const response = await api.post("/newproject", newProjectData, {
                headers: {
                    token: passwordInputRef.current!.value
                }
            })

            setFormStep(2)
            setCheckedLabels([])
            passwordInputRef.current!.value=""
            reset()
        }
        
        catch {
            setFormStep(0)
            setDialogPassword("")
            setCheckedLabels([])
            console.log("Algo deu errado")
        }
    }

    const handleOpenSecondStepModal: SubmitHandler<formValuesType> = (data) => {
        setHasNotCheckedAny(false)

        if(checkedLabels.length <= 0) {
            setHasNotCheckedAny(true)
            return;
        }

        setNewProjectData({
            ...data,
            tags: checkedLabels
        })

        setFormStep(1)
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

    function handleTypePassword(event: ChangeEvent<HTMLInputElement>) {
        const input = event.target

        setDialogPassword(input.value)
    }

    const firstStepContent = (
        <div className="relative">
            <Image className="absolute left-0 top-0 -translate-x-[30%] min-w-[533px] h-[300px] rounded-3xl shadow-primary/25 shadow-2xl" src={TullaDedoNaCara} alt="Tulla Luana apontando o dedo para o usuário com cara de raiva" width={533} height={300} />
            <Box size="md" className="relative -translate-y-14  translate-x-[28%] w-screen max-w-[600px]">
                <h2 className="text-2xl font-bold mb-2">Calma aí!</h2>
                <p className="mb-6">Antes de tudo, prove... Prove que você é o culords.</p>

                <label className="
                    bg-gray-100 border border-gray-400 rounded-3xl
                    flex flex-row
                ">
                    <span className="p-3 border-r border-gray-400 h-auto rounded-l-3xl flex items-start justify-center">
                        <Key size={24} stroke="1.5px" />
                    </span>
                    <input
                        type="text"
                        placeholder="Senha"
                        name="password"
                        ref={passwordInputRef}
                        className="py-3 bg-transparent w-full rounded-r-3xl outline-none ring-primary/50 px-4 transition-all delay-75 focus:ring-4"
                    />
                </label>
            
                <div className="flex flex-row gap-4 items-center justify-end mt-6">
                    <CloseButton asChild>
                        <Button type="button" variant="ghost" onClick={() => setFormStep(0)}>Cancelar</Button>
                    </CloseButton>

                    <Button
                        type="button" 
                        variant="primary"
                        onClick={handlePostNewProject}
                    >
                        <UploadSimple size={24} /> Confirmar e lacrar
                    </Button>
                </div>
            </Box>
        </div>
    )

    const secondStepContent = (
        <div className="relative">
            <Image
                className="absolute left-0 top-[50%] -translate-y-1/2 -translate-x-[30%] min-w-[465px] h-[361px] rounded-3xl shadow-primary/25 shadow-2xl"
                src={TullaMaoNoQueixo}
                alt="Tulla Luana apontando o dedo para o usuário com cara de raiva"
                width={465}
                height={361}
            />
            <Box size="md" className="relative translate-x-[48%] w-screen max-w-[374px]">
                <h2 className="text-2xl font-bold mb-2">Lacrou bom bom</h2>
                <p className="mb-6">Jogo adicionado com sucesso, beijos da web diva tulla floriana 💋💋</p>
            
                <div className="flex flex-row gap-4 items-center justify-end mt-6">
                    <Button type="button" variant="ghost" onClick={() => setFormStep(0)}>Fechar</Button>
                </div>
            </Box>
        </div>
    )

    return (
        <form onSubmit={handleSubmit(handleOpenSecondStepModal)} className="flex flex-col gap-6">
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

            <Dialog
                open={formStep === 0 ? false : true}
                content={formStep === 1 ? firstStepContent : formStep === 2 ? secondStepContent : null}
            >
                <Button
                    type="submit"
                    className="mt-6"
                    disabled={ !isValid || checkedLabels.length <= 0 }
                >
                    <UploadSimple size={24} weight="bold" /> Adicionar
                </Button>
            </Dialog>
        </form>
    )
}