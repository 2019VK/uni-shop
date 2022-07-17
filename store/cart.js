export default {
  namespaced: true,

  state: () => ({
    // 初始化，从本地读取购物车数据
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 向购物车里添加数据
    addCart(state,goods){
      const findres = state.cart.find(x => x.goods_id === goods.goods_id)
      if(!findres) {
        state.cart.push(goods)
      }else{
        findres.goods_count++
      }
      this.commit('Cart/saveLocal')
    },
    // 将数据保存在本地
    saveLocal(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新勾选状态
    updateRadio(state,goods){
      const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findRes){
        findRes.goods_state = goods.goods_state
        this.commit('Cart/saveLocal')
      }
    },
    // 更新商品数量
    updateGoodsCount(state,goods){
      const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
      if(findRes){
        findRes.goods_count = goods.goods_count
        this.commit('Cart/saveLocal')
      }
    },
    // 删除购物车数据
    removeCartGoods(state,goods){
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
      this.commit('Cart/saveLocal')
    },
    // 商品的全选与全不选
    updateAllGoodsState(state,newState){
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('Cart/saveLocal')
    }
  },

  getters: {
    // 计算购物车有几件商品
    total(state){
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      return state.cart.length
    },
    // 计算购物车里的商品数量
    goodsTotal(state){
      return state.cart.reduce((total,item) => total += item.goods_count,0)
    },
    // 统计勾选商品数量
    checkedCount(state){
      return state.cart.filter(x => x.goods_state === 2).reduce((total,item) => { return total += item.goods_count},0)
    },
    // 勾选的商品价格
    checkedGoodsPrice(state){
      return state.cart.filter(x => x.goods_state === 2).reduce((total,item) => { return total += item.goods_count * item.goods_price},0).toFixed(2)
    }
  }
}
