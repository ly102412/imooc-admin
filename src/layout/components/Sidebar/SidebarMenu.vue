<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :collapse="!$store.getters.sidebarOpened"
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { filterRouters, generateMenus } from '@/utils/route'

// 处理路由表，获取 menu 列表
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
