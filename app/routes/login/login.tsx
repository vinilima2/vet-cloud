import { Formulario } from "./formulario";
import Carrossel from "../../components/carrossel";
import type { Route } from "../../+types/root";
import Loading from "~/components/loading";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "VetCloud" },
    { name: "description", content: "Welcome to React Router!" },
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
