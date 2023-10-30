import {createApp} from 'vue';
import App from './App';
import components from '@/components/UI';
import router from '@/router/router';

// Создаем и смонтируем корневой экземпляр.
const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

// Обязательно _используйте_ экземпляр маршрутизатора, чтобы
// позволить приложению знать о его наличии.
app
    .use(router)
    .mount('#app');
