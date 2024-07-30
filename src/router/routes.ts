import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserLoginView.vue"),
  },
  {
    path: "/",
    name: "instrument",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InstrumentView.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/OrderView.vue"),
  },
  {
    path: "/position",
    name: "position",
    component: () => import("../views/PositionView.vue"),
  },
  {
    path: "/trade",
    name: "trade",
    component: () => import("../views/TradeView.vue"),
  },
];
