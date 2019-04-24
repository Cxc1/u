<template>
  <div class="foundWallet">
    <myHeader title="创建钱包">
    </myHeader>
    <div class="main">

    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "foundWallet",
    components: {
      myHeader,
    },
    data() {
      return {}
    },
    methods: {},
    created() {
      this.$vux.loading.show({text: '创建中...'});
      //创建钱包接口请求
      getdata('/Wallet/createwalletbywcid', {
        token: this.$token,
        mark: this.$mark,
        wcid: this.$route.query.wc_id
      }).then(res => {
        this.$vux.loading.hide();
        if (res.data.code == 10000) {
          this.$router.push({
            path: '/foundWalletSuc',
            query: {
              wc_id: this.$route.query.wc_id,
              wc_name: this.$route.query.wc_name,
              tabIndex: this.$route.query.tabIndex
            }
          });
        } else {
          this.$vux.toast.text(res.data.message);
          let setId = setTimeout(() => {
            this.$router.go(-1);
            clearTimeout(setId)
          }, 1000)
        }
      })
    }
  }
</script>

<style lang="less" scoped>



</style>
