<template>
  <transition enter-active-class="fadeInDown" leave-active-class="fadeOut">
    <div class="conversionwrap" @click="offconvs" v-show="tkshow">
      <div class="conversion" @click.stop.prevent>
        <h2>发起兑换
          <span class="officon" @click="off_icon"></span>
        </h2>
        <div class="ofrom">
          <label>
            <!-- <input type="text"  readonly="readonly" @click="checkcoinbox" v-model="cointype"> -->
            <p @click="checkcoinbox">{{cointype}}</p>
            <span class="triangle_border_down"></span>
            <transition enter-active-class="fadeInDown" leave-active-class="fadeOut">
              <ul id="coin_type" v-show="flag">
                <li v-for="(item,index) in userinfodata" :key="index" @click="checkcoin(index)">
                  <span>{{item.c_name}}</span>
                  <span>可用余额：{{item.c_money}}</span>
                </li>
              </ul>
            </transition>
          </label>
          <p>TO<span class="convs_maxval" v-show="flag3">(今日可兑换最大数量：{{convs_maxval}})</span></p>
          <label>
            <!-- <input type="text" placeholder="请选择..." readonly="readonly" @click="tocheckcoinbox" v-model="tocointype"> -->
            <p @click="tocheckcoinbox">{{tocointype}}</p>
            <span class="triangle_border_down"></span>
            <transition enter-active-class="fadeInDown">
              <ul id="tocoin_type" v-show="flag1">
                <li v-for="(item,index) in checkedrights" :key="index" @click="tocheckcoin(index)">
                  <span>{{item.c_name}}</span>
                  <span>可用余额：{{item.c_money}}</span>
                </li>
              </ul>
            </transition>
          </label>
          <label>
            <!-- <input type="number" placeholder="输入兑换数量"  v-model="count" @input="setcount" > -->
            <input type="text" maxlength="15" v-model="count" placeholder="输入兑换数量" @input="setcount">
            <span class="unti">{{price}}</span>
          </label>
          <p>燃烧：{{convs_feeval}} {{price}}</p>
          <p>实际扣除：{{reality}} {{price}}</p>
          <button v-show="!flag2" id="captchafalse"> 提交</button>
          <button id="captcha" v-show="flag2"> 提交</button>
        </div>

      </div>
    </div>
  </transition>
</template>
<script>
  import {AlertModule} from 'vux'
  import {clearNoNum, add, sub, mul, div} from '@/utils/tool'
  import {getdata} from '@/services/mining.js'

  export default {
    name: 'convs-tk',
    props: {
      tkshow: Boolean,
      userinfo: Array,
    },
    data() {
      return {
        // convstk:this.tkshow,
        flag: false,//转出币种盒子是否显示
        flag1: false,//转入币种盒子是否显示
        flag2: false,//提交按钮的显示
        flag3: false,//对出币种选中LTCC时显示
        cointype: '请选择币种',//转出币种
        tocointype: '请选择...',
        // userinfodata:[...this.userinfo],
        userinfodata: [],
        checkedleft: {},//选中的左边值
        checkedright: {},//选中的右边值
        checkedrights: [],//选中左边  右边的可选值
        fee: 0,//燃烧
        price: '',//单位
        tmpCount: 0,//提交的兑换数量
        count: "",//兑换数量
        validateval: '',
        convs_maxval: "0",
        convs_maxvals: [],
        ltu_max: '',
        oth_max: '',


      }
    },
    computed: {
      reality() {
        let feeX = 1 + (this.fee / 100);
        let feeval = mul(this.tmpCount, feeX);
        let feeva12 = Number(feeval)
        return feeva12.toFixed(6)
      },
      convs_feeval() {
        return (mul(this.tmpCount, this.fee) / 100).toFixed(6);
      }
    },
    watch: {

      count: function (newval, oldval) {
        let reg = /^\d*\.{0,1}\d*$/g.test(newval);
        let reg1 = /(\.{1}\d{7,})$/g.test(newval);
        let reg2 = /^[0][0]/.test(newval);
        let reg3 = /^[0].[0]{6}/.test(newval);
        if (this.checkedleft.c_name && this.checkedright.c_name) {
          if (!reg) {
            this.count = oldval;
          }
          if (reg1) {
            this.count = oldval;
            this.$vux.toast.text('只能输入小数点后六位');
          }
          if (reg2) {
            this.count = oldval;
          }
          if (reg3) {
            this.count = "0.00000"
            this.$vux.toast.text('最少兑换数量为0.000001');
          }
          if (Number(this.count) > Number(this.convs_maxval)) {
            this.count = this.convs_maxval;
            this.$vux.toast.text('可兑换余额不足');
          }
          this.tmpCount = this.count;
        }
        if (this.count > 0) {
          this.flag2 = true;
        } else {
          this.flag2 = false;
        }
      }
    },
    created() {
      this.requestcurrencydata();
    },
    methods: {
      refreshpage() {
        this.flag = false,//转出币种盒子是否显示
          this.flag1 = false,//转入币种盒子是否显示
          this.flag2 = false,//提交按钮的显示
          this.cointype = '请选择币种',//转出币种
          this.tocointype = '请选择...',
          // this.userinfodata=[...this.userinfo],
          this.checkedleft = {},//选中的左边值
          this.checkedright = {},//选中的右边值
          this.checkedrights = [],//选中左边  右边的可选值
          this.fee = 0,//燃烧
          this.price = '----',//单位
          this.tmpCount = 0,//提交的兑换数量
          this.count = "",//兑换数量
          this.validateval = ''

      },
      //滑动验证后 提交兑换
      submitcon() {
        if (this.checkedleft.c_name && this.checkedright.c_name && this.count > 0) {
          getdata('/Exchange/createExchange', {
            token: this.$token,
            mark: this.$mark,
            currency_keyword_left: this.checkedleft.c_keyword,
            currency_keyword_right: this.checkedright.c_keyword,
            number: this.tmpCount,
            validate: this.validateval,
          }).then(result => {
            if (result.data.code == 10000) {
              this.refreshpage();
              this.requestcurrencydata();
              var _self = this;
              AlertModule.show({
                content: '提交成功,等待审核',
                onHide() {
                  _self.$router.replace({
                    path: '/refushpage',
                    name: 'refushpage',
                  })
                }
              })

            } else {
              this.$vux.toast.text(result.data.message);
            }
          })
        }
      },

      //请求币种信息
      requestcurrencydata() {
        this.$vux.loading.show({
          text: '正在加载中'
        })
        getdata('/Exchange/getWalletCurrency', {
          token: this.$token,
          mark: this.$mark,
        }).then(result => {
          if (result.data.code == 10000) {
            //初始化头部币种
            this.userinfodata = result.data.result;
          } else if (result.data.code == 10100) {
            this.$vux.toast.text(result.data.message);
            this.$vux.loading.hide();
            webgotologin();
          }
          this.$vux.loading.hide();
        })
      },
      //获取可兑换的最大数量；
      getmaxval() {
        getdata('/Exchange/getExchangeMaxNumber', {
          token: this.$token,
          mark: this.$mark,
        }).then(result => {
          if (result.data.code == 10000) {
            this.convs_maxvals = result.data.result;
          } else {
            this.$vux.toast.text(result.data.message);
            webgotologin();
          }
        })
      },

      setcount() {
        //选中兑换类型 才能输入数量
        if (!this.checkedleft.c_name || !this.checkedright.c_name) {
          AlertModule.show({
            content: '请先选择兑换币种',
            onHide() {

            }
          })
          this.count = ""
        }
      },
      //按任意地方关闭兑换框
      offconvs() {
        this.$emit('tkisShow', {
          tkval: false,
          tkval2: 123,
        })
      },
      //关闭兑换框按钮
      off_icon() {
        this.$emit('tkisShow', {
          tkval: false,
        })
      },
      //点击弹出转出可选币种类型
      checkcoinbox() {
        this.flag = !this.flag;
      },
      //选中转出币种类型
      checkcoin(index) {
        this.flag = false;
        this.cointype = this.userinfodata[index].c_name + "    可用余额: " + this.userinfodata[index].c_money;
        this.checkedleft = this.userinfodata[index];
        this.price = this.checkedleft.c_name;
        this.count = "";
        this.tmpCount = 0;
        this.checkedrights = [];
        this.checkedright = {};
        this.tocointype = '请选择...';
        //如果选择的是a类型  将c类型的数据放置可转币种数组中

        if (this.checkedleft.c_type == 'a') {
          for (var i = 0; i < this.userinfodata.length; i++) {
            if (this.userinfodata[i].c_type == 'c') {
              this.checkedrights.push(this.userinfodata[i]);
            }
          }
          this.fee = this.checkedleft.c_fee;

        }
        //如果选择的是c类型  将c类型的数据放置可转币种数组中
        else {
          for (var i = 0; i < this.userinfodata.length; i++) {
            if (this.userinfodata[i].c_type == 'a') {
              this.checkedrights.push(this.userinfodata[i]);
            }
          }
          this.fee = this.checkedleft.c_fee;
        }
        //选中对出币种  获取到可兑换的最大值
        for (var i = 0; i < this.convs_maxvals.length; i++) {
          if (this.checkedleft.c_keyword == this.convs_maxvals[i].wc_keyword) {

            this.convs_maxval = this.convs_maxvals[i].max_number;
            this.ltu_max = this.userinfodata[index].c_money;
            this.oth_max = this.convs_maxvals[i].max_number;

          }
        }


        //  if(this.checkedleft.c_keyword=="HC"){
        //      this.flag3=true;
        //  }else{
        //      this.flag3=false;
        //  }
        this.flag3 = true;
      },
      //点击弹出转出可选币种类型
      tocheckcoinbox() {
        this.flag1 = !this.flag1;
        if (this.checkedrights.length < 1) {
          AlertModule.show({
            content: '请先选择兑出币种',
          })
        }
      },
      //选中转入币种类型
      tocheckcoin(index) {
        this.tocointype = this.checkedrights[index].c_name + "    可用余额:" + this.checkedrights[index].c_money;
        //  this.price=this.checkedrights[index].c_name;
        this.checkedright = this.checkedrights[index];
        this.flag1 = false;
        if (this.checkedleft.c_name == 'LTCC' && this.checkedrights[index].c_name == 'UUC') {
          this.convs_maxval = this.ltu_max
        } else if (this.checkedleft.c_name == 'LTCC' && this.checkedrights[index].c_name != 'UUC') {
          this.convs_maxval = this.oth_max
        }
      }
    },
    beforeMount() {
      this.getmaxval();
    },
    mounted() {
      var captchaIns;
      var that = this;
      initNECaptcha({
        element: '#captcha',
        captchaId: 'b0487c82b2de43558aac9d29bfbda686',
        mode: 'popup',
        width: '260',
        onVerify: function (err, data) {
          if (data) {
            that.validateval = data.validate;
            that.submitcon()
          }
        }
      }, function (instance) {
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        captchaIns = instance
      }, function (err) {
        // 初始化失败后触发该函数，err对象描述当前错误信息
      })

      // 监听button的点击事件，弹出验证码
      document.getElementById('captcha').addEventListener('click', function () {
        captchaIns.popUp();
        captchaIns.refresh()

      })

    }
  }
</script>
<style lang="less" scoped>
  @import url("../../styles/record.less");
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

  .conversionwrap {
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
  }

  .conversion {
    position: absolute;
    width: 80%;
    height: 24rem;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    h2 {
      background: white;
      position: relative;
      top: 0;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.2rem;
      .officon {
        display: inline-block;
        position: absolute;
        width: 40px;
        height: 40px;
        background: url(../../assets/off_icon.png) no-repeat center;
        background-size: 40%;
        right: 0;
        top: 0;
        z-index: 501;
      }
    }

    .ofrom {
      width: 100%;
      background: #f4f4f4;
      padding-top: 1rem;
      position: relative;
      font-size: 1rem;
      label {
        display: block;
        width: 90%;
        margin: 0 auto;
        height: 3rem;
        position: relative;
        z-index: 9;
        p, input {
          border: none;
          height: 100%;
          line-height: 3rem;
          width: 100%;
          padding-left: 0.5rem;
          box-sizing: border-box;
          background: #e2e2e2;
          color: #848484;
        }
        /*向下*/
        .triangle_border_down {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 0.7rem 0.7rem 0;
          border-style: solid;
          border-color: #7a7677 transparent transparent; /*灰 透明 透明 */
          position: absolute;
          top: 1rem;
          right: 0.5rem;
        }
      }
      label:nth-child(1) {
        position: relative;
        z-index: 13;
        input {

        }
      }
      > p:nth-child(2) {
        width: 90%;
        margin: 0 auto;
        height: 3rem;
        line-height: 3rem;
        position: relative;
        padding-left: 0.5rem;
        box-sizing: border-box;
        font-size: 1.2rem;
      }
      label:nth-child(3) {
        position: relative;
        z-index: 12;

      }
      label:nth-child(4) {
        position: relative;
        z-index: 10;
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        input {
          background: #f4f4f4;
          border-bottom: 1px solid #dddddd;
        }
        .unti {
          position: absolute;
          right: 2rem;
          height: 3rem;
          line-height: 3rem;
          font-size: 1rem;
          color: #848484;
        }
      }

      > p:nth-child(5), p:nth-child(6) {
        width: 90%;
        margin: 0 auto;
        height: 3rem;
        line-height: 4rem;
        position: relative;
        padding-left: 0.5rem;
        box-sizing: border-box;
      }

      button {
        margin-top: 1rem;
        width: 100%;
        height: 3rem;
        border: none;
        text-align: center;
        line-height: 3rem;
        background: #de6e24;
        font-size: 1.4rem;
        color: white;
      }
    }

  }

  #captchafalse {
    opacity: 0.4;
  }

  #coin_type {
    width: 100%;
    background: white;
    position: absolute;
    z-index: 509;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      box-sizing: border-box;
    }
  }

  #tocoin_type {
    width: 100%;
    background: white;
    position: absolute;
    z-index: 555;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      box-sizing: border-box;
    }
  }

  .fadeInDown {
    animation-duration: 1000ms;
  }

  .vux-x-dialog {
    z-index: 1000 !important;
  }

  .fadeInUp, .zoomOutDown, .fadeInDown, .fadeIn, .fadeOut {
    animation-duration: 500ms;
  }

  .convs_maxval {
    float: right;
    color: red;
    font-size: 0.8rem;
  }
</style>


