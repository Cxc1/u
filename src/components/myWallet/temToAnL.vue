<template>
  <div class="temToAnL">
    <div class="actToLock_box" :class="{ myActive : TemToLShowBol}">
      <div class="actToLock_box_center" id="captcha">
        <p class="off_icon">
          <span @click="hideTemToL"></span>
        </p>
        <h2>转到自己资产包</h2>
        <div class="serviceCharge">
          <p>转入到资产包，系统会自动放大3倍进行锁仓。从资产包每日释放2‰至6‰不等。目前燃烧为0！</p>
        </div>
        <p>临时钱包余额（LTCC）</p>
        <p class="money_number">{{initTempMoney}} </p>
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
    name: "temToAnL",
    props: ['TemToLShowBol', 'initTempMoney'],
    data() {
      return {
        moneyNum: '',
        actualMoneyNum: '',
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
              money: self.moneyNum,
            }
            if (!err) {
              //滑块验证成功，请求转账接口
              self.$vux.loading.show();
              return self.$http.post(
                self.api + '/Supernode/tempTransferLock', self.$qs.stringify(Object)
              ).then(res => {
                self.moneyNum = '';
                self.$vux.toast.text(res.data.message);
                captchaIns.refresh();
                self.$vux.loading.hide();
                if (res.data.code == 10000) {
                  self.$emit('hideTemToL', true)
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
            if (parseFloat(self.moneyNum) <= parseFloat(self.initTempMoney)) {
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
      //隐藏弹框
      hideTemToL() {
        this.$emit('hideTemToL');
        this.moneyNum = '';
      },


      //输入框限制验证
      validateMoneyNum() {
        let mon = this.moneyNum;
        if (isNaN(mon)) {
          this.moneyNum = mon.substr(0, mon.length - 1);
        } else {
          if (mon != '') {
            //最大输入限制
            if (Number(mon) > Number(this.initTempMoney)) {
              this.moneyNum = mon.substr(0, mon.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              if (mon.indexOf('.') >= 0) {
                let floatNum = mon.substr(mon.indexOf('.') + 1, mon.length);
                //限制只能输入小数点后6位
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
      moneyNum: function () {
        this.validateMoneyNum();
        if (this.moneyNum == '') {
          this.actualMoneyNum = ''
        } else {
          this.actualMoneyNum = mul(this.moneyNum, 3)
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
      height: 24rem;
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
        height: 6rem;
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
          position: relative;
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
            position: absolute;
            right: 0;
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
