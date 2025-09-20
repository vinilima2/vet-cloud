
import { useState } from "react";
import { data, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { adicionarUsuarioClinica, type UsuarioClinica } from "~/services/usuario-clinica-service";
import { obterIdUsuarioPorEmail, obterUsuario } from "~/services/usuario-service";

export default function FormularioUsuarioClinica({ nivelAcesso, idClinica, onClose }) {
    const [usuario, setUsuario] = useState<string | null>(null)
    const [nomeUsuario, setNomeUsuario] = useState<string | null | undefined>(null)
    const navigate = useNavigate()

    function buscarUsuarioPorEmail(event) {
        const email = event.target.value
        if (email?.trim() === '' || !email.includes('@')) return;
        obterIdUsuarioPorEmail(email).then(resultado => {
            if (!resultado.status) {
                toast.error(resultado.msg ?? 'Não foi possível retornar o usuário.')
            } else if (resultado.id_usuario) {
                setUsuario(resultado.id_usuario)
                toast.success(`Usuário encontrado.`)
                obterUsuario(resultado.id_usuario, 'completo').then(resultado => {
                    setNomeUsuario(resultado?.data?.nome_completo)
                })
            }
        })
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const objeto = Object.fromEntries(new FormData(event.target).entries())
                const usuarioClinica = objeto as UsuarioClinica
                await adicionarUsuarioClinica(idClinica, usuario as string, usuarioClinica.nivel_acesso, nomeUsuario)
                toast.success('Usuário adicionado com sucesso.')
                onClose()
                navigate('/clinica')
            }}>
                <DialogHeader className="mb-10">
                    <DialogTitle>Adicionar novo usuário</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 mb-5">
                    <div className="grid gap-3">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" name="email" placeholder="Digite o e-mail do usuário" onBlur={buscarUsuarioPorEmail} required />
                    </div>
                </div>
                <div className="flex justify-between gap-3">
                    <Label htmlFor="nivel_acesso">Nível de Acesso</Label>
                    <Select name="nivel_acesso">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione um nível de acesso" />
                        </SelectTrigger>
                        <SelectContent id="nivel_acesso" position="popper">
                            <SelectItem value="Basic">Básico</SelectItem>
                            <SelectItem value="Admin">Administrador</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </DialogContent>
    );
}