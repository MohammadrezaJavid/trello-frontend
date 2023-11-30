import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import axios from 'axios';

import store from './store';

import Signup from './components/SignupPage.vue'
import Login from './components/LoginPage.vue';
import Logout from './components/LogoutPage.vue';


import BoardList from './components/BoardList.vue';
import ListList from './components/ListList.vue';
import CardList from './components/CardList.vue';

import CreateBoard from './components/CreateBoard.vue';
import CreateList from './components/CreateList.vue';
import CreateCard from './components/CreateCard.vue';

import DeleteBoard from './components/DeleteBoard.vue';
import DeleteList from './components/DeleteList.vue';
import DeleteCard from './components/DeleteCard.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/signup', component:  Signup},
        { path: '/login', component:  Login},
        { path: '/logout', component:  Logout},

        { path: '/trello/boards', component:  BoardList},
        { path: '/trello/lists', component: ListList },
        { path: '/trello/cards', component: CardList },
        
        { path: '/trello/board', component: CreateBoard },
        { path: '/trello/list', component: CreateList },
        { path: '/trello/card', component: CreateCard },

        { path: '/trello/delete/board', component: DeleteBoard },
        { path: '/trello/delete/list', component: DeleteList },
        { path: '/trello/delete/card', component: DeleteCard },
    ]
});

const app = createApp(App);

app.config.globalProperties.$http = axios;
app.use(store);
app.use(router);
app.mount('#app');