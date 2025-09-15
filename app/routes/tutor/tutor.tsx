import { PawPrint, Pencil, Plus, Trash, User } from "lucide-react";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { SidebarGroup } from "~/components/ui/sidebar";
import FormularioTutor from "./formulario-tutor";
import FormularioPet from "./formulario-pet";

export default function Tutor() {
    return <>
        <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
            <h1 className="text-3xl">Tutores Cadastrados</h1>
            <Dialog>
                <DialogTrigger><Button>Novo Tutor <Plus /></Button></DialogTrigger>
                <FormularioTutor />
            </Dialog>
        </SidebarGroup>
        <SidebarGroup>
            <Card className="flex-row p-5 justify-between">
                <div className="flex-row flex gap-2 items-center justify-center">
                    <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                        <User className="text-background" />
                    </Avatar>
                    <div className="flex flex-col items-center ml-2">
                        <label>Valter de Mello</label>
                        <label>Bauru - SP</label>
                    </div>

                </div>

                <div className="flex flex-row gap-5 items-center justify-center">
                    <Dialog>
                        <DialogTrigger><Button className="bg-purple-600"><PawPrint /></Button></DialogTrigger>
                        <FormularioPet />
                    </Dialog>
                    <Button className="bg-red-600"><Trash /></Button>
                    <Button className="bg-green-600"><Pencil /></Button>
                </div>
            </Card>
        </SidebarGroup>
    </>
}