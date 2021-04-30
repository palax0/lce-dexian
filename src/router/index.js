import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const adminListName = {
//   'Statistics': ['OrderAnalysis'],
//   'Management': ['UserManage', 'FrontManage', 'ActivityManage', 'OrderManage'],
//   'AfterSale': ['Feedback'],
//   'Setting': ['AccountPower']
// }

// function makeRoutes (defaultPath, list) {
//   const tempRoutes = []
//   let cntx = 0
//   for (let key in list) {
//     for (let y = 0; y < list[key].length; ++y) {
//       tempRoutes.push({
//         name: list[key][y],
//         path: cntx + '/' + y,
//         component: () => import('../' + defaultPath + '/' + key + '/' + list[key][y])
//       })
//     }
//     ++cntx
//   }
//   return tempRoutes
// }
// console.log(makeRoutes('components/Admin', adminListName));

// 登录页面
const Login = () => import('../components/Login')
// 管理员页面
const AdminHome = () => import('../components/Admin/AdminHome')
  // 统计
const OrderAnalysis = () => import('../components/Admin/Statistics/OrderAnalysis')
  // 管理
const UserManage = () => import('../components/Admin/Management/UserManage')
const FrontManage = () => import('../components/Admin/Management/FrontManage')
const ActivityManage = () => import('../components/Admin/Management/ActivityManage')
const OrderManage = () => import('../components/Admin/Management/OrderManage')
  // 售后
const Suggestion = () => import('../components/Admin/AfterSale/Suggestion')
  // 设置
const AccountPower = () => import('../components/Admin/Setting/AccountPower')
// 用户页面
const UserHome = () => import('../components/User/UserHome')

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  {
    // 如果这里设置name,子路由设置重定向,子路由将不会渲染
    path: '/admin/home', 
    component: AdminHome, 
    children: [
      { name: 'AdminHomeRoute', path: '', redirect: '0/0' },
      { name: 'OrderAnalysis', path: '0/0', component: OrderAnalysis },
      { name: 'UserManage', path: '1/0', component: UserManage },
      { name: 'FrontManage', path: '1/1', component: FrontManage },
      { name: 'ActivityManage', path: '1/2', component: ActivityManage },
      { name: 'OrderManage', path: '1/3', component: OrderManage },
      { name: 'Suggestion', path: '2/0', component: Suggestion },
      { name: 'AccountPower', path: '3/0', component: AccountPower }
    ]
  },
  { name: 'UserHomeRoute', path: '/user/home', component: UserHome, props: true }
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
        return next({name: 'UserHomeRoute', params: {userId: window.sessionStorage.getItem('userId')}})
      else
        return next({name: 'AdminHomeRoute', params: {userId: window.sessionStorage.getItem('userId')}})
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
