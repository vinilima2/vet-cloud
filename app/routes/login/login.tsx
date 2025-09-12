import { Formulario } from "./formulario";
import type { Login } from "~/services/autenticacao-service";
import Carrossel from "./carrossel";
import type { Route } from "../../+types/root";

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
      <Carrossel />
    </div>
  );
}
