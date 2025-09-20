import { SidebarGroup } from "~/components/ui/sidebar";
import { ListaClinicas } from "~/routes/home/lista-clinicas";
import type { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud | Página Inicial" },
    { name: "description", content: "Rota inicial" },
  ];
}

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