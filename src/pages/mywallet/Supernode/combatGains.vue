<template>
  <div class="combatGains">
    <myHeader :title="title"/>
    <div class="main" id="captcha">
      <div class="combatGains_top">
        <div class="combatGains_top_conten">
          <p>
            <span>累计奖励 <span>(UUC)</span></span>
            <span>今日奖励 <span>(UUC)</span></span>
          </p>
          <p>
            <span>{{initMoneyLockRecord.total_money}}</span>
            <span>{{initMoneyLockRecord.today_money}}</span>
          </p>

        </div>
        <div class="combatGains_top_btn" id="get_reward_btn" :class="{active : btnBol}">{{btnHtml}}
          <span v-show="!btnBol"></span>
        </div>
        <h3 class="formHead">
          奖励记录
        </h3>

      </div>
      <ul class="transaction_record_box">
        <div class="no_data" v-if="showData.length <= 0">
          <div>
            <img src="../../../assets/k_icon.png" alt="">
            <p>暂无奖励记录，敬请期待</p>
          </div>

        </div>

        <revenueRecord v-else :showData='showData'
                       :loadBol="loadBol" @addData="addData"/>
      </ul>
    </div>
  </div>
</template>
<script>
  import myHeader from '@/common/myHeader.vue'
  import revenueRecord from '@/components/myWallet/revenueRecord.vue'
  import {getdata_u} from "@/services/mining";
  import toActive from '@/components/myWallet/toActive.vue'
  import toTem from '@/components/myWallet/toTem.vue'

  export default {
    components: {
      myHeader,
      revenueRecord,
      toActive,
      toTem
    },
    data() {
      return {
        //列表数据
        showData: [],

        //控制上拉加载的bol值
        loadBol: true,

        //初始化加载数据为第一页
        page: 1,

        //每页数据为8条
        pageDatas: 8,

        //初始化列表数据
        initMoneyLockRecord: '',

        //按钮文字初始化
        btnHtml: '',

        //控制转入活动包按钮
        btnBol: false,


        title: '',

        init_data_url: '',

        log_data_url: '',

        captchaIns: '',


        initNECaptcha_url: '',

      }
    },
    created() {
      let params_id = this.$route.params.id;
      this.title = params_id == 1 ? '空投奖励' : this.$route.params.id == 2 ? '玩家奖励' : '社区奖励';
      if (params_id ==1) {
        this.init_data_url = '/Money/initUsableStaticIncome';
        this.log_data_url = '/Money/getUsableStaticIncomeLog';
        this.initNECaptcha_url = '/Money/receiveUsableStaticIncome';
      }else if (params_id == 2) {
        this.init_data_url = '/Money/initUsableDynamicIncome';
        this.log_data_url = '/Money/getUsableDynamicIncomeLog';
        this.initNECaptcha_url = '/Money/receiveUsableDynamicIncome';
      }else if(params_id == 3){
        this.init_data_url = '/Money/initUsableTeamIncome';
        this.log_data_url = '/Money/getUsableTeamIncomeLog';
        this.initNECaptcha_url = '/Money/receiveUsableTeamIncome';
      }


      this.getInitMoneyLockRecord(this.init_data_url);
      this.getShowData(this.log_data_url)
    },
    methods: {
      //上拉加载数据
      addData() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.addListData(this.log_data_url);
          clearTimeout(setId)
        }, 1000)
      },

      addListData(url) {
        this.loadBol = true;
        getdata_u(url,
          {
            token: this.$token,
            mark: this.$mark,
            p: this.page,
            ps: this.pageDatas,
          }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.$vux.toast.text('数据加载成功');
              this.showData = this.showData.concat(res.data.result)
              this.loadBol = false
            } else {
              this.$vux.toast.text('没有更多数据');
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },

      //获取初始数据
      getInitMoneyLockRecord(url) {
        getdata_u(url,
          {
            token: this.$token,
            mark: this.$mark,
          }).then(res => {
          if (res.data.code == 10000) {
            this.initMoneyLockRecord = res.data.result.userInfo;
            this.btnBol = false;
            if (res.data.result.userInfo.status == 1) {
              this.btnHtml = '领取奖励';
              this.btnBol = true
            } else if (res.data.result.userInfo.status == 2) {
              this.btnHtml = '已领取'
            } else {
              this.btnHtml = '无奖励'
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          this.$vux.toast.text('数据获取失败')
        })
      },


      //获取列表数据
      getShowData(url) {
        this.loadBol = true;
        getdata_u(url,
          {
            token: this.$token,
            mark: this.$mark,
            p: this.page,
            ps: this.pageDatas,
          }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.$vux.toast.text('数据加载成功');
              this.showData = res.data.result;
              this.loadBol = false
            } else {
              this.$vux.toast.text('没有更多数据');
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },

      // 获取奖励
      initNECaptcha(url, data) {
        getdata_u(url, {
          token: this.$token,
          mark: this.$mark,
          validate: data.validate,
          money: this.money,
        }).then(res => {
          this.$vux.loading.hide();
          this.$vux.toast.text(res.data.message);
          this.captchaIns.refresh();
          if (res.data.code == 10000) {
            this.page = 1;
            this.getInitMoneyLockRecord(this.init_data_url);
            this.getShowData(this.log_data_url)
          }
        });
      }

    },
    mounted() {
      //调易盾滑块验证
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
              self.initNECaptcha(self.initNECaptcha_url, data);
            }
          }
        },
        function (instance) {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          self.captchaIns = instance;
        },
        function (err) {
          // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        },
        document.getElementById("get_reward_btn").addEventListener("click", function () {
          if (self.btnBol == true) {
            self.captchaIns.popUp();
          }
        })
      );
    },

  }
</script>
<style lang="less" scoped>
  @import url("../../../styles/record.less");

  .combatGains_top {
    height: 15rem;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10);
    > .combatGains_top_conten {
      height: 8rem;
      padding: 1rem;
      box-sizing: border-box;
      position: relative;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: 2.5rem;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0,0,0,0.10);
      }

      > p {
        height: 3rem;
        line-height: 3rem;
        display: flex;
        color: #333;
        text-align: center;
        font-size: 1.4rem;
        &:nth-child(2) {
          font-size: 1.4rem;
          color: #4B8BF9;
        }
        > span {
          display: inline-block;
          flex: 1;
          max-width: 50%;
          overflow-x: scroll;

        }
      }

    }
    > .combatGains_top_btn {
      height: 4rem;
      color: #fff;
      width: 90%;
      margin: 0 auto;
      background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      line-height: 4rem;
      text-align: center;
      font-size: 1.4rem;
      position: relative;
      opacity: .7;

      &.active {
        opacity: 1;
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

  }

  .formHead {
    color: #333;
    font-size: 1.2rem;
    height: 3rem;
    line-height: 3rem;
    text-indent: 1rem;
    text-align: left;
    background-color: #fff;
  }

  .transaction_record_box {
    width: 100%;
    position: absolute;
    top: 15.5rem;
    bottom: 0;
    .no_data {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        height: 14rem;
        > img {
          display: block;
          width: 8rem;
          height: 10rem;
          margin: 0 auto;
        }
        > p {
          color: #999;
          margin-top: 2rem;
          height: 3rem;
        }
      }
    }
    .record_products {
      .icon {
        span {
          &.green {
            color: #15d171;
            border: 1px solid #15d171;
          }
          &.blue {
            color: yellow;
            border: 1px solid yellow;
          }
        }
      }
      .green {
        color: #15d171;
      }
      .yellow {
        color: darkorange;
      }
      .record_products_center {
        p {
          span {
            &:nth-child(2) {
              float: right;
            }
            &.blod {
              font-weight: bolder;
            }
          }
          &:nth-child(3) {
            border-bottom: 1px solid #666;
          }
          &:nth-child(4) {
            span {
              &.yellow {
                color: #dbba54;
              }
            }
          }

        }
      }
    }
  }
</style>
