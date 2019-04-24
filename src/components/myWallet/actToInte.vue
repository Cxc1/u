<template>
  <div class="actToLock">
    <div class="actToLock_box" :class="{ myActive : showBol.ActToLockShowBol}">
      <div class="actToLock_box_center" id="captcha">
        <p class="off_icon">
          <span @click="hideActToLockBox"></span>
        </p>
        <h2>从活动钱包兑入</h2>
        <div class="serviceCharge">
          <p>划转时所获得的通证钱包数量 = 划转的活动钱包数量 x <span style="color:#ff4848">{{showBol.price}}</span>(当前LTCC价格)！</p>
        </div>
        <p>活动钱包余额（LTCC）</p>
        <p class="money_number">{{showBol.money}}</p>
        <div class="input_box">
          <p><input type="text" maxlength="15" v-model="moneyNum"
                    placeholder="请输入提取数量">
            <span>
              LTCC
            </span></p>
          <p>到账 <span>{{actualMoneyNum}} LTCC</span></p>
        </div>
        <div class="extract" id="j-popup" type="primary">提取</div>
      </div>
    </div>

  </div>
</template>

<script>
import {mul} from "@/utils/tool";

export default {
    name: "actToInte",
    props: ['showBol'],
    data() {
      return {
        moneyNum: '',
        actualMoneyNum : '',
      }
    },
    created() {
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
              money: self.moneyNum
            };
            if (!err) {
              //滑动验证成功后，请求接口
              self.$vux.loading.show();
              return self.$http.post(
                self.api + '/Supernode/usableExchangeIntegral', self.$qs.stringify(Object)
              ).then(res => {
                self.moneyNum = '';
                self.$vux.toast.text(res.data.message);
                captchaIns.refresh();
                self.$vux.loading.hide();
                if (res.data.code == 10000) {
                  let suc = true;
                  self.$emit('hideActToLock', suc);
                } else {
                  self.$emit('hideActToLock');
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
        document.getElementById("j-popup").addEventListener("click", function () {
          if (self.moneyNum != '' && self.moneyNum > 0) {
            if (parseFloat(self.moneyNum) <= parseFloat(self.showBol.money)) {
              captchaIns.popUp();
            } else {
              self.$vux.toast.text('您的活动钱包余额不足')
            }
          } else {
            self.moneyNum = '';
            self.$vux.toast.text('请正确输入金额')
          }
        })
      );
    },
    methods: {
      //隐藏转账弹出框
      hideActToLockBox() {
        this.$emit('hideActToLock');
      },
      //验证输入框
      validateMoneyNum() {
        const mon = this.moneyNum;
        if (isNaN(mon)) {
          this.moneyNum = mon.substr(0, mon.length - 1);
        } else {
          if (mon != '') {
            //输入的数额过大时
            if (Number(mon) > Number(this.showBol.money)) {
              this.moneyNum = mon.substr(0, mon.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              //只能输入一个小数点
              if (mon.indexOf('.') > 0) {
                let floatNum = mon.substr(mon.indexOf('.') + 1, mon.length);
                //只能输入小数点后六位
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.moneyNum = mon.substr(0, mon.length - 1);
                }
              } else {
                this.moneyNum = mon / 1 + ''
              }
            }
          }
        }
      }
    },
    watch: {
      //监听数据的变化，执行验证的方法
      moneyNum: function () {
        this.validateMoneyNum();
        if (this.moneyNum == '') {
          this.actualMoneyNum = ''
        } else {
          this.actualMoneyNum = mul(this.moneyNum, this.showBol.price).toFixed(6);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .actToLock_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .actToLock_box_center {
      width: 70%;
      height: 22.5rem;
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
      }
      > .serviceCharge {
        height: 4.5rem;
        padding: 0 1rem;
        > p {
          line-height: 1.5rem;
          word-wrap: break-word
        }
      }
      > .money_number {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: bolder;
        color: #ff4848;
      }
      > .input_box {
        height: 5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin-top: .3rem;
        > p {
          height: 2.5rem;
          line-height: 2.5rem;
          font-size: 1.2rem;
          text-align: left;
          padding: 0 1rem;
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
