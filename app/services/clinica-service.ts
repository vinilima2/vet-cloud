import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { excluirTutores } from './tutor-service';
import { adicionarUsuarioClinica, excluirUsuariosClinica } from './usuario-clinica-service';

export interface Clinica {
    nome: string,
    documento_representante: string,
    registro_crmv: string,
    email: string,
    telefone: string,
    endereco: string,
    biografia?: string
}

export interface ClinicaView {
    id: string,
    data: Clinica
}

export async function adicionarClinica(clinica: Clinica, id_usuario_root: string): Promise<string | null> {
    try {
        const clinica_collection = collection(database, `Clinica`);
        const nova_clinica = await addDoc(clinica_collection, clinica);
        adicionarUsuarioClinica(nova_clinica.id, id_usuario_root, "Root");
        return nova_clinica.id;
    } catch(error) {
        console.log("Erro em 'adicionarClinica': ", error);
    }
    return null;
}

export async function excluirClinica(id_clinica: string) {
    try {
        const clinica_document = doc(database, `Clinica`, id_clinica);
        excluirTutores(id_clinica); // é necessário excluir os Tutores separadamente
        excluirUsuariosClinica(id_clinica); // é necessário excluir os Usuários separadamente
        await deleteDoc(clinica_document);
    } catch(error) {
        console.log("Erro em 'excluirClinica': ", error);
    }
}

export async function excluirClinicas() { // cuidado com essa função, pois apaga todas as clínicas do sistema 
    try {
        const clinica_collection = collection(database, `Clinica`);
        const clinica_docs = await getDocs(clinica_collection);
        clinica_docs.docs.forEach((clinica_doc) => {
            excluirClinica(clinica_doc.id); 
        });        
    } catch(error) {
        console.log("Erro em 'excluirClinicas': ", error);
    }    
}

export async function atualizarClinica(id_clinica: string, novos_dados: Partial<Clinica>) {
    try {
        const clinica_document = doc(database, `Clinica`, id_clinica);
        await updateDoc(clinica_document, novos_dados);
    } catch(error) {
        console.log("Erro em 'atualizarTutor': ", error);
    }         
}