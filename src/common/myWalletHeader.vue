<template>
  <div class="myWalletHeader">
    <header>
      <span class="link_icon" @click="goback"></span>
      <h3 class="title"><!--{{selectItem}}-->流通钱包</h3>
      <span class="dom_icon" :class="{myActive:selectShowBol}" v-if="false" @click="changeSelectShowBol"></span>

      <span class="add_icon" @click="saoyisao"></span>
    </header>
    <ul class="select" v-if="false" :class="{myActive : selectShowBol}">
      <li>
        <p class="select_option">已托管的币种</p>
        <p class="select_num">当前拥有的数量</p>
      </li>
      <li class="select_option_item"
          v-for="(item , index) in currencylist"
          :key="index" :class="{myActive : index === selectIndex}" @click="changeSelectIndex(item,index)">
        <p class="a">{{item.wc_name}}</p>
        <p class="">{{item.money}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {saoyisao} from "@/utils/tool";
  import {showbottom} from "@/utils/tool";
  import {AlertModule} from 'vux'
  export default {
    //接收父组件传值
    props: ['currencylist', 'selectIndex', 'selectItem', 'wc_id'],
    data() {
      return {
        addWalletAddressShow: false,
        //控制选项框布尔值
        selectShowBol: false,
      };
    },
    methods: {
      goback() {
        this.$router.isBack = true;
        if (this.$route.query.e) {
          this.$router.push('/purse');
        } else {
          this.finish();
        }
      },

      //定义跳转到K线图事件，父组件执行事件
      toKline() {
        this.$emit('goback')
      },
      //点击加好，显示和隐藏扫一扫和添加钱包地址
      changeAddWalletAddressShow() {
        this.addWalletAddressShow = !this.addWalletAddressShow
      },
      //切换选项框显示隐藏
      changeSelectShowBol() {
        this.selectShowBol = !this.selectShowBol
      },
      //切换选择对象
      changeSelectIndex(item, index) {
        this.changeSelectShowBol();
        this.$emit('changeItem', index, item);
      },
      //调原生扫码
      saoyisao() {
        if (this.selectIndex == '0') {
          AlertModule.show({
            content: 'UUC提币功能暂时关闭',
          })
        } else {
          saoyisao()
        }

      },
      //显示底部
      showbottom() {
        showbottom();
      },
      // 定义扫码后原生调用的方法，
      showname(name) {
        this.$emit('fillInput', name)
      },
    },
    created() {
      //把方法定义在window上给原生调用
      window.showname = this.showname;
      this.showbottom()
    },
    wacth: {},

  }
</script>

<style lang="less" scoped>
  header {
    height: 46px;
    width: 100%;
    background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
    position: fixed;
    top: 0;
    display: flex;
    align-content: center;
    justify-content: center;
  }

  header > h3.title {
    color: #fff;
    line-height: 46px;
    height: 46px;
    font-size: 1.5rem;
  }

  .add_icon {
    display: inline-block;
    width: 2rem;
    background: url("../assets/sys.png") no-repeat center;
    margin: .5rem;
    box-sizing: border-box;
    position: absolute;
    right: .5rem;
    top: 0;
    bottom: 0;
  }

  header > .dom_icon {
    display: inline-block;
    width: 2rem;
    background: url("../assets/dom_icon.png") no-repeat center;
    margin: .5rem;
    box-sizing: border-box;
    transform: rotate(0);
    transition: transform .5s;
    &.myActive {
      transform: rotate(180deg)
    }
  }

  .link_icon {
    position: absolute;
    left: .5rem;
    width: 3rem;
    height: 100%;
    background: url("../assets/back_icon.png") no-repeat center;
    background-size: 60%;
  }

  .hide_content {
    height: 8rem;
    width: 12rem;
    background-color: #575d63;
    position: fixed;
    right: 1.5rem;
    top: 4.5rem;
    color: #e7e7e7;
    display: none;
    &.myActive {
      display: block;
    }
  }

  .hide_content > div {
    border: .5rem solid #575d63;
    border-left-color: transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    position: absolute;
    top: -1rem;
    right: .5rem;
  }

  .hide_content > li {
    margin: 0 10%;
    height: 4rem;
    line-height: 4rem;
    /*display: flex;*/
    /*align-content: center;*/
    /*justify-content: center;*/

  }

  .hide_content > li:nth-child(2) {
    border-bottom: 1px solid #000;
  }

  .hide_content > li > .sys {
    display: inline-block;
    height: 3rem;
    width: 30%;
    background: url("../assets/sys.png") no-repeat center;
    margin: .5rem;

  }

  .hide_content > li > span {
    display: inline-block;
    float: left;
  }

  .hide_content > li > .add_adress {
    display: inline-block;
    height: 3rem;
    width: 30%;
    background: url("../assets/add_adress.png") no-repeat center;
    margin: .5rem;
  }

  .select {
    position: absolute;
    top: 46px;
    width: 100%;
    height: 0;
    background-color: #f4f4f4;
    transition: height .5s;
    z-index: 99;
    overflow-y: scroll;
    &.myActive {
      height: calc(~'100% - 46px');
    }
  }

  .select > li {
    background-color: #fff;
    text-align: center;
    display: flex;
    border-bottom: 1px solid #ddd;

  }

  .select > li.myActive {
    background-color: #3782b6;
    color: #eee;
  }

  .select > li {
    color: #333;
  }

  .select > li > p {
    flex: 1;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }

  .select > li > p:nth-child(1) {
    text-align: left;
    text-indent: 2rem;
  }

  .select > li > p:nth-child(2) {
    text-align: right;
    margin-right: 2rem;
  }

  .select > li > .select_num {
    color: #666;
  }

  .select > li.select_option_item:hover {
    background-color: #3782b6;
    color: #ddd;
  }

  .select {
    position: absolute;
    top: 46px;
    width: 100%;
    height: 0;
    background-color: #f4f4f4;
    transition: height .5s;
    overflow-y: hidden;
    z-index: 99;
    overflow-y: scroll;
  }

  .select > li {
    background-color: #fff;
    text-align: center;
    display: flex;
    border-bottom: 1px solid #ddd;

  }

  .select > li.active {
    background-color: #3782b6;
    color: #eee;
  }

  .select > li {
    color: #333;
  }

  .select > li > p {
    flex: 1;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }

  .select > li > p:nth-child(1) {
    text-align: left;
    text-indent: 2rem;
  }

  .select > li > p:nth-child(2) {
    text-align: right;
    margin-right: 2rem;
  }

  .select > li > .select_num {
    color: #666;
  }

  .select > li.select_option_item:hover {
    background-color: #3782b6;
    color: #ddd;
  }

  .book {
    position: absolute;
    right: 5rem;
    top: 0;
    height: 100%;
    line-height: 46px;
  }

</style>
