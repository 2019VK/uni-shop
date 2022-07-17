<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullchecked"/><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedGoodsPrice}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters('Cart', ['checkedCount',
        'goodsTotal','checkedGoodsPrice'
      ]),
      isFullchecked() {
        return this.goodsTotal === this.checkedCount
      }
    },
    methods:{
      ...mapMutations('Cart',['updateAllGoodsState']),
      // 改变全选的状态
      changeAllState(){
        const newState = this.isFullchecked?1:2
        this.updateAllGoodsState(newState)
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-top: 1px solid #efefef;
    background-color: white;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {

      .amount {
        color: #c00000;
        font-weight: bold;
      }

    }

    .btn-settle {
      color: white;
      line-height: 50px;
      padding: 0 20px;
      background-color: #c00000;
      min-width: 100px;
      text-align: center;
    }
  }
</style>
