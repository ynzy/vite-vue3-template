import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    meta: {
      title: "首页",
      keepAlive: false,
    },
    component: import("@/views/layouts/index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: import("@/views/Home.vue"),
        meta: { title: "首页", keepAlive: false, showTab: true },
      },
    ],
  },
];
