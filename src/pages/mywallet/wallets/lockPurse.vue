<template>
  <div class="lockPurse">
    <my-header title="资产包">
      <router-link tag="span" :to="{path:'/recordOfPurse',query:{purse:'lockPurse'}}" class="record">记录</router-link>
    </my-header>
    <div class="main">
      <addAnimation></addAnimation>
      <ul class="lockPurse_top">
        <li  v-if="false">
          <div>
            <p>当前资产包日释放</p>
            <p>{{initLockMoney.free_rate}}‰</p>
          </div>
          <div v-if="false">
            <p>当前资产日化收益率</p>
            <p>{{initLockMoney.daily_rate}}‰</p>
          </div>
        </li>
        <li>
          <div>
            <p>累计收益 <span>（LTCC）</span></p>
            <p>{{initLockMoney.total_money}}</p>
          </div>
          <div>
            <p>今日收益<span>（LTCC）</span></p>
            <p>{{initLockMoney.today_money}}</p>
          </div>
        </li>
      </ul>
      <div class="money_number">资产包余额：<span>{{initLockMoney.lock_money}}LTCC</span></div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="showData" :dateType="dateType"/>
      </ul>
      <div class="move_link">
        <p @click="showToLock">转入 / 转出</p>
        <p @click="showToActive" :class="{myActive : btnBol}">{{btnText}}
          <span v-show="!btnBol"></span>
        </p>
      </div>
    </div>
    <toLock @hideToLock="hideToLock" :initLockMoney="initLockMoney" :showBol="ToLockShowBol"/>
    <toActive @hideToActive="hideToActive" :showBol="toActiveShowBol"
              :moneyNum="initLockMoney.today_money" :type='1'/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import toActive from '@/components/myWallet/toActive.vue'
  import toLock from '@/components/myWallet/toLock.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import addAnimation from '@/components/myWallet/addAnimation.vue'
  import {getdata} from '@/services/mining.js'

  export default {
    name: "lockPurse",
    components: {
      myHeader,
      toActive,
      toLock,
      puresRecord,
      addAnimation,
    },
    data() {
      return {
        //释放按钮文字
        btnText: '',

        //控制释放到活动包框的bol值
        toActiveShowBol: false,

        //控制转入资产包框的bol值
        ToLockShowBol: false,

        //数据列表
        showData: '',

        //初始化数据
        initLockMoney: '',

        //控制转入活动钱包按钮可点
        btnBol: false,

        //数据表对应的状态说明
        dateType: {
          typeon: '入',
          typeto: '入',
          typest: '入',
          typefo: '释',
          typefi: '战',
          typesi: '出',
          typese: '充',
          typeei : '扣',
          typeni: '入',
          typete: '入',
          // typeel: '领',
          // typetw: '入',
          // typeth: '入',
          // typeft: '战',
          // typefit: '扣',
          typeonText: '临时钱包手动转入',
          typetoText: '临时钱包自动转入',
          typestText: '活动钱包转入',
          typefoText: '资产包收益手动释放',
          typefiText: '战绩收益提取',
          typesiText: '转出到临时钱包',
          typeseText: '后台充值',
          typeeiText: '后台扣除',
          typeniText: '战绩钱包转入',
          typeteText: '他人战绩钱包转入',
          // typeelText: '战绩钱包收益释放',
          // typetwText: '转出其他用户',
          // typethText: '其他用户转入',
          // typeftText: '战绩收益',
          // typefitText: '后台扣除',
        },
      }
    },
    methods: {

      //显示转入活动包框
      showToActive() {
        if (this.btnBol) {
          this.toActiveShowBol = true
        }
      },
      //显示转入资产包框
      showToLock() {
        this.ToLockShowBol = true
      },
      //隐藏转入活动包框
      hideToActive(bol) {
        this.toActiveShowBol = false;
        if (bol) {
          this.getInitLockMoney()
        }
      },
      getInitLockMoney() {
        //加载初始数据
        getdata('/Supernode/initLockMoney', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initLockMoney = res.data.result.userInfo
            if (this.initLockMoney.status == 1) {
              this.btnText = '释放到活动钱包'
            } else if (this.initLockMoney.status == 2) {
              this.btnText = '已释放'
            } else if (this.initLockMoney.status == 3) {
              this.btnText = '无收益'
            }
            this.showData = res.data.result.logList;
            if (this.initLockMoney.status == 1) {
              this.btnBol = true
            } else {
              this.btnBol = false
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },
      //隐藏转入资产包框
      hideToLock(bol) {
        this.ToLockShowBol = false
        if(bol){
          this.getInitLockMoney()
        }
      },

    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitLockMoney();
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {

    > .lockPurse_top {
      width: 100%;
      height: 6rem;
      background-color: #1d212d;
      padding: 1rem;
      box-sizing: border-box;
      > li {
        color: #9fa1b0;
        font-size: 1.2rem;
        height: 5rem;
        display: flex;
        > div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          &:nth-child(2) {
            text-indent: 1rem;
          }
          > p {
            height: 2.5rem;
            line-height: 2.5rem;
            &:nth-child(2) {
              line-height: 1.5rem;
              height: 1.5rem;
              color: #dbba53;
            }
            > span {
              color: #dbba53;
            }
          }
        }
      }
    }
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
    top: 24.5rem;
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
    font-size: 1.2rem;
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
        opacity: 0.7;
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
