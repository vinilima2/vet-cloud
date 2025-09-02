import type { Route } from "../+types/home";
import { PawPrint } from "lucide-react";
import { Formulario } from "./formulario";
import Imagem from "../../assets/clinica.jpg";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <PawPrint className="size-4" />
            </div>
            VetCloud
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Formulario/>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={Imagem}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
      </div>
    </div>
  );
}
