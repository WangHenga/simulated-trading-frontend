import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/login",
    name: "登录",
    meta: { hidden: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserLoginView.vue"),
  },
  {
    path: "/",
    name: "合约",
    meta: { hidden: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InstrumentView.vue"),
  },
  {
    path: "/order",
    name: "委托",
    meta: { hidden: false },
    component: () => import("../views/OrderView.vue"),
  },
  {
    path: "/position",
    name: "持仓",
    meta: { hidden: false },
    component: () => import("../views/PositionView.vue"),
  },
  {
    path: "/trade",
    name: "成交",
    meta: { hidden: false },
    component: () => import("../views/TradeView.vue"),
  },
];
