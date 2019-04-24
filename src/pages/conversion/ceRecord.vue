<template>

  <div class="order">
    <myHeader title="兑换记录">
      <span class="right_icon">

      </span>
    </myHeader>
    <div class="tabbar">
      <tab active-color='#4B8BF9' default-color='#999' v-model="index">
        <tab-item selected active-color @on-item-click="tabbtn(index)">全部</tab-item>
        <tab-item @on-item-click="tabbtn(index)">队列中</tab-item>
        <tab-item @on-item-click="tabbtn(index)">已完成</tab-item>
      </tab>
    </div>
    <!-- 订单列表 -->
    <div class="transition_box">
      <div class="swiperbox" v-infinite-scroll="requestorderall"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="20"
           ref="cntbox"
           v-show="flag3">
        <div v-for="(item,index) in list1" :key="index" :disabled="item.status!=1">

          <div slot="content" class="list" @click="alertorderdetail(index)">
            <p>
                <span>类型： {{item.currency_name_left}}{{item._money_type}} TO {{item.currency_name_right}}</span>

              <span v-if="item.status==1" style="color:rgb(208, 94, 31)">队列中</span>
              <span v-if="item.status==2"> 已完成</span>
              <span v-if="item.status==3" style="color:#75767a"> 已撤销</span>
            </p>
            <p>
              <span v-if="item.status==1">-{{item.number}}{{item.currency_name_left}}</span>
              <span v-if="item.status==2">+{{item.exchange_number}}{{item.currency_name_right}}</span>
              <span v-if="item.status==3">*******</span>
              <span v-if="item.status==1">发起时间：{{item.create_time}}</span>
              <span v-if="item.status==2">完成时间：{{item.admin_time}}</span>
              <span v-if="item.status==3">撤销时间：{{item.admin_time}}</span>
            </p>
          </div>
          <div class="m_btn">
            <div v-if="item.status == 1" @click="onButtonClick(index)">
              <!--<span class="m_btn_icon"></span>-->
              <span>撤销</span>
            </div>
            <div v-if="item.status == 2" class="complete">
              <!--<span class="m_btn_icon" v-if="item.status == 1"></span>-->
              <span>已完成,无法撤销</span>
            </div>
            <div v-if="item.status == 3" class="mback">
              <!--<span class="m_btn_icon"></span>-->
              <span>已撤销,无法操作</span>
            </div>
          </div>
        </div>

        <!--</swipeout-item>-->
        <!--</swipeout>-->
        <div class="nodata" v-show="!flag">
          <span class="md">已经到最底部了...</span>
        </div>
      </div>

    </div>

    <!-- 查看列表详情 -->
    <div id="orderdetailwrap" v-show="flag1">
      <div class="orderdetailwrap_box">
        <div class="orderdetailwrap_content_top">
          <span @click.prevent.stop="colseorderdetail"></span>
        </div>
        <div class="orderdetailwrap_box_content">
          <p class="orderdetailwrap_user_zt">
            <span>{{orderdetail.user_mobile}}</span>
            <span v-if="orderdetail.status==1" style="color:#d05e1f">队列中</span>
            <span v-if="orderdetail.status==2"> 已完成</span>
            <span v-if="orderdetail.status==3" style="color:#75767a"> 已撤销</span>
          </p>
          <div class="orderdetailwrap_time">
            <p>发起时间：{{orderdetail.create_time}}</p>
            <p>完成时间：{{orderdetail.admin_time}}</p>
          </div>
          <div class="orderdetailwrap_money">
            <p v-if="orderdetail.status==2">实际兑换：</p>
            <p v-else>预计兑换：</p>
            <div>
              <p>-{{orderdetail.number}}{{orderdetail.currency_name_left}}</p>
              <p v-if="orderdetail.status==3">******</p>
              <p v-else>{{orderdetail.exchange_number}}{{orderdetail.currency_name_right}}</p>
            </div>
            <p>注：实际兑换数量以审核时币值为准</p>
          </div>
          <p>估值：{{orderdetail.cny_number}}CNY</p>
          <div class="orderdetailwrap_bottom">
            <div>
              <p>{{orderdetail.currency_name_left}}/CNY</p>
              <p>{{orderdetail.currency_name_right}}/CNY</p>
            </div>
            <div>
              <p>{{orderdetail.price_left}}</p>
              <p>{{orderdetail.price_right}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {Tab, Confirm, TabItem, Swiper, SwiperItem, LoadMore, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import {getdata_u} from '@/services/mining.js'
  import {getCookie, exitpage, gotopromote, hidebottom, showbottom} from '@/utils/tool.js'
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: 'convs',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      LoadMore,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Confirm,
      myHeader

    },
    data() {
      return {
        index: 0,
        showList1: true,
        flag: true,
        flag1: false,
        flag2: true,//订单全部的盒子
        flag3: false,
        listt: [],
        list1: [],//存储全部
        num1: 1,
        num2: 1,
        num3: 1,
        list2: [],//存审核中
        list3: [],//存已审核
        loading: false,
        exchange_status: 0,
        orderdetail: {},
      }
    },
    created() {
      this.requestorderall()

    },
    mounted() {

    },
    methods: {

      requestorderall() {
        this.loading = true;
        if (this.flag) {
          this.$vux.loading.show({
            text: '正在加载'
          })
        }
        getdata_u('/Exchange/uucGetExchangeOrder', {
          token: this.$token,
          mark: this.$mark,
          p: this.num1,
          pagesize: 10,
          exchange_status: this.exchange_status
        }).then(result => {
          if (result.data.code == 10000) {
            for (var i = 0; i < result.data.result.length; i++) {
              this.list1.push(result.data.result[i])
            }
            this.num1++;
          }
          this.loading = false;
          if (result.data.result.length < 10) {
            this.loading = true;
            this.flag = false;
          }
          this.$vux.loading.hide();
          this.flag3 = true;
        })
      },
      tabbtn(i) {
        this.flag3 = false;
        this.list1 = [];//存储全部
        this.num1 = 1;
        this.exchange_status = i;
        this.flag = true;
        this.requestorderall();

      },
      //撤销订单
      onButtonClick(i) {
        let _this = this;
        this.$vux.confirm.show({
          title: '友情提示',
          content: '确定要撤销订单么？',
          onShow() {
          },
          onHide() {
          },
          onCancel() {
            // console.log('plugin cancel')
          },
          onConfirm() {
            //   console.log(_this.list1[i].exchange_id);

            getdata_u('/Exchange/cancelExchangeOrder', {
              token: _this.$token,
              mark: _this.$mark,
              exchange_id: _this.list1[i].exchange_id,
            }).then(result => {
              if (result.data.code == 10000) {
                _this.num1 = 1;
                _this.list1 = [];
                _this.requestorderall()
                _this.$vux.toast.show({
                  text: '撤销成功',
                  width: '9.5rem',
                  type: 'success',
                })
              }

            })

          }
        })
      },
      handleEvents(type) {
        // console.log('event: ', type)
      },
      // 点击弹出订单详情
      alertorderdetail(i) {
        this.flag1 = true;
        this.orderdetail = this.list1[i];
      },
      colseorderdetail() {
        this.flag1 = false;
      }
    }


  }
</script>

<style lang='less' scope>
  @import url("../../styles/record.less");

  .order {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .transition_box {
    position: fixed;
    left: 0;
    right: 0;
    top: 88px;
    bottom: 0;
    color: white;

  }

  .swiperbox {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    > div {
      margin-bottom: .5rem;
    }

  }

  .tabbar {
    position: fixed;
    top: 44px;
    width: 100%;
    height: 44px;
    z-index: 99;
  }

  .list {
    width: 100%;
    height: 5rem;
    padding: 0.5rem 0;
    color: #000;
    background: #fff;
    font-size: 1rem;
    p {
      display: flex;
      padding: 0 1.5rem;
      justify-content: space-between;
      height: 2.5rem;
      line-height: 2.5rem;
    }
    p:nth-child(1) {

      span:nth-child(2) {
        color: #4B8BF9;
      }
    }
    p:nth-child(2) {
      color: #666;
      span:nth-child(2) {
        color: #999;
      }
    }
  }


  #orderdetailwrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    .orderdetailwrap_box {
      width: 80%;
      padding: 3rem 2rem 2rem;
      box-sizing: border-box;
      /*height: 20rem;*/
      background-color: #fff;
      box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.22), 0 2rem 2rem 0 rgba(0, 0, 0, 0.30);
      border-radius: .2rem;
      position: relative;
      > .orderdetailwrap_content_top {
        height: 3rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        > span {
          height: 3rem;
          width: 3rem;
          float: right;
          background: url("imgs/off_icon_2.png") no-repeat center;
          background-size: 30%;
        }
      }
      > .orderdetailwrap_box_content {
        > .orderdetailwrap_user_zt {
          height: 3rem;
          color: #333333;
          font-size: 1.2rem;
          > span:nth-child(2) {
            float: right;
            text-align: right;
            color: #4B8BF9;
          }
        }
        > .orderdetailwrap_time {
          height: 5rem;
          font-size: 1rem;
          color: #999999;
          > p {
            height: 2rem;
            line-height: 2rem;
          }
        }
        > .orderdetailwrap_money {
          height: 5rem;
          color: #333;
          font-size: 1rem;
          >p{
            &:nth-child(1){
              font-size: 1.5rem;
              transform: scale(.5);
              transform-origin: 100% 100%;
            }
            &:nth-child(3){
              font-size: 1.2rem;
              transform: scale(.5);
              transform-origin: 100%;
            }
          }
          >div{
            display: flex;
            >p{
              flex: 1;
              font-size: 1.1rem;
              color: #151515;
              overflow: hidden;
              text-overflow: ellipsis;

              &:nth-child(1){
                text-align: center;
                color: #db3030;
                padding-right: .2rem;
              }
            }
          }


        }
        >.orderdetailwrap_bottom{
          height: 4rem;
          margin-top: 3rem;
          text-align: center;
          position: relative;
          &:before{
            content: '';
            display: block;
            position: absolute;
            width: 1px;
            background: rgba(0,0,0,0.10);
            top: 1rem;
            bottom: .2rem;
            left: 0;
            right: 0;
            margin: auto;
          }
          >div{
            display: flex;
            >p{
              flex: 1;
            }
            &:nth-child(1){
              font-size: 1.2rem;
              color: #333333;
              line-height: 2.5rem;
            }
            &:nth-child(2){
              font-size: 1.1rem;
              color: #4B8BF9;
            }
          }
        }

      }
    }


  }


  .nodata {
    height: 3rem;
    position: relative;
    span {
      text-align: center;
      display: inline-block;
      width: 70%;
      height: 3rem;
      line-height: 3rem;
      color: #9fa1b0;
    }
  }

  .m_btn {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.2rem;
    margin-top: .1rem;
    display: flex;
    justify-content: center;
    background-color: #fff;
    > div {
      width: 100%;
      /*background-color: #171a26;*/
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: .2rem;
      height: 3rem;
      line-height: 3rem;
      color: #FF5858;
      &.mback {
        color: #7f8590;
        > .m_btn_icon {
          background: url("./imgs/mback_icon.png") no-repeat center;
          background-size: 100%;
        }
      }
      &.complete {
        color: #bfc2d3;
      }
      > .m_btn_icon {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        background: url("./imgs/off_icon.png") no-repeat center;
        background-size: 100%;
        margin-right: .5rem;
      }
    }

  }
</style>
