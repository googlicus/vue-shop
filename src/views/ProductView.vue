<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProductById } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const router = useRouter()
const cart = useCartStore()
const favorites = useFavoritesStore()

const product = computed(() => getProductById(props.id))
const qty = ref(1)
const added = ref(false)

const isFavorite = computed(() =>
  product.value ? favorites.has(product.value.id) : false,
)

function addToCart() {
  cart.add(product.value, qty.value)
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}
</script>

<template>
  <section v-if="product" class="wrap">
    <button class="back" @click="router.back()">← Назад</button>

    <div class="detail">
      <div class="thumb card">
        <span v-if="product.badge" class="badge detail-badge">{{ product.badge }}</span>
        <div class="emoji">{{ product.emoji }}</div>
      </div>

      <div class="info">
        <div class="rating">★ {{ product.rating.toFixed(1) }}</div>
        <h1>{{ product.title }}</h1>
        <div class="prices">
          <span class="price big">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
          <span v-if="product.oldPrice" class="old-price">
            {{ product.oldPrice.toLocaleString('ru-RU') }} ₽
          </span>
        </div>
        <p class="desc">{{ product.description }}</p>

        <div class="qty">
          <button @click="qty = Math.max(1, qty - 1)">−</button>
          <span>{{ qty }}</span>
          <button @click="qty++">+</button>
        </div>

        <div class="actions">
          <button class="btn btn-primary" @click="addToCart">
            {{ added ? '✓ Добавлено' : 'В корзину' }}
          </button>
          <button
            class="btn btn-outline"
            @click="favorites.toggle(product.id)"
          >
            {{ isFavorite ? '♥ В избранном' : '♡ В избранное' }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="notfound">
    <h1>Товар не найден</h1>
    <RouterLink to="/" class="btn btn-primary">В каталог</RouterLink>
  </section>
</template>

<style scoped>
.wrap {
  padding-top: 24px;
}

.back {
  border: none;
  background: none;
  color: var(--muted);
  font-weight: 600;
  padding: 8px 0;
  margin-bottom: 12px;
}

.back:hover {
  color: var(--primary);
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.thumb {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
}

.emoji {
  font-size: 9rem;
}

.detail-badge {
  position: absolute;
  top: 16px;
  left: 16px;
}

.info h1 {
  margin: 6px 0 12px;
  font-size: 1.8rem;
}

.rating {
  color: var(--accent);
  font-weight: 600;
}

.prices {
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
}

.price.big {
  font-size: 1.8rem;
}

.desc {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.qty {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 6px 14px;
  margin-bottom: 20px;
}

.qty button {
  border: none;
  background: none;
  font-size: 1.3rem;
  width: 28px;
  color: var(--primary);
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.notfound {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

@media (max-width: 720px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
</style>
