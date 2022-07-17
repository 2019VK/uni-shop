  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('Cart', ['total'])
    },
    watch:{
      total(){
        this.setBadge();
      }
    },
    methods: {
      // 给tabbar设置数字角标
      setBadge() {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      }
    },
    // 在生命周期函数中调用显示数字角标
    onShow() {
      this.setBadge()
    }
  }
