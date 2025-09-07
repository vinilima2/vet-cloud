import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { type Pet, adicionarPet, excluirPets } from './pet-service';
import { horaAtual } from '~/lib/utils';

export interface Tutor {
    nome_completo: string,
    cpf: string,
    endereco: string,
    telefone: string,
    email: string,
    data_criacao?: string,
    ultima_atualizacao?: string,
}

export interface TutorView {
    id: string,
    data: Tutor,
}

export async function adicionarTutor(id_clinica: string, tutor: Tutor, pets: Pet[] = []) {
    try {
        const tutor_collection = collection(database, `Clinica/${id_clinica}/Tutor`);
        const novo_tutor = await addDoc(tutor_collection, tutor);
        const agora = horaAtual();
        await updateDoc(novo_tutor, ({data_criacao: agora, ultima_atualizacao: agora}) as Partial<Tutor>);
        pets.forEach((pet) => adicionarPet(id_clinica, novo_tutor.id, pet));
    } catch(error) {
        console.log("Erro em 'adicionarTutor': ", error);
    }
}

export async function excluirTutor(id_clinica: string, id_tutor: string) {
    try {
        const tutor_document = doc(database, `Clinica/${id_clinica}/Tutor`, id_tutor);
        excluirPets(id_clinica, id_tutor); // é necessário excluir os Pets separadamente
        await deleteDoc(tutor_document);
    } catch(error) {
        console.log("Erro em 'excluirTutor': ", error);
    }
}

export async function excluirTutores(id_clinica: string) {
    try {
        const tutor_collection = collection(database, `Clinica/${id_clinica}/Tutor`);
        const tutor_docs = await getDocs(tutor_collection);
        tutor_docs.docs.forEach((tutor_doc) => {
            excluirTutor(id_clinica, tutor_doc.id); 
        });
    } catch(error) {
        console.log("Erro em 'excluirTutores': ", error);
    }    
}

export async function atualizarTutor(id_clinica: string, id_tutor: string, novos_dados: Partial<Tutor>) {
    try {
       const tutor_document = doc(database, `Clinica/${id_clinica}/Tutor`, id_tutor);
        await updateDoc(tutor_document, novos_dados);
        await updateDoc(tutor_document, ({ ultima_atualizacao: horaAtual() }) as Partial<Tutor>);
    } catch(error) {
        console.log("Erro em 'atualizarTutor': ", error);
    }      
}

export async function obterTutor(id_clinica: string, id_tutor: string): Promise<TutorView | null> {
    try {
       const tutor_document = doc(database, `Clinica/${id_clinica}/Tutor`, id_tutor);
       const snapshot = await getDoc(tutor_document); 
       return snapshot.exists() ? { id: snapshot.id, data: (snapshot.data() as Tutor) } as TutorView : null;
    } catch(error) {
        console.log("Erro em 'obterTutor': ", error);
    }  
    return null;
}

export async function obterTutores(id_clinica: string): Promise<TutorView[] | null> {
    try {
        const tutor_collection = collection(database, `Clinica/${id_clinica}/Tutor`);
        const snapshot = await getDocs(tutor_collection);
        const tutor_docs = snapshot.docs.map((tutor_doc) => ({
            id: tutor_doc.id,
            data: tutor_doc.data() as Tutor
        } as TutorView));
        return tutor_docs;
    } catch(error) {
        console.log("Erro em 'obterTutores': ", error);
    }  
    return null;
}
