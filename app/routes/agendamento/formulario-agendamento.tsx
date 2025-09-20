import Combobox from "~/components/combobox";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { obterPets } from "~/services/pet-service";
import { toast } from "sonner";
import { adicionarAgendamento, type Agendamento } from "~/services/agendamento-service";
import { useAuth } from "~/providers/auth-provider";
import { useEffect, useState } from "react";
import { obterTutores } from "~/services/tutor-service";

export default function FormularioAgendamento({ onClose }) {
    const { clinica } = useAuth()

    const [tutores, setTutores] = useState<any>([])
    const [pets, setPets] = useState<any>([])

    const [tutorSelecionado, setTutorSelecionado] = useState(null)
    const [petSelecionado, setPetSelecionado] = useState(null)

    useEffect(() => {
        obterTutores(clinica?.id ?? '').then(resultado => {
            if (resultado) {
                setTutores(resultado.map((r) => ({ label: r.data.nome_completo, value: `${r.data.email}-${r.id}`.trim() })) ?? [])
            }
        })


    }, [])

    useEffect(() => {
        if (tutorSelecionado) {
            obterPets(clinica.id, (tutorSelecionado as string).split('-')[1]).then(result => {
                setPets(result?.map(pet => ({
                    label: `${pet.data.nome} - ${pet.data.raca}`,
                    value: pet.id
                })) ?? [])
            })
        }
    }, [tutorSelecionado])

    return (
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const dados = Object.fromEntries(formData.entries()) as Agendamento;
                dados.status = 'EM ABERTO'
                if (tutorSelecionado) { 
                    dados.id_tutor = tutorSelecionado.split('-')[1] 
                } else {
                    toast.warning('Nenhum tutor selecionado.')
                    return;
                }
                if (petSelecionado) {
                    dados.id_pet = petSelecionado
                } else {
                    toast.warning('Nenhum animal selecionado.')
                    return;
                }

                await adicionarAgendamento(clinica.id, dados);
                toast.success('Agendamento realizado com sucesso.')
                onClose()
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
                            required

                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="hora">Hora</Label>
                        <Input
                            type="time"
                            id="hora"
                            step="60"
                            required
                            name="hora_marcada"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="tutor">Tutor</Label>
                        <Combobox label="Procure pelo tutor" lista={tutores} onChange={(valor) => setTutorSelecionado(valor)} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="pet">Pet</Label>
                        <Combobox label="Procure pelo Pet" lista={pets} onChange={(valor) => setPetSelecionado(valor)} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="atividade">Atividade</Label>
                        <Textarea id="atividade" required name="atividade" placeholder="Descreva a atividade a ser realizada..." />
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