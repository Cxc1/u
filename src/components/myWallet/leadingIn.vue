<template>
  <div class="leadingIn">
    <div class="leadingIn_box " :class="{myActive : ToOtherTranShow}">
      <div class="leadingIn_box_center">
        <p class="off_icon">
          <span @click="hideToOtherTran"></span>
        </p>
        <h2>从资产中导入 <span>({{importdata.name}})</span></h2>
        <div class="serviceCharge">
          <p><span>资产总量：</span><span>{{importdata.total}}</span></p>
        </div>
        <div class="serviceCharge">
          <p><span>可导入数量：</span><span>{{importdata.can}}</span></p>
        </div>
        <div class="serviceCharge">
          <p><span>今日可导入数量：</span><span>{{importdata.today}}</span></p>
        </div>
        <div class="input_box">
          <p><input type="text" maxlength="15" v-model="MoneyNum" @input="validateMoneyNum"
                    placeholder="请输入导入数量">
            <span class="all" @click="inputAll">全部</span>
          </p>
        </div>
        <div class="extract" @click="importtowallet">转账</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";

  export default {
    name: "leadingIn",
    props: ['ToOtherTranShow'],
    data() {
      return {

        MoneyNum: '',
        importdata: '',
      }
    },
    methods: {
      //隐藏给他人临时钱包转账弹出框
      hideToOtherTran() {
        this.$emit('hideToOtherTran')
      },


      //验证转账数量输入框数据
      validateMoneyNum() {
        let mon = this.MoneyNum;
        let today = this.importdata.today;
        let can = this.importdata.can;
        if (isNaN(mon)) {
          this.MoneyNum = mon.substr(0, mon.length - 1);
        } else {
          if (mon != '') {
            if (mon > today || mon > can) {
              this.MoneyNum = mon.substr(0, mon.length - 1);
              this.$vux.toast.text('输入的导入金额过大');
            } else {
              if (mon.indexOf('.') > 0) {
                let floatNum = mon.substr(mon.indexOf('.') + 1, mon.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.MoneyNum = mon.substr(0, mon.length - 1);
                }
              }
            }
          }
        }
      },


      //点击全部
      inputAll() {
        let today = this.importdata.today;
        let can = this.importdata.can;
        if (today <= can) {
          this.MoneyNum = today
        } else {
          this.MoneyNum = can
        }
      },


      //获取数据
      getimportdata() {
        getdata('/Wallet/importdata', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.$route.query.wc_id
        }).then(res => {
          if (res.data.code == 10000) {
            this.importdata = res.data.result
          }
        })
      },


      //转账接口
      importtowallet() {
        if (this.MoneyNum != '') {
          this.$vux.loading.show();
          getdata('/Wallet/importtowallet', {
            token: this.$token,
            mark: this.$mark,
            wcid: this.$route.query.wc_id,
            money: this.MoneyNum
          }).then(res => {
            this.$vux.loading.hide();
            this.$vux.toast.text(res.data.message);
            if (res.data.code == 10000) {
              this.getimportdata();
              this.MoneyNum = '';
              this.hideToOtherTran();
            }
          })
        } else {
          this.$vux.toast.text('请输入导入数量');
        }
      }
    },
    created() {
      this.getimportdata()
    },
  }
</script>

<style lang="less" scoped>
  .leadingIn_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .leadingIn_box_center {
      width: 70%;
      height: 22rem;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      top: 20%;
      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: center;
      > .off_icon {
        height: 2rem;
        > span {
          width: 2rem;
          height: 2rem;
          box-sizing: border-box;
          margin: auto;
          float: right;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > h2 {

        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        border-bottom: 1px solid #ccc;
        > span {
          color: #ff4848;
        }
      }
      > .serviceCharge {
        height: 3rem;
        padding: 0 1rem;
        font-size: 1.2rem;
        > p {
          line-height: 3rem;
          word-wrap: break-word;
          font-weight: bolder;
          white-space: nowrap;
          display: flex;
          > span {
            display: inline-block;
            color: #444;
            overflow-x: scroll;
            &:nth-child(2) {
              max-width: 65%;
              color: #3e84f5;
              font-weight: 400;
            }
          }
        }
      }
      > .money_number {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: bolder;
        color: #ff4848;
      }
      > .input_box {
        height: 3rem;
        border: 1px solid #ddd;
        margin: .3rem auto;
        width: 90%;

        > p {
          height: 3rem;
          line-height: 3rem;
          font-size: 1.2rem;
          text-align: left;
          padding: 0 1rem;
          > .all {
            position: absolute;
            right: 1rem;
            color: #fff;
            background-color: #3e84f5;
            padding-left: 1rem;
          }
          > input {
            height: 100%;
            display: inline-block;
            float: left;
            border: none;
            font-size: 1.2rem;
            color: #666;
          }
          > span {
            display: inline-block;
            float: right;
            padding-right: 1rem;
            max-width: 70%;
            overflow: scroll;
          }
        }
      }
      > .extract {
        height: 4rem;
        line-height: 4rem;
        font-size: 1.2rem;
        color: #54aadb;
        &:active {
          color: #3e84f5;
        }
      }
    }
  }
</style>
