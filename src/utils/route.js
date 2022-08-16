// 处理路由表

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理层级错误的路由，比如某个路由为字路由但其却出现在一级路由的位置上，这个就应该删除，保留正确层级的路由
 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes 数据，返回对应的 menu 数组
 */
export function generateMenus(routes) {
  const result = []
  routes.forEach((item) => {
    // 不存在 meta && 不存在 children 直接返回
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta 进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 存在 children 存在 meta || 不存在 children 存在 meta
    // 由于疏忽多写了同 path 的路由我们需要单独处理一下
    const routePath = item.path
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon && title 必须都存在
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    if (item.children) {
      route.children.push(...generateMenus(item.children))
    }
  })
  return result
}
