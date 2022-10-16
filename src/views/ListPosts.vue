<template>
  <QPage>
    <div class="row">
      <div class="col-sm-6 fixed-center">
        <PostsTable />
      </div>
    </div>
  </QPage>
</template>

<script setup lang="ts">
import PostsTable from '@/components/tables/PostsTable.vue';
</script>
