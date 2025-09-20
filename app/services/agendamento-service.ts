import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { obterTutor } from './tutor-service';

export interface Agendamento {
    id_usuario: string,
    id_tutor: string,
    id_pet: string,
    data_marcada: string,
    hora_marcada: string,
    atividade: string,
    status: "EM ABERTO" | "CANCELADO" | "REALIZADO"
    email_tutor?: string // desnormalizado para facilitar na automação de envio de e-mail,
    nome_tutor?: string
}

export interface AgendamentoView {
    id: string,
    data: Agendamento
}

export async function adicionarAgendamento(id_clinica: string, agendamento: Agendamento) {
    try {
        const agendamento_collection = collection(database, `Clinica/${id_clinica}/Agendamento`);
        const tutor = (await obterTutor(id_clinica, agendamento.id_tutor))
        agendamento.email_tutor = tutor?.data.email;
        agendamento.nome_tutor = tutor?.data.nome_completo;
        await addDoc(agendamento_collection, agendamento);
    } catch (error) {
        console.log("Erro em 'adicionarAgendamento': ", error);
    }
}

export async function excluirAgendamento(id_clinica: string, id_agendamento: string) {
    try {
        const agendamento_document = doc(database, `Clinica/${id_clinica}/Agendamento/`, id_agendamento);
        deleteDoc(agendamento_document);
    } catch (error) {
        console.log("Erro em 'excluirAgendamento': ", error);
    }
}

export async function excluirAgendamentos(id_clinica: string) {
    try {
        const agendamento_collection = collection(database, `Clinica/${id_clinica}/Agendamento`);
        const agendamento_docs = await getDocs(agendamento_collection);
        agendamento_docs.docs.forEach((agendamento) => {
            excluirAgendamento(id_clinica, agendamento.id);
        });
    } catch (error) {
        console.log("Erro em 'excluirAgendamentos': ", error);
    }
}

export async function atualizarAgendamento(id_clinica: string, id_agendamento: string, novos_dados: Partial<Agendamento>) {
    try {
        const agendamento_document = doc(database, `Clinica/${id_clinica}/Agendamento`, id_agendamento);
        await updateDoc(agendamento_document, novos_dados);
    } catch (error) {
        console.log("Erro em 'atualizarAgendamento': ", error);
    }
}

export async function obterAgendamento(id_clinica: string, id_agendamento: string): Promise<AgendamentoView | null> {
    try {
        const agendamento_document = doc(database, `Clinica/${id_clinica}/Agendamento`, id_agendamento);
        const snapshot = await getDoc(agendamento_document);
        return snapshot.exists() ? { id: snapshot.id, data: (snapshot.data() as Agendamento) } as AgendamentoView : null;
    } catch (error) {
        console.log("Erro em 'obterAgendamento': ", error);
    }
    return null;
}

export async function obterAgendamentos(id_clinica: string): Promise<AgendamentoView[] | null> {
    try {
        const agendamento_collection = collection(database, `Clinica/${id_clinica}/Agendamento`);
        const snapshot = await getDocs(agendamento_collection);
        const agendamento_docs = snapshot.docs.map((agendamento) => ({
            id: agendamento.id,
            data: agendamento.data() as Agendamento
        } as AgendamentoView));
        return agendamento_docs;
    } catch (error) {
        console.log("Erro em 'obterAgendamentos': ", error);
    }
    return null;
}

export async function obterAgendamentosPor(id_clinica: string, valor: string, filtro_pesquisa: "id_pet" | "id_tutor" | "id_usuario" | "data_marcada" | "status"): Promise<AgendamentoView[] | null> {
    try {
        const agendamento_collection = collection(database, `Clinica/${id_clinica}/Agendamento`);
        const q = query(agendamento_collection, where(filtro_pesquisa, "==", valor));
        const snapshot = await getDocs(q);
        const agendamentos = snapshot.docs.map((agendamento) => ({
            id: agendamento.id,
            data: agendamento.data() as Agendamento
        } as AgendamentoView));
        return agendamentos;
    } catch (error) {
        console.log("Erro em 'obterAgendamentoPor': ", error);
    }
    return null;
}