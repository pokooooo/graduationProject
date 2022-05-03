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
    path: "/admin",
    component: () => import("../views/admin/Index.vue"),
    children: [
      {
        path: "/",
        redirect: "users",
      },
      {
        path: "users",
        component: () => import("../views/admin/users/Users.vue")
      },
      {
        path: "roles",
        component: () => import("../views/admin/roles/Roles.vue"),
      },
      {
        path: "weapons",
        component: () => import("../views/admin/weapons/Weapons.vue"),
      },
      {
        path: "materials",
        component: () => import("../views/admin/Materials/Materials"),
      },
      {
        path: "events",
        component: () => import("../views/admin/events/Events"),
      },
      {
        path: "enemies",
        component: () => import("../views/admin/enemies/Enemies"),
      },
      {
        path: "domains",
        component: () => import("../views/admin/domains/Domains"),
      },
      {
        path: "artifacts",
        component: () => import("../views/admin/artifacts/Artifacts"),
      },
      {
        path: "addWeapon",
        name: "addWeapon",
        component: () => import("../views/admin/weapons/AddWeapon.vue"),
      },
      {
        path: "addRole",
        name: "addRole",
        component: () => import("../views/admin/roles/AddRole.vue"),
      },
      {
        path: "addArtifact",
        name: "addArtifact",
        component: () => import("../views/admin/artifacts/AddArtifact.vue"),
      }

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
        path: "store",
        component: () => import("../views/user/Store")
      },
      {
        path: "inventory",
        component: () => import("../views/user/Inventory")
      },
      {
        path: "role",
        component: () => import("../views/user/Role")
      },
      {
        path: "domain",
        component: () => import("../views/user/Domain")
      },
      {
        path: "event",
        component: () => import("../views/user/Event")
      },
      {
        path: "center",
        component: () => import("../views/user/Center.vue")
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
            name: 'chat',
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
