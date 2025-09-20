import {PawPrint, Pencil, Plus, Trash, User} from "lucide-react";
import {Avatar} from "~/components/ui/avatar";
import {Button} from "~/components/ui/button";
import {Card} from "~/components/ui/card";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {SidebarGroup} from "~/components/ui/sidebar";
import FormularioTutor from "./formulario-tutor";
import {useEffect, useState} from "react";
import {excluirTutor, obterTutores, type TutorView} from "~/services/tutor-service";
import {useAuth} from "~/providers/auth-provider";
import {toast} from "sonner";
import {ListaPets} from "./lista-pets";

export default function Tutor() {
    const [tutores, setTutores] = useState<TutorView[]>([]);
    const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
    const {clinica} = useAuth();

    async function buscarTutores() {
        const tutores = await obterTutores(clinica.id)
        if (tutores) {
            setTutores(tutores)
        }
    }

    useEffect(() => {
        buscarTutores().then()
    }, [])

    async function deletarTutor(id: string) {
        await excluirTutor(clinica.id, id)
        toast('Tutor deletado com sucesso.')
        await buscarTutores()
    }

    return <>
        <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
            <h1 className="text-3xl">Tutores Cadastrados</h1>
            <Dialog>
                <DialogTrigger><Button>Novo Tutor <Plus/></Button></DialogTrigger>
                <FormularioTutor/>
            </Dialog>
        </SidebarGroup>
        <SidebarGroup>
            {tutores.map(({data, id}) => (
                <Card className="flex-row p-5 justify-between">
                    <div className="flex-row flex gap-2 items-center justify-center">
                        <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                            <User className="text-background"/>
                        </Avatar>
                        <div className="flex flex-col items-center ml-2">
                            <label>{data.nome_completo}</label>
                            <label>{data.endereco}</label>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 items-center justify-center">
                        <Button 
                            className="bg-purple-600 cursor-pointer" 
                            onClick={() => setSelectedTutorId(id)}
                        >
                            <PawPrint className="h-4 w-4"/>
                        </Button>
                        {selectedTutorId === id && (
                            <ListaPets
                                tutorId={id}
                                clinicaId={clinica.id}
                                isOpen={true}
                                onClose={() => setSelectedTutorId(null)}
                            />
                        )}
                        <Button className="bg-red-600 cursor-pointer" onClick={() => deletarTutor(id)}><Trash/></Button>
                        <Button className="bg-green-600 cursor-pointer"><Pencil/></Button>
                    </div>
                </Card>
            ))}

        </SidebarGroup>
    </>
}