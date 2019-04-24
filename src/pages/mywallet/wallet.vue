<template>
  <div class="wallet" v-if="foundWalletBol">
    <myHeader  title="钱包">
    </myHeader>
    <div class="main">
      <div class="wallet_center">
        <div>
          <div class="wallet_center_icon"></div>
          <p>暂无钱包</p>
        </div>

      </div>
      <div class="btnBox">
        <router-link tag="div" :to="{
      path : '/foundWallet' ,
      query:{ wc_id : wcid  , wc_name :selectItem ,tabIndex : tabIndex}
      }" class="btn">创建钱包
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "wallet",
    components: {
      myHeader,
    },
    data() {
      return {
        wcid: this.$route.query.wc_id,
        selectItem: this.$route.query.wc_name,
        tabIndex: this.$route.query.tabIndex,
        foundWalletBol: false
      }
    },
    methods: {},
    created() {
      if (!this.$route.query.wc_id) {
        this.$router.push('/uuc_wallet');
      } else {
        this.foundWalletBol = true;
      }
      /*  //判断是否需要创建钱包地址
        getdata('/Wallet/iscreatewallet', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == 10000) {
            this.$router.push('/mywallet');
          } else {
            this.$vux.toast.text(res.data.message);
            this.foundWalletBol = true;
          }
        })*/
    }
  }
</script>

<style lang="less" scoped>
  .main {

    > .wallet_center {
      height: 40%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      >div{
        > .wallet_center_icon {
          width: 4rem;
          height: 4rem;
          background: url("imgs/icon-wallet.png") no-repeat center;
          background-size: 100%;
          margin:0 auto 2rem;
        }
        >p{
          color: #999;
          font-size: 1.2rem;

        }
      }

    }
    > .btnBox {
      height: 4rem;
      > .btn {
        height: 100%;
        width: 90%;
        margin: auto;
        background: linear-gradient(-270deg,#3567F9 0%, #6B9DFC 100%);
        border-radius: 3px;
        color: #fff;
        line-height: 4rem;
        text-align: center;
        font-size: 1.4rem;
      }
    }

  }


</style>
