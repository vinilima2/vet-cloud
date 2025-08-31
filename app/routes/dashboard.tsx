import { AppSidebar } from "~/components/app-side-bar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
        </SidebarProvider>
    )
}