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
              <p>Username: {{ currentUser.username }}</p>
              <p>Role (admin/user): {{ currentUser.role }}</p>
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat @click="logout">Log out</q-btn>
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
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const currentUser = computed<User>(() => store.getters['users/getCurrentUser']);

const logout = () => {
  store.dispatch('users/logout').then(() => router.push('/login'));
};
</script>
