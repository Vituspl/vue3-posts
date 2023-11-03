<template>
  <div class="navbar">
    <div style="font-weight: bold" @click="$router.push('/')">Vue3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <!-- Раздвинем кнопки на 20px -->
      <my-button style="margin-left: 20px" @click="$router.push('/about')">О сайте</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/store')">store</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/composition')">Composition</my-button>
    </div>
  </div>
</template>

<script>
//import MyButton from '@/components/UI/MyButton';

export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>