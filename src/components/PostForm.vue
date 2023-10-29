<template>
  <!-- Делаем универсальный (шаблонный) авто генератор постов -->
  <!-- Добавление динамически новых постов -->
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <!-- Включаем в инпуты директивы v-bind, которые позволяют
         связывать  какие то данные с каким то компонентом,
         т.е. к первому инпуту бандим (связываем) модель title, а ко второму
         бандим (связываем) модель body .
         Получается, что в инпутах будет всегда находиться то значение,
         которое будет находиться в соотв. моделях -->
    <!-- Для отслеживания изменений в инпуте, подписываемся
         на событие @input и из инпута забираем value с помощью
         @input="post.title = $event.target.value"  и  @input="post.body = $event.target.value"
          -->
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />
    <!-- На кнопку навешиваем слушатель события который будет
         запускать функцию createPost -->
    <!-- Кнопку позиционируем прямо в ней, т.к. в стилях
         мы вырезали .btn -->
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
    >
      Создать пост
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    /** Ф-ия data() возвращает объект post:{} c изначально пустыми моделями title и body  */
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  methods: {
    /** Следует избегать использование стрелочных функций при определении methods,
     *  так как это не позволяет Vue привязать корректное значение this. */
    createPost() {
      this.post.id = Date.now();
      /** Генерируем событие create(post) */
      this.$emit('create', this.post);
      /** После того как сгенерировали событие create(post)
       * очистим пост т.е. title и body - пустые строки
       */
      this.post = {
        title: '',
        body: ''
      };
    },
  }
};
</script>

<style scoped>
/* Блоку с формами зададим свойство flex и основная ось по вертикали */
form {
  display: flex;
  flex-direction: column;
}
</style>
