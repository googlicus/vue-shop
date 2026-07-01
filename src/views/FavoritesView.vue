<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { products } from '@/data/products'
import { useFavoritesStore } from '@/stores/favorites'
import ProductCard from '@/components/ProductCard.vue'

const favorites = useFavoritesStore()
const { ids } = storeToRefs(favorites)

const items = computed(() => products.filter((p) => ids.value.includes(p.id)))
</script>

<template>
  <section>
    <h1 class="page-title">Избранное</h1>

    <div v-if="items.length" class="grid">
      <ProductCard v-for="p in items" :key="p.id" :product="p" />
    </div>

    <div v-else class="empty card">
      <div class="empty-emoji">♡</div>
      <p>В избранном пока пусто</p>
      <RouterLink to="/" class="btn btn-primary">В каталог</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-emoji {
  font-size: 3.5rem;
  color: var(--danger);
}
</style>
