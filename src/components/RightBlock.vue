<script setup lang="ts">
import { useListsStore } from '@/stores/listBasket'
import RightList from '@/components/RightList.vue'

const listStore = useListsStore()
</script>

<template>
  <div>
    <div v-for="(list, index) in listStore.lists" :key="list.name" class="list-menu">
      <RightList :name="list.name" :index="index" :full-list="list.data" :shuffle="list.shuffle" />
    </div>
  </div>
</template>

<style scoped>
.list-menu {
  margin-bottom: 10px;
}
</style>
