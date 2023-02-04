<template>
  <div class="q-pa-md" style="min-width: 800px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="editPostForm.title"
        label="Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="editPostForm.body"
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
import type { PropType } from 'vue';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import type { Post } from '@/types/Post';

const store = useStore();
const $q = useQuasar();
const router = useRouter();

const props = defineProps<{
  post: Post;
}>();

const editPostForm = reactive({
  id: props.post.id,
  userId: props.post.userId,
  title: props.post.title,
  body: props.post.body,
});

const onSubmit = () => {
  store
    .dispatch('posts/updatePost', { post: editPostForm })
    .then(() => router.push({ name: 'posts.list' }))
    .then(() =>
      $q.notify({ type: 'positive', message: 'Post successfully updated.' })
    )
    .catch((e) =>
      $q.notify({
        type: 'negative',
        message: `Failure updating post: ${e.message}`,
      })
    );
};
</script>
