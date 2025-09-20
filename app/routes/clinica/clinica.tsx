import { Pencil, Plus, Trash, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Avatar } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import { SidebarGroup } from "~/components/ui/sidebar"
import { useAuth } from "~/providers/auth-provider"
import { obterUsuarioClinica, obterUsuariosClinica, type UsuarioClinicaView } from "~/services/usuario-clinica-service"
import FormularioUsuarioClinica from "./formulario-usuario-clinica"

export default function Clinica() {
    const { usuario, clinica } = useAuth()
    const [tipoUsuario, setTipoUsuario] = useState<'Basic' | 'Root' | 'Admin'>('Basic')
    const [usuarios, setUsuarios] = useState<UsuarioClinicaView[]>([])

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

    function buscarUsuariosDaClinica() {
        obterUsuariosClinica(clinica?.id ?? '').then(resultado => {
            setUsuarios(resultado ?? [])
        })
    }

    return (
        <>
            <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
                <h1 className="text-3xl">Usuários da Clínica</h1>
                {tipoUsuario !== 'Basic' && <Dialog>
                    <DialogTrigger><Button>Novo Usuário <Plus /></Button></DialogTrigger>
                    <FormularioUsuarioClinica nivelAcesso={tipoUsuario} idClinica={clinica?.id} />
                </Dialog>
                }
            </SidebarGroup>
            <SidebarGroup>
                {usuarios.map(({ data, id }) => (
                    <Card className="flex-row p-5 justify-between" key={id}>
                        <div className="flex-row flex gap-2 items-center justify-center">
                            <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                                <User className="text-background" />
                            </Avatar>
                            <div className="flex flex-col items-center ml-2">
                                <label>{data.ativo}</label>
                                <label>{data.data_inclusao}</label>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 items-center justify-center">
                            <Button className="bg-red-600 cursor-pointer" onClick={() => console.log(id)}><Trash /></Button>
                            <Button className="bg-green-600 cursor-pointer"><Pencil /></Button>
                        </div>
                    </Card>
                ))}

            </SidebarGroup>
        </>
    )
}