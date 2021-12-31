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
    path: "/admin",
    component: () => import("../views/admin/Index.vue"),
    children: [
      {
        path: "/",
        redirect: "users",
      },
      {
        path: "users",
        component: () => import("../views/admin/Users.vue")
      },
      {
        path: "roles",
        component: () => import("../views/admin/Roles.vue"),
      },
      {
        path: "goods",
        component: () => import("../views/admin/Goods.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/admin/Orders.vue"),
      },
      {
        path: "add",
        name: "add",
        component: () => import("../views/admin/AddGoods.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("../views/user/Index.vue"),
    children: [
      {
        path: "/",
        redirect: "home",
      },
      {
        path: "home",
        component: () => import("../views/user/Home.vue")
      },
      {
        path: "profile",
        component: () => import("../views/user/Profile.vue")
      },
      {
        path: "message",
        component: () => import("../views/user/message/Index.vue"),
        children: [
          {
            path: 'notice',
            component: () => import("../views/user/message/Notice.vue"),
          },
          {
            path: 'mail',
            component: () => import("../views/user/message/Mail.vue"),
          },
          {
            path: 'chat',
            component: () => import("../views/user/message/Chat.vue"),
          }
        ]
      }
    ]
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
  if(to.path.indexOf('admin') !== -1 && !window.sessionStorage.getItem("token")) {
    next("/login");
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
