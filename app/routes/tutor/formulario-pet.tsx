import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { adicionarPet, atualizarPet, type Pet, type PetView } from "~/services/pet-service";
import { useAuth } from "~/providers/auth-provider";
import { toast } from "sonner";
import { ANIMAIS, CORES, RACA_CAES, RACA_GATOS, RACA_HAMSTERS } from "~/lib/utils";
import { useEffect, useState } from "react";

type FormularioPetProps = {
    tutorId: string;
    pet?: PetView | null,
    onSuccess: () => void;
    onCancel: () => void;
};


export default function FormularioPet({ tutorId, onSuccess, onCancel, pet }: FormularioPetProps) {
    const { clinica } = useAuth()
    const [racas, setRacas] = useState<Array<any>>([])
    const [raca, setRaca] = useState<string>('')
    const [especie, setEspecie] = useState<string>('')
    const [cor, setCor] = useState<string>('')
    const [sexo, setSexo] = useState<string>('')
    const [ativo, setAtivo] = useState<boolean>(false)
    const [castrado, setCastrado] = useState<boolean>(false)

    useEffect(() => {
        if (pet?.id && pet?.data) {
            Object.keys(pet.data).forEach(key => {
                let seletor = document.getElementById(key)
                if (seletor) {
                    seletor.value = pet.data[key]
                }
                if (key == 'cor') setCor(pet.data[key])
                if (key == 'raca') setRaca(pet.data[key])
                if (key == 'especie') setEspecie(pet.data[key])
                if (key == 'castrado') setCastrado(pet.data[key])
                if (key == 'ativo') setAtivo(pet.data[key])
                if (key == 'sexo') setSexo(pet.data[key])

            })
        }
    }, [pet])

    useEffect(() => {
        if (especie) {
            if (especie == 'cachorro') {
                setRacas(RACA_CAES)
            } else if (especie == 'gato') {
                setRacas(RACA_GATOS)
            } else {
                setRacas(RACA_HAMSTERS)
            }
        }
    }, [especie])


    return (
        <div className="p-4">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dados = Object.fromEntries(formData.entries()) as Pet;
                dados.ativo = ativo
                dados.castrado = castrado
                if (pet?.id) {
                    await atualizarPet(clinica?.id ?? '', tutorId, pet.id, dados);
                    toast.success('Animal atualizado com sucesso.')
                } else {
                    await adicionarPet(clinica?.id ?? '', tutorId, dados);
                    toast.success('Animal cadastrado com sucesso.')
                }
                onSuccess();
            }}>
                <DialogHeader className="mb-10">
                    <DialogTitle>Formulário de Cadastro do Animal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="grid gap-3">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" name="nome" placeholder="Digite o nome do animal..." required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="ano_nascimento">Ano Nascimento</Label>
                            <Input id="ano_nascimento" type="number" name="ano_nascimento" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="peso">Peso (KG)</Label>
                            <Input id="peso" type="number" name="peso" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="gap-3">
                            <Label htmlFor="especie">Espécie</Label>
                            <Select name="especie" value={especie} required onValueChange={(valor) => { if (valor && valor !== '') setEspecie(valor) }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione uma espécie" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {ANIMAIS.map(animal => (
                                        <SelectItem value={animal.value}>{animal.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="gap-3">
                            <Label htmlFor="cor">Cor</Label>
                            <Select name="cor" value={cor} required onValueChange={(valor) => { if (valor && valor !== '') setCor(valor) }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione uma cor" />
                                </SelectTrigger>
                                <SelectContent id="cor">
                                    {CORES.map(cor => (
                                        <SelectItem value={cor.value}>{cor.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="gap-3">
                            <Label htmlFor="raca">Raça</Label>
                            <Select name="raca" value={raca} required onValueChange={(valor) => { if (valor && valor !== '') setRaca(valor) }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione uma raça" />
                                </SelectTrigger>
                                <SelectContent id="raca">
                                    {racas.map(raca => (
                                        <SelectItem value={raca.value}>{raca.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="gap-3 flex items-center">
                            <Checkbox id="castrado" name="castrado" defaultChecked={castrado} checked={castrado} onCheckedChange={(valor) => setCastrado(valor)} />
                            <Label htmlFor="castrado">Animal castrado?</Label>
                        </div>
                        <div className="gap-3 flex items-center">
                            <Checkbox id="ativo" name="ativo" slot="input" defaultChecked={castrado} checked={ativo} onCheckedChange={(valor) => setAtivo(valor)} />
                            <Label htmlFor="ativo">Ativo</Label>
                        </div>
                        <div className="flex justify-between gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="sexo">Sexo</Label>
                                <RadioGroup defaultValue="macho" value={sexo} onValueChange={(valor) => setSexo(valor)} name="sexo" id="sexo" required>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="macho" id="opcao-macho" />
                                        <Label htmlFor="opcao-macho">Macho</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="femea" id="opcao-femea" />
                                        <Label htmlFor="opcao-femea">Fêmea</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="observacoes">Observações</Label>
                        <Textarea name="observacoes" id="observacoes" />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" className="cursor-pointer" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="cursor-pointer">Salvar</Button>
                </div>
            </form>
        </div>
    );
}