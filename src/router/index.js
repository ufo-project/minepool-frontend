import Vue from 'vue'
import Router from 'vue-router'

const WebHome = r => require.ensure([], () => r(require('@/pages/Webhome')), 'WebHome')
const Home = r => require.ensure([], () => r(require('@/pages/home/Home')), 'Home')
const Workers = r => require.ensure([], () => r(require('@/pages/home/Workers')), 'Workers')
const Guide = r => require.ensure([], () => r(require('@/pages/home/Guide')), 'Guide')

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  base: '/',
  routes: [
    {
      path: '/',
      name: 'WebHome',
      redirect: '/home',
      component: WebHome,
      children: [
        { path: '/home', name: 'home', component: Home },
        { path: '/workers', name: 'workers', component: Workers },
        { path: '/guide', name: 'guide', component: Guide }
      ]
    }
  ]
})
