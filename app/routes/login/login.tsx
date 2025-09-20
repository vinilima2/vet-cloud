import { Formulario } from "./formulario";
import Carrossel from "../../components/carrossel";
import type { Route } from "../../+types/root";
import Loading from "~/components/loading";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud | Login" },
    { name: "description", content: "Rota de Login" },
  ];
}

export default function Login() {

  return (
    <div className="grid  lg:grid-cols-3">
      <Carrossel />
      <Formulario />
      <Carrossel reverse />
      <Loading />
    </div>
  );
}
