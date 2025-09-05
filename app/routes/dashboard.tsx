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
            adicionarPet({
            nome: "Zé",
            anoNascimento: 2020,
            especie: "Cachorro",
            raca: "Basset Hound",
            sexo: "M",
            cor: "preto",
            peso: 8.5,
            ativo: true,
            })  
        }}>Adicionar Pet</Button>
    )
}