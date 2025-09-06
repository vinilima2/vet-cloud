import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { type PetView, type Pet, adicionarPet } from './pet-service';

export interface Tutor {
    nome_completo: string,
    cpf: string,
    endereco: string,
    contato: string,
    email: string,
    data_criacao: string,
    ultima_atualizacao: string
}

export interface TutorView {
    id: string,
    info: Tutor,
    pets?: PetView
}

export interface TutorContato {
    contato: string,
    email: string
}

export async function adicionarTutor(id_clinica: string, tutor: Tutor, pets: Pet[] = []) {
    try {
        const tutor_collection = collection(database, `Clinica/${id_clinica}/Tutor`);
        const novo_tutor = await addDoc(tutor_collection, tutor);
        pets.forEach((pet) => adicionarPet(id_clinica, novo_tutor.id, pet));
    } catch(error) {
        console.log("Erro em 'adicionarTutor': ", error);
    }
}


