import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { database } from '~/database/firebase-config';
import { obterTutor } from './tutor-service';
import { enviarEmail } from './email-service';

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
        agendamento.email_tutor = (await obterTutor(id_clinica, agendamento.id_tutor))?.data.email;
        
        // Salva o agendamento no Firestore
        const novo_agendamento = await addDoc(agendamento_collection, agendamento);
        
        if (agendamento.email_tutor) {
            try {
                await enviarEmail({
                    to: "diegokenjiyoshida2508gmail.com",
                    subject: 'Seu agendamento na VetCloud foi confirmado!',
                    text: `Olá, este é um e-mail para confirmar seu agendamento para o dia ${agendamento.data_marcada} às ${agendamento.hora_marcada}. Atividade: ${agendamento.atividade}.`,
                    html: `
                        <h2>Agendamento Confirmado!</h2>
                        <p>Olá!</p>
                        <p>Seu agendamento na VetCloud foi realizado com sucesso.</p>
                        <ul>
                            <li><strong>Data:</strong> ${agendamento.data_marcada}</li>
                            <li><strong>Hora:</strong> ${agendamento.hora_marcada}</li>
                            <li><strong>Atividade:</strong> ${agendamento.atividade}</li>
                        </ul>
                        <p>Obrigado por confiar na VetCloud!</p>
                    `
                });
            } catch (emailError) {
                console.error("Erro ao enviar o e-mail de confirmação: ", emailError);
            }
        }

    } catch(error) {
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