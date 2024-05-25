import { createRouter, createWebHistory } from "vue-router";

import DayList from "../components/DayList.vue";
import Day from "../components/Day.vue";
import CreateWord from "../components/CreateWord.vue";
import CreateDay from "../components/CreateDay.vue";
import EmptyPage from "../components/EmptyPage.vue";

// 라우터 설계
const routes = [
    { path: '/', component: DayList },
    { path: '/day/:day', component: Day },
    { path: '/create_word', component: CreateWord },
    { path: '/create_day', component: CreateDay },
    { path: '/:pathMatch(.*)*', component: EmptyPage }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export { router }