<script setup lang="ts">
import { useListsStore } from '@/stores/listBasket'
import { onMounted, ref, watch } from 'vue'

const store = useListsStore()

const props = defineProps<{
  shuffle: boolean
  name: string
  index: number
  fullList: {
    id: number
    count: number
    color: string
    checked: boolean
  }[]
}>()

const arr = ref<
  {
    id: number
    color: string
    key: number
  }[]
>([])

const fillArr = (data = props.fullList) => {
  arr.value = []
  for (const item of data) {
    let counter = item.count
    while (counter !== 0) {
      if (item.checked) {
        arr.value.push({ color: item.color, id: item.id, key: new Date().getTime() })
      }
      counter--
    }
  }
}

const changeOrder = () => {
  store.lists.map((item) => {
    if (item.name === props.name) {
      if (item.shuffle) {
        arr.value.sort((a, b) => a.id - b.id)
      } else {
        shufflArr(arr.value)
      }

      item.shuffle = !item.shuffle
    }
  })
}

const shufflArr = (
  arr: {
    id: number
    color: string
    key: number
  }[]
) => {
  let j, temp
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
  }

  return arr
}

const delitesquare = (name: string, id: number) => {
  store.deleteSquare(name, id)
}

onMounted(() => {
  fillArr()
})

watch(
  () => props.fullList,
  (newVal) => {
    fillArr(newVal)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div class="accordion">
      <input :id="'accordion-trigger-' + index" class="accordion-trigger-input" type="checkbox" />
      <label class="accordion-trigger" :for="'accordion-trigger-' + index">{{ name }} </label>
      <section class="accordion-animation-wrapper">
        <div class="accordion-animation">
          <div class="accordion-transform-wrapper">
            <div class="accordion-content">
              <div class="grid-container">
                <button @click="changeOrder" class="btn">
                  {{ shuffle ? 'sort' : 'shuffle' }}
                </button>
                <div class="box-wrapper" style="display: flex; gap: 5px; flex-wrap: wrap">
                  <div
                    v-for="item in arr"
                    :key="item.id + Math.random()"
                    style="display: flex; flex-direction: column; gap: 20px"
                  >
                    <div
                      @click="delitesquare(props.name, item.id)"
                      class="square"
                      :style="{ 'background-color': item.color }"
                    ></div>
                  </div>
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
.square {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}
.square:hover {
  opacity: 0.5;
  border: 1px solid #000;
}
.btn {
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn:hover {
  background-color: #fff;
  color: #000;
}

.sq {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.sq:hover {
  opacity: 0.5;
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

.grid-container {
  position: relative;
  padding: 15px;
}
</style>
