import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import Vet from "./vet-cloud.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Card className="p-12">
        <h1 className="text-2xl font-bold mb-4">Bem vindo VetCloud</h1>
        <img src={Vet} alt="Vet" className="mb-4  mx-auto" />
        <Input placeholder="Digite seu usuário" />

        <Input type="password" placeholder="Digite sua senha" />
        <Button
          variant={"default"}
          onClick={() => {
            alert("Button clicked!");
          }}
        >
          Acessar
        </Button>
        

         <Button
          variant={"link"}
          onClick={() => {
            alert("Button clicked!");
          }}
        >
          Não possuo cadastro
        </Button>
      </Card>
    </main>
  );
}