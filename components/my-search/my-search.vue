<template>
  <view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchHandler">
    <view class="my-search-box" :style="{'border-radius': redius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">{{text}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props:{
      // 背景颜色
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      // 圆角
      redius:{
        type:Number,
        default:18
      },
      // 搜索框文字
      text:{
        type:String,
        default:'搜索'
      }
    },
    methods:{
      searchHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
.my-search-container {
  height: 50px;
  // background-color: #C00000;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  .my-search-box {
    background-color: #fff;
    // border-radius: 18px;
    width: 100%;
    // margin: 7px 10px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
</style>