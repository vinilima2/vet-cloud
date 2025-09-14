import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useNavigate } from "react-router"
import { useState } from "react"
import { type Autenticacao } from "~/services/autenticacao-service"
import Logo from "../../assets/vet.png";
import { useAuth } from "~/providers/auth-provider"

export function Formulario({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate()
  const [login, setLogin] = useState<Partial<Autenticacao>>()
  const { realizarLogin } = useAuth()

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <img src={Logo} />
          <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Entre e aproveite agora mesmo</h1>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={login?.email} onChange={(event) => setLogin({
                  email: event.target.value,
                  senha: login?.senha
                })} required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueci minha senha?
                  </a>
                </div>
                <Input id="password" type="password" value={login?.senha} onChange={(event) => setLogin({
                 email: login?.email,
                 senha: event.target.value
                })} required />
              </div>
              <Button type="button" className="w-full" onClick={() => {
                realizarLogin(login).then(() => navigate('/home'))
              }}>
                Entrar
              </Button>
            </div>
            <div className="text-center text-sm">
              Não tenho registro{" "}
              <a href="/registro" className="underline underline-offset-4">
                Registrar-se
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
