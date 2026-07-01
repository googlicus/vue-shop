import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-shop-cart'

function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  // --- state ---
  const items = ref(loadInitial()) // [{ product, qty }]

  // --- getters ---
  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const totalPrice = computed(() =>
    items.value.reduce((s, i) => s + i.product.price * i.qty, 0),
  )
  const isEmpty = computed(() => items.value.length === 0)

  // --- actions ---
  function add(product, qty = 1) {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ product, qty })
    }
  }

  function remove(productId) {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function setQty(productId, qty) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) item.qty = Math.max(1, qty)
  }

  function increment(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) item.qty++
  }

  function decrement(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return
    if (item.qty > 1) {
      item.qty--
    } else {
      remove(productId)
    }
  }

  function clear() {
    items.value = []
  }

  // --- авто-сохранение в localStorage при любом изменении ---
  watch(
    items,
    (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )

  return {
    items,
    count,
    totalPrice,
    isEmpty,
    add,
    remove,
    setQty,
    increment,
    decrement,
    clear,
  }
})
