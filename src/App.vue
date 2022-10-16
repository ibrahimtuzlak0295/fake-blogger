<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          FakeBlogger
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" v-if="isLoggedIn">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/posts" label="Posts" />
        <q-route-tab to="/posts/create" label="Create post" v-if="isAdmin" />
        <q-route-tab to="/my-account" label="My Account" />
      </q-tabs>
    </q-header>

    <q-page-container class="flex flex-center text-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoggedIn = computed(() => store.getters['users/getIsLoggedIn']);
const isAdmin = computed(() => store.getters['users/getIsAdmin']);
</script>
