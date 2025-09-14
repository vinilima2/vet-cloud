import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/login/login.tsx"),
    route("registro", "routes/registro/registro.tsx"),
    layout("routes/home/home-layout.tsx", [
        route("tutor", "routes/tutor/tutor.tsx"),
        ...prefix("home", [
            index("routes/home/home.tsx")
        ]),
    ]),
    route("testes-firebase", "routes/testes-firebase.tsx") // para agrupar as chamadas de teste do Firebase
] satisfies RouteConfig;
