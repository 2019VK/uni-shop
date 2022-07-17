// 导入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex'
// 导入小仓库文件
import cart from '@/store/cart.js'
import user from '@/store/user.js'

// 使用vuex插件
Vue.use(Vuex)

// 创建实例
const store = new Vuex.Store({
  modules:{
    'Cart':cart,
    'User':user
  }
})

// 对外暴露
export default store