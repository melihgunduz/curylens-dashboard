import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Home', path: '', component: () => import('pages/IndexPage.vue') },
      {
        name: 'Account', path: '/account/:accountAddress', component: () => import('pages/AccountPage.vue'),
      },
      {
        name: 'Transaction', path: '/tx/:txHash', component: () => import('pages/TransactionPage.vue'),
      }],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
