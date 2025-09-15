import Combobox from "~/components/combobox";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function FormularioAgendamento() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <form>
                <DialogHeader className="mb-10">
                    <DialogTitle>Formulário de Agendamento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="data">Data</Label>
                        <Input
                            type="date"
                            id="data"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="hora">Hora</Label>
                        <Input
                            type="time"
                            id="hora"
                            step="1"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="tutor">Tutor</Label>
                        <Combobox label="Procure pelo tutor"  />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="pet">Pet</Label>
                        <Combobox label="Procure pelo Pet"  />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="atividade">Atividade</Label>
                        <Textarea id="atividade" placeholder="Descreva a atividade a ser realizada..." />
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