import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/LayoutHead.vue'),
      redirect: '/musichouse',
      children: [
        { path: '/musichouse', component: () => import('@/views/musichouse/MusicHouse.vue') },
        { path: '/mymusic', component: () => import('@/views/mymusic/MyMusic.vue') },
        { path: '/musicintro', component: () => import('@/views/musicintroduce/MusicIntro.vue') },
        { path: '/myplayer', component: () => import('@/views/player/MyPlayer.vue') },
        { path: '/wyysearch', component: () => import('@/views/wyysearch/WyySearch.vue') },
      ],
    },
  ],
})

export default router
