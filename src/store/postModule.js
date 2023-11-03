import axios from 'axios';

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        /** Сортировка  */
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            );
        },
        /** Поиск */
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                /** commit - нужен для вызова мутаций  */
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                // Вычисляем количество страниц на странице, делим кол-во постов на сервере
                // на заданный лимит постов на странице и результат деления округляем в большую
                // сторону.
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                // Перезаписываем предыдущие посты на странице на новые полученные от сервера.
                commit('setPosts', response.data);
            } catch (e) {
                console.log(e);
            } finally {
                /** После загрузки постов, убираем "Идет загрузка" - false  */
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                // Здесь посты не перезаписываем, а берем предыдущие посты и к ним
                // добавляем полученные посты с сервера.
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e);
            }
        }
    },
    namespaced: true
};