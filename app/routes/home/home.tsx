import { SidebarGroup } from "~/components/ui/sidebar";
import { ListaClinicas } from "~/routes/home/lista-clinicas";

export default function Home() {
    return (
        <>
            <div className="space-y-8">
                <SidebarGroup className="p-10">
                    <ListaClinicas />
                </SidebarGroup>
            </div>
        </>

    );
}