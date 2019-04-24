<template>
  <div class="account">
    <div class="account_centre">
      <div class="account_centre_count">
        <p>{{productor.money}}</p>
        <p>{{productor.freeze}}</p>
      </div>
      <div class="account_centre_state">
        <p>可用</p>
        <p>审核中</p>
      </div>

    </div>
  </div>
</template>

<script>
  import {getdataBz} from "@/services/mining";

  export default {
    name: "account",
    //接收父组件传值
    props: ['productor', 'tabIndex'],
    data() {
      return {
        //节点布尔值
        supNodebol: true,
        //控制超级节点等的显示
        nodeBol: false,
        //审核数据的显示
        auditShowBol: false,
        node: {
          'leader_node': 0,
          'better_node': 0,
          'super_node': 0,
        },
      }
    },
    created() {
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="less" scoped>
  .account {
    width: 100%;
    height: 6rem;
    background-color: #fff;
    margin-bottom: .5rem;
    position: relative;
    padding-top: 1rem;
    box-sizing: border-box;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    &::before{
      content: '';
      width: 1px;
      height: 2.5rem;
      display: block;
      background: rgba(0,0,0,0.10);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .account_header {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
  }

  .account_header > p {
    flex: 1;
    height: 3rem;
    font-size: 1.2rem;
    margin: 0 1rem;
    line-height: 3rem;
    text-align: center;
    &:nth-last-child(1) {
      max-width: 15%;
    }
  }

  .account_header > .account_header_left {
    color: #9fabbc;
    display: flex;
    font-weight: bolder;
    font-size: 1.4rem;
  }

  .account_header_left > span {
    display: inline-block;
    height: 100%;
    width: 3rem;
    margin-right: .5rem;
    > img {
      max-width: 100%;
    }
  }

  .account_header_right {
    color: #DBBA54;
    text-align: right;

  }

  .account_centre {
    height: 5rem;
    color: #bac4d2;
    text-align: center;
  }

  .account_centre_count {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    display: flex;
    color: #999;
    > p:nth-child(1) {
      color: #333;
      font-weight: bolder;
    }
  }

  .account_centre_count > p, .account_centre_state > p {
    flex: 1;
  }

  .account_centre_state {
    height: 2rem;
    line-height: 1.5rem;
    font-size: 1rem;
    display: flex;
  }

  .account_centre_btn {
    width: 100%;
    height: 4rem;
    margin: auto;
    line-height: 4rem;
    margin-top: 1rem;

    color: #fff;
    font-size: 1.4rem;
    position: absolute;
    bottom: .5rem;
    display: flex;
    > p {
      flex: 1;
      background-color: #DBBA54;
      &:nth-child(1) {
        background-color: #03C086;
      }
    }
  }

  .node {
    height: 3rem;
    width: 100%;
    display: flex;
    overflow-y: hidden;
    > p {
      flex: 1;
      line-height: 3rem;
      max-width: 33%;
      color: #11b1ed;
      > span {
        display: inline-block;
      }
    }
  }

  .Audit {
    text-align: left;
    text-indent: 2rem;
    position: absolute;
    bottom: .5rem;
    color: #e18b2f;
    > span {
      color: #f44336;
    }
  }
</style>
