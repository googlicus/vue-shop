import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-shop-cart'

function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    // items: [{ product, qty }]
    items: loadInitial(),
  }),
  getters: {
    count: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    isEmpty: (state) => state.items.length === 0,
  },
  actions: {
    add(product, qty = 1) {
      const existing = this.items.find((i) => i.product.id === product.id)
      if (existing) {
        existing.qty += qty
      } else {
        this.items.push({ product, qty })
      }
      this.persist()
    },
    remove(productId) {
      this.items = this.items.filter((i) => i.product.id !== productId)
      this.persist()
    },
    setQty(productId, qty) {
      const item = this.items.find((i) => i.product.id === productId)
      if (!item) return
      item.qty = Math.max(1, qty)
      this.persist()
    },
    increment(productId) {
      const item = this.items.find((i) => i.product.id === productId)
      if (item) {
        item.qty++
        this.persist()
      }
    },
    decrement(productId) {
      const item = this.items.find((i) => i.product.id === productId)
      if (!item) return
      if (item.qty > 1) {
        item.qty--
      } else {
        this.remove(productId)
      }
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
  },
})
