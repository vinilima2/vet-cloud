import { adicionarPet, atualizarPet, excluirPet, excluirPets, obterPet, obterPets } from "~/services/pet-service";
import { Button } from "~/components/ui/button";
import { adicionarTutor } from "~/services/tutor-service";
import { horaAtual } from "~/lib/utils";

// const pet = await obterPet("0", "1", "0");
// const pets = await obterPets("0", "2");

export default function TestesFirebase() {
    const agora = horaAtual();
    
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

        /*<Button onClick={() => {
            atualizarPet("0", "1", "0", {
                nome: "Francisca",
                peso: 4.5
            }) 
        }}>Atualizar Pet</Button>*/
        
        /*<Button onClick={() => {
            console.log(pet);          
        }}>Obter Pet</Button>*/

        /*<Button onClick={() => {
            console.log(pets);          
        }}>Obter Pets</Button>*/

        <Button onClick={() => {
            adicionarTutor("0", {
                nome_completo: "Amanda Klein Moreira Filho",
                cpf: "93800012389",
                endereco: "Rua Bananeira, Jd. Ypê, 1-10, CEP 6666-999, Bauru-SP",
                contato: "(14) 98123-1823",
                email: "amandakleinmf@gmail.com",
                data_criacao: agora,
                ultima_atualizacao: agora, 
            }, [
                    {
                        nome: "Cheetara",
                        ano_nascimento: 2012,
                        ativo: true,
                        cor: "mel-malhado",
                        especie: "gato",
                        peso: 3.809,
                        raca: "SRD",
                        sexo: "F",
                        observacoes: "Dificuldade para engolir comprimidos."
                    },
                    {
                        nome: "Lucy",
                        ano_nascimento: 2017,
                        ativo: true,
                        cor: "preto-branco",
                        especie: "cachorro",
                        peso: 8,
                        raca: "SRD",
                        sexo: "F",
                        observacoes: "Tem alergia a pulgas. Não foi castrada."
                    }                   
                ])              
        }}>Inserir Tutor</Button>
    )
}