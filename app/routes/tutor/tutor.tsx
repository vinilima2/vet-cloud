import { DialogClose } from "@radix-ui/react-dialog";
import { Minus, PawPrint, Pencil, Plus, Trash, User } from "lucide-react";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardHeader } from "~/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SidebarGroup } from "~/components/ui/sidebar";

export default function Tutor() {
    return <>
        <SidebarGroup className="flex-row justify-between p-5 border-b-2 border-b-primary">
            <h1 className="text-3xl">Tutores Cadastrados</h1>
            <Dialog>
                <DialogTrigger><Button>Novo Tutor <Plus /></Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form>
                        <DialogHeader>
                            <DialogTitle>Formulário de Cadastro de Tutor</DialogTitle>
                            <DialogDescription>
                                Preencha o formulário abaixo...
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="nome-completo">Nome Completo</Label>
                                <Input id="nome-completo" name="nomeCompleto" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" name="email" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="cpf">CPF</Label>
                                <Input id="cpf" type="text" name="cpf" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="contato">Contato/Fone</Label>
                                <Input id="contato" type="tel" name="contato" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="cep">CEP</Label>
                                <Input id="cep" type="tel" name="cep" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="endereco">Endereço</Label>
                                <Input id="endereco" type="text" name="endereco" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="municipio">Municipio</Label>
                                <Input id="municipio" type="text" name="municipio" readOnly />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </SidebarGroup>
        <SidebarGroup>
            <Card className="flex-row p-5 justify-between">
                <div className="flex-row flex gap-2 items-center justify-center">
                    <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
                        <User className="text-background" />
                    </Avatar>
                    <div className="flex flex-col items-center ml-2">
                        <label>Valter de Mello</label>
                        <label>Bauru - SP</label>
                    </div>

                </div>

                <div className="flex flex-row gap-5 items-center justify-center">
                    <Button className="bg-purple-600"><PawPrint /></Button>
                    <Button className="bg-red-600"><Trash /></Button>
                    <Button className="bg-green-600"><Pencil /></Button>
                </div>
            </Card>
        </SidebarGroup>
    </>
}