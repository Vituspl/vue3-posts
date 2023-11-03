<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск...."
        v-focus
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка ...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import MyDialog from '@/components/UI/MyDialog';
import MyButton from '@/components/UI/MyButton';
import axios from 'axios';
import MySelect from '@/components/UI/MySelect';
import MyInput from '@/components/UI/MyInput';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  /** Специальное поле components: для регистрации компонентов */
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    /** В ф-ии createPost() добавляем post в массив постов */
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    /** Ф-ия removePost(post) отфильтровывает в массив постов те посты,
     *  у которых id не совпадает с удаляемым id, т.е.
     *  this.post с удаляемым id в массив после фильтрации не попадет
     *  (другими словами - удалится)
     */
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  /**  Хук mounted() (из life-cycle) реализует динамическую подгрузку постов вызывая
   * ф-ию  fetchPosts()
   */
  mounted() {
    this.fetchPosts();
  },

  /** Сортировка с помощью Вычисляемых свойств */
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  /** Сортировка с помощью Наблюдаемых свойств */
  /** При наличии computed: , watch: не нужен */
  watch: {}
};
</script>

<style>

.app__btns {
  margin: 15px 10px;
  display: flex;
  justify-content: space-between;
}

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

.observer {
  height: 30px;
  background: green;
}
</style>