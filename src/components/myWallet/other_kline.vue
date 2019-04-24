<template>
  <div class="kline">
    <div class="kline_top">
      <div class="kline_top_left">
        <p>
          当前{{selectItem}}/CNY
        </p>
        <p :class="{myActive : colorBol }">
          {{price.close}}<span v-show="price.degree">{{price.degree}}%</span>
        </p>
      </div>
      <div class="kline_top_right">
        <p>
          高：
          <span> {{price.high}}</span>
        </p>
        <p>
          低：
          <span>
           {{price.low}}
          </span>
        </p>

      </div>
    </div>
    <div class="kline_canvas_box">
      <ve-line
        :data="chartData"
        :legend-visible="false"
        :grid="grid"
        :loading="other_k_loading"
        height="100%"></ve-line>
    </div>
    <div class="kline_foot">
      <p>
        <span :class="{myActive :other_trend_type == 'MONTH'  }"
              @click="$emit('changeoOtherTrend_type', 'MONTH')">月</span>
        <span :class="{myActive :other_trend_type =='W1' }" @click="$emit('changeoOtherTrend_type', 'W1')">周</span>
        <span :class="{myActive :other_trend_type =='D1' }" @click="$emit('changeoOtherTrend_type', 'D1')">日</span>
      </p>
    </div>
  </div>
</template>

<script>
  import {getdata} from "@/services/mining";
  import 'v-charts/lib/style.css'

  export default {
    name: "other_kline",
    props: ['otherRows', 'price', 'other_trend_type', 'other_k_loading', 'selectItem','colorBol'],
    data() {
      this.grid = {
        top: 20,
        bottom: 20,
        left: 10,
        backgroundColor: '#000',
      };
      return {
        chartData: {
          columns: ['dateTime', 'open'],
          rows: this.otherRows
        },
      };
    },
    created() {
    },
    methods: {},
    watch: {
      otherRows: function (value) {
        this.chartData.rows = value;
      },

    }
  }
</script>

<style lang="less" scoped>
  .kline {
    width: 100%;
    height: 30rem;
    padding: 0 2rem;
    box-sizing: border-box;
    background-color: #2e3743;

    > .kline_top {
      height: 5rem;
      display: flex;
      color: #bac4d2;
      padding: .5rem 0;
      > div {
        flex: 1;
        height: 100%;
        &.kline_top_left {
          > p {
            height: 2rem;
            line-height: 2rem;
            font-size: 1.2rem;

            &:nth-child(2) {
              height: 3rem;
              line-height: 3rem;
              font-size: 1.4rem;
              color: #ff4848;
              &.myActive {
                color: green;
              }
              > span {
                font-size: 1rem;


              }
            }
          }
        }
        &.kline_top_right {
          > p {
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 1.4rem;
            > span {
              padding: 0 .5rem;
              float: right;
            }
          }
        }
      }
    }

    > .kline_canvas_box {
      height: 20rem;
      background-color: #eee;

    }
    > .kline_foot {
      height: 4rem;
      width: 40%;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-align: center;
      color: #eee;
      float: right;
      > p {
        width: 100%;
        height: 3rem;
        display: flex;

        > span {
          flex: 1;
          height: 2rem;
          line-height: 2rem;
          margin: 0 .8rem;
          &.myActive {
            border-bottom: 1px solid #3e84f5;
            color: #3e84f5;
          }
        }
      }

    }
  }
</style>
