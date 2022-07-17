export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  mutations: {
    // 更新地址
    updateAddress(state,address){
      state.address = address
      this.commit('User/saveLocal')
    },
    // 把地址保存在本地
    saveLocal(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },

  getters: {
    // 计算详细地址
    detailAddress(state){
      const {provinceName,cityName,countyName,detailInfo} = state.address || {}
      return provinceName + cityName + countyName + detailInfo
    }
  }
}
