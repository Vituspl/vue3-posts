<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
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
          v-model="selectedSort"
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
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    };
  },
  methods: {
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

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        // Вычисляем количество страниц на странице, делим кол-во постов на сервере
        // на заданный лимит постов на странице и результат деления округляем в большую
        // сторону.
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        // Перезаписываем предыдущие посты на странице на новые полученные от сервера.
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },
    // Ф-ия loadMorePosts() будет вызываться в тот момент, когда пользователь долистал
    // страницу, например, до края.
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        // Здесь посты не перезаписываем, а берем предыдущие посты и к ним
        // добавляем полученные посты с сервера.
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка');
      }
    }
  },
  /**  Хук mounted() (из life-cycle) реализует динамическую подгрузку постов вызывая
   * ф-ию  fetchPosts()
   */
  mounted() {
    this.fetchPosts();
  },

  /** Сортировка с помощью Вычисляемых свойств */
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    /** Поиск */
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  /** Сортировка с помощью Наблюдаемых свойств */
  /** При наличии computed: , watch: не нужен */
  /*watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) =>
          post1[newValue]?.localeCompare(post2[newValue])
      );
    }
  }*/

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