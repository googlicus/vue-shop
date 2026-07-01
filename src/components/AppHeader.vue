<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

const cart = useCartStore()
const favorites = useFavoritesStore()
const { count: cartCount } = storeToRefs(cart)
const { count: favCount } = storeToRefs(favorites)
</script>

<template>
  <header class="header">
    <div class="container bar">
      <RouterLink to="/" class="logo">🛍️ Vue&nbsp;Shop</RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">Каталог</RouterLink>

        <RouterLink to="/favorites" class="icon-link" aria-label="Избранное">
          ♥
          <span v-if="favCount" class="counter">{{ favCount }}</span>
        </RouterLink>

        <RouterLink to="/cart" class="icon-link" aria-label="Корзина">
          🛒
          <span v-if="cartCount" class="counter">{{ cartCount }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary);
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text);
}

.nav-link:hover,
.router-link-exact-active.nav-link {
  color: var(--primary);
  background: rgba(79, 70, 229, 0.08);
}

.icon-link {
  position: relative;
  font-size: 1.25rem;
  padding: 8px 10px;
  border-radius: 8px;
  line-height: 1;
}

.icon-link:hover {
  background: rgba(79, 70, 229, 0.08);
}

.counter {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
