<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="loginForm.username"
        label="Username"
        hint="Your username"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        type="password"
        filled
        v-model="loginForm.password"
        label="Password"
        hint="Your password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const store = useStore();
const $q = useQuasar();
const router = useRouter();

const loginForm = reactive({
  username: '',
  password: '',
});

const onSubmit = () => {
  store
    .dispatch('users/login', loginForm)
    .then(() => {
      if (store.getters['users/getIsLoggedIn']) router.push({ name: 'home' });
    })
    .then(() => $q.notify({ type: 'positive', message: 'Login succesful.' }))
    .catch((e) =>
      $q.notify({ type: 'negative', message: `Login failed: ${e.message}` })
    );
};
</script>
