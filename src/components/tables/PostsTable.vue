<template>
  <q-table
    :loading="isFetchingPosts"
    title="Posts"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :wrap-cells="true"
    :filter="filter"
  >
    <template v-slot:top-left v-if="isAdmin">
      <q-btn @click="router.push({ name: 'posts.create' })">Create Post</q-btn>
    </template>

    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #body-cell-title="props" v-if="isAdmin">
      <q-td :props="props">
        {{ props.row.title }}

        <q-tooltip anchor="bottom middle" :offset="[-15, -15]">
          Click to edit inline
        </q-tooltip>

        <q-popup-edit
          v-slot="scope"
          v-model="props.row.title"
          auto-save
          @save="(val, initialValue) => editRow(props.row)"
        >
          <q-input borderless v-model="scope.value" label="Title" />
        </q-popup-edit>
      </q-td>
    </template>

    <template #body-cell-body="props" v-if="isAdmin">
      <q-td :props="props">
        {{ props.row.body }}

        <q-tooltip anchor="bottom middle" :offset="[-15, -15]">
          Click to edit inline
        </q-tooltip>

        <q-popup-edit
          v-slot="scope"
          v-model="props.row.body"
          auto-save
          @save="(val, initialValue) => editRow(props.row)"
        >
          <q-input
            borderless
            v-model="scope.value"
            label="Body"
            type="textarea"
          />
        </q-popup-edit>
      </q-td>
    </template>

    <template #body-cell-actions="props" v-if="isAdmin">
      <q-td :props="props">
        <q-btn
          dense
          round
          flat
          color="grey"
          @click="confirmDelete(props.row)"
          icon="delete"
        >
          <q-tooltip anchor="bottom middle"> Delete </q-tooltip></q-btn
        >

        <q-btn
          dense
          round
          flat
          color="grey"
          @click="editPost(props.row)"
          icon="edit"
        >
          <q-tooltip anchor="bottom middle"> Edit </q-tooltip></q-btn
        >
      </q-td>
    </template>

    <template #body-cell-actions="props" v-else>
      <q-td :props="props"> - </q-td></template
    >
  </q-table>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Post } from '@/types/Post';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const store = useStore();
const $q = useQuasar();
const router = useRouter();

const isAdmin = computed(() => store.getters['users/getIsAdmin']);
const filter = ref('');

const confirmDelete = (item: Post) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Delete post?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      deleteRow(item);
    })
    .onCancel(() => $q.notify({ type: 'info', message: 'No action taken.' }));
};
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' as const },
  { name: 'userId', label: 'User ID', field: 'userId', align: 'left' as const },
  { name: 'title', label: 'Title', field: 'title', align: 'left' as const },
  { name: 'body', label: 'Body', field: 'body', align: 'left' as const },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center' as const,
  },
];

const isFetchingPosts = computed<boolean>(
  () => store.getters['posts/getIsFetching']
);
const rows = computed<Post[]>(() => store.getters['posts/getPosts']);

const hasPosts = computed(() => store.getters['posts/getPosts'].length > 0);

onMounted(() => {
  if (!hasPosts.value) store.dispatch('posts/fetchPosts');
});

const deleteRow = (item: Post) => {
  store
    .dispatch('posts/deletePost', { post: item })
    .then(() =>
      $q.notify({ type: 'positive', message: 'Post deleted successfully.' })
    )
    .catch((e) =>
      $q.notify({ type: 'negative', message: `Failure deleting post: ${e}` })
    );
};

const editRow = (item: Post) => {
  store
    .dispatch('posts/updatePost', { post: item })
    .then(() =>
      $q.notify({ type: 'positive', message: 'Post successfully updated.' })
    )
    .catch((e) =>
      $q.notify({ type: 'negative', message: `Failure updating post: ${e}` })
    );
};

const editPost = (item: Post) => {
  router.push({ name: 'posts.edit', params: { post_id: item.id } });
};
</script>
