<template>
  <view>
    <!-- 选择收货的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 显示收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <!-- 第一行收件人信息 -->
      <view class="row1">
        <!-- 左侧姓名 -->
        <view class="roew1-left">
          <view class="user-name">收货人：{{address.userName}}</view>
        </view>
        <!-- 右侧电话 -->
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <!-- 第二行地址信息 -->
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-left">{{detailAddress}}</view>
      </view>
    </view>

    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import { mapState,mapMutations,mapGetters } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        // address:{}
      };
    },
    computed:{
      ...mapState('User', ['address']),
      ...mapGetters('User',['detailAddress'])
    },
    methods:{
      ...mapMutations('User',['updateAddress']),
      // 选择地址
      async chooseAddress(){
        const [err,succ] = await uni.chooseAddress().catch(err => err)
        if(err == null && succ.errMsg === "chooseAddress:ok"){
          this.updateAddress(succ)
          // console.log(this.address);
        }
      }
    }
  }
</script>

<style lang="scss">
  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    // 第一行
    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    // 第二行
    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }
</style>
