import Form from "../components/NewProjectForm"

export default function NewProject() {
    return (
        <main className="w-[calc(100%_-_40px)] max-w-4xl mx-auto mt-6 mb-24">
            <header className="mb-12">
                <h1 className="font-bold text-2xl">Adicionar projeto novo</h1>
                <p>Inserir um novo jogo no portfólio.</p>
            </header>

            <Form />
        </main>
    )
}