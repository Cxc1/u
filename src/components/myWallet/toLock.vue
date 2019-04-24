<template>
  <div class="toLock ">
    <div class="toLock_box" :class="{ myActive : showBol}">
      <div class="toLock_box_center" id="captcha">
        <p class="off_icon">转账
          <span @click="hideToLock"></span>
        </p>
        <h2>
          <p :class="{myActive:intoShow}" @click="intoShow = true">转入</p>
          <p :class="{myActive:!intoShow}" @click="intoShow = false">转出</p>
        </h2>
        <div class="select_into" v-show="intoShow">
          <div class="serviceCharge">
            <p>
            从活动钱包、临时钱包转入到资产包，系统会自动放大{{lockTransferTempInit.multiple}}倍进行锁仓
            。从资产包每日释放2‰至6‰不等。目前燃烧为0
            </p>
          </div>
          <router-link tag="div" to="/movablePurse" class="toMove">从活动钱包转入到资产包</router-link>
          <router-link tag="div" to="/temporaryPurse" class="toTem">从临时钱包转入到资产包</router-link>
        </div>
        <div class="select_out" v-show="!intoShow">
          <p class="color_red">资产包转入到自己临时钱包会自动缩小{{lockTransferTempInit.multiple}}倍，同时收取临时钱包高额的燃烧。！</p>
          <p class="color_orange">资产包余额：</p>
          <p class="select_out_number">{{lockTransferTempInit.lock_money}} LTCC</p>
          <p class="select_out_input_box">
            <input type="text" maxlength="11" v-model="moveMoney" placeholder="请输入提取数量">
            <span>
            转出燃烧比例：{{lockTransferTempInit.fee_rate}}%
            </span>
          </p>
          <p class="select_out_account ">
            <span>到账：</span>
            <span>{{actualMoveMoney}}</span>
            <span>LTCC</span>
          </p>
          <p class="select_out_buttom" id="j-popup_toTem" type="primary">
            转出到临时钱包
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";

  export default {
    name: "toLock",
    props: ['showBol', 'initLockMoney'],
    data() {
      return {
        intoShow: true,
        moveMoney: '',
        actualMoveMoney: '',
        lockTransferTempInit: '',
      }
    },
    created() {
      getdata('/Supernode/lockTransferTempInit', {
        token: this.$token,
        mark: this.$mark
      }).then(res => {
        this.lockTransferTempInit = res.data.result
      })
    },

    methods: {

      //隐藏弹框
      hideToLock() {
        let bol = false;
        this.$emit('hideToLock', bol);
      },


      //数量输入限制验证
      validateMoneyNum() {
        let money = this.moveMoney;
        if (isNaN(money)) {
          this.moveMoney = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(this.lockTransferTempInit.lock_money)) {
              this.moveMoney = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.moveMoney = money.substr(0, money.length - 1);
                }
              } else {
                this.moveMoney = money / 1 + ''
              }
            }
          }
        }
      }
    },
    watch: {
      moveMoney: function () {
        this.validateMoneyNum();
        const money = (this.moveMoney / this.lockTransferTempInit.multiple *
          ((100 - this.lockTransferTempInit.fee_rate) / 100)).toFixed(7);
        if (this.moveMoney == '') {
          this.actualMoveMoney = ''
        } else {
          this.actualMoveMoney = money.substr(0, money.length - 1)
        }
      }
    },

    mounted() {

      //调易盾滑块验证
      let captchaIns;
      let self = this;

      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 260,
          onVerify(err, data) {
            let Object = {
              token: self.$token,
              mark: self.$mark,
              validate: data.validate,
              money: self.moveMoney
            };
            if (!err) {
              //滑动验证成功后，请求接口
              self.$vux.loading.show();
              return self.$http.post(
                self.api + '/Supernode/lockTransferTemp', self.$qs.stringify(Object)
              ).then(res => {
                self.moveMoney = '';
                self.$vux.toast.text(res.data.message);
                captchaIns.refresh();
                self.$vux.loading.hide();
                if (res.data.code == 10000) {
                  let suc = true;
                  self.$emit('hideToLock', suc);
                } else {
                  self.$emit('hideToLock');
                }
              }).catch(error => {
                self.$vux.toast.text('转账失败');
                captchaIns.refresh();
              })
            }
          }
        },
        function (instance) {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          captchaIns = instance;
        },
        function (err) {
          // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        },
        document.getElementById("j-popup_toTem").addEventListener("click", function () {
          if (self.moveMoney != '' && self.moveMoney > 0) {
            if (parseFloat(self.moveMoney) <= parseFloat(self.lockTransferTempInit.lock_money)) {
              captchaIns.popUp();
            } else {
              self.$vux.toast.text('您的资产包余额不足')
            }
          } else {
            self.moveMoney = '';
            self.$vux.toast.text('请正确输入金额')
          }
        })
      );
    },
  }
</script>

<style lang="less" scoped>
  .toLock_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .toLock_box_center {
      width: 75%;
      height: 26rem;
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
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        text-align: center;
        position: relative;
        > span {
          width: 3rem;
          height: 3rem;
          box-sizing: border-box;
          margin: auto;
          position: absolute;
          right: 0;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > h2 {
        height: 3rem;
        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        display: flex;
        border-bottom: 2px solid #ccc;
        > p {
          flex: 1;
          &.myActive {
            border-bottom: 1px solid #3e84f5;
            color: #3e84f5;
          }

        }
      }
      > .select_into {
        height: 20rem;
        position: relative;
        > .serviceCharge {
          padding: 3rem 1rem;
          margin-bottom: .5rem;
          font-size: 1.2rem;
          > p {
            line-height: 1.5rem;
            word-wrap: break-word
          }
        }
        .reward {
          line-height: 2rem;
        }
        > .money_number {
          font-size: 1.5rem;
          height: 3rem;
          font-weight: bolder;
          color: #ff4848;
          border-bottom: 1px solid #dcdcdc;
        }
        > .toMove, .toTem {
          height: 3rem;
          line-height: 3rem;
          font-size: 1.2rem;
          border-top: 1px solid #dcdcdc;
          position: absolute;
          bottom: .5rem;
          width: 100%;
          color: #54aadb;
          &:active {
            color: #3e84f5;
          }
        }
        > .toMove {
          color: #d2a312;
          bottom: 3.5rem;
          &:active {
            color: #e3b423;
          }
        }
      }
      > .select_out {
        height: 20rem;
        padding: 0 1rem;
        > .color_red {
          line-height: 1.5rem;
          height: 4.5rem;
          font-size: 1.2rem;
          color: #f44336;
          text-align: left;
          padding-top: .5rem;
        }
        > .color_orange {
          text-align: left;
          color: orangered;
          font-size: 1.2rem;

        }
        > .select_out_number {
          height: 2rem;
          line-height: 2rem;
          text-align: left;
          font-size: 1.2rem;
          color: orangered;
        }
        > .select_out_input_box {
          height: 4rem;
          display: flex;
          align-items: center;
          > input {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.4rem;
            width: 100%;
            border: none;
          }
          > span {
            font-size: 1rem;
            text-align: left;
            color: red;
          }
        }
        > .select_out_account {
          height: 2rem;
          line-height: 2rem;
          display: flex;
          text-align: left;
          font-size: 1.2rem;
          > span {
            flex: 1;
            &:nth-child(2) {
              min-width: 60%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        > .select_out_buttom {
          width: 70%;
          height: 3rem;
          border: 1px solid #13c4ed;
          color: #13c4ed;
          line-height: 3rem;
          font-size: 1.4rem;
          margin: 1rem auto;
          border-radius: 3rem;

        }
      }
    }
  }
</style>
