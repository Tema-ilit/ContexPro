<script setup lang="ts">
import LeftBlock from './components/LeftBlock.vue'
import RightBlock from './components/RightBlock.vue'
</script>

<template>
  <div class="container">
    <LeftBlock />
    <RightBlock />
  </div>
</template>

<style scoped>
.container {
  padding: 50px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  min-width: 1200px;
  min-height: 100vh;
  background-color: gray;
}
</style>
