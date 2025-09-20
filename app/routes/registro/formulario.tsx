import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useNavigate } from "react-router"
import Logo from "../../assets/vet.png";
import { criarUsuario, type Autenticacao } from "~/services/autenticacao-service"
import { adicionarUsuario, type Usuario } from "~/services/usuario-service"
import { toast } from "sonner"
import { useLoading } from "~/providers/loading-provider"

export function Formulario({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const navigate = useNavigate()
    const { setLoading } = useLoading()

    async function gravarUsuario(event: any) {
        event.preventDefault()
        setLoading(true)
        const objeto = Object.fromEntries(new FormData(event.target).entries())
        const dadosFormulario = objeto as Usuario;
        if (objeto.senha !== objeto.confirmacao_senha) {
            toast.error('Senhas não coicidem.')
            document.getElementById('confirmacao-senha')?.focus()
            setLoading(false)
            return;
        }

        dadosFormulario.email_login = dadosFormulario.email_contato;
        const idUsuario = await criarUsuario({
            email: dadosFormulario.email_contato.toString(),
            senha: dadosFormulario.senha.toString(),
        })

        if (!idUsuario) {
            setLoading(false)
            return;
        }
        dadosFormulario.id = idUsuario;
        let usuarioId = await adicionarUsuario(dadosFormulario)
        setLoading(false)
        if (!usuarioId) {
            return;
        }
        toast('Usuário registrado com sucesso.')
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 1000)

    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardTitle className="items-center justify-center flex">
                    <img src={Logo} className="h-60" />
                </CardTitle>
                <CardHeader>
                    <CardTitle className="text-center">Cadastre-se agora mesmo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={gravarUsuario}>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="full-name">Nome completo</Label>
                                    <Input id="full-name" type="text" required name="nome_completo" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="full-name">CPF</Label>
                                    <Input id="full-name" type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00" required maxLength={14} name="cpf" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="email-contato">E-mail</Label>
                                    <Input id="email-contato" type="email" name="email_contato" required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input id="telefone" type="tel" pattern="\(\d{2}\)\s9\d{4}-\d{4}" placeholder="(99) 9XXXX-XXXX" name="telefone" required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="crm">CRMV</Label>
                                    <Input id="crmv" type="number" name="registro_crmv" maxLength={10} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="senha">Senha</Label>
                                    </div>
                                    <Input id="senha" name="senha" type="password" minLength={8} maxLength={50} required />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="confirmacao-senha">Confirme sua senha</Label>
                                    </div>
                                    <Input id="confirmacao-senha" name="confirmacao_senha" minLength={8} maxLength={50} type="password" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full cursor-pointer">
                                    Registrar-se
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )


}
