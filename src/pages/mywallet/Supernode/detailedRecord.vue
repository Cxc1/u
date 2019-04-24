<template>
  <div class="detailedRecord">
    <my-header :title='title'>
      <router-link tag="span" :to="{path : '/rewardDetails' ,query : {index : generation}}" class="right_icon">
        奖励明细
      </router-link>
    </my-header>
    <div class="main">
      <div class="detailedRecord_top">
        <p>邀请好友数量：{{initData.fan_num}}</p>
        <p>邀请好友总业绩（UUC）</p>
        <p>{{initData.total_money}}</p>
      </div>
      <p class="cumulative">累计贡献战绩：{{initData.total_income}} UUC
        <span @click="change_valid">{{validText}}</span>
      </p>
      <div class="recordUser">
        <h1>
          <p>账户</p>
          <p>流通钱包</p>
          <!--<p>等级</p>-->
        </h1>
        <div class="recordUser_box">
          <ul class="recordUser_ul" v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="0">
            <li v-for="(item,index) in RecordDetail" :key="index">
              <p>{{item.user_mobile}}</p>
              <p>{{item.wuc_money}}</p>
              <!--<p>M{{generation}}</p>-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";

  export default {
    components: {
      myHeader
    },
    data() {
      return {

        //好友级数
        generation: this.$route.query.index,

        //初始化初始数据
        initData: '',

        //初始化列表数据
        RecordDetail: [],

        //初始化标题
        title: '我的好友',

        //上拉加载布尔值
        loading: true,

        //初始化默认获取第一页数据
        page: 1,

        valid: 0,
        validText: '',

        //每页数据为15条数据
        pageDatas: 15,

        valid_fan_num: 0,
      }
    },
    created() {

      this.$vux.loading.show({
        text: '数据加载中'
      });

      //标题Mx 级好友
      // this.title = 'M' + this.generation + '级好友';

      //获取初始数据
      getdata_u('/SuperNode/getMoneyRecordDetail', {
        token: this.$token,
        mark: this.$mark,
        generation: this.generation,
      }).then(res => {
        if (res.data.code == 10000) {
          this.initData = res.data.result
          this.valid_fan_num = res.data.result.valid_fan_num;
          this.validText = this.valid == 1 ? '所有邀请' : '有效直推 (' + this.valid_fan_num + ')';
        } else {
          this.$vux.toast.text(res.data.message)
        }
      });

      //获取列表数据
      this.getUserCollectionList()

    },


    methods: {
      change_valid() {

        this.valid = this.valid == 1 ? 0 : 1;
        this.validText = this.valid == 1 ? '所有邀请' : '有效直推 (' + this.valid_fan_num + ')';
        this.page = 1;
        getdata_u('/SuperNode/getUserCollectionList', {
          token: this.$token,
          mark: this.$mark,
          generation: this.generation,
          valid: this.valid,
          page: this.page,
          rows: this.pageDatas
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.loading = true;
            this.RecordDetail = res.data.result;
            this.$vux.toast.text('数据加载成功');
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //获取用户Mx级列表数据
      getUserCollectionList() {
        getdata_u('/SuperNode/getUserCollectionList', {
          token: this.$token,
          mark: this.$mark,
          generation: this.generation,
          valid: this.valid,
          page: this.page,
          rows: this.pageDatas
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.loading = true;
            if (res.data.result.length > 0) {
              this.RecordDetail = this.RecordDetail.concat(res.data.result);
              this.$vux.toast.text('数据加载成功');
              if (res.data.result.length >= this.pageDatas) {
                this.loading = false
              }
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //上拉加载更多数据
      loadMore() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.getUserCollectionList();
          clearTimeout(setId)
        }, 1000)
      }
    },
  }
</script>

<style lang="less" scoped>

  .right_icon {
    width: auto;
  }

  .detailedRecord_top {
    width: 100%;
    height: 11rem;
    background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    color: #fff;
    > p {
      line-height: 3rem;
      &:nth-child(1) {
        font-size: 1.3rem;
      }
      &:nth-child(2) {
        line-height: 2rem;
        font-size: 1.2rem;
      }
      &:nth-child(3) {
        color: #fff;
        font-size: 2.5rem;
        line-height: 4rem;
      }
    }
  }

  .cumulative {
    height: 3rem;
    line-height: 3rem;
    background-color: #6B9DFC;
    color: #fff;
    padding-left: 1rem;
    position: relative;
    > span {
      position: absolute;
      right: 1rem;
    }

  }

  .recordUser {
    color: #b9c7d5;
    text-align: center;
    > h1 {
      display: flex;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.2rem;
      margin-bottom: .2rem;
      padding: 0 1rem;
      background-color: #fff;
      color: #000;
      > p {
        flex: 1;
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
        }
        &:nth-child(3) {
          text-align: right;
        }
      }
    }
    .recordUser_box {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 18.2rem;

      > ul {
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        > li {
          height: 3rem;
          margin-bottom: 1px;
          display: flex;
          line-height: 3rem;
          padding: 0 1rem;
          background-color: #fff;
          color: #000;
          > p {
            flex: 1;
            overflow-x: scroll;
            &:nth-child(1) {
              text-align: left;
              padding: 0;
            }
            &:nth-child(2) {
              /*margin: 0 1rem;*/
              text-align: right;
            }
            &:nth-child(3) {
              text-align: right;
            }
          }
        }
      }

    }
  }
</style>
