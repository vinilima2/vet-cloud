import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-side-bar";
import { SidebarContent, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import Middleware from "../middleware/middleware";
import { Toaster } from "sonner";
import Loading from "~/components/loading";

export default function Layout() {
    return (
        <Middleware>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger className="lg:hidden" />
                <SidebarContent>
                    <Outlet />
                    <Toaster />
                </SidebarContent>
            </SidebarProvider>
            <Loading />
        </Middleware>
    );
}