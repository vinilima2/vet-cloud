import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "~/database/firebase-config";

export interface Autenticacao {
    email: string,
    senha: string
}

export async function criarUsuario(autenticacao: Autenticacao) : Promise<string>{
    return createUserWithEmailAndPassword(auth, autenticacao.email, autenticacao.senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user.uid
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw error
        });
}

export async function solicitarLogin(autenticacao: Autenticacao) {
    return signInWithEmailAndPassword(auth, autenticacao.email, autenticacao.senha)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return null;
        });
}

export async function recuperarSenha(email: string) {
    return sendPasswordResetEmail(auth, email)
}
