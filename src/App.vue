<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="container main">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="container">
      © {{ new Date().getFullYear() }} Vue Shop — демо интернет-магазина
    </div>
  </footer>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 200px);
  padding-bottom: 40px;
}

.footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding: 24px 0;
  color: var(--muted);
  font-size: 0.9rem;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
