import router from "./router";
import store from "./store";
import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.use(store);
app.mount("#app");
