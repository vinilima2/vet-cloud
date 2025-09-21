import { Button } from "~/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { adicionarClinica, atualizarClinica, type ClinicaView, excluirClinica } from "~/services/clinica-service";
import { useEffect, useState } from "react";
import { useAuth } from "~/providers/auth-provider";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import { useLoading } from "~/providers/loading-provider";
import { Dialog } from "~/components/dialog";
import { AlertDialogTrigger } from "~/components/ui/alert-dialog";


interface FormularioClinicaProps {
    clinica?: ClinicaView;
    onSuccess: () => void;
    onClose: () => void;
}

export function FormularioClinica({ clinica, onSuccess, onClose }: FormularioClinicaProps) {
    const { usuario } = useAuth()
    const { setLoading } = useLoading()

    useEffect(() => {
        if (clinica?.id && clinica?.data) {
            Object.keys(clinica.data).forEach(key => {
                document.getElementById(key).value = clinica.data[key]
            });
        }
    }, [clinica])

    const onSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.target).entries()) as any
        try {
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
            setLoading(false)
        }
    };

    const deletarClinica = async () => {
        if (clinica) {
            try {
                await excluirClinica(clinica.id);
                localStorage.removeItem('clinicaSelecionada')
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
                        required
                        maxLength={50}
                    />

                </div>

                <div className="space-y-2">
                    <Label htmlFor="documento_representante">CPF do Representante *</Label>
                    <Input
                        id="documento_representante"
                        placeholder="000.000.000-00"
                        name={"documento_representante"}
                        required
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                        maxLength={14}
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
                        placeholder="(00) 90000-0000"
                        pattern="\(\d{2}\)\s9\d{4}-\d{4}"
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
                    required
                    name={"email"}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                    id="endereco"
                    placeholder="Rua, número - Bairro, Cidade - Estado"
                    name={"endereco"}
                    required
                    maxLength={100}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="biografia">Biografia (Opcional)</Label>
                <Textarea
                    id="biografia"
                    placeholder="Conte um pouco sobre a clínica..."
                    rows={4}
                    name={"biografia"}
                    maxLength={100}
                />
            </div>

            <div className="flex justify-between pt-4">
                <div>
                    {clinica && (
                        <Dialog titulo="Deseja realmente deletar a clínica? Essa ação não poderá ser desfeita" conteudo="Confirme para deletar" onConfirm={() => {
                            deletarClinica()
                        }}>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="cursor-pointer"
                                    type="button"
                                    variant="destructive"
                                >
                                    Excluir
                                </Button>
                            </AlertDialogTrigger>
                        </Dialog>
                    )}
                </div>
                <div className="space-x-2">
                    <Button
                        className="cursor-pointer"
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button className="cursor-pointer" type="submit">
                        Salvar
                    </Button>
                </div>
            </div>
        </form>
    );
}