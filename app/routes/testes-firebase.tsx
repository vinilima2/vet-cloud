import { adicionarPet, atualizarPet, excluirPet, excluirPets, obterPet, obterPets } from "~/services/pet-service";
import { Button } from "~/components/ui/button";
import { adicionarTutor, atualizarTutor, excluirTutor, excluirTutores, obterTutor, obterTutores } from "~/services/tutor-service";
import { adicionarClinica, atualizarClinica, excluirClinica, obterClinica, obterClinicas } from "~/services/clinica-service";
import { adicionarUsuarioClinica, excluirUsuarioClinica, excluirUsuariosClinica, obterUsuarioClinica, obterUsuariosClinica } from "~/services/usuario-clinica-service";
import { adicionarUsuario, atualizarUsuario, excluirUsuario, excluirUsuarios, obterClinicasDoUsuario, obterIdUsuarioPorEmail, obterUsuario, obterUsuarios } from "~/services/usuario-service";
import { adicionarAgendamento, excluirAgendamento, excluirAgendamentos } from "~/services/agendamento-service";

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
//const usuario_clinca = await obterUsuarioClinica("KKYPqnFZzDu37NIyUabY", "usuario-clinica-1");
//const usuarios_clinca = await obterUsuariosClinica("KKYPqnFZzDu37NIyUabY");
//const clinica = await obterClinica("KKYPqnFZzDu37NIyUabY");
//const clinicas = await obterClinicas();

/*const novo_usuario = await adicionarUsuario({
    nome_completo: "Marina Borges",
    cpf: "09299923482",
    email_contato: "dramarinabrgs@outlook.com",
    email_login: "marinabb2021@gmail.com",
    registro_crmv: "00123-SP",
    senha: "hjnbfdhjunberfzdfs",
    telefone: "(14) 99171-8700"
});*/

//const usuario = await obterUsuario("6zGByG9EIW5S1bCU1SxI", "sem-login");
//const usuarios = await obterUsuarios();
//const clinicas_usuario = await obterClinicasDoUsuario("xpyffITcUC9RqFqEu3bn");
//const usuario_por_email = await obterIdUsuarioPorEmail("paulosrahal@gmail.com");

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
            adicionarTutor("2lzHQxVAYJOeO53mzo4m", {
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
                    },
                    {
                        nome: "Paçoca",
                        ano_nascimento: 2017,
                        ativo: true,
                        cor: "caramelo-branco",
                        especie: "porquinho-da-Índia",
                        peso: 0.2,
                        raca: "Pelo curto",
                        sexo: "F",
                        observacoes: "Idosa, problemas com os dentes"
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
            adicionarUsuarioClinica("2lzHQxVAYJOeO53mzo4m", "", "Admin");
            adicionarUsuarioClinica("KKYPqnFZzDu37NIyUabY", "", "Basic");
            adicionarUsuarioClinica("2lzHQxVAYJOeO53mzo4m", "", "Root");        
        }}>Adicionar Usuário na Clínica</Button>*/

        /*<Button onClick={() => {
            excluirUsuarioClinica("2lzHQxVAYJOeO53mzo4m", "ejpxmbJtFaPyc1fGBao0");
            excluirUsuarioClinica("KKYPqnFZzDu37NIyUabY", "ejpxmbJtFaPyc1fGBao0");          
        }}>Excluir Usuário da Clínica</Button>*/

        /*<Button onClick={() => {
            excluirUsuariosClinica("2lzHQxVAYJOeO53mzo4m");         
        }}>Excluir Usuários da Clínica</Button>*/

        /* <Button onClick={() => {
            console.log(usuario_clinca);            
        }}>Obter Usuário da Clínica</Button> */

        /*<Button onClick={() => {
            console.log(usuarios_clinca);            
        }}>Obter Usuários da Clínica</Button>*/

        /*<Button onClick={() => {
            atualizarClinica("2lzHQxVAYJOeO53mzo4m", {
                nome: "PetLover Plus Bauru",
                email: "contato@petloverplus.com.br"
            });    
        }}>Atualizar Clínica</Button>*/

        /*<Button onClick={() => {
            console.log(clinica);            
        }}>Obter Clínica</Button>*/

        /*<Button onClick={() => {
            console.log(clinicas);            
        }}>Obter Clínicas</Button>*/

        /*<Button onClick={() => {
            console.log(novo_usuario);            
        }}>Adicionar Usuário</Button>*/   
        
        /*<Button onClick={() => {
            excluirUsuario("ejpxmbJtFaPyc1fGBao0");               
        }}>Excluir Usuário</Button>*/

        /*<Button onClick={() => {
            excluirUsuarios();               
        }}>Excluir Usuários</Button>*/

        /*<Button onClick={() => {
            atualizarUsuario("ZqwxCRfwF4nXl3L487GF", {
                cpf: "88800172399",
                email_contato: "rogeriofurtado@yahoo.com.br",
                email_login: "rogerioff@gmail.com",
                nome_completo: "Rogério Faria Furtado",
                registro_crmv: "09177-SP",
                senha: "haybuiedrfvgyuyuhsred&",
                telefone: "(11) 98172-5560"
            });               
        }}>Atualizar Usuário</Button>*/

        /*<Button onClick={() => {
            console.log(usuario);           
        }}>Obter Usuário</Button>*/

        /*<Button onClick={() => {
            console.log(usuarios);           
        }}>Obter Usuários</Button>*/

        /*<Button onClick={() => {
            console.log(clinicas_usuario);           
        }}>Obter Clínicas do Usuário</Button>*/

        /*<Button onClick={() => {
            console.log(usuario_por_email);           
        }}>Obter Usuário por E-mail de Login</Button>*/

        /*<Button onClick={() => {
            adicionarAgendamento("2lzHQxVAYJOeO53mzo4m", {
                atividade: "Extração de dentes",
                data_marcada: "15/09/2025",
                hora_marcada: "17:00",
                id_pet: "PkX8L8lHQ5dFDw1FX9NX",
                id_tutor: "MdVyU0hUjnutJVvvDTsS",
                id_usuario: "xpyffITcUC9RqFqEu3bn",
                status: "CANCELADO"
            });
        }}>Adicionar Agendamento</Button>*/
        
        /*<Button onClick={() => {
            excluirAgendamento("2lzHQxVAYJOeO53mzo4m", "SMV56dOSgb0NlMqD3vBq");              
        }}>Excluir Agendamento</Button>*/
        
        <Button onClick={() => {
            excluirAgendamentos("2lzHQxVAYJOeO53mzo4m");              
        }}>Excluir Agendamentos</Button>
    )
}