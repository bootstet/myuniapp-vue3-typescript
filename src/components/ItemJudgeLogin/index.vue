<template>
  <div :style="{width: '100%',height: '100%'}">
    <slot></slot>
    <div v-if="!isLogin&&needLogin" class="login-item" @click="itemChange" c-click>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import login from "@/utils/loginPop"; 

export default {
  name: 'judgeLogin',
  props: {
    needLogin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.common.isLogin
    })
  },
  methods: {
    // 如果没登录用一层透明的div遮盖在题目上面，点击去登录
    itemChange(val) {
      if (!this.isLogin) {
        login.install(3402)
      }
    }
  
  },
}
</script>

<style scoped lang="scss">
.login-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
