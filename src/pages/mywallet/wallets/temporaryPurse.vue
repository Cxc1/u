<template>
  <div class="temporaryPurse">
    <my-header title="兑换资产">
      <router-link tag="span" :to="{path:'/recordOfPurse',query:{purse:'temporaryPurse'}}" class="record">记录
      </router-link>
    </my-header>
    <div class="main">
      <div class="movablePurse_top">
        <p>兑换资产余额 (UUC)</p>
        <p>{{initTempMoney.exchange_money}}</p>
      </div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="moneyTempList"/>
      </ul>
      <div class="move_link">
        <p @click="showtemToOther()" v-if="false">转到他人兑换资产</p>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import temToAnL from '@/components/myWallet/temToAnL.vue'
  import toOtherTran from '@/components/myWallet/toOtherTran.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import {getdata_u} from "@/services/mining";
  import {AlertModule} from 'vux'

  export default {
    name: "lockPurse",
    components: {
      myHeader,
      temToAnL,
      toOtherTran,
      puresRecord
    },
    data() {
      return {

        //转到资产包弹出框
        temToAnLShowBol: false,

        //转到其他用户临时包弹出框
        showtemToOtherBol: false,

        //最近交易记录数据
        showData: [],

        //上拉加载更多数据
        loading: false,

        //默认获取第1 页数据
        page: 1,

        //默认每页加载5 条数据
        pageDatas: 5,

        //列表数据
        moneyTempList: [],

        //删除的数据下标（弃）
        eleIndex: '',

        //
        initTempMoney: ''
      }
    },
    methods: {
      //隐藏转到资产包弹框
      hideTemToL(bol) {
        this.temToAnLShowBol = false;
        //操作数据时重新获取数据
        if (bol) {
          this.getInitTempMoney()
        }
      },


      //隐藏向其他人临时包转账弹框
      hideToOtherTran(bol) {
        this.showtemToOtherBol = false;
        //数据操作时，重新获取
        if (bol) {
          this.getInitTempMoney()
        }
      },


      //显示转账从临时钱包转到锁仓钱包框，并把对象传过去
      showtemToL() {
        this.temToAnLShowBol = true
      },


      //显示转账从临时钱包对方临时钱包框，并把对象传过去
      showtemToOther() {

        this.$router.push({
          path: '/transfer',
          query: {transfer_type: 3}
        });
        // AlertModule.show({
        //   title: '友情提示',
        //   content: '转账功能暂未开放',
        //   onHide() {
        //   }
        // })
      },

      getMoneyTempList() {
        getdata_u('/Transfer/getExchangeLog', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.moneyTempList = res.data.result

          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


// 获取页面初始数据
      getInitTempMoney() {
        getdata_u('/Transfer/uucMoneyInit', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initTempMoney = res.data.result
          } else {
            this.$vux.toast.text(res.data.message)
          }
          this.getMoneyTempList();
        })
      },
    },


    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitTempMoney();
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");


  .movablePurse_top {
    box-sizing: border-box;
    height: 12rem;
    width: 100%;
    background: linear-gradient(#DBBA53, #D77D34);
    padding: 1rem;
    color: #fff;
    text-align: center;
    > p {
      line-height: 4rem;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.4rem;
      &:nth-child(2) {
        font-size: 2.2rem;
        color: #fff;
      }
    }
  }

  .transaction_record_box {
    position: absolute;
    top: 15rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }

  .record {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    padding: 0 1rem;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 14px;
    color: #DBBA53;
  }

  .move_link {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    line-height: 4rem;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    > p {
      flex: 1;
      background-color: #DBBA53;
      text-align: center;
    }
  }
</style>
