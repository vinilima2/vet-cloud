import { useEffect, useState } from "react";
import { type ClinicaView, obterClinica, obterClinicas } from "~/services/clinica-service";
import { useAuth } from "~/providers/auth-provider";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Building, Pencil, Plus, X } from "lucide-react";
import { FormularioClinica } from "~/routes/home/formulario-clinica";
import { Card } from "~/components/ui/card";
import { Avatar } from "~/components/ui/avatar";
import { obterClinicasDoUsuario } from "~/services/usuario-service";

export function ListaClinicas() {
    const [clinicas, setClinicas] = useState<ClinicaView[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [dialogAberto, setDialogAberto] = useState(false);
    const [clinicaSelecionada, setClinicaSelecionada] = useState<ClinicaView | null>(null);
    const { clinica, alterarClinicaSelecionada, usuario } = useAuth()

    const carregarClinicas = async () => {
        try {
            obterClinicasDoUsuario(usuario?.uid ?? '').then(async (clinicasUsuario) => {
                let clinicasDoUsuario = [];
                for (let clinicaDoUsuario of (clinicasUsuario ?? [])) {
                    clinicasDoUsuario.push(await obterClinica(clinicaDoUsuario.id))
                }
               
                setClinicas(clinicasDoUsuario ?? [])
            });
        } catch (error) {
            console.error('Erro ao carregar clínicas:', error);
            toast.error('Erro ao carregar a lista de clínicas');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarClinicas().then();
    }, []);

    const abrirFormularioEdicao = (clinica: ClinicaView) => {
        setClinicaSelecionada(clinica);
        setDialogAberto(true);
    };

    const fecharDialog = () => {
        setDialogAberto(false);
        setClinicaSelecionada(null);
    };

    const handleSuccess = () => {
        carregarClinicas().then();
    };

    if (carregando) {
        return <div className="text-center p-4">Carregando clínicas...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Minhas Clínicas</h2>
                <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setClinicaSelecionada(null)}>
                            Nova Clínica <Plus className="ml-2" size={16} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <div className="flex justify-between items-center">
                                <DialogTitle>
                                    {clinicaSelecionada ? 'Editar Clínica' : 'Nova Clínica'}
                                </DialogTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={fecharDialog}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </DialogHeader>
                        <FormularioClinica
                            clinica={clinicaSelecionada || undefined}
                            onSuccess={handleSuccess}
                            onClose={fecharDialog}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {clinicas.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Nenhuma clínica cadastrada</p>
                </div>
            ) : (
                <div className="space-y-3 grid grid-cols-3 gap-5">
                    {clinicas.map((clinicaCard) => (
                        <Card key={clinicaCard.id} className={`p-4 flex cursor-pointer ${clinicaCard.id === clinica?.id && 'bg-teal-700'}`} onClick={() => alterarClinicaSelecionada(clinicaCard)}>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                                    <Building className="text-background" />
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">{clinicaCard.data.nome}</h3>
                                    <p className="text-sm text-muted-foreground">{clinicaCard.data.endereco}</p>
                                </div>
                            </div>
                            {/*<div className="flex gap-2">*/}
                            {/*    <Button*/}
                            {/*        variant="outline"*/}
                            {/*        size="icon"*/}
                            {/*        onClick={() => abrirFormularioEdicao(clinica)}*/}
                            {/*    >*/}
                            {/*        <Pencil className="h-4 w-4" />*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}