<template>
  <QPage>
    <div class="row">
      <div class="col-sm-6 flex flex-center fixed-center">
        <EditPostForm :post="post" />
      </div>
    </div>
  </QPage>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import EditPostForm from '../components/forms/EditPostForm.vue';

const store = useStore();

const route = useRoute();

const postId = computed(() => route.params.post_id);

const post = store.getters['posts/getPost'](parseInt(postId.value.toString()));
</script>
