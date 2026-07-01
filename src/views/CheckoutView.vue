<script setup>
import { reactive, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { items, totalPrice, isEmpty } = storeToRefs(cart)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  payment: 'card',
  comment: '',
})

const errors = reactive({})
const done = ref(false)
const orderNumber = ref('')

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = 'Укажите имя'
  if (!/^[\d\s+()-]{6,}$/.test(form.phone)) errors.phone = 'Некорректный телефон'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Некорректный email'
  if (!form.address.trim()) errors.address = 'Укажите адрес доставки'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) return
  orderNumber.value = String(Math.floor(100000 + Math.random() * 900000))
  done.value = true
  cart.clear()
}

const canOrder = computed(() => !isEmpty.value)
</script>

<template>
  <section>
    <h1 class="page-title">Оформление заказа</h1>

    <div v-if="done" class="success card">
      <div class="emoji">✅</div>
      <h2>Заказ №{{ orderNumber }} оформлен!</h2>
      <p>Мы отправили подтверждение на почту. Спасибо за покупку 💜</p>
      <RouterLink to="/" class="btn btn-primary">Вернуться в каталог</RouterLink>
    </div>

    <div v-else-if="!canOrder" class="empty card">
      <p>Корзина пуста — нечего оформлять.</p>
      <RouterLink to="/" class="btn btn-primary">В каталог</RouterLink>
    </div>

    <form v-else class="layout" @submit.prevent="submit">
      <div class="fields card">
        <label>
          Имя и фамилия
          <input v-model="form.name" type="text" :class="{ err: errors.name }" />
          <span v-if="errors.name" class="msg">{{ errors.name }}</span>
        </label>

        <div class="two">
          <label>
            Телефон
            <input v-model="form.phone" type="tel" placeholder="+7 999 000-00-00" :class="{ err: errors.phone }" />
            <span v-if="errors.phone" class="msg">{{ errors.phone }}</span>
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" :class="{ err: errors.email }" />
            <span v-if="errors.email" class="msg">{{ errors.email }}</span>
          </label>
        </div>

        <label>
          Адрес доставки
          <input v-model="form.address" type="text" :class="{ err: errors.address }" />
          <span v-if="errors.address" class="msg">{{ errors.address }}</span>
        </label>

        <fieldset class="pay">
          <legend>Способ оплаты</legend>
          <label class="radio">
            <input v-model="form.payment" type="radio" value="card" /> Картой онлайн
          </label>
          <label class="radio">
            <input v-model="form.payment" type="radio" value="cash" /> При получении
          </label>
        </fieldset>

        <label>
          Комментарий
          <textarea v-model="form.comment" rows="3"></textarea>
        </label>
      </div>

      <aside class="summary card">
        <h2>Ваш заказ</h2>
        <div v-for="item in items" :key="item.product.id" class="line">
          <span>{{ item.product.title }} × {{ item.qty }}</span>
          <span>{{ (item.product.price * item.qty).toLocaleString('ru-RU') }} ₽</span>
        </div>
        <div class="total">
          <span>Итого</span>
          <span>{{ totalPrice.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Подтвердить заказ
        </button>
      </aside>
    </form>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

.fields {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

input,
textarea {
  padding: 11px 13px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: 2px solid var(--primary);
  border-color: transparent;
}

input.err {
  border-color: var(--danger);
}

.msg {
  color: var(--danger);
  font-size: 0.8rem;
  font-weight: 500;
}

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pay {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
}

.pay legend {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0 6px;
}

.radio {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-top: 6px;
}

.radio input {
  width: auto;
}

.summary {
  padding: 20px;
  position: sticky;
  top: 84px;
}

.summary h2 {
  margin: 0 0 14px;
  font-size: 1.15rem;
}

.line {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 0.9rem;
}

.total {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 1.15rem;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  margin: 8px 0 14px;
}

.success,
.empty {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.success .emoji {
  font-size: 3.5rem;
}

@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .two {
    grid-template-columns: 1fr;
  }
}
</style>
