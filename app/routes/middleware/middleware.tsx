import { Navigate } from "react-router"
import { useAuth } from "~/providers/auth-provider"

export default function Middleware({ children }: { children: React.ReactNode }) {
    const { usuario, loading } = useAuth()

    //TODO: MELHORAR LOADING, PERSONALIZAR
    if(loading){
        return (<div>Carregando...</div>)
    }
    if (!usuario) {
        return <Navigate to="/" replace />
    }
    return <>{children}</>
}