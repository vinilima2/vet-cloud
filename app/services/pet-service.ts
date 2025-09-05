import {collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';

export interface Pet {
    nome: string,
    anoNascimento: number,
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