import { AppSidebar } from "~/components/app-side-bar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { adicionarPet } from "~/services/pet-service";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
    return (
        /*<SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
        </SidebarProvider> */
        <Button onClick={() => {
            adicionarPet("0", "0", {
                    nome: "Jujuba",
                    anoNascimento: 2018,
                    especie: "Cachorro",
                    raca: "Salsicha",
                    sexo: "F",
                    cor: "marrom",
                    peso: 6,
                    ativo: true,
                    observacoes: "agressiva ao lidar com agulhas."
                }
            )  
        }}>Adicionar Pet</Button>
    )
}