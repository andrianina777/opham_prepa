import { createApp } from "vue";
import App from "./App.vue";
import { loadFonts } from "./plugins/webfontloader";
import router from './router';
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@mdi/font/css/materialdesignicons.css'
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
// axios.defaults.baseURL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.responseType = 'json';
// import axios from 'axios';
// import VueAxios from 'vue-axios';

loadFonts();

const vuetify = createVuetify({
    components,
    directives,
});

/* const routes = [
    { path: "/login", component: LoginPage },
    { path: "/", component: HomePagePrepa },
];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});
router.beforeEach(async (to, from) => {
    const loggedIn = !!localStorage.getItem("erpo_user");
    // if(!loggedIn) {
    //     if(to.path != "/login")
    //         return { path: "/login" };
    // }
}); */

const app = createApp(App)

// Ajouter dayjs à l'objet global de Vue.js
app.config.globalProperties.$dayjs = dayjs
// Ajouter Pinia à l'application
const pinia = createPinia()
app.use(pinia)
// Ajouter Vuetify à l'application
app.use(vuetify)
app.use(router)   
app.use() 
app.mount('#app')
app.use(VueSweetalert2);

// const store = createPinia();
// app.config.globalProperties.$dayjs = dayjs
// createApp(App)
//     .use(vuetify)
//     .use(router)
//     .use(store)
// app.config.globalProperties.$dayjs = dayjs
// //  .use(cors)
// // .use(VueSweetalert2)
// // .use(VueAxios,axios)
// app.mount("#app");


// export const HTTP = axios.create({
//         baseURL: `http://192.168.130.5/api/login/v1/login`,
//         headers: {
//             Authorization: "Bearer {token}"
//         }
// })