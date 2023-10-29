<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
};
</script>

<style scoped>
.btn {
  /* Украсим кнопку */
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  width: 110px;
  border-radius: 5px;
}
</style>