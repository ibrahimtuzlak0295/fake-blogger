<template>
  <QPage>
    <div class="row">
      <div class="col-sm-6 flex flex-center fixed-center">
        <CreatePostForm />
      </div>
    </div>
  </QPage>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import CreatePostForm from '../components/forms/CreatePostForm.vue';

const store = useStore();

const hasPosts = computed(() => store.getters['posts/getPosts'].length > 0);

onMounted(() => {
  if (!hasPosts.value) store.dispatch('posts/fetchPosts');
});
</script>
