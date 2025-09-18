import { CalendarCheck2, CalendarX2, UserPlus } from "lucide-react";
import Logo from "~/assets/vet.png";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { SidebarGroup } from "~/components/ui/sidebar";
import {ListaClinicas} from "~/routes/home/lista-clinicas";

export default function Home() {
    return (
        <>
            <div className="space-y-8">
                <SidebarGroup className="items-center justify-center">
                    <img src={Logo} className="w-80" alt="Logo da clínica" />
                </SidebarGroup>

                <SidebarGroup>
                    <h1 className="text-4xl text-center mb-8">Bem-vindo de volta!</h1>
                    <ListaClinicas />
                </SidebarGroup>
            </div>
            <SidebarGroup className="justify-between p-10 lg:flex-row">
                <Card className="h-60 lg:w-3/12 bg-red-400  justify-center items-center m-4">
                    <CardHeader className="w-full text-red-100 text-2xl  text-center">
                        CANCELAMENTOS
                    </CardHeader>
                    <CardContent>
                        <CalendarX2 className="text-red-100 text-1xl" size={80} />
                    </CardContent>
                    <CardContent className="text-5xl text-red-100">
                        10
                    </CardContent>
                </Card>
                <Card className="h-60 lg:w-3/12 bg-yellow-400  justify-center items-center m-4">
                    <CardHeader className="w-full text-yellow-100 text-2xl  text-center">
                        ATENDIMENTOS
                    </CardHeader>
                    <CardContent>
                        <CalendarCheck2 className="text-yellow-100 text-1xl" size={80} />
                    </CardContent>
                    <CardContent className="text-5xl text-yellow-100">
                        105
                    </CardContent>
                </Card>

                <Card className="h-60 lg:w-3/12 bg-blue-400  justify-center items-center m-4">
                    <CardHeader className="w-full text-blue-100 text-2xl  text-center">
                        CLIENTES
                    </CardHeader>
                    <CardContent>
                        <UserPlus className="text-blue-100 text-1xl" size={80} />
                    </CardContent>
                    <CardContent className="text-5xl text-blue-100">
                        42
                    </CardContent>
                </Card>
            </SidebarGroup>
        </>

    );
}