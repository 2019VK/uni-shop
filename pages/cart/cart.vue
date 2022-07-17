<template>
  <view class="cart-container">
    <view v-if="cart.length !== 0">
      <!-- 收货地址 -->
      <my-address></my-address>
      <!-- 商品列表区域 -->
      <view class="cart-title">
        <!-- 左侧图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 右侧文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
      <!-- 循环渲染购物车信息 -->
      <uni-swipe-action>
        <block v-for="(goods,index) in cart" :key="index">
          <uni-swipe-action-item :right-options="options" @click="swiperItemClickhandler(goods)">
            <my-goods :goods="goods" radio="true" numberBox="true" @radio-change="radioChangeHandler"
              @num-change="numChange"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <!-- 结算 -->
      <my-settle></my-settle>
    </view>

    <!-- 空白购物车 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="empty-text">空空如也 ~</text>
    </view>
  </view>

</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 滑动删除配置项
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    computed: {
      // 读取计算属性
      ...mapState('Cart', ['cart']),
    },
    methods: {
      // 读取vuex方法
      ...mapMutations('Cart', ['updateRadio', 'updateGoodsCount', 'removeCartGoods']),
      // 处理商品选中
      radioChangeHandler(e) {
        this.updateRadio(e)
      },
      // 处理商品数量
      numChange(e) {
        this.updateGoodsCount(e)
      },
      // 处理滑动删除
      swiperItemClickhandler(goods) {
        this.removeCartGoods(goods)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .empty-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
