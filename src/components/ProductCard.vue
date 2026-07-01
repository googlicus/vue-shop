<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps({
  product: { type: Object, required: true },
})

const router = useRouter()
const cart = useCartStore()
const favorites = useFavoritesStore()

const isFavorite = computed(() => favorites.has(props.product.id))
const formattedPrice = computed(() => props.product.price.toLocaleString('ru-RU'))
const formattedOld = computed(() =>
  props.product.oldPrice ? props.product.oldPrice.toLocaleString('ru-RU') : null,
)

function open() {
  router.push({ name: 'product', params: { id: props.product.id } })
}
</script>

<template>
  <div class="card product" @click="open">
    <button
      class="fav"
      :class="{ active: isFavorite }"
      @click.stop="favorites.toggle(product.id)"
      :aria-label="isFavorite ? 'Убрать из избранного' : 'В избранное'"
    >
      {{ isFavorite ? '♥' : '♡' }}
    </button>

    <span v-if="product.badge" class="badge card-badge">{{ product.badge }}</span>

    <div class="thumb">{{ product.emoji }}</div>

    <div class="body">
      <div class="rating">★ {{ product.rating.toFixed(1) }}</div>
      <h3 class="title">{{ product.title }}</h3>
      <div class="prices">
        <span class="price">{{ formattedPrice }} ₽</span>
        <span v-if="formattedOld" class="old-price">{{ formattedOld }} ₽</span>
      </div>
      <button class="btn btn-primary btn-block" @click.stop="cart.add(product)">
        В корзину
      </button>
    </div>
  </div>
</template>

<style scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.product:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.thumb {
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
}

.body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.rating {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  flex: 1;
}

.prices {
  display: flex;
  align-items: baseline;
}

.fav {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  color: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

.fav.active {
  background: var(--danger);
  color: #fff;
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}
</style>
