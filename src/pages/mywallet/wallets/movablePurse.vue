<template>
  <div class="movablePurse">
    <my-header title="战绩钱包">
      <router-link tag="span" class="record" :to="{path:'/recordOfPurse',query:{purse:'movablePurse'}}">
        记录
      </router-link>
    </my-header>
    <div class="main">
      <div class="movablePurse_top">
        <p>战绩钱包余额 (UUC)</p>
        <p>{{initLockMoney.flow_money}}</p>
      </div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box" :class="{btm_0 : !toSelfWallet_show&&!toOther_show}">
        <puresRecord :showData="showData"/>
      </ul>
      <div class="transaction_record_box_btn" v-if="toSelfWallet_show||toOther_show">
        <p class="move_other" @click="toSelfWallet" v-if="toSelfWallet_show">转到流通钱包</p>
        <p class="move_other" @click="toOther" v-if="toOther_show">战绩钱包互转</p>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'

  import {getdata_u} from '@/services/mining.js'
  import {AlertModule} from 'vux'

  export default {
    name: "movablePurse",
    components: {
      myHeader,
      puresRecord,
    },
    data() {
      return {

        toSelfWallet_show: false,
        toOther_show: false,

        //列表记录数据
        showData: [],

        //初始化用户数据
        initLockMoney: '',


        //数据表对应的状态说明

      }
    },
    methods: {

      toSelfWallet() {
        this.$router.push({
          path: '/movToUuc',
        });
      },
      toOther() {
        this.$router.push({
          path: '/transfer',
          query: {transfer_type: 2}
        });
      },

      getMoneyTempList() {
        getdata_u('/Transfer/getFlowLog', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.showData = res.data.result
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },
      //获取初始数据
      getInitUsableMoney() {
        getdata_u('/Transfer/uucMoneyInit', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initLockMoney = res.data.result;
            this.toSelfWallet_show = this.initLockMoney.flow_to_usable_switch == 1 ? true : false;
            this.toOther_show = this.initLockMoney.flow_transfer_switch == 1 ? true : false;
          } else {
            this.$vux.toast.text(res.data.message)
          }
          this.getMoneyTempList()
        }).catch(error => {
          this.$vux.loading.hide();
        })
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitUsableMoney()
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {
    text-align: left;
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
    color: #fff;
  }

  .movablePurse_top {
    box-sizing: border-box;
    height: 12rem;
    width: 100%;
    background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
    padding: 1rem;
    color: #fff;

    > p {
      line-height: 4rem;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.2rem;
      &:nth-child(2) {
        font-size: 3rem;
        color: #fff;
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
    &.btm_0{
      bottom: 0;
    }
  }

  .transaction_record_box_btn {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
    line-height: 4rem;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    text-align: center;
    > p {
      flex: 1;
      &:nth-child(2) {
        background: linear-gradient(-225deg, #6950FB 0%, #B739F3 100%);
      }
    }
  }
</style>
