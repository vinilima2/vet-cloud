import { Button } from "~/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Usuario } from "~/services/usuario-service";
import { adicionarTutor, atualizarTutor, type Tutor } from "~/services/tutor-service";
import { useAuth } from "~/providers/auth-provider";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useLoading } from "~/providers/loading-provider";
import { useEffect } from "react";


export default function FormularioTutor({ onClose, tutor }) {
    const { clinica } = useAuth()
    const { setLoading } = useLoading()
    const navigate = useNavigate()

    async function onSubmit(event: any) {
        setLoading(true)
        event.preventDefault();
        const objeto = Object.fromEntries(new FormData(event.target).entries())
        const tutorFormulario = objeto as Tutor;
        if (tutor?.id) {
            await atualizarTutor(clinica?.id ?? '', tutor.id, tutorFormulario)
            toast.success('Tutor atualizado com sucesso.')
        } else {
            await adicionarTutor(clinica?.id ?? '', tutorFormulario, [])
            toast.success('Tutor cadastrado com sucesso.')
        }
        setLoading(false)
        onClose()
        navigate('/tutor')
    }


    useEffect(() => {
        if (tutor?.id && tutor?.data) {
            Object.keys(tutor.data).forEach(key => {
                let input = document.getElementById(key)
                if (input) {
                    input.value = tutor.data[key]
                }
            });
        }
    }, [tutor])

    return (
        <form onSubmit={onSubmit}>
            <DialogHeader>
                <DialogTitle>Formulário de Cadastro de Tutor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3 mt-5">
                    <Label htmlFor="nome_completo">Nome Completo</Label>
                    <Input id="nome_completo" name="nome_completo" required maxLength={50} />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" name="email" placeholder="Digite o e-mail do tutor" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" type="text" name="cpf" placeholder="000.000.000-00" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="telefone">Contato/Fone</Label>
                    <Input id="telefone" type="tel" name="telefone" placeholder="(00) 90000-0000" pattern="\(\d{2}\)\s9\d{4}-\d{4}" required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input id="endereco" placeholder="Rua, número - Bairro, Cidade - Estado" type="text" name="endereco" maxLength={100} required />
                </div>
            </div>
            <DialogFooter className="mt-10">
                <DialogClose className="cursor-pointer" asChild>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">Salvar</Button>
            </DialogFooter>
        </form>
    );
}