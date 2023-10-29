<template>

  <div class="page__wrapper">
    <div
        v-for="page in totalPages"
        :key="page"
        class="page"
        :class="{
                      'current-page': page === pageNumber
                  }"
    >
      {{ pageNumber }}
    </div>
  </div>

</template>

<script>

export default {
  name: "post-page",
  /** Поле для пропсов */
  props: {
    page: {
      /** Тип количества страниц - число */
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 3
    },
    totalPages: {
      type: Array,
      default: 0
    }
  }
};
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 3px solid teal;
  background: lightgrey;
}
</style>