import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import AboutCarDetail from "../components/AboutCarDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/aboutCarDetail/:name/:id",
    name: "AboutCarDetail",
    component: AboutCarDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;