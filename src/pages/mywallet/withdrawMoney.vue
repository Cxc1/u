<template>
  <div class="withdrawMoney">
    <myHeader title="提币">
    </myHeader>
    <div class="main">
      <div class="address">
        <p>接收地址</p>
        <p><input type="text" placeholder="请填写真实地址" v-model="puresaDress"></p>
        <router-link tag="p" :to="{path : '/commonAddress' ,query:{
                      wc_id : wc_id ,
                      tabIndex : this.$route.query.tabIndex
                      }
          }">
        </router-link>
      </div>

      <div class="address_label">
        <p>地址标签</p>
        <p><input type="text" placeholder="选填" v-model="adrTag"></p>
        <p><input type="checkbox" @blur="mblur" @click="changeBol" :checked="bol"> 添加为常用地址</p>
      </div>
      <p class="min_number" v-show="false">提币金额不能小于300</p>
      <div class="send_number" id="captcha">
        <p>发送数量</p>
        <p>
          <input type="text" @blur="mblur" maxlength="15" v-model="iptMoney"
                 :placeholder="holder">
        </p>
      </div>

      <div class="actual_account">
        <p><span>实际扣除：</span><span>{{deductions}}</span></p>
        <p v-if="wc_fees_type==1">转账燃烧({{wc_fees}}%)</p>
        <p v-else>转账燃烧({{wc_fees}})</p>
      </div>

      <div class="textBox">
        <textarea id="content" @blur="mblur" name="content" maxlength="20" v-model="remark" placeholder="备注"></textarea>
      </div>

      <div class="submit">
        <button id="j-popup" type="primary">提交</button>
      </div>
    </div>
    <random-keyboard :KeyBoardBol="KeyBoardBol"
                     :typeBol="typeBol"
                     :btnText="btnText"
                     @comfirmSubmit="comfirmSubmit"
                     @getPhoneCode="getPhoneCode"
                     @hide="KeyBoardHied">
    </random-keyboard>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import randomKeyboard from '@/common/randomKeyboard.vue'
  import {getdataBz} from "@/services/mining";
  import {mul} from '@/utils/tool'

  export default {
    name: "withdrawMoney",
    components: {
      myHeader,
      randomKeyboard
    },
    data() {
      return {

        //复选框勾选状态bol值
        bol: false,
        //键盘显示隐藏bol值
        KeyBoardBol: false,
        //币种id
        wc_id: this.$route.query.wc_id,
        //手续费
        wc_fees: '',
        //输入框提示信息
        holder: '',
        //输入的提币数量
        iptMoney: '',
        //实际到账
        actual: '',
        //钱包地址
        puresaDress: this.$route.query.address,
        //钱包地址标签
        adrTag: '',
        //是否保存地址
        checkbox: 1,
        //备注消息
        remark: '',
        //钱包地址id
        wal_id: this.$route.query.wal_id,
        //控制键盘样式，输入验证码或是输入密码
        typeBol: true,
        //获取验证码返回的值
        val_mark: '',
        //获取验证码按钮显示的文字
        btnText: '获取验证码',

        getCodeBol: true,
        //倒计时
        downTimes: 60,
        //输入框能输入的最大数字
        maxMoney: '',
        //实际扣除
        deductions: '',

        wc_fees_type: '',

        wc_take_max: '',

        wc_take_min: '',
      }
    },
    methods: {
      //调用随机键盘
      showKeyBoard() {
        this.KeyBoardBol = true
      },
      //关闭随机键盘
      KeyBoardHied() {
        this.KeyBoardBol = false
      },
      //改变地址标签勾选状态
      changeBol() {
        this.bol = !this.bol;
        if (this.bol === true) {
          this.checkbox = 2;
        } else {
          this.checkbox = 1;
        }
      },
      //验证输入框输入的方法
      validateMoneyNum() {
        let mon = this.iptMoney;
        if (isNaN(mon)) {
          this.iptMoney = mon.substr(0, mon.length - 1);
        } else {
          if (mon != '') {
            if (this.wc_take_max > 0 && Number(mon) > this.wc_take_max) {
              if (Number(mon) > Number(this.wc_take_max)) {
                this.iptMoney = mon.substr(0, mon.length - 1);
                this.$vux.toast.text('最大单笔提币不得超过' + this.wc_take_max);
              }
            } else {
              if (Number(mon) > Number(this.maxMoney)) {
                this.iptMoney = mon.substr(0, mon.length - 1);
                this.$vux.toast.text('输入的金额过大');
              } else {
                if (mon.indexOf('.') >= 0) {
                  let floatNum = mon.substr(mon.indexOf('.') + 1, mon.length);
                  if (floatNum.length > 6) {
                    this.$vux.toast.text('只能输入小数点后六位');
                    this.iptMoney = mon.substr(0, mon.length - 1);
                  }
                } else {
                  this.iptMoney = mon / 1 + '';
                }
              }
            }
          }
        }
      },
      //获取页面数据
      getcurrencybywcid() {
        getdataBz('/Wallet/getcurrencybywcid',
          {
            token: this.$token,
            mark: this.$mark,
            wcid: this.wc_id,
            wal_id: this.wal_id
          }
        ).then(res => {
          if (res.data.code == 10000) {
            this.wc_fees = res.data.result.wc_fees;
            let wc_name =  this.$route.query.wc_name
            this.holder = '可用余额为：' + res.data.result.wuc_money +wc_name;
            this.maxMoney = res.data.result.wuc_money;
            this.actual = (100 + Number(this.wc_fees)) / 100;
            this.wc_fees_type = res.data.result.wc_fees_type;
            this.wc_take_max = res.data.result.wc_take_max;
            this.wc_take_min = res.data.result.wc_take_min;
            if (res.data.result.address) {
              this.puresaDress = res.data.result.address;
              this.adrTag = res.data.result.tag;
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },
      //点击发送验证码
      getPhoneCode() {
        if (this.getCodeBol) {
          this.downTimes = 60;
          getdataBz('/Wallet/sendsms', {
            token: this.$token,
            mark: this.$mark,
          }).then(res => {
            this.$vux.toast.text(res.data.message);
            if (res.data.code == 10000) {
              this.val_mark = res.data.result.val_mark;
              this.getCodeBol = false;
              let setInt = setInterval(() => {
                if (this.downTimes > 1) {
                  this.downTimes--;
                  this.btnText = this.downTimes + 's后重新获取';
                } else {
                  clearInterval(setInt);
                  this.btnText = '获取验证码';
                  this.getCodeBol = true
                }
              }, 1000);
            }
          })
        }
      },
      //点击键盘确定，发起提币验证
      comfirmSubmit(passwd) {
        this.$vux.loading.show();
        if (this.typeBol == true) {
          getdataBz('/Wallet/validatesmscode',
            {
              token: this.$token,
              mark: this.$mark,
              val_mark: this.val_mark,
              val_code: passwd,
            }
          ).then(res => {
            this.$vux.toast.text(res.data.message);
            this.$vux.loading.hide();
            if (res.data.code == 10000) {
              this.typeBol = false;
            }
          })
        } else {
          getdataBz('/Wallet/submittakecoin',
            {
              token: this.$token,
              mark: this.$mark,
              wcid: this.wc_id,
              address: this.puresaDress,
              money: this.iptMoney,
              paypwd: passwd,
              tag: this.adrTag,
              checkbox: this.checkbox,
              remark: this.remark,
            }
          ).then(res => {
            this.$vux.toast.text(res.data.message);
            this.$vux.loading.hide();
            if (res.data.code == 10000) {
              this.KeyBoardBol = false;
              this.typeBol = true;
              this.iptMoney = '';
              let st = setTimeout(() => {
                this.$router.push({
                  path: '/accountBook',
                  query: {
                    wc_id: this.wc_id,
                  }
                });
                clearTimeout(st)
              }, 1000);
            }
          })
        }
      }

    },
    created() {
      //获取页面初始化数据
      this.getcurrencybywcid();
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
              getdataBz('/Wallet/validateyidun', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
              }).then(res => {
                self.$vux.loading.hide();
                captchaIns.refresh();
                self.$vux.toast.text(res.data.message);
                if (res.data.code == 10000) {
                  self.typeBol = true;
                  self.showKeyBoard();
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
        document.getElementById("j-popup").addEventListener("click", function () {
          //先验证数据输入是否正确
          if (self.puresaDress != '' && self.iptMoney > 0 && Number(self.iptMoney) >= Number(self.wc_take_min)) {
            getdataBz('/Wallet/validatetakecoin', {
              token: self.$token,
              mark: self.$mark,
              wcid: self.wc_id,
              address: self.puresaDress,
              money: self.iptMoney
            }).then(res => {
              if (res.data.code == 10000) {
                captchaIns.popUp();
              } else {
                self.$vux.toast.text(res.data.message)
              }
            })
          } else {
            if (self.puresaDress == '') {
              self.$vux.toast.text('请输入钱包地址')
            } else if (Number(self.iptMoney) < Number(self.wc_take_min)) {
              self.$vux.toast.text('单次提币最小金额为' + self.wc_take_min);
            } else {
              self.$vux.toast.text('请正确输入提币金额');
            }
          }
        })
      );
    },

    watch: {
      iptMoney: function () {
        this.validateMoneyNum();

        let number = mul(this.iptMoney, this.actual).toFixed(7);

        if (number <= 0) {
          this.deductions = ''
        } else {
          if (this.wc_fees_type == 1) {
            this.deductions = number.substr(0, number.length - 1)
          } else {
            this.deductions = (Number(this.iptMoney) + Number(this.wc_fees));
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>


  .main {
    padding: 0 1rem;
    .address_label, .address, .send_number, .actual_account {
      height: 3.3rem;
      width: 100%;
      background-color: #fff;
      color: #333;
      > p {
        display: inline-block;
        line-height: 3.3rem;
        height: 3.3rem;
        margin: 0 .5rem;
        float: left;
        font-size: 1.1rem;
        > input {
          outline: none;
          border: none;
          background-color: #fff;
          height: 100%;
          color: #666;
        }
      }
    }
    .address {
      margin-top: 3.5rem;
      > p {
        &:nth-child(1) {
          width: 5rem;
        }
        &:nth-child(2) {
          width: calc(~'100% - 11rem');
          height: 3.3rem;
          > input {
            width: 100%;
            color: #999;
          }
        }
        &:nth-child(3) {
          width: 3rem;
          height: 100%;
          float: right;
          background: url("imgs/address_icon.png") no-repeat center;
          background-size: 60%;
        }
      }
    }

    .address_label {
      margin-top: .5rem;
      > p {
        &:nth-child(1) {
          width: 5rem;
        }
        &:nth-child(2) {
          width: calc(~'100% - 18rem');
          height: 3.3rem;
          > input {
            width: 100%;
            height: calc(100% - 2px);
            overflow-x: scroll;
            color: #ccc;
          }
        }
        &:nth-child(3) {
          width: 10rem;
          height: 100%;
          float: right;
          background-size: 60%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999;
          white-space: nowrap;
          overflow-x: hidden;
        }
      }
    }
    .min_number {
      height: 2rem;
      line-height: 2rem;
      color: red;
      margin-top: 1.5rem;
      text-align: right;
      font-size: 1rem;
    }
    .send_number {
      margin-top: 1.5rem;
      display: flex;
      p {
        flex: 1;
        max-width: 25%;
        &:nth-child(2) {
          float: right;
          max-width: 70%;
          color: #333;
          > input {
            text-align: right;
            height: calc(100% - 4px);
            width: 100%;

          }
        }
      }
    }

    .actual_account {
      margin-top: .5rem;
      display: flex;
      > p {
        flex: 1;
        &:nth-child(2) {
          text-align: right;
        }
        span {
          max-width: 60%;
          display: inline-block;
          overflow-x: scroll;
          white-space: nowrap;
        }
      }
    }

    .textBox {
      margin-top: .5rem;
      background-color: #fff;
      height: 9rem;
      padding: 1rem;
      > textarea {
        width: 100%;
        height: 100%;
        color: #a4b0c2;
        background-color: #fff;
        text-indent: 1rem;
        border: none;
      }
    }

    .submit {
      margin: 5rem 0;
      height: 3.5rem;
      width: 100%;

      > button {
        height: 100%;
        width: 100%;
        font-size: 1.4rem;
        color: #fff;
        background-image: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
        border-radius: 3px;
        border: none;
        outline: none;
        &:active {
          opacity: .8;
        }
      }
    }
  }
</style>
