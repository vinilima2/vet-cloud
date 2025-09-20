import { PawPrint, Pencil, Plus, Trash, User } from "lucide-react";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Dialog as MyDialog } from "~/components/dialog";
import { SidebarGroup } from "~/components/ui/sidebar";
import FormularioTutor from "./formulario-tutor";
import { useEffect, useState } from "react";
import { excluirTutor, obterTutores, type TutorView } from "~/services/tutor-service";
import { useAuth } from "~/providers/auth-provider";
import { toast } from "sonner";
import { ListaPets } from "./lista-pets";
import { useLoading } from "~/providers/loading-provider";
import { Skeleton } from "~/components/ui/skeleton";
import { AlertDialogTrigger } from "~/components/ui/alert-dialog";

export default function Tutor() {
    const [tutores, setTutores] = useState<TutorView[]>([]);
    const [tutorSelecionado, setTutorSelecionado] = useState<TutorView | null>(null);
    const [abrirModal, setAbrirModal] = useState<boolean>(false)
    const [confirmarExclusao, setConfirmarExclusao] = useState<boolean>(false)
    const { clinica } = useAuth();
    const { setLoading } = useLoading()

    async function buscarTutores() {
        const tutores = await obterTutores(clinica?.id ?? '')
        if (tutores) {
            setTutores(tutores)
        }
    }

    useEffect(() => {
        buscarTutores().then()
    }, [])

    async function deletarTutor(id: string) {
        await excluirTutor(clinica?.id ?? '', id)
        toast.success('Tutor deletado com sucesso.')
        await buscarTutores()
    }

    const listaFixa = Array(5).fill(1)

    return <>
        <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
            <h1 className="text-3xl">Tutores Cadastrados</h1>
            <Dialog open={abrirModal}>
                <DialogTrigger asChild><Button className="cursor-pointer" onClick={() => setAbrirModal(true)}>Novo Tutor <Plus /></Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                    <FormularioTutor onClose={() => {
                        setTutorSelecionado(null)
                        buscarTutores()
                        setAbrirModal(false)
                    }} tutor={tutorSelecionado} />
                </DialogContent>
            </Dialog>
        </SidebarGroup>
        <SidebarGroup>
            {tutores.length === 0 && listaFixa.map((item, indice) => (
                <Skeleton key={item + indice} className="flex flex-row p-3 justify-between m-2">
                    <div className="flex-row flex gap-2 items-center justify-center">
                        <Skeleton className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center" />
                        <div className="flex flex-col justify-start items-start ml-2">
                            <label>&nbsp;</label>
                            <label>&nbsp;</label>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-center">
                        <Skeleton className="h-9 w-10 rounded-lg bg-primary" />
                        <Skeleton className="h-9 w-10 rounded-lg bg-primary" />
                        <Skeleton className="h-9 w-10 rounded-lg bg-primary" />
                    </div>
                </Skeleton>
            ))
            }
            {tutores.map(({ data, id }) => (
                <Card className="flex-row p-3 justify-between m-2">
                    <div className="flex-row flex gap-2 items-center justify-center">
                        <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                            <User className="text-background" />
                        </Avatar>
                        <div className="flex flex-col justify-start items-start ml-2">
                            <label>{data.nome_completo}</label>
                            <label>{data.endereco}</label>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 items-center justify-center">
                        <Button
                            className="bg-purple-600 cursor-pointer"
                            onClick={() => setTutorSelecionado({ data, id })}
                        >
                            <PawPrint className="h-4 w-4" />
                        </Button>
                        {(tutorSelecionado?.id === id && !abrirModal) && (
                            <ListaPets
                                tutorId={id}
                                clinicaId={clinica?.id ?? ''}
                                isOpen={true}
                                onClose={() => setTutorSelecionado(null)}
                            />
                        )}
                        <MyDialog titulo="Deseja realmente deletar o tutor? Essa ação não poderá ser desfeita" conteudo="Confirme para deletar" onConfirm={() => {
                            deletarTutor(id)
                        }}>
                            <AlertDialogTrigger>
                                <Button className="bg-red-600 cursor-pointer"><Trash /></Button>
                            </AlertDialogTrigger>
                        </MyDialog>
                        <Button className="bg-green-600 cursor-pointer" onClick={() => {
                            setTutorSelecionado({ data, id })
                            setAbrirModal(true)
                        }}><Pencil /></Button>
                    </div>
                </Card>
            ))}

        </SidebarGroup >
    </>
}