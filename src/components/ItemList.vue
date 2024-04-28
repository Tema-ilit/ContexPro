<script setup lang="ts">
import { useListsStore } from '@/stores/listBasket'

const listStore = useListsStore()
const props = defineProps<{
  id: number
  parentName: string
  name: string
  color: string
  count: number
  checked: boolean
}>()

const updateCount = (e: Event) => {
  // console.log(props.parentName, props.id, (e.target as HTMLInputElement).value)
  listStore.updateCount(props.parentName, props.id, (e.target as HTMLInputElement).value)
}
const updateColors = (e: Event) => {
  listStore.updateColor(props.parentName, props.id, (e.target as HTMLInputElement).value)
}

const updateListArray = (e: Event) => {
  listStore.updateChecked(props.parentName, (e.target as HTMLInputElement).checked, props.id)
}
</script>

<template>
  <div class="">
    <div class="item">
      <div class="checkbox-rect">
        <input
          type="checkbox"
          :id="'checkbox-rect' + props.id"
          :checked="props.checked"
          @click="updateListArray"
        />
        <label :for="'checkbox-rect' + props.id">{{ name }}</label>
      </div>
    </div>
  </div>

  <div style="display: flex; align-items: center; gap: 10px">
    <input class="input-text" type="text" :value="count" @input="updateCount" />
    <input class="input-color" type="color"  :value="color" @input="updateColors" />
  </div>
</template>

<style scoped>
.input-text {
  padding: 5px 5px;
  height: 30px;
  width: 30px;
  border-radius: 0;
  background-color: white;
  border: 0;
  border-bottom: 1px solid black;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #222;
  font: inherit;
  font-size: 14px;
  line-height: 1;
  text-align: center;
}
.input-color {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
}
.input-color::-webkit-color-swatch {
  border-radius: 50%;
  border: 1px solid #000000;
}

.parent-check-box {
  position: absolute;
  top: 20px;
  left: -20px;
}
.checkbox-rect input[type='checkbox'] {
  display: none;
}
.checkbox-rect input[type='checkbox'] + label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  font:
    14px/20px 'Open Sans',
    Arial,
    sans-serif;
  cursor: pointer;
  /* -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; */
}
.checkbox-rect input[type='checkbox']:hover + label:hover {
  color: rgb(23, 86, 228);
}
.checkbox-rect input[type='checkbox']:hover + label:before {
  background: #50565a;
  box-shadow: inset 0px 0px 0px 2px #f7f2f2;
}
.checkbox-rect input[type='checkbox'] + label:last-child {
  margin-bottom: 0;
}
.checkbox-rect input[type='checkbox'] + label:before {
  content: '';
  display: block;
  width: 1.4em;
  height: 1.4em;
  border: 1px solid #343a3f;
  border-radius: 0.2em;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transition:
    all 0.2s,
    background 0.2s ease-in-out;
  transition:
    all 0.2s,
    background 0.2s ease-in-out;
  background: #f3f3f3;
}
.checkbox-rect input[type='checkbox']:checked + label:before {
  width: 1.3em;
  height: 1.3em;
  border-radius: 0.2em;
  border: 2px solid #fff;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  background: #50565a;
  box-shadow: 0 0 0 1px #000;
}
</style>
