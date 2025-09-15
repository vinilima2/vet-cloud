import { Navigate } from "react-router"
import { useAuth } from "~/providers/auth-provider"
import Logo from "~/assets/loading.gif"

export default function Middleware({ children }: { children: React.ReactNode }) {
    const { usuario, loading } = useAuth()

    if(loading){
        return (<div className="w-dvw h-dvh flex flex-col justify-center items-center">
            <img src={Logo}/>
            <h1 className="text-2xl text-orange-300">Carregando...</h1>
        </div>)
    }
    if (!usuario) {
        return <Navigate to="/" replace />
    }
    return <>{children}</>
}