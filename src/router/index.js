import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SubmitPage from '@/views/SubmitPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import TheMap from '@/views/TheMap.vue'
import LeaderboardPage from '@/views/LeaderboardPage.vue'
import SeipexPage from '../views/SeipexPage.vue'
import StartView from '@/views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/submit',
    name: 'Submit',
    component: SubmitPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/map',
    name: 'TheMap',
    component: TheMap
  },
  {
    path: '/leaderboard',
    name: 'LeaderboardPage',
    component: LeaderboardPage
  },
  {
    path: '/seipex',
    name: 'seipex',
    component: SeipexPage
  },
  {
    path: '/start',
    name: 'start',
    component: StartView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
