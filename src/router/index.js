import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/roles",
    component: () => import("../views/Roles.vue"),
  },
  {
    path: "/buy",
    name: "buy",
    component: () => import("../views/Buy.vue"),
  },
  {
    path: "/player",
    name: "player",
    component: () => import("../views/Player.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        redirect: "/rich",
      },
      {
        path: "/rich",
        component: () => import("../views/menu/Rich.vue"),
      },
      {
        path: "/goods",
        component: () => import("../views/menu/Goods.vue"),
      },
      {
        path: "/orders",
        component: () => import("../views/menu/Orders.vue"),
      },
      {
        path: "/add",
        name: "add",
        component: () => import("../views/menu/AddGoods.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // to 要访问的路径
  // from 从哪个路径来
  // next 是否放行
  if (to.path === "/login") return next();
  if (to.path === "/player") return next();
  if (to.path === "/roles" || to.path === "/buy") return next();
  if (window.sessionStorage.getItem("token")) next();
  else next("/login");
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
