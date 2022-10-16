<template>
  <div class="q-pa-md" style="min-width: 800px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="createPostForm.title"
        label="Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="createPostForm.body"
        label="Body"
        lazy-rules
        type="textarea"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const store = useStore();
const $q = useQuasar();
const router = useRouter();

const createPostForm = reactive({
  title: '',
  body: '',
});

const onSubmit = () => {
  console.log('creating post ', createPostForm);
  store
    .dispatch('posts/createPost', { postData: createPostForm })
    .then(() => router.push({ name: 'posts.list' }))
    .then(() =>
      $q.notify({ type: 'positive', message: 'Post successfully create.' })
    )
    .catch((e) =>
      $q.notify({
        type: 'negative',
        message: `Failure creating post:  ${e.message}`,
      })
    );
};
</script>
