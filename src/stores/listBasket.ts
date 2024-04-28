import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IListColors } from '@/types/listStore'
import { listsData } from '@/stores/data'

export const useListsStore = defineStore('lists', () => {
  const lists = ref<IListColors[]>(listsData)

  const deleteSquare = (name: string, id: number) => {
    lists.value.map((list) => {
      if (list.name === name) {
        list.data.map((item) => {
          if (item.id === id) {
            item.count -= 1
          }
        })
      }
    })
  }

  const updateColor = (name: string, id: number, color: string) => {
    lists.value.map((list) => {
      if (list.name === name) {
        list.data.map((item) => {
          if (item.id === id) {
            item.color = color
            return item
          }
          return item
        })
      }
    })
  }

  const updateCount = (name: string, id: number, count: string) => {
    lists.value.map((list) => {
      if (list.name === name) {
        list.data.map((item) => {
          if (item.id === id) {
            item.count = Number(count)
            return item
          }
          return item
        })
        return list
      }
    })
  }

  const updateChecked = (name: string, flag: boolean, id?: number) => {
    lists.value.map((list) => {
      if (list.name === name) {
        list.data.map((item) => {
          if (item.id === id) {
            item.checked = flag
          }
          return item
        })
        return list
      }
    })
  }

  const toggleCheckboxes = (name: string, flag: boolean) => {
    lists.value.map((list) => {
      if (list.name === name) {
        list.data.map((item) => {
          item.checked = flag
          return item
        })
        return list
      }
    })
  }

  return {
    lists,
    updateColor,
    updateCount,
    updateChecked,
    toggleCheckboxes,
    deleteSquare
  }
})
