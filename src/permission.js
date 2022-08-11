import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断是否存在用户数据
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有 token 的情况下，可以进入白名单页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
