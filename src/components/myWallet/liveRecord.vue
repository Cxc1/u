<template>
  <ul class="transaction_record_box" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0">
    <li class="record_products">
      <div>
        <p>加入時間：2018-06-13 11:52:63</p>
        <p class="green">生息中</p>
      </div>
      <div>
        <p>轉入數量：<span class="green">160</span> BCB</p>
        <p class="green">年化收益率約：12.00%</p>
      </div>
      <div>
        <p>預計收益：160.2325 BCB</p>
        <p class="green">管理期：14日</p>
      </div>
      <div>
        <p>預計到賬時間：2018-05-15 19_30_30</p>
      </div>
    </li>
  </ul>
</template>

<script>

  export default {
    name: "liveRecord",
    components: {},
    data() {
      return {
        navIndex: 1,
        loading: true
      }
    },
    methods:{
      loadMore() {

      }
    }
  }
</script>

<style lang="less" scoped>
  /*数据*/
  .transaction_record_box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow-y: scroll;
    color: #fff;
    > .record_products {
      height: 9rem;
      padding: .5rem 1rem;
      background-color: #1f2733;
      box-sizing: border-box;
      > div {
        height: 2rem;
        line-height: 2rem;
        color: #ccc;
        display: flex;
        &:nth-child(1) {
          > p:nth-child(2) {
            max-width: 30%;
            font-size: 1.2rem;
            &.green {
              color: #33de60;
            }
          }
        }
        &:nth-child(2), &:nth-child(3) {
          > p:nth-child(1) {
            font-size: 1.1rem;
            > span {
              font-size: 1.2rem;
              &.green {
                color: #33de60;
              }
            }
          }
        }
        &:nth-child(3) {
          border-bottom: 1px solid #333;
        }
        &:nth-child(4) {
          > p {
            width: 100%;
          }
        }
        > p {
          display: inline-block;
          flex: 1;
          overflow-x: scroll;
          white-space: nowrap;
          padding: 0 .5rem;
          /*text-overflow: ellipsis;*/
          &:nth-child(2) {
            text-align: right;
            max-width: 45%;
          }
        }
      }
    }
  }
</style>
