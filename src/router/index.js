import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import HomePage from "../views/HomePage.vue";
import OnlineStoresPage from "../views/OnlineStoresPage.vue";
import NearStoresPage from "../views/NearStoresPage.vue";
import StoreDetailPage from "../views/StoreDetailPage.vue";
import PhysicalStoresPage from "../views/PhysicalStoresPage.vue";
import OtpPage from "../views/OtpPage.vue";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) =>
    to.hash ? { el: to.hash, behavior: "smooth", top: 70 } : { top: 0 },
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/signup", name: "signup", component: SignupPage },
    { path: "/home", name: "home", component: HomePage },
    { path: "/stores", redirect: "/stores/online" },
    {
      path: "/stores/online",
      name: "stores-online",
      component: OnlineStoresPage,
    },
    { path: "/stores/near", name: "stores-near", component: NearStoresPage },
    {
      path: "/stores/physical/:slug",
      name: "store-detail",
      component: StoreDetailPage,
      props: { mode: "physical" },
    },
    {
      path: "/stores/online/:slug",
      name: "online-store-detail",
      component: StoreDetailPage,
      props: { mode: "online" },
    },
    {
      path: "/stores/physical",
      name: "stores-physical",
      component: PhysicalStoresPage,
    },
    { path: "/verify", name: "verify", component: OtpPage },
  ],
});
