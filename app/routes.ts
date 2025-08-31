import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("dash","routes/dashboard.tsx"),
    route("login","routes/login.tsx"),

] satisfies RouteConfig;
