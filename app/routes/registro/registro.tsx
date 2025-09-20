import { Toaster } from "sonner"
import { Formulario } from "./formulario"
import Loading from "~/components/loading"
import type { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud | Registro" },
    { name: "description", content: "Rota registro" },
  ];
}

export default function Registro() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Toaster position="top-center" richColors />
      <Formulario className="w-1/2" />
      <Loading />
    </div>
  )
}
