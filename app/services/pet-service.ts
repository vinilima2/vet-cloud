import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
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
    observacoes?: null | string,
    castrado?: boolean
}

export interface PetView {
    id: string,
    data: Pet
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

export async function atualizarPet(id_clinica: string, id_tutor: string, id_pet: string, novos_dados: Partial<Pet>) {
    try {
        const pet_document = doc(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`, id_pet);
        await updateDoc(pet_document, novos_dados);
    } catch(error) {
        console.log(`Erro em 'atualizarPet': `, error);
    }    
}

export async function obterPet(id_clinica: string, id_tutor: string, id_pet: string): Promise<PetView | null> {
    try {
        const pet_document = doc(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`, id_pet);
        const snapshot = await getDoc(pet_document);
        return snapshot.exists() ? { id: snapshot.id, data: (snapshot.data() as Pet) } as PetView : null;
    } catch(error) {
        console.log(`Erro em 'obterPet': `, error);
    }
    return null;
}

export async function obterPets(id_clinica: string, id_tutor: string): Promise<PetView[] | null> {
    try {
        const pet_collection = collection(database, `Clinica/${id_clinica}/Tutor/${id_tutor}/Pet`);
        const snapshot = await getDocs(pet_collection);
        const pet_docs = snapshot.docs.map((pet_doc) => ({
            id: pet_doc.id,
            data: pet_doc.data() as Pet
        } as PetView));
        return pet_docs;
    } catch(error) {
        console.log(`Erro em 'obterPets': `, error);
    }
    return null;
}
