import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, setDoc, query, where } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { horaAtual } from '~/lib/utils';
import { obterTutor } from './tutor-service';

export interface Agendamento {
    id_usuario: string,
    id_tutor: string,
    id_pet: string,
    data_marcada: string,
    hora_marcada: string,
    atividade: string,
    status: "EM ABERTO" | "CANCELADO" | "REALIZADO"
    email_tutor?: string // desnormalizado para facilitar na automação de envio de e-mail
}

export async function adicionarAgendamento(id_clinica: string, agendamento: Agendamento) {
    try {
        const agendamento_collection = collection(database, `Clinica/${id_clinica}/Agendamento`);
        agendamento.email_tutor = (await obterTutor(id_clinica, agendamento.id_tutor))?.data.email;
        const novo_agendamento = await addDoc(agendamento_collection, agendamento);
    } catch(error) {
        console.log("Erro em 'adicionarAgendamento': ", error);
    }  
}

export async function excluirAgendamento(id_clinica: string, id_agendamento: string) {
    try {
        const agendamento_document = doc(database, `Clinica/${id_clinica}/Agendamento/`, id_agendamento);
        deleteDoc(agendamento_document);
    } catch(error) {
        console.log("Erro em 'excluirAgendamento': ", error);
    }       
}