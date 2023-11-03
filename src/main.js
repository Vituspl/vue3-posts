import {createApp} from 'vue';
import App from './App';
import router from '@/router/router';
import components from '@/components/UI';
import directives from '@/directives';
import store from '@/store';

// Создаем и смонтируем корневой экземпляр.
const app = createApp(App);
// Нахождение циклом component в components и их регистрация для компонент в UI
components.forEach(component => {
    app.component(component.name, component);
});

// Нахождение циклом directive в directives и их регистрация для директив в directives
directives.forEach(directive => {
    app.directive(directive.name, directive);
});

// Обязательно _используйте_ экземпляр маршрутизатора, чтобы
// позволить приложению знать о его наличии.
app
    .use(router)
    .use(store)
    .mount('#app');
