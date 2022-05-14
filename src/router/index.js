import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import('@/views/dashboard/Index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/donation",
    name: "donation.index",
    component: () => import('@/views/donation/Index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import('@/views/profile/Index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/password",
    name: "password",
    component: () => import('@/views/profile/Password.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/forgot-password",
    name: "auth.forgot-password",
    component: () => import("@/views/auth/Forgot-Password.vue")
  },
  {
    path: "/",
    name: 'home',
    component: () => import("@/views/home/Index.vue")
  },
  {
    path: "/category",
    name: "category.index",
    component: () => import('@/views/category/Index.vue'),
  },
  {
    path: "/category/:slug",
    name: "category.show",
    component: () => import('@/views/category/Show.vue'),
  },
  {
    path: "/campaign",
    name: "campaign.index",
    component: () => import('@/views/campaign/Index.vue'),
  },
  {
    path: "/campaign/:slug",
    name: "campaign.show",
    component: () => import('@/views/campaign/Show.vue'),
  },
  {
    path: "/donation/create/:slug",
    name: "donation.create",
    component: () => import('@/views/donation/Create.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }

    next("/login");
  } else if (to.matched.some(record => record.meta.requireNotLogin)) {
    if (store.getters["auth/isLoggedIn"]) {
      next("/dashboard");
      return;
    }

    next();
  } else {
    next();
  }
});

export default router;