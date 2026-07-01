<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="nf">
    <div class="code">404</div>
    <p>Такой страницы нет</p>
    <RouterLink to="/" class="btn btn-primary">На главную</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  text-align: center;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.code {
  font-size: 5rem;
  font-weight: 800;
  color: var(--primary);
}
</style>
