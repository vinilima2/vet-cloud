import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { horaAtual } from '~/lib/utils';
import { atualizarUsuarioClinica } from './usuario-clinica-service';

export interface Usuario {
    nome_completo: string,
    cpf: string,
    registro_crmv: string,
    telefone: string,
    email_contato: string,
    email_login: string,
    senha: string,
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

export async function excluirUsuario(id_usuario: string) {
    try {
        const clinica_ref_collection = collection(database, `Usuario/${id_usuario}/ClinicaRef`);
        const clinica_ref_docs = await getDocs(clinica_ref_collection);
        clinica_ref_docs.docs.forEach((clinica) => {
            atualizarUsuarioClinica(clinica.id, id_usuario, { ativo: false }); // deixa o status 'ativo' da referência do usuário como 'false'
            removerClinicaDoUsuario(id_usuario, clinica.id); // é necessário remover todos os itens de 'ClinicaRef' separadamente.
        });
        const usuario_document = doc(database, `Usuario`, id_usuario);
        deleteDoc(usuario_document);
    } catch(error) {
        console.log("Erro em 'excluirUsuario': ", error);
    }      
}

export async function excluirUsuarios() { // utilizar somente em ambiente de desenvolvimento.
    try {
        const usuario_collection = collection(database, `Usuario`);
        const usuario_docs = await getDocs(usuario_collection);
        usuario_docs.docs.forEach((usuario_doc) => {
            excluirUsuario(usuario_doc.id);    
        });
    } catch(error) {
        console.log("Erro em 'excluirUsuarios': ", error);
    }   
}

export async function atualizarUsuario(id_usuario: string, novos_dados: Partial<Usuario>) {
    try {
        const usuario_document = doc(database, `Usuario`, id_usuario);
        await updateDoc(usuario_document, novos_dados);
        await updateDoc(usuario_document, { ultima_atualizacao: horaAtual() } as Partial<Usuario>)
    } catch(error) {
        console.log("Erro em 'atualizarUsuario': ", error);
    }    
}