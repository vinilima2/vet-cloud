import { adicionarPet, atualizarPet, excluirPet, excluirPets, obterPet, obterPets } from "~/services/pet-service";
import { Button } from "~/components/ui/button";
import { adicionarTutor, atualizarTutor, excluirTutor, excluirTutores, obterTutor, obterTutores } from "~/services/tutor-service";
import { adicionarClinica, excluirClinica } from "~/services/clinica-service";
import { adicionarUsuarioClinica, excluirUsuarioClinica, excluirUsuariosClinica, obterUsuarioClinica } from "~/services/usuario-clinica-service";

// const pet = await obterPet("0", "1", "0");
// const pets = await obterPets("0", "2");
// const tutor = await obterTutor("0", "17IwrnnQkcpVcxJn1nXm");
// const tutores = await obterTutores("0")
/*const clinica_id = await adicionarClinica({
    nome: "CliniCão Exames",
    documento_representante: "91827300012347",
    email: "contato@clinicaoexamesbauru.com.br",
    endereco: "Rua Zé da Roça, Vila do Chaves, 8-90, CEP 78922-567, Bauru-SP",
    registro_crmv: "67896-SP",
    telefone: "(14) 7621-0912",
    biografia: "Especializado em exames clínicos"
}, "usuario-clinica-1");*/
const usuario_clinca = await obterUsuarioClinica("KKYPqnFZzDu37NIyUabY", "usuario-clinica-1");

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

        /*<Button onClick={() => {
            adicionarTutor("0", {
                nome_completo: "Amanda Klein Moreira Filho",
                cpf: "93800012389",
                endereco: "Rua Bananeira, Jd. Ypê, 1-10, CEP 6666-999, Bauru-SP",
                telefone: "(14) 98123-1823",
                email: "amandakleinmf@gmail.com",
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
                    }               
                ])              
        }}>Inserir Tutor</Button>*/
        /*<Button onClick={() => {
            excluirTutor("0", "MZlbdh17a4TdPUSraizD");
        }}>Excluir Tutor</Button>*/

        /*<Button onClick={() => {
            excluirTutores("0");
        }}>Excluir Tutores</Button>*/

        /*<Button onClick={() => {
            atualizarTutor("0", "17IwrnnQkcpVcxJn1nXm", {
                telefone: "(18) 97671-4599",
                nome_completo: "Joana D'arc Silva"
            })
        }}>Atualizar Tutor</Button>*/

        /*<Button onClick={() => {
            console.log(tutor);
        }}>Obter Tutor</Button>*/

        /*<Button onClick={() => {
            console.log(tutores);
        }}>Obter Tutores</Button>*/

        /*<Button onClick={() => {
            console.log(clinica_id);    
        }}>Adicionar Clinica</Button>*/

        /*<Button onClick={() => {
            excluirClinica("rGGURnvW5qk1GEVCE5eJ");       
        }}>Excluir Clínica</Button>*/

        /*<Button onClick={() => {
            adicionarUsuarioClinica("2lzHQxVAYJOeO53mzo4m", "teste3", "Root")          
        }}>Adicionar Usuário na Clínica</Button>*/

        /*<Button onClick={() => {
            excluirUsuarioClinica("2lzHQxVAYJOeO53mzo4m", "teste0")          
        }}>Excluir Usuário da Clínica</Button>*/

        /*<Button onClick={() => {
            excluirUsuariosClinica("2lzHQxVAYJOeO53mzo4m");         
        }}>Excluir Usuários da Clínica</Button>*/

        <Button onClick={() => {
            console.log(usuario_clinca);            
        }}>Obter Usuário da Clínica</Button>
    )
}