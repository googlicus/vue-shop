# Vue Shop

Демо интернет-магазина на **Vue 3 + Vite**, с **Vue Router** и **Pinia**.

## Возможности

- Каталог товаров с поиском, фильтром по категориям и сортировкой
- Страница товара с выбором количества
- Корзина с изменением количества и подсчётом суммы
- Избранное (список желаний)
- Оформление заказа с валидацией формы
- Состояние корзины и избранного сохраняется в `localStorage`

## Структура

```
src/
├── components/     AppHeader, ProductCard
├── data/           products.js — mock-данные товаров
├── router/         маршруты (Vue Router)
├── stores/         cart.js, favorites.js (Pinia)
├── views/          Catalog, Product, Cart, Favorites, Checkout, NotFound
├── App.vue         layout
└── main.js         точка входа
```

## Запуск

```sh
npm install     # установит vue, vue-router, pinia
npm run dev      # режим разработки
npm run build    # production-сборка
npm run preview  # предпросмотр сборки
```

Данные товаров — локальные (`src/data/products.js`). Чтобы подключить реальный
backend, замените импорты из этого файла на запросы к API.
