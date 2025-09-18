import {Button} from "~/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import type {Usuario} from "~/services/usuario-service";
import {adicionarTutor, type Tutor} from "~/services/tutor-service";
import {useAuth} from "~/providers/auth-provider";
import {toast} from "sonner";
import {useNavigate} from "react-router";


export default function FormularioTutor() {
    const {clinica} = useAuth()
    const navigate = useNavigate()

    async function onSubmit(event: any) {
        event.preventDefault();
        const objeto = Object.fromEntries(new FormData(event.target).entries())
        const tutor = objeto as Tutor;
        await adicionarTutor(clinica.id, tutor, [])
        toast('Tutor cadastrado com sucesso.')
        navigate('/home')
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>Formulário de Cadastro de Tutor</DialogTitle>
                    <DialogDescription>
                        Preencha o formulário abaixo...
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="nome-completo">Nome Completo</Label>
                        <Input id="nome-completo" name="nome_completo"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" name="email"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" type="text" name="cpf"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="contato">Contato/Fone</Label>
                        <Input id="contato" type="tel" name="telefone"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input id="endereco" type="text" name="endereco"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}