<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <div class="center">
      <p class="title">主题色更换</p>
      <el-color-picker v-model="mColor" :predefine="predefineColors">
      </el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const store = useStore()
// 默认色值
const mColor = ref(store.getters.mainColor)

// 定义修改父组件值的方法
const emits = defineEmits(['update:modelValue'])

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 确定
const confirm = async () => {
  console.log(mColor.value)
  // 获取主题色
  const newStyleText = await generateNewStyle(mColor.value)
  // 写入最新的主题色
  writeNewStyle(newStyleText)
  // 保存主题色
  store.commit('theme/setMainColor', mColor.value)
  closed()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
