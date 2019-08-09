export default [
    {
        path: "/",
        name: "index",
        component: () => import("views/TodoList.vue"),
    },
    {
        path: "/lifecycle",
        name: "Lifecycle",
        component: () => import("views/Lifecycle.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/watcher",
        name: "Watcher",
        component: () => import("views/Watcher.vue"),
    },
    {
        path: "/this-and-refs",
        name: "ThisAndRefs",
        component: () => import("views/ThisAndRefs.vue"),
    },
    {
        path: "*",
        redirect: "/",
    },
];
