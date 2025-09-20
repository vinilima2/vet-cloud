import { Toaster } from "sonner"
import { Formulario } from "./formulario"
import Loading from "~/components/loading"

export default function Registro() {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Toaster />
      <Formulario className="w-1/2" />
      <Loading />
    </div>
  )
}
