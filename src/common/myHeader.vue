<template>
  <header>
    <span class="back" v-show="gobackShowBol" @click="goback"></span>
    <h2>{{title}}</h2>
    <slot></slot>
  </header>
</template>
<script>
  import {hidebottom, exitpage, showbottom, getCookie} from "@/utils/tool";

  export default {
    name: "myHeader",
    //标题
    props: ['title'],
    data() {
      return {
        gobackShowBol: true
      }
    },
    methods: {
      //返回方法
      goback() {
        if (this.$route.name == 'withdrawMoney' || this.$route.name == 'chargeMoney') {
          this.$router.isBack = true;
          this.$router.push({
            path: '/uuc_wallet',
            query: {
              e: 1
            }
          });
        } else if (this.$route.name == 'purse' ||
          this.$route.name == 'receiveAwards' ||
          this.$route.name == 'ifnnum' ||
          this.$route.name == 'myCommunity'||
          this.$route.name == 'information'
        ) {
          this.finish();
        } else if (this.$route.name == 'detailedRecord') {
          if (this.$route.query.p) {
            this.$router.goBack();
          } else {
            this.finish();
          }
        } else {
          this.$router.goBack();
        }
      },
      //隐藏底部
      hidebottom() {
        hidebottom()
      },
      //显示底部
      showbottom() {
        showbottom()
      }
    },
    created() {
      window.goback = this.goback;
      const router_name = this.$route.name;
      this.hidebottom();
      if (
        router_name === 'foundWalletSuc' ||
        router_name === 'foundWallet') {
        this.gobackShowBol = false
      } else {
        this.gobackShowBol = true
      }
    }
  };
</script>

<style lang="less" scoped>
  header {
    height: 46px;
    width: 100%;
    background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
    position: fixed;
    top: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    color: #fff;
    line-height: 46px;

  }

  header > h2 {
    line-height: 46px;
    font-size: 1.5rem;
    font-weight: 500;
  }

  .add_icon {
    display: inline-block;
    width: 2rem;
    background: url("../assets/add_icon.png") no-repeat center;
    margin: .5rem;
    box-sizing: border-box;
    position: absolute;
    right: .5rem;
    top: 0;
    bottom: 0;
  }

  .back {
    position: absolute;
    left: .5rem;
    width: 3rem;
    height: 100%;
    background: url("../assets/back_icon.png") no-repeat center;
    background-size: 60%;
  }
</style>
