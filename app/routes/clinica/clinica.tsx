import { Pencil, Plus, Trash, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import { Dialog as MyDialog } from "~/components/dialog"
import { SidebarGroup } from "~/components/ui/sidebar"
import { useAuth } from "~/providers/auth-provider"
import { excluirUsuarioClinica, obterUsuarioClinica, obterUsuariosClinica, type UsuarioClinicaView } from "~/services/usuario-clinica-service"
import FormularioUsuarioClinica from "./formulario-usuario-clinica"
import { AlertDialogTrigger } from "~/components/ui/alert-dialog"
import { toast } from "sonner"
import type { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud | Administração" },
    { name: "description", content: "Rota admin" },
  ];
}

export default function Clinica() {
    const { usuario, clinica } = useAuth()
    const [tipoUsuario, setTipoUsuario] = useState<'Basic' | 'Root' | 'Admin'>('Basic')
    const [usuarios, setUsuarios] = useState<UsuarioClinicaView[]>([])
    const [abrirModal, setAbrirModal] = useState<boolean>(false)

    useEffect(() => {
        obterUsuarioClinica(clinica?.id ?? '', usuario?.uid ?? '').then((resultado) => {
            if (resultado) {
                setTipoUsuario(resultado.data.nivel_acesso)
                if (resultado.data.nivel_acesso !== 'Basic') {
                    buscarUsuariosDaClinica()
                }
            }
        })
    }, [])

    async function buscarUsuariosDaClinica() {
        obterUsuariosClinica(clinica?.id ?? '').then(resultado => {
            setUsuarios(resultado?.filter(u => u.id !== usuario?.uid) ?? [])
        })
    }

    return (
        <>
            <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
                <h1 className="text-3xl">Usuários da Clínica</h1>
                {tipoUsuario !== 'Basic' && <Dialog open={abrirModal}>
                    <DialogTrigger asChild><Button onClick={() => setAbrirModal(true)}>Novo Usuário <Plus /></Button></DialogTrigger>
                    <FormularioUsuarioClinica nivelAcesso={tipoUsuario} idClinica={clinica?.id} onClose={() => {
                        setAbrirModal(false)
                        buscarUsuariosDaClinica()
                    }} />
                </Dialog>
                }
            </SidebarGroup>
            <SidebarGroup>
                {usuarios.map(({ data, id }) => (
                    <Card className="flex-row p-5 justify-between m-2" key={id}>
                        <div className="flex-row flex gap-2 items-center justify-center">
                            <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                                <User className="text-background" />
                            </Avatar>
                            <div className="flex flex-col ml-2">
                                <label>{data.nome_completo}</label>
                                <label>{(data.data_inclusao)}</label>
                            </div>
                        </div>

                        {tipoUsuario === 'Root' && <div className="flex flex-row gap-5 items-center justify-center">
                            <MyDialog titulo="Deseja realmente deletar o usuário da clínica? Essa ação não poderá ser desfeita" conteudo="Confirme para deletar" onConfirm={async () => {
                                await excluirUsuarioClinica(clinica?.id ?? '', id)
                                toast.success('Usuário excluído com sucesso.')
                                await buscarUsuariosDaClinica()
                            }}>
                                <AlertDialogTrigger asChild>
                                    <Button className="bg-red-600 cursor-pointer"><Trash /></Button>
                                </AlertDialogTrigger>
                            </MyDialog>
                        </div>
                        }
                    </Card>
                ))}

                {tipoUsuario === 'Basic' && <p className="font-bold text-center">Você não possui permissão para controlar acessos.</p>}
                {(tipoUsuario !== 'Basic' && usuarios.length === 0) && <p className="font-bold text-center">Não há outros usuários registrados.</p>}
            </SidebarGroup>
        </>
    )
}