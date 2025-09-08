import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
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
    ultima_atualizacao?: string
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