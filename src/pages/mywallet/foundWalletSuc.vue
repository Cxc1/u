<template>
  <div class="foundWalletSuc">
    <myHeader title="创建成功">
      <router-link tag="span" :to="{
      path : '/chargeMoney' ,
      query:{ wc_id : wcid  , wc_name :selectItem ,tabIndex : tabIndex}
      }" class="right_icon">完成
      </router-link>
    </myHeader>
    <div class="main">
      <div class="result_box">
        <div class="result_box_icon"></div>
        <p class="result_state">创建成功</p>
        <p class="explain">您已成功创建钱包 </p>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "foundWalletSuc",
    components: {
      myHeader,
    },
    data() {
      return{
        wcid: this.$route.query.wc_id,
        selectItem : this.$route.query.wc_name,
        tabIndex : this.$route.query.tabIndex,
      }
    },
    created() {
      this.$vux.loading.hide()
    }
  }
</script>

<style lang="less" scoped>


  .result_box {
    position: absolute;
    top: 10%;
    height: 12rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    > .result_box_icon {
      width: 5rem;
      height: 5rem;
      margin: auto;
      border-radius: 50%;
      background: url("imgs/suc_icon.png") no-repeat center;
      background-size: 100%;
    }
    > .result_state {
      height: 3rem;
      line-height: 3rem;
      color: #839cc5;
      font-weight: bolder;
    }
    > .explain {
      color: #647693;
      line-height: 2rem;
    }
  }
</style>
