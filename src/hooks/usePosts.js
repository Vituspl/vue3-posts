import axios from 'axios';
import {onMounted, ref} from 'vue';

export function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostsLoading = ref(true);
    const fetching = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            // Вычисляем количество страниц на странице, делим кол-во постов на сервере
            // на заданный лимит постов на странице и результат деления округляем в большую
            // сторону.
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
            // Перезаписываем предыдущие посты на странице на новые полученные от сервера.
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка');
        } finally {
            isPostsLoading.value = false;
        }
    };

    onMounted(fetching);

    return {
        posts, isPostsLoading, totalPages
    };
}