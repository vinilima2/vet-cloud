import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Card } from "~/components/ui/card"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"
import { SidebarGroup } from "~/components/ui/sidebar"
import FormularioAgendamento from "./formulario-agendamento"
import { useAuth } from "~/providers/auth-provider";
import { type AgendamentoView, obterAgendamentos, obterAgendamentosPor } from "~/services/agendamento-service";
import { converterDataString } from "~/lib/utils"
import { isSameDay } from "date-fns"
import type { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud | Agendamento" },
    { name: "description", content: "Rota agendamento" },
  ];
}

export default function Agendamento() {
    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date())
    const [agendamentos, setAgendamentos] = useState<AgendamentoView[]>([]);
    const [diasAgendados, setDiasAgendados] = useState<Date[]>([]);
    const [abrirModal, setAbrirModal] = useState<boolean>(false);
    const { clinica } = useAuth();

    async function buscarAgendamentosPorData() {
        const agendamentos = await obterAgendamentosPor(clinica?.id ?? '', dataSelecionada?.toISOString().split('T')[0] ?? '', 'data_marcada')
        if (agendamentos) {
            setAgendamentos(agendamentos)
        }
    }

    async function buscarTodosAgendamentos() {
        const agendas = await obterAgendamentos(clinica?.id ?? '')
        setDiasAgendados(agendas?.map(a => a.data.data_marcada).map(a => {
            const literalDividida = a.split('-')
            return new Date(Number(literalDividida[0]), Number(literalDividida[1]) - 1, Number(literalDividida[2]))
        }) ?? [])
    }

    useEffect(() => {
        buscarTodosAgendamentos().then()
    }, [])

    useEffect(() => {
        buscarAgendamentosPorData().then()
    }, [dataSelecionada])

    return (
        <>
            <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
                <h1 className="text-3xl">Agendamentos</h1>
                <Dialog open={abrirModal}>
                    <DialogTrigger asChild><Button className="cursor-pointer" onClick={() => setAbrirModal(true)}>Novo Agendamento <Plus /></Button></DialogTrigger>
                    <FormularioAgendamento onClose={() => {
                        buscarAgendamentosPorData().then()
                        buscarTodosAgendamentos().then()
                        setAbrirModal(false)
                    }} />
                </Dialog>
            </SidebarGroup>
            <SidebarGroup className="flex-row gap-2">
                <Calendar
                    mode="single"
                    className="rounded-md h-12/12 w-1/2 border shadow-sm"
                    onSelect={(data) => setDataSelecionada(data)}
                    selected={dataSelecionada}
                    modifiers={{
                        agendados: (date) =>
                            diasAgendados.some((d) => isSameDay(d, date)),
                    }}
                    modifiersClassNames={{
                        agendados: "bg-blue-300 text-blue-800 font-bold",
                    }}
                />

                <ScrollArea className="h-12/12 w-1/2 rounded-md border p-4">
                    {agendamentos.map(({ data, id }) => <Card key={id} className="flex-row p-5 justify-between m-4">
                        <div className="flex-row flex gap-2 items-center justify-center">
                            <div className="flex flex-col ml-2">
                                <label className="font-bold">{data.nome_tutor}</label>
                                <label>{converterDataString(data.data_marcada)} {data.hora_marcada}</label>
                                <label>{data.status}</label>
                                {data.atividade && <label>{data.atividade?.substring(0, 15)}...</label>}
                            </div>
                        </div>
                    </Card>)}

                    {agendamentos.length === 0 && <p className="text-center">Nenhum agendamento encontrado.</p>}
                </ScrollArea>
            </SidebarGroup>
        </>)
}