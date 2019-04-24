<template>
  <div class="assetsToUser ">
    <div class="assetsToUser_box" :class="{ myActive : showBol}">
      <div class="assetsToUser_box_center" id="captcha">

        <h2>转到他人 <span class="off_icon" @click="hideassetsToUserBox"></span></h2>
        <div class="select_wallet">
          <p :class="{myActive : user_wallet_type === 1}" @click="changeToZc">资产包</p>
          <p :class="{myActive : user_wallet_type === 2}" @click="changeToZj">战绩钱包</p>
        </div>
        <div class="center_box" v-if="user_wallet_type === 1">
          <div class="serviceCharge">
            <p>
              *转到他人资产包时将会在活动钱包最低扣除转入数额的{{TransferLockInit.usable_min_rate}}%
              (燃烧{{TransferLockInit.usable_fee_rate}}%)，
              其余部分将在战绩钱包扣除(燃烧{{TransferLockInit.record_fee_rate}}%)，当活动钱包余额不足时将无法转账
            </p>
          </div>
          <div class="ipt_box">
            <div class="phone_number">
              <p>对方手机：</p>
              <p class="num_ipt">
                <input type="text" v-model="phone_number" maxlength="11" placeholder="请输入对方手机号">
              </p>

            </div>

            <div class="user_id">
              <p>对方ID：</p>
              <p class="num_ipt">
                <input type="text" v-model="user_id" maxlength="11" placeholder="请输入对方ID号">
              </p>
            </div>

            <div class="out_num">
              <p>转出数量：</p>
              <p class="num_ipt">
                <input type="text" v-model="money" maxlength="11" placeholder="请输入转账数量">
                <span>LTCC</span>
              </p>

              <p class="maxNum">*当前最大可转：{{(TransferLockInit.record_money/((100-30)/100)).toFixed(6)}} LTCC</p>
            </div>

            <div class="act_del">
              <p>
                活动钱包扣除：
                <span class="act_num"></span>
              </p>
              <p class="num_ipt">
                <input type="text" v-model="usable_money" maxlength="11" :placeholder="TransferLockInit.placeText">
                <span>LTCC</span>
              </p>
              <p class="maxNum">*活动钱包余额：{{TransferLockInit.usable_money}} LTCC</p>
            </div>

            <div class="del_to_num">
              <div>
                <p>战绩钱包扣除：</p>
                <p>{{record_money}}</p>
              </div>
              <div>
                <p>资产包到账：</p>
                <p>{{toLock_money}}</p>
              </div>
            </div>

            <div class="user_id">
              <p>安全密码：</p>
              <p class="num_ipt">
                <input type="password" v-model="user_pwd" maxlength="6" placeholder="请输入安全密码">
              </p>
            </div>
          </div>


        </div>

        <div class="center_box" v-if="user_wallet_type === 2">
          <div class="serviceCharge">
            <p>
              *转到他人战绩钱包时将会在活动钱包最低扣除转入数额的{{TransferLockInit.usable_min_rate}}%，
              (燃烧{{TransferLockInit.usable_fee_rate}}%)， 其余部分将在战绩钱包扣除(燃烧{{TransferLockInit.record_fee_rate}}%)，
              当活动钱包余额不足时将无法转账
            </p>
          </div>
          <div class="ipt_box">
            <div class="phone_number">
              <p>对方手机：</p>
              <p class="num_ipt">
                <input type="text" v-model="phone_number" maxlength="11" placeholder="请输入对方手机号">
              </p>

            </div>

            <div class="user_id">
              <p>对方ID：</p>
              <p class="num_ipt">
                <input type="text" v-model="user_id" maxlength="11" placeholder="请输入对方ID号">
              </p>
            </div>

            <div class="out_num">
              <p>转出数量：</p>
              <p class="num_ipt">
                <input type="text" v-model="money" maxlength="11" placeholder="请输入转账数量">
                <span>LTCC</span>
              </p>

              <p class="maxNum">*当前最大可转：{{(TransferLockInit.record_money/((100-30)/100)).toFixed(6)}} LTCC</p>
            </div>

            <div class="act_del">
              <p>
                活动钱包扣除：
                <span class="act_num"></span>
              </p>
              <p class="num_ipt">
                <input type="text" v-model="usable_money" maxlength="11" :placeholder="TransferLockInit.placeText">
                <span>LTCC</span>
              </p>
              <p class="maxNum">*活动钱包余额：{{TransferLockInit.usable_money}} LTCC</p>
            </div>

            <div class="del_to_num">
              <div>
                <p>战绩钱包扣除：</p>
                <p>{{record_money}}</p>
              </div>
              <div>
                <p>资产包到账：</p>
                <p>{{toLock_money}}</p>
              </div>
            </div>
            <div class="user_id">
              <p>安全密码：</p>
              <p class="num_ipt">
                <input type="password" v-model="user_pwd" maxlength="6" placeholder="请输入安全密码">
              </p>
            </div>
          </div>


        </div>
        <div class="extract" id="assetsToUser_btn" type="primary">提取</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";
  import {add, sub, mul, div} from "@/utils/tool";

  export default {
    name: "assetsToUser",
    props: ['showBol', 'TransferLockInit',],
    data() {
      return {
        money: '',
        usable_money: '',
        record_money: '--',
        toLock_money: '--',
        max_money: '',
        user_wallet_type: 1,
        phone_number: '',
        user_id: '',
        user_pwd: '',
      }
    },
    created() {

    },
    methods: {
      clearIpt() {
        this.money = '';
        this.usable_money = '';
        this.record_money = '--';
        this.toLock_money = '--';
        this.phone_number = '';
        this.user_id = '';
        this.user_pwd = '';
      },

      changeToZc() {
        this.user_wallet_type = 1;
        this.$emit('changeInitData', this.user_wallet_type);
        this.clearIpt();

      },
      changeToZj() {
        this.user_wallet_type = 2;
        this.$emit('changeInitData', this.user_wallet_type);
        this.clearIpt();
      },
      //隐藏弹框
      hideassetsToUserBox() {
        this.$emit('hideassetsToUser');
        this.user_wallet_type = 1;
        this.clearIpt();
      },


      //数量输入限制验证
      // this.money, this.TransferLockInit.record_money
      validateMoneyNum() {
        let money = this.money;
        let max = (this.TransferLockInit.record_money / ((100 - 30) / 100)).toFixed(6);
        if (isNaN(money)) {
          this.money = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(max)) {
              this.money = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.money = money.substr(0, money.length - 1);
                }
              } else {
                this.money = money / 1 + ''
              }
            }
          }
        }
      }


    },


    mounted() {
      //调易盾滑块验证
      var captchaIns;
      let self = this;
      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 260,
          onVerify(err, data) {
            if (!err) {
              self.$vux.loading.show();
              if (self.user_wallet_type === 1) {
                getdata('/Supernode/recordTransferOtherLock', {
                  token: self.$token,
                  mark: self.$mark,
                  validate: data.validate,
                  money: self.money,
                  usable_money: self.usable_money,
                  record_money: self.record_money,
                  other_mobile: self.phone_number,
                  other_id: self.user_id,
                  user_pay_pwd: self.user_pwd
                }).then(res => {
                  self.$vux.loading.hide();
                  self.$vux.toast.text(res.data.message);
                  if (res.data.code == 10000) {
                    self.$emit('hideassetsToUser', true);
                    this.user_wallet_type = 1;
                    self.clearIpt();
                  }
                  captchaIns.refresh();
                });
              } else {
                getdata('/Supernode/recordTransferOtherRecord', {
                  token: self.$token,
                  mark: self.$mark,
                  validate: data.validate,
                  money: self.money,
                  usable_money: self.usable_money,
                  record_money: self.record_money,
                  other_mobile: self.phone_number,
                  other_id: self.user_id,
                  user_pay_pwd: self.user_pwd
                }).then(res => {
                  self.$vux.loading.hide();
                  self.$vux.toast.text(res.data.message);
                  if (res.data.code == 10000) {
                    self.$emit('hideassetsToUser', true);
                    self.clearIpt();
                  }
                  captchaIns.refresh();
                });
              }


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
        document.getElementById("assetsToUser_btn").addEventListener("click", function () {
          if (self.money != '' && self.usable_money != '' && self.phone_number != '' && self.user_id != '' && self.user_pwd != '') {
            if (self.money > 0) {
              captchaIns.popUp();
            } else {
              self.$vux.toast.text('请输入大于 0 的转账数量');
            }

          } else {
            if (self.phone_number == '') {
              self.$vux.toast.text('请输入对方手机号');
            } else if (self.user_id == '') {
              self.$vux.toast.text('请输入对方ID');
            } else if (self.money == '') {
              self.$vux.toast.text('请输入转账数量');
            } else if (self.usable_money == '') {
              self.$vux.toast.text('请输入活动钱包扣除数量');
            } else if (self.user_pwd == '') {
              self.$vux.toast.text('请输入安全密码');
            }
          }


        })
      );
    },

    watch: {
      money(value) {
        this.validateMoneyNum();
        if (value != '') {
          this.usable_money = mul(value, div(this.TransferLockInit.usable_min_rate, 100)).toFixed(6);
          this.record_money = (value - this.usable_money).toFixed(6);
          if (this.user_wallet_type === 1) {
            this.toLock_money = mul(value, 3);
          } else {
            this.toLock_money = value
          }
        } else {
          this.money = '';
          this.usable_money = '';
          this.record_money = '--';
          console.log(this.record_money);
          this.toLock_money = '--';
        }
      },
      usable_money(value) {
        if (Number(value) <= Number(this.money)) {
          this.record_money = (this.money - value).toFixed(6);
        } else {
          if (this.money != '') {
            this.usable_money = value.substring(0, value.length - 1)
          }
        }
      }
    }


  }
</script>

<style lang="less" scoped>
  .assetsToUser_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: auto;
    transition: height .2s;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items:center;
    -moz-align-items:center;
    -ms-align-items:center;
    -o-align-items:center;
    align-items:center;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .assetsToUser_box_center {
      width: 85%;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;

      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: left;
      > h2 {
        position: relative;
        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        text-align: center;
        > .off_icon {
          width: 3rem;
          height: 3rem;
          box-sizing: border-box;
          margin: auto;
          position: absolute;
          right: 0;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > .select_wallet {
        height: 2.5rem;
        line-height: 2.5rem;
        display: flex;
        text-align: center;
        font-size: 1.3rem;
        > p {
          flex: 1;
          border-bottom: 1px solid #ccc;
          &.myActive {
            color: #13c4ed;
            border-bottom: 1px solid #13c4ed;
          }
        }
      }
      .serviceCharge {
        padding: 0 1rem;
        > p {
          line-height: 1.5rem;
          word-wrap: break-word
        }
      }
      .ipt_box {
        margin-top: .5rem;
        padding: 0 1rem;
        color: #333;
        font-size: 1.2rem;

        > .out_num, > .act_del, > .phone_number, > .user_id {

          .act_num {
            font-size: 1rem;
            float: right;
          }
          > .num_ipt {
            > input {
              margin-top: .3rem;
              height: 2rem;
              border: none;
              border-bottom: 1px solid #ccc;
              width: 80%;
            }
            > span {
              float: right;
              line-height: 3rem;
              font-size: 1.4rem;
            }
          }
          > .maxNum {
            font-size: 1rem;
            color: #FF7F00;
          }

        }
        > .phone_number, > .user_id {
          > .num_ipt {
            > input {
              width: 100%;
            }
          }
        }
        > .del_to_num {
          width: 100%;
          display: flex;
          height: 4rem;
          > div {
            flex: 1;
            line-height: 2rem;
            height: 2rem;
            > p {
              &:nth-child(2) {
                text-indent: 2rem;
              }
            }
          }
        }
      }
      .extract {
        height: 4rem;
        line-height: 4rem;
        font-size: 1.2rem;
        text-align: center;
        color: #54aadb;
        border-top: 1px solid #ccc;
        &:active {
          color: #3e84f5;
        }
      }
    }
  }
</style>
