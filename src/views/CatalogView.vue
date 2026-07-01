<script setup>
import { ref, computed } from 'vue'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'

const search = ref('')
const activeCategory = ref('all')
const sort = ref('popular')

const filtered = computed(() => {
  let list = products.slice()

  if (activeCategory.value !== 'all') {
    list = list.filter((p) => p.category === activeCategory.value)
  }

  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter((p) => p.title.toLowerCase().includes(q))
  }

  switch (sort.value) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      list.sort((a, b) => b.rating - a.rating)
      break
    default:
      list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
  }

  return list
})
</script>

<template>
  <section>
    <div class="hero card">
      <div>
        <h1>Всё для дома, спорта и работы</h1>
        <p>Демо-магазин на Vue 3, Vue Router и Pinia.</p>
      </div>
      <div class="hero-emoji">🛍️</div>
    </div>

    <div class="toolbar">
      <input
        v-model="search"
        class="search"
        type="search"
        placeholder="Поиск товаров…"
      />
      <select v-model="sort" class="select">
        <option value="popular">Популярные</option>
        <option value="price-asc">Сначала дешёвые</option>
        <option value="price-desc">Сначала дорогие</option>
        <option value="rating">По рейтингу</option>
      </select>
    </div>

    <div class="cats">
      <button
        v-for="c in categories"
        :key="c.id"
        class="chip"
        :class="{ active: activeCategory === c.id }"
        @click="activeCategory = c.id"
      >
        {{ c.title }}
      </button>
    </div>

    <p class="count">Найдено товаров: {{ filtered.length }}</p>

    <div v-if="filtered.length" class="grid">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
    <p v-else class="empty">Ничего не найдено. Попробуйте изменить запрос.</p>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 28px;
  margin-top: 24px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 1.7rem;
}

.hero p {
  margin: 0;
  opacity: 0.9;
}

.hero-emoji {
  font-size: 4rem;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin: 24px 0 16px;
  flex-wrap: wrap;
}

.search {
  flex: 1;
  min-width: 200px;
  padding: 11px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
  background: var(--surface);
}

.search:focus,
.select:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

.select {
  padding: 11px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  font-size: 0.95rem;
}

.cats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.chip {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
}

.chip.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.count {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 12px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.empty {
  color: var(--muted);
  padding: 40px 0;
  text-align: center;
}
</style>
