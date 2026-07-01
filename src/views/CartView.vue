<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { items, totalPrice, isEmpty, count } = storeToRefs(cart)
</script>

<template>
  <section>
    <h1 class="page-title">Корзина</h1>

    <div v-if="isEmpty" class="empty card">
      <div class="empty-emoji">🛒</div>
      <p>Корзина пуста</p>
      <RouterLink to="/" class="btn btn-primary">Перейти в каталог</RouterLink>
    </div>

    <div v-else class="layout">
      <div class="items">
        <div v-for="item in items" :key="item.product.id" class="row card">
          <RouterLink
            :to="{ name: 'product', params: { id: item.product.id } }"
            class="thumb"
          >
            {{ item.product.emoji }}
          </RouterLink>

          <div class="info">
            <RouterLink
              :to="{ name: 'product', params: { id: item.product.id } }"
              class="name"
            >
              {{ item.product.title }}
            </RouterLink>
            <span class="unit">{{ item.product.price.toLocaleString('ru-RU') }} ₽ / шт</span>
          </div>

          <div class="qty">
            <button @click="cart.decrement(item.product.id)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="cart.increment(item.product.id)">+</button>
          </div>

          <div class="sum">
            {{ (item.product.price * item.qty).toLocaleString('ru-RU') }} ₽
          </div>

          <button
            class="remove"
            @click="cart.remove(item.product.id)"
            aria-label="Удалить"
          >
            ✕
          </button>
        </div>

        <button class="btn btn-outline" @click="cart.clear()">Очистить корзину</button>
      </div>

      <aside class="summary card">
        <h2>Итого</h2>
        <div class="line">
          <span>Товаров</span>
          <span>{{ count }} шт</span>
        </div>
        <div class="line">
          <span>Доставка</span>
          <span class="free">Бесплатно</span>
        </div>
        <div class="total">
          <span>К оплате</span>
          <span>{{ totalPrice.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <RouterLink to="/checkout" class="btn btn-primary btn-block">
          Оформить заказ
        </RouterLink>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: grid;
  grid-template-columns: 64px 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  padding: 14px;
}

.thumb {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  background: linear-gradient(135deg, #eef2ff, #f5f3ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-weight: 600;
}

.name:hover {
  color: var(--primary);
}

.unit {
  color: var(--muted);
  font-size: 0.85rem;
}

.qty {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px 10px;
}

.qty button {
  border: none;
  background: none;
  font-size: 1.1rem;
  color: var(--primary);
  width: 22px;
}

.sum {
  font-weight: 700;
  min-width: 90px;
  text-align: right;
}

.remove {
  border: none;
  background: none;
  color: var(--muted);
  font-size: 1rem;
}

.remove:hover {
  color: var(--danger);
}

.summary {
  padding: 20px;
  position: sticky;
  top: 84px;
}

.summary h2 {
  margin: 0 0 16px;
  font-size: 1.2rem;
}

.line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: var(--muted);
}

.free {
  color: var(--success);
  font-weight: 600;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 800;
  padding: 14px 0;
  border-top: 1px solid var(--border);
  margin: 8px 0 16px;
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
}

@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .row {
    grid-template-columns: 56px 1fr auto;
    grid-row-gap: 10px;
  }
}
</style>
