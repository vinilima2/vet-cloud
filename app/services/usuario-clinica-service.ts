import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { horaAtual } from '~/lib/utils';

export interface UsuarioClinica {
    nivel_acesso: "Basic" | "Admin" | "Root"
    data_inclusao?: string,
    ultima_atualizacao?: string
}

export interface UsuarioClinicaView {
    id: string,
    data: UsuarioClinica
}

export async function adicionarUsuarioClinica(id_clinica: string, id_usuario_app: string, nivel_acesso: string) {
    try {
        const usuario_doc = doc(database, `Clinica/${id_clinica}/Usuario`, id_usuario_app);
        const agora = horaAtual();
        await setDoc(usuario_doc, { nivel_acesso: nivel_acesso, data_inclusao: agora, ultima_atualizacao: agora } as UsuarioClinica);
    } catch(error) {
        console.log("Erro em 'adicionarUsuarioClinica': ", error);
    }
}

export async function excluirUsuarioClinica(id_clinica: string, id_usuario: string) {
    try {
        const usuario_document = doc(database, `Clinica/${id_clinica}/Usuario`, id_usuario);
        await deleteDoc(usuario_document);
    } catch(error) {
        console.log("Erro em 'excluirUsuarioClinica': ", error);
    }    
}

export async function excluirUsuariosClinica(id_clinica: string) {
    try {
        const usuario_collection = collection(database, `Clinica/${id_clinica}/Usuario`);
        const usuario_docs = await getDocs(usuario_collection);
        usuario_docs.docs.forEach((usuario_doc) => {
            excluirUsuarioClinica(id_clinica, usuario_doc.id);
        });
    } catch(error) {
        console.log("Erro em 'excluirUsuariosClinica': ", error);
    }    
}

export async function atualizarUsuarioClinica(id_clinica: string, id_usuario: string, novo_nivel_acesso: "Root" | "Admin" | "Basic") {
    try {
        const usuario_document = doc(database, `Clinica/${id_clinica}/Usuario`, id_usuario);
        await updateDoc(usuario_document, ({ nivel_acesso: novo_nivel_acesso, ultima_atualizacao: horaAtual() }) as Partial<UsuarioClinica>);
    } catch(error) {
        console.log("Erro em 'atualizarUsuarioClinica': ", error);
    }      
}