import { adicionarPet, atualizarPet, excluirPet, excluirPets } from "~/services/pet-service";
import { Button } from "~/components/ui/button";

export default function TestesFirebase() {
    return (
        /*<Button onClick={() => {
            adicionarPet("0", "2", {
                    nome: "Laika",
                    ano_nascimento: 2011,
                    especie: "Cachorro",
                    raca: "SRD",
                    sexo: "F",
                    cor: "caramelo-branco",
                    peso: 12,
                    ativo: true,
                    observacoes: "Idosa, possui catarata"
                }
            )  
        }}>Adicionar Pet</Button>*/

        /*<Button onClick={() => {
            excluirPet("0", "2", "lqhL5oDS9Ffv10sNPIt9")  
        }}>Excluir Pets do Tutor</Button>*/

        /* <Button onClick={() => {
            excluirPets("0", "2")  
        }}>Excluir Pets</Button> */

        <Button onClick={() => {
            atualizarPet("0", "1", "0", {
                nome: "Francisca",
                peso: 4.5
            }) 
        }}>Atualizar Pet</Button>
    )
}