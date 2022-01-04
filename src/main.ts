import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
// 引入全局样式
import "@/styles/index.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
