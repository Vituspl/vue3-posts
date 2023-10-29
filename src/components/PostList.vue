<template>
  <!-- Когда мы используем циклы (для итерации по списку) posts,
       Нам нужно использовать уникальные ключи (id) каждого поста-->
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color:red">
    Список постов пустой
  </h2>
</template>

<script>
import PostItem from '@/components/PostItem';

export default {
  name: "post-list",
  components: {PostItem},
  /** Поле для пропсов */
  props: {
    posts: {
      /** Тип постов - массив */
      type: Array,
      /** По дефолту посты инициализируются - обязательно true */
      required: true
    }
  }
};
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.8s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move{
  transition: transform 0.4s ease;
}
</style>