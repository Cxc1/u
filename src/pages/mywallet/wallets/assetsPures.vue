<template>
  <div class="assetsPures">
    <my-header title="战绩钱包">
      <router-link tag="span" :to="{path:'/recordOfPurse',query:{purse:'assetsPures'}}" class="record">记录</router-link>
    </my-header>
    <div class="main" id="captcha">
      <ul class="assetsPures_top">

        <p>战绩钱包余额 (LTCC)</p>
        <p>{{initLockMoney.record_money}}</p>
      </ul>
      <div class="assetsPures_top_btn" v-if="false" id="releaseToMov" :class="{myActive : !btnBol}">{{btnText}}<span
        v-show="!btnBol"></span></div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="showData" :dateType="dateType"/>
      </ul>
      <div class="move_link">
        <p @click="showassetsToUser">转 账</p>
      </div>
    </div>

  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import {getdata} from '@/services/mining.js'

  export default {
    name: "assetsPures",
    components: {
      myHeader,
      puresRecord,
    },
    data() {
      return {

        //数据列表
        showData: '',

        //初始化数据
        initLockMoney: '',


        //数据表对应的状态说明
        dateType: {
          typeon: '战',
          typeto: '出',
          typest: '出',
          typefo: '入',
          typefi: '资',
          typesi: '战',

          typese: '释',
          // typeei : '扣',
          typeonText: '战绩钱包收益手动释放',
          typetoText: '转出到其他用户资产包',
          typestText: '转出其他用户战绩钱包',
          typefoText: '其他用户转入',
          typefiText: '转到资产包',
          typesiText: '战绩收益',
          typeseText: '从资产包释放',
          // typeeiText: '后台扣除',
        },
      }
    },
    methods: {
      //释放收益
      showassetsToUser(){
        this.$router.push('/assetsTransfer');
      },
      getInitLockMoney() {
        //加载初始数据
        getdata('/Supernode/initRecordMoney', {
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
        })
      },


    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitLockMoney();
    },
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {
    > .assetsPures_top_btn {
      height: 4rem;
      color: #fff;
      background-color: #dbba53;
      line-height: 4rem;
      text-align: center;
      font-size: 1.4rem;
      position: relative;
      opacity: 1;
      &.myActive {
        opacity: .7;
      }
      > span {
        display: inline-block;
        height: 2.5rem;
        width: 2.5rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: url("imgs/off.png") no-repeat center;
        background-size: 100%;
        border-radius: 50%;
      }
    }
    .assetsPures_top {
      box-sizing: border-box;
      height: 12rem;
      width: 100%;
      background-color: #1d212d;
      padding: 1rem;
      color: #9fa1b0;
      text-align: center;
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
    /*> .assetsPures_top {*/
      /*width: 100%;*/
      /*height: 11rem;*/
      /*background-color: #1d212d;*/
      /*padding: 1rem;*/
      /*box-sizing: border-box;*/
      /*> li {*/
        /*color: #9fa1b0;*/
        /*font-size: 1.2rem;*/
        /*height: 5rem;*/
        /*display: flex;*/
        /*> div {*/
          /*flex: 1;*/
          /*overflow: hidden;*/
          /*white-space: nowrap;*/
          /*&:nth-child(2) {*/
            /*text-indent: 1rem;*/
          /*}*/
          /*> p {*/
            /*height: 2.5rem;*/
            /*line-height: 2.5rem;*/
            /*&:nth-child(2) {*/
              /*line-height: 1.5rem;*/
              /*height: 1.5rem;*/
              /*color: #dbba53;*/
            /*}*/
            /*> span {*/
              /*color: #dbba53;*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
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

  .temporaryPurse_top {
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

  .money_number {
    height: 3rem;
    line-height: 3rem;
    color: #9fa1b0;
    padding: 0 1rem;
    background-color: #1d212d;
    margin-top: 1px;
    > span {
      font-size: 1.4rem;
      display: inline-block;
      color: #ee4e4e;
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

  .move_link {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    line-height: 4rem;
    color: #fff;
    font-size: 1.4rem;
    display: flex;
    text-align: center;
    > p {
      flex: 1;
      background-color: #54aadb;
      position: relative;
      &:nth-child(1) {
        background-color: #dbba54;
      }
      &:nth-child(2) {
        > span {
          display: inline-block;
          height: 2.5rem;
          width: 2.5rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          background: url("../Supernode/imgs/off.png") no-repeat center;
          background-size: 100%;
          border-radius: 50%;
        }
        &.myActive {
          opacity: 1;
        }
      }
    }
  }
</style>
