import { createRouter, createWebHistory } from 'vue-router'

const ListsIndex = () => import('../views/ListsIndex.vue')
const ListsCreate = () => import('../views/ListsCreate.vue')
const ListsShow = () => import('../views/ListsShow.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'lists-index', component: ListsIndex },
        { path: '/lists/new', name: 'lists-create', component: ListsCreate },
        { path: '/lists/:id', name: 'lists-show', component: ListsShow, props: true },
    ],
})

export default router
