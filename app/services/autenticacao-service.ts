import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/database/firebase-config";

export interface Autenticacao {
    email: string,
    senha: string
}

export async function criarUsuario(autenticacao: Autenticacao) {
    createUserWithEmailAndPassword(auth, autenticacao.email, autenticacao.senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const ID_USUARIO_BD = user.uid
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
