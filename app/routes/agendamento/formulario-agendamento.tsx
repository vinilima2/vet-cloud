import Combobox from "~/components/combobox";
import {Button} from "~/components/ui/button";
import {DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";
import {adicionarPet, type Pet, type PetView} from "~/services/pet-service";
import {toast} from "sonner";
import {adicionarAgendamento, type Agendamento} from "~/services/agendamento-service";
import {useAuth} from "~/providers/auth-provider";
import {useEffect, useState} from "react";
import {obterTutores, type TutorView} from "~/services/tutor-service";

export default function FormularioAgendamento() {
    const {clinica} = useAuth()
    /*
    export interface Agendamento {
    id_usuario: string,
    id_tutor: string,
    id_pet: string,
    atividade: string
}
     */
    const [tutores, setTutores] = useState<any>()
    const [pets, setPets] = useState<PetView[]>()

    useEffect(() => {
        console.log(clinica.id)
        obterTutores(clinica.id).then(resultado => {
            if (resultado) {
                console.log(resultado)
                setTutores(resultado.map((r) => ({label: r.data.nome_completo, value: r.id})) ?? [])
            }
        })
    }, [])
    return (
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dados = Object.fromEntries(formData.entries()) as Agendamento;
                dados.status = 'EM ABERTO'
                await adicionarAgendamento(clinica.id, dados);
                toast('Agendamento realizado com sucesso.')
            }}>
                <DialogHeader className="mb-10">
                    <DialogTitle>Formulário de Agendamento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="data">Data</Label>
                        <Input
                            type="date"
                            id="data"
                            name="data_marcada"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="hora">Hora</Label>
                        <Input
                            type="time"
                            id="hora"
                            step="1"
                            name="hora_marcada"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="tutor">Tutor</Label>
                        <Combobox label="Procure pelo tutor" lista={tutores ?? []} onChange={(c) => console.log(c)}
                                  onSearch={() => {

                                  }}/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="pet">Pet</Label>
                        <Combobox label="Procure pelo Pet" lista={[]}/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="atividade">Atividade</Label>
                        <Textarea id="atividade" placeholder="Descreva a atividade a ser realizada..."/>
                    </div>
                </div>
                <DialogFooter className="mt-10">
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}