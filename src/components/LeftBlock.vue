<script setup lang="ts">
import { useListsStore } from '@/stores/listBasket'
import ListItem from './ListItem.vue'

const listStore = useListsStore()
</script>

<template>
  <div>
    <div v-for="list in listStore.lists" :key="list.name" class="list-menu">
      <ListItem :list="list" />
    </div>
  </div>
</template>

<style scoped>
.list-menu {
  margin-bottom: 10px;
}
</style>
