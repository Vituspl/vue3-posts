<template>
  <div class="app">
<router-view></router-view>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
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