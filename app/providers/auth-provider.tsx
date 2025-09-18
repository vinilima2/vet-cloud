import {
    onAuthStateChanged,
    signOut,
    type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { auth } from "~/database/firebase-config";
import { criarUsuario, solicitarLogin, type Autenticacao } from "~/services/autenticacao-service";
import { type Clinica } from "~/services/clinica-service";
import { obterUsuario } from "~/services/usuario-service";

type AuthProviderState = {
    usuario: User | null | undefined,
    realizarCriacaoUsuario: (autenticacao: Autenticacao | any) => any,
    realizarLogin: (autenticacao: Autenticacao | any) => Promise<any>,
    realizarLogout: () => any,
    loading: boolean,
    setDadosUsuario: (usuario: any) => void,
    dadosUsuario: any,
    clinica?: any,
    alterarClinicaSelecionada: Function
}

const initialState: AuthProviderState = {
    usuario: null,
    realizarCriacaoUsuario: async (undefined) => { },
    realizarLogin: async (undefined) => { },
    realizarLogout: async () => { },
    loading: true,
    setDadosUsuario: () => { },
    dadosUsuario: null,
    clinica: null,
    alterarClinicaSelecionada: () => {}
}

export const AuthContext = createContext<AuthProviderState>(initialState);

const AuthProvider = ({ children }: any) => {
    const [usuario, setUsuario] = useState<User | null>();
    const [dadosUsuario, setDadosUsuario] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [clinica, setClinicaSelecionada] = useState<Clinica | null>(null)

    function alterarClinicaSelecionada(clinica: any) {
        setClinicaSelecionada(clinica)
    }

    function realizarCriacaoUsuario(autenticacao: Autenticacao) {
        return criarUsuario(autenticacao);
    };

    async function realizarLogin(autenticacao: Autenticacao): Promise<any> {
        const usuarioLogado = await solicitarLogin(autenticacao)
        if (usuarioLogado) {
            let a = await obterUsuario(usuarioLogado.uid, 'sem-login')
            setDadosUsuario(a?.data)
            setUsuario(usuarioLogado)
        } else {
            toast('Usuário ou senha inválidos.')
        }

        return usuarioLogado;
    }

    function realizarLogout() {
        return signOut(auth);
    }

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
        setDadosUsuario,
        dadosUsuario,
        loading,
        clinica,
        alterarClinicaSelecionada
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