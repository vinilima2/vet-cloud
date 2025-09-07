import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';

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

export async function adicionarClinica(clinica: Clinica): Promise<string | null> {
    try {
        const clinica_collection = collection(database, `Clinica`);
        const nova_clinica = await addDoc(clinica_collection, clinica);
        return nova_clinica.id; // para armazenar na sessão do usuário
    } catch(error) {
        console.log("Erro em 'adicionarClinica': ", error);
    }
    return null;
}