import { createRouter, createWebHistory } from 'vue-router'
import UserList from './components/UserList.vue'
import UserDetails from './components/UserDetails.vue'



const routes = [
  { path: '/users', component: UserList },
  { path: '/users/:id', name: 'user-details', component: UserDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router


