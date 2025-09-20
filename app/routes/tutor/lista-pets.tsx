import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Plus, PawPrint, Pencil } from "lucide-react";
import FormularioPet from "./formulario-pet";
import { obterPets, type PetView } from "~/services/pet-service";
import { Card } from "~/components/ui/card";
import { Avatar } from "~/components/ui/avatar";

type ListaPetsProps = {
  tutorId: string;
  clinicaId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ListaPets({ tutorId, clinicaId, isOpen, onClose }: ListaPetsProps) {
  const [pets, setPets] = useState<PetView[]>([]);
  const [abrirFormulario, setAbrirFormulario] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState<PetView | null>(null)

  const carregarPets = async () => {
    try {
      const petsCadastrados = await obterPets(clinicaId, tutorId);
      if (petsCadastrados) {
        setPets(petsCadastrados);
      }
    } catch (error) {
      console.error('Erro ao carregar pets:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      carregarPets().then();
    }
  }, [isOpen]);

  const handlePetAdicionado = () => {
    carregarPets().then();
    setAbrirFormulario(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pets do Tutor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!abrirFormulario && <div className="flex justify-end">
            <Button className="cursor-pointer" onClick={() => setAbrirFormulario(true)}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Pet
            </Button>
          </div>}

          {abrirFormulario ? (
            <div className="p-4 border rounded-lg">
              <FormularioPet
                tutorId={tutorId}
                onSuccess={handlePetAdicionado}
                onCancel={() => setAbrirFormulario(false)}
                pet={petSelecionado ?? null}
              />
            </div>
          ) : (
            <div className="space-y-2">
              {pets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum pet cadastrado para este tutor.
                </div>
              ) : (
                pets.map((pet) => (
                  <Card key={pet.id} className="p-4 relative">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 flex justify-center items-center">
                        <PawPrint className="h-5 w-5" />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{pet.data.nome}</h4>
                        <p className="text-sm text-muted-foreground">
                          {pet.data.raca} • {pet.data.especie}
                        </p>
                      </div>
                      <Button className="bg-green-600 cursor-pointer absolute right-2" onClick={() => {
                        setPetSelecionado(pet)
                        setAbrirFormulario(true)
                      }}><Pencil /></Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
