<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索" :focus="true">
      </uni-search-bar>
    </view>
    <!-- 搜索建议栏 -->
    <view class="sugg-list" v-if="searchRec.length !== 0">
      <view class="sugg-item" v-for="sugg in searchRec" :key="sugg.goods_id" @click="goDetail(sugg.goods_id)">
        <view class="goods-name">{{sugg.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="his" v-for="(his,index) in historyList" :key="index" @click="goGoodsList(his)"></uni-tag>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyword: '',
        searchRec:[],
        historyList:[]
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('keyword')) || []
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyword = e
          this.getSearchRec()
        }, 500)
      },
      async getSearchRec() {
        if(this.keyword == ''){
          this.searchRec = []
          return 
        }
        const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyword
        })
        if(res.data.meta.status !== 200) return uni.$showMsg()
        this.searchRec = res.data.message
        this.saveSearchHistory()
      },
      goDetail(id){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goosid=' + id
        })
      },
      saveSearchHistory(){
        const index = this.historyList.indexOf(this.keyword)
        if(index !== -1){
          this.historyList.splice(index,1)
        }
        this.historyList.unshift(this.keyword)
        uni.setStorageSync('keyword',JSON.stringify(this.historyList))
      },
      cleanHistory(){
        this.historyList = []
        uni.setStorageSync('keyword','[]')
      },
      goGoodsList(keyword){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + keyword
        })
      }
    },

    beforeDestroy() {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

    .uni-searchbar {
      background-color: #c00000 !important;
    }
  }
  
  .sugg-list {
    padding: 0 5px;
    .sugg-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
      }
    }
  }
  
  .search-history {
    padding: 0 5px;
    .history-title{
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      .uni-tag {
        line-height: 40px;
        color: #333 !important;
        margin-right: 5px;
        background-color: #e3e4e5;
        border: none;
        padding: 5px 10px !important;
      }
    }
  }
</style>
