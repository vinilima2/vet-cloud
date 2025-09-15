import {
    onAuthStateChanged,
    signOut,
    type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "~/database/firebase-config";
import { criarUsuario, solicitarLogin, type Autenticacao } from "~/services/autenticacao-service";

type AuthProviderState = {
    usuario: User | null | undefined,
    realizarCriacaoUsuario: (autenticacao: Autenticacao | any) => any,
    realizarLogin: (autenticacao: Autenticacao | any) => any,
    realizarLogout: () => any,
    loading: boolean
}

const initialState: AuthProviderState = {
    usuario: null,
    realizarCriacaoUsuario: async (undefined) => { },
    realizarLogin: async (undefined) => { },
    realizarLogout: async () => { },
    loading: true
}

export const AuthContext = createContext<AuthProviderState>(initialState);

const AuthProvider = ({ children }: any) => {
    const [usuario, setUsuario] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    function realizarCriacaoUsuario(autenticacao: Autenticacao) {
        return criarUsuario(autenticacao);
    };

    async function realizarLogin(autenticacao: Autenticacao) {
        const teste = await solicitarLogin(autenticacao)
        if (teste) {
            setUsuario(teste)
        }
    };

    function realizarLogout() {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario ?? undefined);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        realizarCriacaoUsuario,
        usuario,
        realizarLogin,
        realizarLogout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useAuth must be used within a AuthProvider")

    return context
}