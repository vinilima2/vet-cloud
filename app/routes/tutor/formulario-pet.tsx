import {Button} from "~/components/ui/button";
import {Checkbox} from "~/components/ui/checkbox";
import {DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Textarea} from "~/components/ui/textarea";
import {adicionarPet, type Pet} from "~/services/pet-service";
import {useAuth} from "~/providers/auth-provider";
import {toast} from "sonner";

type FormularioPetProps = {
    tutorId: string;
    onSuccess: () => void;
    onCancel: () => void;
};

export default function FormularioPet({tutorId, onSuccess, onCancel}: FormularioPetProps) {
    const {clinica} = useAuth()
    return (
        <div className="p-4">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dados = Object.fromEntries(formData.entries()) as Pet;
                await adicionarPet(clinica.id, tutorId, dados);
                toast('Animal cadastrado com sucesso.')
                onSuccess();
            }}>
                <DialogHeader className="mb-10">
                    <DialogTitle>Formulário de Cadastro do Animal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" name="nome" placeholder="Digite o nome do animal..."/>
                    </div>
                    <div className="flex justify-between gap-3">
                        <Label htmlFor="especie">Espécie</Label>
                        <Select name="especie">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione uma espécie"/>
                            </SelectTrigger>
                            <SelectContent id="especie" position="popper">
                                <SelectItem value="cachorro">Cachorro</SelectItem>
                                <SelectItem value="gato">Gato</SelectItem>
                                <SelectItem value="hamster">Hamster</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-3">
                        <Label htmlFor="cor">Cor</Label>
                        <Select name="cor">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione uma cor"/>
                            </SelectTrigger>
                            <SelectContent id="cor">
                                <SelectItem value="preto">Preto</SelectItem>
                                <SelectItem value="branco">Branco</SelectItem>
                                <SelectItem value="caramelo">Caramelo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-3">
                        <Label htmlFor="raca">Raça</Label>
                        <Select name="raca">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione uma raça"/>
                            </SelectTrigger>
                            <SelectContent id="raca">
                                <SelectItem value="golden">Golden</SelectItem>
                                <SelectItem value="labrador">Labrador</SelectItem>
                                <SelectItem value="vira-lata">Vira Lata</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="grid gap-3">
                            <Label htmlFor="peso">Peso (KG)</Label>
                            <Input id="peso" type="number" name="peso"/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="ano-nascimento">Ano Nascimento</Label>
                            <Input id="ano-nascimento" type="number" name="ano_nascimento"/>
                        </div>
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="grid gap-3">
                            <Label htmlFor="sexo">Sexo</Label>
                            <RadioGroup defaultValue="macho" name="sexo">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="macho" id="opcao-macho"/>
                                    <Label htmlFor="opcao-macho">Macho</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="femea" id="opcao-femea"/>
                                    <Label htmlFor="opcao-femea">Fêmea</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="gap-3 flex items-center">
                            <Checkbox id="castrado" name="castrado"/>
                            <Label htmlFor="castrado">Animal castrado?</Label>
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea name="observacoes" id="observacoes"/>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </div>
    );
}