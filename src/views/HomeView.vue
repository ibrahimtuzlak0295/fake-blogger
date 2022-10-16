<template>
  <QPage>
    <div class="row">
      <div class="col-sm-6 flex flex-center fixed-center">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">FakeBlogger</div>
            </q-card-section>

            <q-card-section>
              <p>Welcome, {{ currentUser.username }}</p>

              <p v-if="isAdmin">
                You are an admin. You can view, edit, create, and delete posts.
              </p>
            </q-card-section>

            <q-separator dark />
            Quick Links:
            <q-card-actions>
              <q-btn class="btn btn-primary" :to="{ name: 'posts.list' }"
                >All Posts</q-btn
              >
              <q-btn
                v-if="isAdmin"
                class="btn btn-primary"
                :to="{ name: 'posts.create' }"
                >Create Post</q-btn
              >
              <q-btn to="/my-account">My Account</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </QPage>
</template>

<script setup lang="ts">
import type { User } from '@/types/User';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentUser = computed<User>(() => store.getters['users/getCurrentUser']);
const isAdmin = computed(() => store.getters['users/getIsAdmin']);
</script>
