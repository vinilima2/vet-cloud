import { Button } from "~/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";


export default function FormularioTutor() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <form>
                <DialogHeader>
                    <DialogTitle>Formulário de Cadastro de Tutor</DialogTitle>
                    <DialogDescription>
                        Preencha o formulário abaixo...
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="nome-completo">Nome Completo</Label>
                        <Input id="nome-completo" name="nomeCompleto" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" name="email" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" type="text" name="cpf" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="contato">Contato/Fone</Label>
                        <Input id="contato" type="tel" name="contato" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cep">CEP</Label>
                        <Input id="cep" type="tel" name="cep" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input id="endereco" type="text" name="endereco" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="municipio">Municipio</Label>
                        <Input id="municipio" type="text" name="municipio" readOnly />
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