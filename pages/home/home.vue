<template>
  <view>
    <!-- 轮播图部分 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="swiper in swiperList" :key="swiper.goods_id">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${swiper.goods_id}`">
          <image :src="swiper.image_src" mode="widthFix"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 中间nav导航部分 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(nav,index) in navList" :key="index" @click="navHandler(nav.name)">
        <image :src="nav.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层部分 -->
    <view class="floor-list">
      <!-- 每一个楼层的item项 -->
      <view class="floor-item" v-for="(floor,index) in floorList" :key="index">
        <!-- 楼层的标题 -->
        <image :src="floor.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧图 -->
          <navigator class="left-imgs" :url="floor.product_list[0].url">
            <image :src="floor.product_list[0].image_src" :style="{width:floor.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧图片 -->
          <view class="right-imgs">
            <navigator v-for="(item,index) in floor.product_list.slice(1,5)" :key="index" :url="item.url">
              <image :src="item.image_src" mode="widthFix" :style="{width:item.image_width + 'rpx'}"></image>
            </navigator>            
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据
        swiperList:[],
        // 中间nav导航数据
        navList:[],
        // 楼层数据
        floorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      // 请求轮播图数据
      async getSwiperList(){
        const res = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.data.meta.status !== 200){
          return uni.$showMsg()
        }
        this.swiperList = res.data.message
      },
      // 请求nav数据
      async getNavList(){
        const res = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.data.meta.status !== 200){
          return uni.$showMsg()
        }
        this.navList = res.data.message
      },
      // 请求楼层数据
      async getFloorList(){
        const res = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.data.meta.status !== 200){
          return uni.$showMsg()
        }
        // 对数据进行处理
        res.data.message.forEach(
          floor => {
            floor.product_list.forEach(
              prod => {
                prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
              })
          })
        this.floorList = res.data.message
      },
      navHandler(name){
        if(name === '分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  width: 100%;
  height: 60rpx;
}

.floor-img-box {
  display: flex;
  
  .right-imgs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
