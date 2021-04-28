import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('../components/Login')
const AdminHome = () => import('../components/admin/AdminHome')
const UserHome = () => import('../components/user/UserHome')

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { name: 'AdminHomeRoute', path: '/admin/home/:userId', component: AdminHome, props: true },
  { name: 'UserHomeRoute', path: '/user/home/:userId', component: UserHome, props: true }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果去的是登录页
    // 如果已经有token且合法，去home页
    // 如果没有token，next()
  // 不是的话
    // 验证token是否合法
    // 如果合法，验证地址是否合法
      // 如果合法，next()
      // 如果不合法，去home页
    // 如果不合法，清除token，去登录页
    
  if (to.path === '/login') {
    if (tokenStr) {
      if (window.sessionStorage.getItem('userType') === '0')
        return next({name: 'AdminHomeRoute', params: {userId: window.sessionStorage.getItem('userId')}})
      else
        return next({name: 'UserHomeRoute', params: {userId: window.sessionStorage.getItem('userId')}})
    }
    else return next()
  }
  else {
    if (tokenStr)
      return next()
    else
      return next('/login')
      // window.sessionStorage.removeItem('token')
  }
})

export default router
