<script setup lang="ts">
import { useListsStore } from '@/stores/listBasket'
import type { IListColors } from '@/types/listStore'
import ItemList from './LeftItem.vue'
import { computed } from 'vue'

const props = defineProps<{ list: IListColors }>()
const listStore = useListsStore()

const updateListArray = (e: Event) => {
  listStore.toggleCheckboxes(props.list.name, (e.target as HTMLInputElement).checked)
}

const check = computed(() => {
  return props.list.data.some((item) => item.checked)
})
</script>

<template>
  <div class="list-item">
    <div class="accordion">
      <div class="parent-check-box">
        <div class="item">
          <div class="checkbox-rect">
            <input
              type="checkbox"
              :id="'checkbox-rect' + props.list.name"
              :checked="check"
              @click="updateListArray"
            />
            <label :for="'checkbox-rect' + props.list.name"></label>
          </div>
        </div>
      </div>

      <input
        :id="'accordion-trigger-' + list.name"
        class="accordion-trigger-input"
        type="checkbox"
      />
      <label class="accordion-trigger" :for="'accordion-trigger-' + list.name"
        >{{ list.name }}
      </label>
      <section class="accordion-animation-wrapper">
        <div class="accordion-animation">
          <div class="accordion-transform-wrapper">
            <div class="accordion-content">
              <div class="grid-container">
                <div v-for="(item, index) in list.data" :key="item.id" class="tree-items__wrapper">
                  <ItemList
                    :id="item.id"
                    :parent-name="list.name"
                    :color="item.color"
                    :count="item.count"
                    :checked="item.checked"
                    :name="'Item ' + (index + 1)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.tree-items__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

:root {
  --transitionLength: 0.4s;
  --transitionTiming: ease;
}

.accordion-animation-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows var(--transitionLength) var(--transitionTiming);
}

.accordion-trigger-input:checked ~ .accordion-animation-wrapper {
  grid-template-rows: 1fr;
}

.accordion-animation {
  min-height: 0;
}

.accordion-transform-wrapper {
  transform: translateY(-100%);
  visibility: hidden;
  transition:
    transform var(--transitionLength) var(--transitionTiming),
    visibility 0s var(--transitionLength) var(--transitionTiming);
}

.accordion-trigger-input:checked ~ .accordion-animation-wrapper .accordion-transform-wrapper {
  transform: translateY(0);
  visibility: visible;
  transition:
    transform var(--transitionLength) var(--transitionTiming),
    visibility 0s linear;
}

/*Поля внутри контейнера не позволяют рассчитать высоту анимации, лучше использовать отступы*/
.accordion-content * {
  margin: 0;
}

.accordion {
  min-width: 320px;
  width: 80%;
  margin: 0 auto;
  background: white;
  color: black;
  position: relative;
}

.accordion-item {
  border-top: 2px solid #676767;
  border-bottom: 2px solid #676767;
  margin-bottom: -2px;
  overflow: hidden;
}

.accordion-trigger-input {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.accordion-trigger {
  display: block;
  position: relative;
  padding: 16px;
  transition: box-shadow var(--transitionLength) var(--transitionTiming);
  z-index: 1;
  cursor: pointer;
}

.accordion-trigger-input:focus-visible ~ .accordion-trigger {
  outline: 2px solid;
  outline-offset: -2px;
}

.accordion-trigger::after {
  display: block;
  position: absolute;
  right: 16px;
  top: 18px;
  content: '';
  width: 8px;
  height: 8px;
  border: 2px solid #676767;
  border-bottom: transparent;
  border-left: transparent;
  transform: rotate(135deg);
  transition: transform var(--transitionLength) var(--transitionTiming);
}

.accordion-trigger-input:checked ~ .accordion-trigger::after {
  transform: rotate(135deg) rotateX(180deg) rotateY(180deg) translateY(4px) translateX(-4px);
}

.accordion-trigger-input:checked ~ .accordion-trigger {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow calc(var(--transitionLength) / 4) var(--transitionTiming);
}

.accordion-content {
  /* padding: 16px; */
  background: #f8f8f8;
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
