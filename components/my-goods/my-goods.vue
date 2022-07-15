<template>
  <view class="goods-item">
    <!-- 左侧图片 -->
    <view class="item-left">
      <image :src="goods.goods_small_logo || defaultImg" class="goods-img"></image>
    </view>
    <!-- 右侧盒子 -->
    <view class="item-right">
      <!-- 商品名称-->
      <view class="goods-name">{{goods.goods_name}}</view>
      <!-- 商品价格 -->
      <view class="goods-info">
        <view class="goods-price">￥ {{goods.goods_price | tofixed }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        // 默认图片地址
        defaultImg:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    // 接收商品信息
    props:['goods'],
    // 过滤器，将价格转换成两位小数
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;

    .item-left {
      margin-right: 5px;

      .goods-img {
        height: 100px;
        width: 100px;
        display: block;
      }
    }

    .item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 14px
      }

      .goods-info {
        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
