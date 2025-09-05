import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login/login.tsx"),
    route("registro", "routes/registro/registro.tsx"),
    route("dash", "routes/dashboard.tsx"),
    route("testes-firebase", "routes/testes-firebase.tsx") // para agrupar as chamadas de teste do Firebase
] satisfies RouteConfig;
