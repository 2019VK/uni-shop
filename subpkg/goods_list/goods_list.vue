<template>
  <view>
    <view class="goods-list">
      <!-- 遍历渲染商品列表 -->
      <view v-for="(goods,index) in goodsList" :key="index" @click="goDetail(goods)">
        <my-goods :goods = "goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数
        queryObj:{
          query:'',
          cid:'',
          page:1,
          pagesize:10
        },
        // 商品列表
        goodsList:[],
        // 商品总数
        total:0,
        // 默认图片地址
        defaultImg:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 节流器，是否在加载
        isLoading:false
      }
    },
    // 初始化拿到数据
    onLoad(option) {
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      // 向服务器请求数据
      async getGoodsList(cb){
        // 开节流标识
        this.isLoading = true
        const res = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // 请求完毕，关节流标识
        this.isLoading = false
        // 短路看是否执行回调函数关闭下拉刷新
        cb && cb()
        // 请求成功之后的赋值
        if(res.data.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList,...res.data.message.goods]
        this.total = res.data.message.total
      },
      // 跳转详情页面
      goDetail(goods){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    // 触底刷新
    onReachBottom() {
      // 判断是否请求完成
      if(this.goodsList.length >= this.total) return uni.$showMsg('数据加载完毕')
      // 判断是否在加载中
      if(this.isLoading) return
      // 页码值自增加一
      this.queryObj.page++
      // 重新发起请求
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.page = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      // 重新发起请求
      this.getGoodsList(()=> uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss" scoped>

</style>
