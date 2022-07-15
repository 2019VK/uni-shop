<template>
  <view v-if="goodsInfo.goods_name" class="goods-detail-container">
    <!-- 轮播图部分 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(pic,index) in goodsInfo.pics" :key="index">
        <image :src="pic.pics_big_url" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息部分 -->
    <view class="goods-info-container">
      <!-- 商品价格 -->
      <view class="goods-price">￥{{goodsInfo.goods_price}}</view>
      <!-- 商品信息区域 -->
      <view class="goods-info-body">
        <!-- 商品名字 -->
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <!-- 收藏 -->
        <view class="goods-favo">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="shipping-fee">快递：免运费</view>
      <!-- 图片详情 -->
      <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
      <!-- 底部导航区 -->
      <view class="goods-nav">
        <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
          @buttonClick="buttonClick"></uni-goods-nav>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 存储商品信息
        goodsInfo: {},
        // goodsNav配置项
        options: [{
          icon: 'shop',
          text: '店铺',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    // 初始化商品信息
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsInfo(goods_id)
    },
    methods: {
      // 向服务器发请求，获取商品信息
      async getGoodsInfo(goods_id) {
        const res = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.data.meta.status !== 200) return uni.$showMsg()
        res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
          '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goodsInfo = res.data.message
      },
      // 预览图片
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsInfo.pics.map(x => x.pics_big_url)
        })
      },
      // 跳转购物车界面
      onClick(e) {
        console.log(e);
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goods-detail-container {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-container {
    padding: 10px;
    padding-right: 0;

    .goods-price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .goods-favo {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .shipping-fee {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
