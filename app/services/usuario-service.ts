import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, setDoc, query, where } from 'firebase/firestore';
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
    id?: string
}

export interface UsuarioView {
    id: string,
    data: Usuario
}

export interface ValidacaoUsuario {
    status: boolean,
    msg?: string,
    id_usuario?: string
}

export async function adicionarUsuario(usuario: Usuario): Promise<string | null> {
    try {
        const usuarioRef = doc(database, "Usuario", usuario.id ?? '');
        await setDoc(usuarioRef, usuario);
        return usuario.id ?? '';
    } catch (error) {
        console.log("Erro em 'adicionarUsuario': ", error);
        return null;
    }
}

export async function adicionarClinicaNoUsuario(id_usuario: string, id_clinica: string) { // sincroniza com as clínicas das quais faz parte
    try {
        const clinica_doc = doc(database, `Usuario/${id_usuario}/ClinicaRef`, id_clinica);
        await setDoc(clinica_doc, { id: id_clinica });
    } catch (error) {
        console.log("Erro em 'adicionarClinicaNoUsuario': ", error);
    }
}

export async function removerClinicaDoUsuario(id_usuario: string, id_clinica: string) { // sincroniza com as clínicas das quais faz parte
    try {
        const clinica_ref_document = doc(database, `Usuario/${id_usuario}/ClinicaRef`, id_clinica);
        await deleteDoc(clinica_ref_document);
    } catch (error) {
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
        const usuario_document = doc(database, 'Usuario', id_usuario);
        deleteDoc(usuario_document);
    } catch (error) {
        console.log("Erro em 'excluirUsuario': ", error);
    }
}

export async function excluirUsuarios() { // utilizar somente em ambiente de desenvolvimento.
    try {
        const usuario_collection = collection(database, 'Usuario');
        const usuario_docs = await getDocs(usuario_collection);
        usuario_docs.docs.forEach((usuario_doc) => {
            excluirUsuario(usuario_doc.id);
        });
    } catch (error) {
        console.log("Erro em 'excluirUsuarios': ", error);
    }
}

export async function atualizarUsuario(id_usuario: string, novos_dados: Partial<Usuario>) {
    try {
        const usuario_document = doc(database, 'Usuario', id_usuario);
        await updateDoc(usuario_document, novos_dados);
        await updateDoc(usuario_document, { ultima_atualizacao: horaAtual() } as Partial<Usuario>)
    } catch (error) {
        console.log("Erro em 'atualizarUsuario': ", error);
    }
}

export async function obterUsuario(id_usuario: string, tipo_retorno: "contatos" | "login" | "sem-login" | "completo" = "completo"): Promise<Partial<UsuarioView> | null> {
    try {
        const usuario_document = doc(database, 'Usuario', id_usuario);
        const snapshot = await getDoc(usuario_document);
        if (snapshot.exists()) {
            switch (tipo_retorno) {
                case "contatos":
                    return {
                        id: snapshot.id,
                        data: {
                            nome_completo: snapshot.data().nome_completo,
                            telefone: snapshot.data().telefone,
                            email_contato: snapshot.data().email_contato
                        }
                    } as Partial<UsuarioView>;
                case "login":
                    return {
                        id: snapshot.id,
                        data: {
                            email_login: snapshot.data().email_login,
                            senha: snapshot.data().senha
                        }
                    } as Partial<UsuarioView>;
                case "sem-login":
                    return {
                        id: snapshot.id,
                        data: {
                            cpf: snapshot.data().cpf,
                            email_contato: snapshot.data().email_contato,
                            nome_completo: snapshot.data().nome_completo,
                            registro_crmv: snapshot.data().registro_crmv,
                            telefone: snapshot.data().telefone,
                            data_criacao: snapshot.data().data_criacao,
                            ultima_atualizacao: snapshot.data().ultima_atualizacao
                        }
                    } as Partial<UsuarioView>;
                default:
                    return { id: snapshot.id, data: snapshot.data() } as Partial<UsuarioView>;
            }
        }
    } catch (error) {
        console.log("Erro em 'obterUsuario': ", error);
    }
    return null;
}

export async function obterUsuarios() { // somente para ambiente de desenvolvimento
    try {
        const usuario_collection = collection(database, 'Usuario');
        const snapshot = await getDocs(usuario_collection);
        const usuario_docs = snapshot.docs.map((usuario_doc) => ({
            id: usuario_doc.id,
            data: usuario_doc.data() as Usuario
        } as UsuarioView));
        return usuario_docs;
    } catch (error) {
        console.log("Erro em 'obterUsuarios': ", error);
    }
    return null;
}

export async function obterClinicasDoUsuario(id_usuario: string) {
    try {
        const clinica_ref_collection = collection(database, `Usuario/${id_usuario}/ClinicaRef`);
        const snapshot = await getDocs(clinica_ref_collection);
        const usuario_docs = snapshot.docs.map((clinica_doc) => ({
            id: clinica_doc.id,
            data: clinica_doc.data() as Usuario
        } as UsuarioView));
        return usuario_docs;
    } catch (error) {
        console.log("Erro em 'obterClinicasDoUsuario': ", error);
    }
    return null;
}

export async function obterIdUsuarioPorEmail(email: string): Promise<ValidacaoUsuario> {
    try {
        const usuario_collection = collection(database, 'Usuario');
        const q = query(usuario_collection, where("email_login", "==", email));
        const snapshot = await getDocs(q);
        const res = snapshot.docs;
        if (res.length == 0) {
            return { status: false, msg: "Usuário não encontrado." } as ValidacaoUsuario;
        }
        return { status: true, id_usuario: res[0].id } as ValidacaoUsuario; // retorna o id do usuário associado a esse e-mail de login.   
    } catch (error) {
        console.log("Erro em 'obterIdUsuarioPorEmail': ", error);
        return { status: false, msg: "Erro de consulta ao banco de dados." } as ValidacaoUsuario; // caso ocorra erro interno no servidor.
    }
}