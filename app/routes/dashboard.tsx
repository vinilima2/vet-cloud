import { AppSidebar } from "~/components/app-side-bar";
import { SidebarProvider } from "~/components/ui/sidebar";
import Logo from "~/assets/vet.png";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { CalendarX2 } from "lucide-react";

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="max-h-1/5 flex justify-center items-center block">
                <img src={Logo} className="h-60" />
            </div>
            <Card className="h-80 w-80 bg-red-400 flex-col justify-center items-center">
                <CardHeader className="text-red-100 text-3xl text-center">
                    CANCELAMENTOS
                </CardHeader>
                <CardContent>
                    <CalendarX2 className="text-red-100 text-3xl" size={150}/>
                </CardContent>
            </Card>

            {/* <SidebarTrigger />  */}
        </SidebarProvider>
    )
}