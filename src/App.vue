<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/UI/Navbar';

export default {
  components: {Navbar}
};
</script>

<style>
/* Обнулим стили по умолчанию */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Стили для постов */
.app {
  /* Отлепим все блоки от краев страницы */
  padding: 20px;
}
</style>