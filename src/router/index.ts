import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListPosts from '@/views/ListPosts.vue';
import EditPost from '@/views/EditPost.vue';
import CreatePost from '@/views/CreatePost.vue';
import LoginViewVue from '@/views/LoginView.vue';
import MyAccount from '@/views/MyAccount.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts',
      name: 'posts.list',
      component: ListPosts,
      meta: { requiresAuth: true },
    },

    {
      path: '/posts/create',
      name: 'posts.create',
      component: CreatePost,
      meta: { requiresAuth: true, requresAdmin: true },
    },
    {
      path: '/posts/:post_id/edit',
      name: 'posts.edit',
      component: EditPost,
      meta: { requiresAuth: true, requresAdmin: true },
    },

    {
      path: '/my-account',
      name: 'users.account',
      component: MyAccount,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'users.login',
      component: LoginViewVue,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['users/getIsLoggedIn']) {
    next('/login');
  }

  if (to.meta.requresAdmin && !store.getters['users/getIsAdmin']) {
    next(false);
  }
  if (to.meta.requiresAuth !== true && store.getters['users/getIsLoggedIn']) {
    next('/');
  }

  next(true);
});

export default router;
