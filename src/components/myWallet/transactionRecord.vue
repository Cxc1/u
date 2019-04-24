<template>
  <div class="transactionRecord">
    <div class="recommend" v-show="false">
      <h2>应用推荐</h2>
      <div class="recommend_centre">
        <p>持币生息</p>
        <p>+12.00%</p>
        <p>预计年化收益率</p>
        <p>
          <router-link tag="button" to="/rest">立即加入</router-link>
        </p>
      </div>
    </div>
    <h3 class="formHead">
      最近交易记录
    </h3>
    <ul class="transaction_record_box">
     <!-- <li class="ecord_products record_products_no" v-if="transferlist.length <= 0">
        暂无记录
      </li>-->
      <li class="record_products" v-for="(item ,index) in transferlist" :key="index">
        <div class="icon">
          <span :class="{
            green:item.wt_status ==1,
            yellow:item.wt_status ==2,
            orange:item.wt_status ==3,
            blur:item.wt_status ==4,}">
          {{item.circle}}
          </span>
        </div>
        <div class="record_products_center">
          <p :class="{
              green:item.wt_status ==1,
              yellow:item.wt_status ==2,
              orange:item.wt_status ==3,
              blur:item.wt_status ==4,}">
            <span>{{item.title}}</span>
            <span>数量：{{item.wt_money}}</span>
          </p>
          <p>
            <span>地址：{{item.address}}</span>
            <span>实际扣除：{{item.total}}</span>
          </p>
          <p>
            <span>地址标签：{{item.tag}}</span>
            <span>燃烧：{{item.wt_fees}}</span>
          </p>
          <p :class="{
             yellow : item.wt_status ==1,
             orange: item.wt_status ==2,
             blur  : item.wt_status ==3,
             green : item.wt_status ==4,}">
            <span>{{item.foot}}</span>
            <span>{{item.wt_start_time}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "transactionRecord",
    props: ['transferlist', 'tabIndex'],
    data() {
      return {

      }
    },
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .transactionRecord {
    background-color: #0e1520;

    width: 100%;
    margin-bottom: 5rem;

    overflow-y: scroll;
  }

  .recommend {
    width: 100%;
    height: 16rem;
    background-color: #2e3743;
    margin-bottom: 1rem;
  }

  .recommend > h2 {
    font-size: 1rem;
    color: #11b1ed;
    line-height: 3rem;
    display: flex;
    align-items: center;
  }

  .recommend > h2:before {
    content: '';
    border-right: #11b1ed solid 3px;
    display: inline-block;
    float: left;
    height: 1.2rem;
    margin: 1rem;
  }

  .recommend_centre {
    width: 100%;
    height: 12rem;
    text-align: center;

  }

  .recommend_centre > p:nth-child(1) {
    color: #ccc;
    font-size: 1.3rem;
    line-height: 3rem;
  }

  .recommend_centre > p:nth-child(2) {
    color: #e9316a;
    font-size: 2.4rem;
    line-height: 2.5rem;
  }

  .recommend_centre > p:nth-child(3) {
    color: #ccc;
    font-size: 1rem;
    line-height: 2rem;
  }

  .recommend_centre > p:nth-child(4) {

    font-size: 1.2rem;
    height: 4rem;
    line-height: 4rem;
    margin-top: .5rem;
  }

  .recommend_centre > p:nth-child(4) > button {
    color: #fff;
    width: 60%;
    height: 3rem;
    border-radius: 1.5rem;
    outline: none;
    border: none;
    background: linear-gradient(to right, #13c4ed, #4e73fb);

  }

  .recommend_centre > p:nth-child(4) > button:active {
    opacity: .8;
  }

  .formHead {
    color: #8b939f;
    font-size: 1.2rem;
    margin: .5rem 1rem;
  }

  /*充提币记录*/
  .transaction_record_box {
    width: 100%;
    .record_products_no {
      color: #ccc;
      text-align: center;
      line-height: 9rem;
      font-size: 1.4rem;
      background-color: #0e1520;
    }
    .record_products {
      .icon {
        span {
          &.green {
            color: #15d171;
            border: 1px solid #15d171;
          }
          &.yellow {
            color: #dbba54;
            border: 1px solid #dbba54;
          }
          &.orange {
            color: #e95521;
            border: 1px solid #e95521;
          }
          &.blur {
            color: #2ed0ed;
            border: 1px solid #2ed0ed;
          }
        }
      }
      .green {
        color: #15d171;
      }
      .yellow {
        color: #dbba54;
      }
      .orange {
        color: #e95521;
      }
      .blur {
        color: #2ed0ed;
      }
      .record_products_center {
        p {

          span {
            &:nth-child(2) {
              float: right;
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
