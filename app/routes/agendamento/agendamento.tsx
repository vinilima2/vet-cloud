import {Plus} from "lucide-react"
import {useEffect, useState} from "react"
import {Button} from "~/components/ui/button"
import {Calendar} from "~/components/ui/calendar"
import {Card} from "~/components/ui/card"
import {Dialog, DialogTrigger} from "~/components/ui/dialog"
import {ScrollArea} from "~/components/ui/scroll-area"
import {SidebarGroup} from "~/components/ui/sidebar"
import FormularioAgendamento from "./formulario-agendamento"
import {obterTutores, type TutorView} from "~/services/tutor-service";
import {useAuth} from "~/providers/auth-provider";
import {type AgendamentoView, obterAgendamentos} from "~/services/agendamento-service";


export default function Agendamento() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [agendamentos, setAgendamentos] = useState<AgendamentoView[]>([]);
    const {clinica} = useAuth();

    async function buscarAgendamentos() {
        const agendamentos = await obterAgendamentos(clinica.id)
        if (agendamentos) {
            setAgendamentos(agendamentos)
        }
    }

    useEffect(() => {
        buscarAgendamentos().then()
    }, [])

    return (
        <>
            <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
                <h1 className="text-3xl">Agendamentos</h1>
                <Dialog>
                    <DialogTrigger content="div"><Button>Novo Agendamento <Plus/></Button></DialogTrigger>
                    <FormularioAgendamento/>
                </Dialog>
            </SidebarGroup>
            <SidebarGroup className="flex-row gap-2">
                <Calendar
                    mode="multiple"
                    className="rounded-md h-10/12 w-1/2 border shadow-sm"
                    selected={agendamentos.map(agenda => {
                        const literalDividida = agenda.data.data_marcada.split('-')
                        return new Date(Number(literalDividida[0]), Number(literalDividida[1]) - 1, Number(literalDividida[2]))
                    })}
                />

                <ScrollArea className="h-10/12 w-1/2 rounded-md border p-4">
                    {agendamentos.map(({data, id}) => <Card className="flex-row p-5 justify-between m-4">
                        <div className="flex-row flex gap-2 items-center justify-center">
                            <div className="flex flex-col items-center ml-2">
                                <label>{data.email_tutor}</label>
                                <label>{data.data_marcada}</label>
                                <label>{data.status}</label>
                            </div>
                        </div>
                    </Card>)}
                </ScrollArea>
            </SidebarGroup>
        </>)
}