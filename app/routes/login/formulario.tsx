import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useNavigate } from "react-router"
import { type Autenticacao, recuperarSenha } from "~/services/autenticacao-service"
import Logo from "../../assets/vet.png";
import { Toaster, toast } from "sonner";
import { useAuth } from "~/providers/auth-provider"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "~/components/ui/dialog"
import { useLoading } from "~/providers/loading-provider"


export function Formulario({
    className,
}: React.ComponentProps<"form">) {
    const navigate = useNavigate()
    const { realizarLogin } = useAuth()
    const {setLoading} = useLoading()

    function solicitarLogin(event) {
        event.preventDefault()
        const objeto = Object.fromEntries(new FormData(event.target).entries())
        const login = objeto as Autenticacao
        setLoading(true)
        realizarLogin(login).then((usuarioLogado) => {
            if (usuarioLogado) navigate('/home')
        }).finally(() => setLoading(false))
    }

    return (
        <div className="flex flex-col gap-4">
            <Toaster />
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <img src={Logo} />
                    <form className={cn("flex flex-col gap-6", className)} onSubmit={solicitarLogin}>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">Acesse agora mesmo</h1>
                        </div>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" name="email" required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="senha">Senha</Label>
                                </div>
                                <Input id="senha" type="password" name="senha" required />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">
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
                    <Dialog>
                        <DialogTrigger className="text-center flex flex-col mt-5" asChild>
                            <span className="ml-auto text-center  text-sm underline-offset-4 hover:underline cursor-pointer">
                                Esqueci minha senha?
                            </span></DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogTitle>Recuperação de Senha</DialogTitle>
                            <form className="space-y-4" onSubmit={(event) => {
                                event.preventDefault()
                                const objeto = Object.fromEntries(new FormData(event.target).entries())
                                recuperarSenha(objeto.email_recuperacao as string).then(() => {
                                    toast.success('Instruções para recuperação de conta enviada ao seu e-mail.', {
                                        onAutoClose: () =>  window.location.reload()
                                    })
                                })
                            }}>
                                <div className="grid gap-3">
                                    <Input id="email-recuperacao" name="email_recuperacao" type="email" placeholder="Digite o e-mail para recuperação de senha..." required />
                                    <Button type="submit" className="w-full cursor-pointer">
                                        Enviar
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
