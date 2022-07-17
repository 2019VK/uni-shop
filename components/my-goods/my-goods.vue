<template>
  <view class="goods-item">
    <!-- 左侧盒子 -->
    <view class="item-left">
      <radio :checked="isChecked" color="#c00000" v-if="radio" @click="radioCahnge"></radio>
      <image :src="goods.goods_small_logo || defaultImg" class="goods-img"></image>
    </view>
    <!-- 右侧盒子 -->
    <view class="item-right">
      <!-- 商品名称-->
      <view class="goods-name">{{goods.goods_name}}</view>
      <!-- 商品价格、数量 -->
      <view class="goods-info">
        <!-- 商品价格 -->
        <view class="goods-price">￥ {{goods.goods_price | tofixed }}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :max="99" :value="goods.goods_count" v-if="numberBox" @change="numChangeHandler"></uni-number-box>
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
    computed:{
      isChecked(){
        return this.goods.goods_state==2?true:false
      }
    },
    // 接收商品信息
    // props:['goods','radio'],
    props:{
      goods:{
        type:Object,
        default:{},
      },
      radio:{
        type:Boolean,
        default:false,
      },
      numberBox:{
        type:Boolean,
        default:false,
      },
    },
    // 过滤器，将价格转换成两位小数
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
      radioCahnge(){
        const goods_state = this.goods.goods_state===2?1:2
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:goods_state
          })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:val-0
        })
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
      display: flex;
      align-items: center;
      justify-content: space-between;

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
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price {
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>
