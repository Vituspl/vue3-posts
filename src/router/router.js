import Main from '@/pages/Main';
import {createRouter, createWebHistory} from 'vue-router';
import PostPage from '@/pages/PostPage';


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
];

const router = createRouter({
    routes,  // сокращение от `routes: routes`
    history: createWebHistory(process.env.BASE_URL)
});

export default router;