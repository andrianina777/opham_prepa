import { createRouter, createWebHistory } from "vue-router";
import PageAttePrepa from '@/views/PageAttePrepa.vue'
import PageEnCoursPrepa from '@/views/PageEnCoursPrepa.vue'
import PageEnCoursCtrl from '@/views/PageEnCoursCtrl'
import PageEmballage from '@/views/PageEmballage'
import MyToolbars from '@/components/MyToolbars.vue'
import voirCmd from '@/views/VoirCmd'
import PageAtteCtrl from '@/views/PageAtteCtrl'
import preparerCmd from '@/views/PreparerCmd'
import LoginPage from '@/views/LoginPage'
import AccueilPage from '@/views/AccueilPage'
const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/LoginPage'
  },
  {
    path: '/PageAttePrepa',
    component: PageAttePrepa,
    name: 'attePrepa'
  },
  {
    path: '/AccueilPage',
    component: AccueilPage,
    name: 'accueilpage'
  },
  {
    path: '/PageEnCoursPrepa',
    component: PageEnCoursPrepa,
    name: 'enCoursPrepa'
  },
  {
    path: '/PageAtteCtrl',
    component: PageAtteCtrl,
    name: 'atteCtrl'
  },
  {
    path: '/LoginPage',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/PageEnCoursCtrl',
    component: PageEnCoursCtrl,
    name: 'enCoursCtrl'
  },
  {
    path: '/PageEmballage',
    component: PageEmballage,
    name: 'emballage'
  },
  {
    path: '/voirCmd-:CC',
    component: voirCmd,
    name: 'voirCmd'
  },
  {
    path: '/preparerCmd-:CC',
    component: preparerCmd,
    name: 'preparerCmd'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
