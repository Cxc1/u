<template>
  <div class="rewardDetails">
    <my-header title="奖励明细"/>
    <div class="main">
      <ul class="item_box" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loadBol"
          infinite-scroll-distance="0">
        <li class="record_products" v-for="(item , index) in MoneyLockRewardLog" :key="index">
          <div class="record_products_center">
            <div class="record_products_center_left">
              <p>{{item.money}}</p>
              <p>收益比例：{{item.rate}}‰</p>
            </div>
            <div class="record_products_center_right">
              <p> UUC</p>
              <p>{{item.time}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";

  export default {
    name: "rewardDetails",
    components: {
      myHeader
    },
    data() {
      return {
        //M级数
        grade: this.$route.query.index,

        //默认获取第一页数据
        page: 1,

        //每页数据15条
        pageDatas: 15,

        //列表数据
        MoneyLockRewardLog: [],

        //上拉加载布尔值
        loadBol: true,
      }
    },
    methods: {
      //上拉加载更多数据
      loadMore() {
        this.page += 1;
        this.$vux.loading.show({
          text: '数据加载中'
        });
        let setId = setTimeout(() => {
          this.getMoneyLockRewardLog();
          clearTimeout(setId);
        }, 1000)
      },


      //获取列表数据
      getMoneyLockRewardLog() {
        this.loadBol = true
        getdata_u('/SuperNode/getMoneyRewardLog', {
          token: this.$token,
          mark: this.$mark,
          generation: this.grade,
          page: this.page,
          rows: this.pageDatas
        }).then(res => {
          if (res.data.code == 10000) {
            this.$vux.loading.hide();
            if (res.data.result.length > 0) {
              this.MoneyLockRewardLog = this.MoneyLockRewardLog.concat(res.data.result);
              this.$vux.toast.text(res.data.message)
              if (res.data.result.length >= 15) {
                this.loadBol = false
              }
            } else {
              this.$vux.toast.text('没有更多数据')
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getMoneyLockRewardLog()
    }
  }
</script>

<style lang="less" scoped>
  .record_products {
    background-color: #fff;
    height: 6rem;
    margin-bottom: 0.4rem;
    color: #b9c7d5;
    padding: 1rem;
    box-sizing: border-box;
    .icon {
      height: 100%;
      width: 3rem;
      position: relative;
      float: left;
      span {
        display: inline-block;
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        font-size: 1.2rem;
        text-align: center;
        line-height: 2.8rem;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        box-sizing: border-box;
      }
    }
    .record_products_center {
      width:100%;
      height: 100%;
      float: right;
      display: flex;
      >div{
        flex: 1;
        text-align: left;
        line-height: 1.5rem;
        height:100%;
        max-width: 50%;
        &:nth-child(1){
          max-width: 55%;
        }
        >p{
          overflow: hidden;
          max-height: 100%;
          height: 1.5rem;
          white-space: nowrap;

          &:nth-child(1){
            font-size: 1.2rem;
            line-height: 1.8rem;
            height: 1.8rem;
            overflow-x: scroll;
            margin-right: .5rem;
            color: #000000;
          }
          &:nth-child(2){
            height: 2rem;
            line-height: 2rem;
            color: #333333 ;
          }
          &:nth-child(3){
            color: #666 ;
            text-overflow: ellipsis;
          }
        }
        &.record_products_center_right{
          text-align: right;
          >p{
            &:nth-child(1){
              color: #06C38A ;
            }
            &.r_color{
              color: #FF5858 ;
            }
          }
        }
      }
    }
  }
</style>
