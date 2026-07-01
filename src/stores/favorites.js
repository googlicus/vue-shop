import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-shop-favorites'

function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: loadInitial(),
  }),
  getters: {
    count: (state) => state.ids.length,
    has: (state) => (id) => state.ids.includes(id),
  },
  actions: {
    toggle(id) {
      if (this.ids.includes(id)) {
        this.ids = this.ids.filter((x) => x !== id)
      } else {
        this.ids.push(id)
      }
      this.persist()
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids))
    },
  },
})
