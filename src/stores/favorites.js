import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-shop-favorites'

function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  // --- state ---
  const ids = ref(loadInitial())

  // --- getters ---
  const count = computed(() => ids.value.length)
  const has = (id) => ids.value.includes(id)

  // --- actions ---
  function toggle(id) {
    ids.value = ids.value.includes(id)
      ? ids.value.filter((x) => x !== id)
      : [...ids.value, id]
  }

  // --- авто-сохранение в localStorage ---
  watch(
    ids,
    (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )

  return { ids, count, has, toggle }
})
