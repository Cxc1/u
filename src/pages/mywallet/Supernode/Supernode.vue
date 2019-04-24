<template>
  <div class="Supernode">
    <myHeader title="高级节点">
      <span class="question_icon" v-if="false"></span>
    </myHeader>
    <div class="main">

      <ul class="Supernode_top">
        <li>当前资产包日释放：{{userInfo.free_rate}}‰</li>
        <li>
          <div>
            <p>累计收益 <span>（LTCC）</span></p>
            <p>{{userInfo.total_money}}</p>
          </div>
          <div>
            <p>今日收益<span>（LTCC）</span></p>
            <p>{{userInfo.today_money}}</p>
          </div>
        </li>
      </ul>

      <div class="Supernode_wallet">
        <p class="title">*收益包含资产的收益以及邀请各等级好友获得的战绩收益</p>
        <div class="profit">
          <div class="profit_conter">
            <router-link tag="p" to="/lockIncome">
              <span>资产</span>
              <span>收益</span>
            </router-link>
            <router-link tag="p" to="/combatGains">
              <span>战绩</span>
              <span>收益</span>
            </router-link>
          </div>
        </div>

        <ul class="wallet">
          <router-link tag="li" to="/temporaryPurse">
            <p>临时钱包</p>
            <!--<p>{{userInfo.temp_money}}</p>-->
            <p v-if="times > 0">剩余托管时间：{{times}}H</p>
          </router-link>
          <router-link tag="li" to="lockPurse">
            <p>资产包</p>
            <!--<p>{{userInfo.lock_money}}</p>-->
          </router-link>
          <router-link tag="li" to="/movablePurse">
            <p>活动钱包</p>
            <!--<p>{{userInfo.usable_money}}</p>-->
          </router-link>
          <!--<router-link class="tz" tag="li" to="/integralPures">-->
            <!--<p>通证钱包</p>-->
            <!--&lt;!&ndash;<p>{{userInfo.usable_money}}</p>&ndash;&gt;-->
          <!--</router-link>-->
        </ul>
        <ul class="wallet">
          <router-link class="zj" tag="li" to="/assetsPures">
            <p>战绩钱包</p>
            <!--<p>{{userInfo.usable_money}}</p>-->
          </router-link>
          <router-link class="tz" tag="li" to="/integralPures">
            <p>通证钱包</p>
            <!--<p>{{userInfo.usable_money}}</p>-->
          </router-link>
        </ul>
      </div>

      <div class="myCombatGains">
        <h2>我的战绩 <span v-if="false">什么是我的战绩？</span></h2>
        <ul class="myCombatGains_productors">
          <router-link tag="li" v-for="(item,index) in fanList" :key="index"
                       :to="{path:'/detailedRecord',query: {index: index + 1}}">
            <p><span>M{{item.generation}}</span></p>
            <p>邀请人数</p>
            <p>({{item.num}})</p>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'


  export default {
    name: "Supernode",
    components: {
      myHeader
    },
    data() {
      return {
        //用户初始数据
        userInfo: {},

        //临时钱包数据（弃）
        tempMoney: {},

        //战绩列表数据
        fanList: {},

        //临时钱包时间（弃）
        times: '',

        //（弃）
        dates: '',
      }
    },
    methods: {
      //获取页面初始化数据方法
      getInitSupernodeDate() {
        let Object = this.$qs.stringify({
          token: this.$token, mark: this.$mark
        })
        return this.$http.post(this.api + '/Supernode/initSupernode', Object
        )
          .then(res => {
            if (res.data.code == 10000) {
              this.userInfo = res.data.result.userInfo;
              this.tempMoney = res.data.result.tempMoney;
              this.times = (this.tempMoney.second / 3600).toFixed(1)
              this.fanList = res.data.result.fanList
            } else {
              this.$vux.toast.text(res.data.message)
            }
            this.$vux.loading.hide()
          }).catch(error => {
            this.$vux.loading.hide();
            // 显示文字
            this.$vux.toast.text('数据加载失败')
          })

      },
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      //获取页面初始化数据
      this.getInitSupernodeDate()


    }
  }
</script>

<style lang="less" scoped>
  .question_icon {
    display: inline-block;
    width: 2rem;
    background: url("imgs/question_icon.png") no-repeat center;
    /*background-size: 80%;*/
    margin: .5rem;
    box-sizing: border-box;
    position: absolute;
    right: .5rem;
    top: 0;
    bottom: 0;
  }

  .main {

    /*顶部*/
    > .Supernode_top {
      width: 100%;
      height: 10rem;
      background-color: #1d212d;
      padding: 1rem;
      box-sizing: border-box;
      > li {
        color: #9fa1b0;
        font-size: 1.2rem;
        height: 5rem;
        display: flex;
        &:nth-child(1) {
          height: 3rem;
          line-height: 3rem;
        }
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
              color: #dbba53;
            }
            > span {
              color: #dbba53;
            }
          }
        }
      }
    }
    /*钱包*/
    > .Supernode_wallet {
      width: 100%;
      height: 26.5rem;
      > .title {
        color: #73747e;
        font-size: 1rem;
        line-height: 3rem;
        overflow-x: hidden;
        max-height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-indent: 1rem;
      }
      /*收益*/
      > .profit {
        height: 5rem;
        > .profit_conter {
          width: 50%;
          height: 100%;
          margin: auto;
          > p {
            width: 4rem;
            height: 4rem;
            display: inline-block;
            color: #fff;
            background-color: #a75c1f;
            border-radius: 50%;
            padding: .5rem;
            > span {
              display: block;
              text-align: center;
              line-height: 2rem;
              font-size: 1.3rem;
            }
            &:nth-child(2) {
              float: right;
              clear: both;
              background-color: #1450a1;
            }
          }
        }
      }
      /*钱包*/
      > .wallet {
        height: 8rem;
        padding: 1rem 1rem .5rem;
        display: flex;
        justify-content: center;
        &+ul{
          padding-top: 0;
          >li{
            &:nth-child(2) {
              margin: 0 0 0 .5rem;
            }
          }
        }
        > li {
          flex: 1;
          color: #fff;
          text-align: center;
          padding: 2rem 0rem;
          line-height: 4rem;
          height: 4rem;
          min-width: 32%;
          border-radius: .5rem;
          > p {
            font-size: 1rem;
            overflow-x: scroll;
            white-space: nowrap;

            &:nth-child(1) {
              font-size: 1.2rem;
            }
            &:nth-child(3) {
              font-size: .8rem;
            }
          }
          &:nth-child(1) {
            background: linear-gradient(#ddc738, #ee9515);

          }
          &:nth-child(2) {
            background: linear-gradient(#8c37ed, #6613cd);
            margin: 0 .5rem;
          }
          &:nth-child(3) {
            background: linear-gradient(#FF83FA, #FF69B4);
          }
          &.tz {
            background: linear-gradient(#1fc177, #2baf76);
          }
          &.zj{
            background: linear-gradient(#3e84f5, #1075be);

          }
        }
      }
    }
    /*战绩*/
    > .myCombatGains {
      width: 100%;
      color: #9fa1b0;

      > h2 {
        height: 3rem;
        font-size: 1.2rem;
        line-height: 3rem;
        padding: 0 1rem;
        > span {
          color: #dbba53;
          font-size: 1rem;
          display: inline-block;
          float: right;
        }
      }
      > .myCombatGains_productors {
        width: 100%;
        > li {
          height: 8rem;
          display: inline-block;
          width: 33%;
          float: left;
          background-color: #1e2730;
          padding: 1rem;
          box-sizing: border-box;
          margin-bottom: .2rem;
          &:nth-child(3n+2) {
            margin: 0 .5%;
          }
          > p {
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: 1.1rem;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:nth-child(1) {
              line-height: 2.5rem;
              height: 2.5rem;
            }
            &:nth-child(3) {
              line-height: 1.5rem;
              height: 1.5rem;
            }
            > span {
              color: #dbba53;;
            }
          }
        }
      }
    }
  }
</style>
