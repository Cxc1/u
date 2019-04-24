<template>
  <div class="chargeMoney">
    <myHeader :title="wc_name">
      <span class="record" @click="showToOtherTran" v-show="false">从资产导入</span>
    </myHeader>
    <div class="main">
      <div class="user">
        <p>
          <span>

          </span>
        </p>
        <p>用户ID：<span>{{user_id}}</span></p>
      </div>
      <div class="address_box">
        <p>
          <span>钱包地址：</span>
          <span>{{addressUrl}}</span>
        </p>
        <p>
          <img
            :src="`${api}/Wallet/walletqrcode?token=${this.$token}&mark=${this.$mark}&wcid=${this.$route.query.wc_id}`">
        </p>

        <p>
          <button v-clipboard:copy="addressUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">
            复制钱包地址
          </button>
        </p>
      </div>
      <router-link tag="div" :to="{path : '/accountBook' ,query:{ wc_id : this.$route.query.wc_id}}"
                   class="accountBook">
        <span></span>
        <span>账本</span>
        <span>每笔交易都记录在这里</span>
        <span></span>
      </router-link>
      <div  @click="towithd" class="withdrawMoney">
        <span></span>
        <span>提币</span>
        <span>将{{this.$route.query.wc_name}}转出到其他地址 </span>
        <span></span>
      </div>
    </div>
    <leadingIn @hideToOtherTran="hideToOtherTran" :ToOtherTranShow="ToOtherTranShow"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdataBz} from "@/services/mining";
  import leadingIn from '@/components/myWallet/leadingIn';
  import {AlertModule} from 'vux'
  import API from '@/api'

  export default {
    name: "chargeMoney",
    components: {
      myHeader,
      leadingIn,
    },
    data() {
      return {
        //钱包地址
        addressUrl: '',
        //二维码路径
        api: API.URL,
        //用户id
        user_id: '',
        //隐藏导入框
        ToOtherTranShow: false,
        //币种id
        wc_id: this.$route.query.wc_id,
        //币名
        wc_name: this.$route.query.wc_name,
      }
    },
    methods: {
      towithd() {
        if (this.wc_name == 'UUC') {
          AlertModule.show({
            content: 'UUC提币功能暂时关闭',
            onHide() {

            }
          })
        } else {
          this.$router.push({
            path: '/withdrawMoney',
            query: {wc_id : this.$route.query.wc_id}
          });
        }
      },

      //复制的方法
      onCopy: function (e) {
        this.$vux.toast.show({
          text: '复制成功',
          width: '9.5rem',
          type: 'success',
        })
      },
      onError: function (e) {
        this.$vux.toast.show({
          text: '复制失败',
          width: '9.5rem',
          type: 'cancel',

        })
      },



      //隐藏导入框
      hideToOtherTran() {
        this.ToOtherTranShow = false;
      },


      //显示导入框
      showToOtherTran() {
        this.ToOtherTranShow = true;
      }
    },
    created() {

      //获取页面数据
      getdataBz('/Wallet/getusersaddress', {
        token: this.$token,
        mark: this.$mark,
        wcid: this.wc_id,
      }).then(res => {
        if (res.data.code == 10000) {
          this.addressUrl = res.data.result.wa_address;
          this.user_id = res.data.result.wa_user_id
        } else {
          this.$vux.toast.text(res.data.message)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .record {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    padding: 0 1rem;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 14px;
  }

  .main {
    >.user{
      display: flex;
      width: 85%;
      height: 6rem;
      background-color: #fff;
      margin: 1rem auto;
      border-radius: 3px;
      >p{
        flex: 1;
        line-height: 6rem;
        font-size: 1.4rem;
        >span{
          font-weight: bolder;
        }
        &:nth-child(1){
          max-width: 6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          >span{
            display: inline-block;
            width: 4rem;
            height: 4rem;
            background: url("imgs/user_img.png") no-repeat center;
            background-size: 100%;
          }
        }
      }
    }
    > .address_box {
      height: 30rem;
      width: 85%;
      background-color: #fff;
      margin: auto;
      margin-bottom: 2rem;
      padding: 1rem;
      box-sizing: border-box;
      text-align: center;
      border-radius: 3px;
      > p {
        height: 6rem;
        line-height: 3rem;
        overflow-x: scroll;
        font-size: 1.4rem;
        &:nth-child(1) {
          color: #222;
          >span{
            display: block;
            width: 100%;
            font-size: 1.2rem;
            text-align: left;
            line-height: 3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            &:nth-child(1){
              font-size: 1.4rem;
              font-weight: bolder;

            }
          }
        }
        &:nth-child(2) {
          height: 16rem;
          width: 20rem;
          margin: auto;
          > img {
            display: inline-block;
            width: 15rem;
            height: 15rem;
          }
        }
        &:nth-child(3) {
          height: 5rem;
          line-height: 2rem;
        }

        > button {
          border-radius: 2rem;
          border: none;
          outline: none;
          width: 15rem;
          height: 4rem;
          color: #fff;
          background: linear-gradient(-270deg,#3567F9 0%, #6B9DFC 100%);
          &:active {
            opacity: .8;
          }
        }
      }
    }
    > .accountBook, .withdrawMoney {
      height: 5rem;
      width: 100%;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,0.10);
      padding: 1rem;
      line-height: 3rem;
      box-sizing: border-box;
      > span {
        display: inline-block;
        float: left;
        &:nth-child(1) {
          width: 3rem;
          height: 100%;

          border-radius: 50%;
        }
        &:nth-child(2) {
          margin: 0 1rem;
          font-size: 1.3rem;
          color: #000;
        }
        &:nth-child(3) {
          color: #999;
        }
        &:nth-child(4) {
          width: 3rem;
          height: 100%;
          float: right;
          background: url("imgs/user_icon_getin.png") no-repeat right;
          background-size: 30%;
        }
      }
    }
    .accountBook {
      > span:nth-child(1) {
        background: url("imgs/xiugai.png") no-repeat center;
        background-size: 100%;
      }
    }
    .withdrawMoney {
      > span:nth-child(1) {
        background: url("imgs/withdrawMoney.png") no-repeat center;
        background-color: #2a8edb;
        background-size: 60%;
      }
    }
  }
</style>
