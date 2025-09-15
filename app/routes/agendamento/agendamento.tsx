import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Card } from "~/components/ui/card"
import { Dialog, DialogTrigger } from "~/components/ui/dialog"
import { ScrollArea } from "~/components/ui/scroll-area"
import { SidebarGroup } from "~/components/ui/sidebar"
import FormularioAgendamento from "./formulario-agendamento"


export default function Agendamento() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <>
            <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
                <h1 className="text-3xl">Agendamentos</h1>
                <Dialog>
                    <DialogTrigger><Button>Novo Agendamento <Plus /></Button></DialogTrigger>
                    <FormularioAgendamento/>
                </Dialog>
            </SidebarGroup>
            <SidebarGroup className="flex-row gap-2">
                <Calendar
                    mode="multiple"
                    animate
                    className="rounded-md w-1/2 border shadow-sm"
                    captionLayout="label"
                />

                <ScrollArea className="h-full w-1/2 rounded-md border p-4">
                    <Card className="flex-row p-5 justify-between">
                        <div className="flex-row flex gap-2 items-center justify-center">
                            <div className="flex flex-col items-center ml-2">
                                <label>Valter de Mello</label>
                                <label>Bauru - SP</label>
                            </div>

                        </div>
                    </Card>
                </ScrollArea>
            </SidebarGroup>
        </>)
}