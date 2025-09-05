import {collection, getDocs, addDoc } from 'firebase/firestore';
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

export async function adicionarPet(pet: Pet) {
    const colecaoTeste = collection(database, 'Clinica/0/Tutor/0/Pet');
    await addDoc(colecaoTeste, pet)
}