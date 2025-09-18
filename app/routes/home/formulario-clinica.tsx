import {Button} from "~/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {adicionarClinica, atualizarClinica, type ClinicaView, excluirClinica} from "~/services/clinica-service";
import {useState} from "react";
import {useAuth} from "~/providers/auth-provider";
import {toast} from "sonner";
import {Textarea} from "~/components/ui/textarea";


interface FormularioClinicaProps {
    clinica?: ClinicaView;
    onSuccess: () => void;
    onClose: () => void;
}

export function FormularioClinica({clinica, onSuccess, onClose}: FormularioClinicaProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {usuario} = useAuth()
    const onSubmit = async (event: any) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target).entries()) as any
        try {
            setIsSubmitting(true);
            if (clinica) {
                await atualizarClinica(clinica.id, data);
                toast.success('Clínica atualizada com sucesso!');
            } else {
                const idUsuarioRoot = usuario?.uid ?? '';
                await adicionarClinica(data, idUsuarioRoot);
                toast.success('Clínica cadastrada com sucesso!');
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar clínica:', error);
            toast.error('Erro ao salvar clínica. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExcluir = async () => {
        if (clinica && confirm('Tem certeza que deseja excluir esta clínica?')) {
            try {
                await excluirClinica(clinica.id);
                toast.success('Clínica excluída com sucesso!');
                onSuccess();
                onClose();
            } catch (error) {
                console.error('Erro ao excluir clínica:', error);
                toast.error('Erro ao excluir clínica. Tente novamente.');
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Clínica *</Label>
                    <Input
                        id="nome"
                        placeholder="Nome da clínica"
                        name={"nome"}
                    />

                </div>

                <div className="space-y-2">
                    <Label htmlFor="documento_representante">CPF do Representante *</Label>
                    <Input
                        id="documento_representante"
                        placeholder="000.000.000-00"
                        name={"documento_representante"}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="registro_crmv">CRMV *</Label>
                    <Input
                        id="registro_crmv"
                        placeholder="Número do CRMV"
                        name={"registro_crmv"}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        name={"telefone"}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    name={"email"}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                    id="endereco"
                    placeholder="Rua, número - Bairro, Cidade - Estado"
                    name={"endereco"}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="biografia">Biografia (Opcional)</Label>
                <Textarea
                    id="biografia"
                    placeholder="Conte um pouco sobre a clínica..."
                    rows={4}
                    name={"biografia"}
                />
            </div>

            <div className="flex justify-between pt-4">
                <div>
                    {clinica && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleExcluir}
                            disabled={isSubmitting}
                        >
                            Excluir
                        </Button>
                    )}
                </div>
                <div className="space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </div>
        </form>
    );
}