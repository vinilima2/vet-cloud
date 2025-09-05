import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { database } from '~/database/firebase-config';

export interface Pet {
    nome: string,
    ano_nascimento: number,
    especie: string,
    raca: string,
    cor: string,
    sexo: 'F' | 'M',
    peso: number,
    ativo: boolean,
    observacoes?: null | string
}

export async function adicionarPet(id_clinica: string, id_tutor: string, pet: Pet) {
    try {
        const pet_collection = collection(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`);
        await addDoc(pet_collection, pet);
    } catch(error) {
        console.log("Erro em 'adicionarPet': ", error);
    }
}

export async function excluirPet(id_clinica: string, id_tutor: string, id_pet: string) {
    try {
        const pet_document = doc(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`, id_pet);
        await deleteDoc(pet_document);
    } catch(error) {
        console.log("Erro em 'excluirPet': ", error);
    }
}

export async function excluirPets(id_clinica: string, id_tutor: string) {
    try {
        const pet_collection = collection(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`);
        const pet_docs = await getDocs(pet_collection);
        const promises = pet_docs.docs.map((pet_doc) => {
            return deleteDoc(doc(database, pet_doc.ref.path));
        });
        await Promise.all(promises);
    } catch(error) {
        console.log(`Erro em 'excluirPets': `, error);
    }
}

