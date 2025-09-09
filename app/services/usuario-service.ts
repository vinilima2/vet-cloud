import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { horaAtual } from '~/lib/utils';

export interface Usuario {
    nome_completo: string,
    cpf: string,
    registro_crmv: string,
    telefone: string,
    email_contato: string,
    email_login: string,
    senha: string,
    ativo: boolean,
    data_criacao?: string,
    ultima_atualizacao?: string,
} 

export interface UsuarioView {
    id: string,
    data: Usuario
}

export async function adicionarUsuario(usuario: Usuario): Promise<string | null> {
    try {
        const usuario_collection = collection(database, `Usuario`);
        const novo_usuario = await addDoc(usuario_collection, usuario);
        const agora = horaAtual();
        await updateDoc(novo_usuario, ({data_criacao: agora, ultima_atualizacao: agora}) as Partial<Usuario>);
        return novo_usuario.id;
    } catch(error) {
        console.log("Erro em 'adicionarUsuario': ", error);
    }        
    return null;
}

export async function adicionarClinicaNoUsuario(id_usuario: string, id_clinica: string) { // sincroniza com as clínicas das quais faz parte
    try {
        const clinica_doc = doc(database, `Usuario/${id_usuario}/ClinicaRef`, id_clinica);
        await setDoc(clinica_doc, { id: id_clinica });
    } catch(error) {
        console.log("Erro em 'adicionarClinicaNoUsuario': ", error);
    } 
}

export async function removerClinicaDoUsuario(id_usuario: string, id_clinica: string) { // sincroniza com as clínicas das quais faz parte
    try {
        const clinica_ref_document = doc(database, `Usuario/${id_usuario}/ClinicaRef`, id_clinica);
        await deleteDoc(clinica_ref_document);
    } catch(error) {
        console.log("Erro em 'removerClinicaDoUsuario': ", error);
    }  
}