<template>
  <div class="assetsTransfer">
    <my-header title="战绩钱包转账">
    </my-header>
    <div class="main">
      <div class="transfer_box">
        <router-link tag="div" :to="{path : '/withholding',query:{purse : 1}}" class="transfer_item" >
          转到他人资产包
          <span></span>
        </router-link>
<!--toSelfLock-->
        <router-link tag="div" :to="{path : '/withholding',query:{purse : 2}}" class="transfer_item">
          转到他人战绩钱包
          <span></span>
        </router-link>
        <router-link tag="div" :to="{path : '/withholding',query:{purse : 3}}" class="transfer_item">
          转到我的资产包
          <span></span>
        </router-link>
      </div>


    </div>

  </div>

</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "assetsTransfer",
    components: {
      myHeader,
    }
  }
</script>

<style lang="less" scoped>
  .main {
    > .transfer_box {
      > .transfer_item {
        height: 4rem;
        width: 100%;
        padding: 0 1rem;
        margin-bottom: .5rem;
        font-size: 1.4rem;
        line-height: 4rem;
        box-sizing: border-box;
        color: #b9c7d5;
        text-indent: 1rem;
        &:nth-last-child(1) {
          margin-top: 2rem;
        }
        > span {
          width: 2rem;
          height: 2rem;
          padding: 1rem 0;
          float: right;
          background: url("../imgs/next_icon.png") no-repeat center;
        }
      }
    }

  }
</style>
