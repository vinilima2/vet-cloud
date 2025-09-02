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

export function Formulario({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const navigate = useNavigate()

    function buscarPorCep() {
        const cep: any = document.getElementById('zip-code').value
        fetch(`https://viacep.com.br/ws/${cep}/json`).then(response => response.json()).then(dadosMunicipio => {
            document.getElementById('zip-code').value = dadosMunicipio.cep
            document.getElementById('address').value = dadosMunicipio.logradouro
            document.getElementById('city').value = dadosMunicipio.localidade
        })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Faça seu cadastro agora mesmo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="org-name">Razão Social da Clínica</Label>
                                <Input id="org-name" type="text" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="full-name">Nome completo Representante</Label>
                                <Input id="full-name" type="text" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" placeholder="email@exemplo.com" required />
                            </div>
                            <div className="flex justify-between gap-1">
                                <div className="grid w-1/3">
                                    <div className="flex items-center">
                                        <Label htmlFor="zip-code">CEP</Label>
                                    </div>
                                    <Input id="zip-code" type="text" required onBlur={() => buscarPorCep()} />
                                </div>
                                <div className="grid">
                                    <div className="flex items-center">
                                        <Label htmlFor="address">Endereço</Label>
                                    </div>
                                    <Input id="address" type="text" required />
                                </div>
                            </div>
                            <div className="flex justify-between gap-1">
                                <div className="grid">
                                    <div className="flex items-center">
                                        <Label htmlFor="city">Municipio</Label>
                                    </div>
                                    <Input id="city" type="text" required />
                                </div>
                                <div className="grid w-1/3">
                                    <div className="flex items-center">
                                        <Label htmlFor="number-address">Número</Label>
                                    </div>
                                    <Input id="number-address" type="number" required />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="repeat-your-password">Repita sua senha</Label>
                                </div>
                                <Input id="repeat-your-password" type="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" onClick={() => navigate('dash')}>
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
