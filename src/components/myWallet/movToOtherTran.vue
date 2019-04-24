<template>
  <div class="movToOtherTran">
    <div class="movToOtherTran_box " :class="{myActive : showMovToOtherTran}">
      <div class="movToOtherTran_box_center " :class="{myActive:NicknameShow}" id="captcha">
        <p class="off_icon">
          <span @click="hidemovToOtherTran"></span>
        </p>
        <h2>转到其他人活动钱包</h2>

        <div class="input_box">
          <p><input type="text" maxlength="15" v-model="moneyNum"
                    placeholder="请输入转账数量">
          </p>
        </div>
        <p class="deductions">
          <span>燃烧:{{usableTransferOtherTempInit.fee_rate}}%</span>
          <span>实际扣除:{{deductions}}</span>
        </p>
        <div class="input_box">
          <p>
            <input type="text" maxlength="11" @blur="getNickName" v-model="userName"
                   placeholder="请输入对方手机号">
          </p>
        </div>

        <p class="Nickname " :class="{myActive:NicknameShow}">对方昵称：{{Nickname}}</p>
        <div class="input_box">
          <p><input type="text" maxlength="11" v-model="other_id"
                    placeholder="请输入对方ID">
          </p>
        </div>
        <div class="input_box">
          <p><input type="password" maxlength="6" v-model="passwad"
                    placeholder="请输入安全密码">
          </p>
        </div>
        <div class="extract" id="j-popup-toOther" type="primary">转账</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";
  import {mul} from "@/utils/tool";

  export default {
    name: "movToOtherTran",
    props: ['showMovToOtherTran'],
    data() {
      return {
        passwad: '',
        userName: '',
        moneyNum: '',
        other_id: '',
        Nickname: '',
        NicknameShow: false,
        usableTransferOtherTempInit: '',
        deductions: '',
      }
    },
    created() {
      getdata('/Supernode/usableTransferOtherUsableInit', {
        token: this.$token,
        mark: this.$mark,
      }).then(res => {
        this.usableTransferOtherTempInit = res.data.result
      })
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
              getdata('/Supernode/usableTransferOtherUsable', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                other_mobile: self.userName,
                user_pay_pwd: self.passwad,
                money: self.moneyNum,
                other_id: self.other_id,
              }).then(res => {
                self.$vux.toast.text(res.data.message);
                captchaIns.refresh();
                self.$vux.loading.hide();
                if (res.data.code == 10000) {
                  self.$emit('hidemovToOtherTran', true);
                  self.userName = '';
                  self.passwad = '';
                  self.moneyNum = '';
                  self.other_id = '';
                  self.NicknameShow = false
                }
              }).catch(error => {
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
        document.getElementById("j-popup-toOther").addEventListener("click", function () {
          if (self.passwad != '' && self.userName != '' && self.other_id != '' && self.moneyNum != '' && self.moneyNum > 0) {
            captchaIns.popUp();
          } else {
            if (self.moneyNum == '') {
              self.$vux.toast.text('请输入转账金额');
            } else if (self.userName == '') {
              self.$vux.toast.text('请输入对方手机号')
            } else if (self.other_id == '') {
              self.$vux.toast.text('请输入对方的ID号');
            } else if (self.passwad == '') {
              self.$vux.toast.text('请输入安全密码');
            } else {
              self.$vux.toast.text('请正确输入转账金额');
            }
          }
        })
      );
    },
    methods: {


      //隐藏弹框
      hidemovToOtherTran() {
        this.$emit('hidemovToOtherTran');
        this.userName = '';
        this.passwad = '';
        this.moneyNum = '';
        this.other_id = '';
        this.NicknameShow = false
      },


      //获取用户昵称
      getNickName() {
        getdata('/Supernode/getNickNameByPhone', {
          token: this.$token,
          mark: this.$mark,
          user_mobile: this.userName
        }).then(res => {
          if (res.data.code == 10000) {
            this.NicknameShow = true;
            this.Nickname = res.data.result;
          } else {
            this.$vux.toast.text(res.data.message);
            this.NicknameShow = false;
          }
        })
      },


      //用户名输入限制验证
      validateUserName() {
        let mon = this.userName;
        if (isNaN(mon)) {
          this.userName = mon.substr(0, mon.length - 1);
        } else {
          if (mon.indexOf('.') >= 0 || mon.indexOf(' ') >= 0) {
            this.userName = mon.substr(0, mon.length - 1);
          }
        }
      },


      //密码输入限制验证
      validatePasswad() {
        let pass = this.passwad;
        if (isNaN(pass)) {
          this.passwad = pass.substr(0, pass.length - 1);
        } else {
          if (pass.indexOf('.') >= 0 || pass.indexOf(' ') >= 0) {
            this.passwad = pass.substr(0, pass.length - 1);
          }
        }
      },


      //数量输入限制验证
      validateMoneyNum() {
        let money = this.moneyNum;
        if (isNaN(money)) {
          this.moneyNum = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(this.usableTransferOtherTempInit.usable_money)) {
              this.moneyNum = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.moneyNum = money.substr(0, money.length - 1);
                }
              } else {
                this.moneyNum = money / 1 + ''
              }
            }
          }
        }
      }
    },


    watch: {

      //监听用户名输入
      userName: function () {
        this.validateUserName();
      },

      //监听安全密码输入
      passwad: function () {
        this.validatePasswad();
      },

      //监听数量输入
      moneyNum: function () {
        this.validateMoneyNum();
        if (this.moneyNum == '') {
          this.deductions = ''
        } else {
          let fee_rate = (100 + Number(this.usableTransferOtherTempInit.fee_rate)) / 100;
          let number = mul(this.moneyNum, fee_rate).toFixed(6);
          this.deductions = number
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .movToOtherTran_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .movToOtherTran_box_center {
      width: 70%;
      height: 24.5rem;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      top: 20%;
      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: center;
      &.myActive {
        height: 27rem;
      }
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
      }
      > .serviceCharge {
        height: 3rem;
        padding: 0 1rem;
        font-size: 1.4rem;
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
              max-width: 50%;
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
        border-bottom: 1px solid #ddd;
        margin: .3rem auto;
        width: 90%;

        > p {
          height: 3rem;
          line-height: 3rem;
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

      > .deductions {
        color: orangered;
        text-align: left;
        padding: 0 1rem;
        display: flex;
        height: 1.5rem;
        line-height: 1.5rem;
        > span {
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &:nth-child(1) {
            max-width: 35%;

          }
        }
      }

      > .Nickname {
        height: 2rem;
        line-height: 2rem;
        text-align: left;
        text-indent: 2rem;
        color: #ff4848;
        display: none;
        &.myActive {
          display: block;
        }
      }

      > .extract {
        height: 4rem;
        line-height: 4rem;
        font-size: 1.2rem;
        color: #54aadb;
        position: absolute;
        width: 100%;
        bottom: 0;
        &:active {
          color: #3e84f5;
        }
      }

    }
  }
</style>
