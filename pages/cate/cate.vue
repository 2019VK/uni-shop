<template>
  <view>
    <!-- 搜索部分 -->
      <my-search @click="goSearch"></my-search>
    <view class="scoll-view-container">
      <!-- 左侧滑动区 -->
      <scroll-view scroll-y="true" :style="{height: sysInfo.windowHeight +'px'}" class="left-scoll-view">
        <block v-for="(cate,index1) in cateList" :key="index1">
          <view :class="['left-scoll-view-item',active === index1?'active':'']" @click="changeActive(index1)">
            {{cate.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: sysInfo.windowHeight +'px'}" class="right-scoll-view" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view v-for="(cate2,index2) in catelevel2" :key="index2" class="cate-level2">
          <!-- 二级分类标题 -->
          <view class="cate-level2-title">/ {{cate2.cat_name}} /</view>
          <!-- 三级分类 -->
          <view class="cate-level3-list">
            <!-- 三级分类主体 -->
            <view class="cate-level3-item" v-for="(cate3,index3) in cate2.children" :key="index3" @click="goGoodsList(cate3)">
              <!-- 三级分类图 -->
              <image :src="cate3.cat_icon"></image>
              <!-- 三级分类文字 -->
              <text>{{cate3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 可用屏幕信息
        sysInfo: {
          screenWidth: 0,
          windowHeight: 0,
        },
        // 分类的数据
        cateList: [],
        // 当前分类索引
        active: 0,
        // 二级分类
        catelevel2: [],
        // 
        scrollTop:0,

      };
    },
    onLoad() {
      const {
        screenWidth,
        windowHeight
      } = uni.getSystemInfoSync()
      this.sysInfo.screenWidth = screenWidth
      this.sysInfo.windowHeight = windowHeight - 50
      this.getCateList()
    },
    methods: {
      // 获取分类数据
      async getCateList() {
        const res = await uni.$http.get('/api/public/v1/categories')
        if (res.data.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.data.message
        this.catelevel2 = res.data.message[0].children
      },
      // 改变二级分类
      changeActive(index) {
        this.active = index
        this.catelevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop===0.001?0:0.001
      },
      // 跳转三级列表
      goGoodsList(item){
        console.log(item);
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id 
        })
      },
      // 跳转search
      goSearch(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      }
    }
  }
</script>

<style lang="scss">
  .scoll-view-container {
    display: flex;

    .left-scoll-view {
      width: 120px;

      .left-scoll-view-item {
        background-color: #f7f7f7;
        line-height: 120rpx;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #fff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 60rpx;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-level2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-level3-list {
    display: flex;
    flex-wrap: wrap;
    
    .cate-level3-item {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      image{
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
  }
</style>
