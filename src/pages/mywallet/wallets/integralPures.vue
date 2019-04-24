<template>
  <div class="movablePurse">
    <my-header title="通证钱包">
      <router-link tag="span" class="record" :to="{path:'/recordOfPurse',query:{purse:'integralPures'}}">
        记录
      </router-link>
    </my-header>
    <div class="main">
      <div class="movablePurse_top">
        <p>通证钱包余额</p>
        <p>{{initLockMoney.integral_money}}</p>
      </div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="showData"  :dateType="dateType"/>
      </ul>
      <div class="transaction_record_box_btn">
        <p @click="showActToInte" class="move_link">从活动钱包划转</p>
      </div>
    </div>
    <actToInte @hideActToLock="hideActToLock" :showBol="ActToLockObject"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import actToInte from '@/components/myWallet/actToInte.vue'

  import {getdata} from '@/services/mining.js'

  export default {
    name: "integralPures",
    components: {
      myHeader,
      puresRecord,
      actToInte,
    },
    data() {
      return {
        ActToLockObject: {
          'ActToLockShowBol': false,
          'money': '0',
          'price': '',
        },

        //列表记录数据
        showData: [],

        //初始化用户数据
        initLockMoney: '',

        showMovToOtherTran: false,

        //数据表对应的状态说明
        dateType: {
          typeon: '释',
          typeto: '战',
          typest: '划',
          typefo: '购',
          typeonText: '资产收益释放',
          typetoText: '战绩收益',
          typestText: '活动钱包划转',
          typefoText: '商城购物',
        },
      }
    },
    methods: {
      //隐藏弹出框
      // ActToLockObject.ActToLockShowBol=true
      showActToInte() {
        getdata('/Supernode/usableExchangeIntegralInit', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          if (res.data.code == 10000) {
            this.ActToLockObject.money = res.data.result.userInfo.usable_money;
            this.ActToLockObject.price = res.data.result.userInfo.price;
            this.ActToLockObject.ActToLockShowBol = true
          }else {
            this.$vux.toast.text(res.data.message)
          }
        });

      },


      hideActToLock(bol) {
        this.ActToLockObject.ActToLockShowBol = false;
        //如有数据操作，更新页面数据
        if (bol) {
          this.getInitIntegralMoney()
        }
      },

      hidemovToOtherTran(bol) {
        this.showMovToOtherTran = false;
        this.getInitIntegralMoney()

      },

      //获取初始数据
      getInitIntegralMoney() {
        getdata('/Supernode/initIntegralMoney', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initLockMoney = res.data.result.userInfo;
            this.showData = res.data.result.logList;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          console.log(error);
          this.$vux.loading.hide();
        })
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitIntegralMoney()
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {
    text-align: center;
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
  }

  .movablePurse_top {
    box-sizing: border-box;
    height: 12rem;
    width: 100%;
    background-color: #1d212d;
    padding: 1rem;
    color: #9fa1b0;

    > p {
      line-height: 4rem;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:nth-child(2) {
        font-size: 2.2rem;
        color: #dbba53;
      }
    }
  }

  .transaction_record_box {
    position: absolute;
    top: 15rem;
    left: 0;
    right: 0;
    bottom: 4rem;
    overflow-y: scroll;
  }

  .transaction_record_box_btn {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    background-color: #2baf76;
    line-height: 4rem;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    > p {
      flex: 1;
    }
    > .move_link {
      background-color: #13c4ed;
    }
  }
</style>
