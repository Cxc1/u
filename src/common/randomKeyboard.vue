<template>
  <div class="mains" :class="{myActive :KeyBoardBol}">
    <div class="matte" @click="hideKeyboard"></div>
    <div class="keyboard">
      <div class="getPhoCode " @click="getPhoneCode" :class="{myActive : typeBol}">{{btnText}}</div>
      <p class="iptBox"  :class="{myIptActive : !typeBol}">
        <input :type="iptType"
               disabled="true" v-model="randomKey"/>
      </p>
      <p class="placeholderText " :class="{myActive : !typeBol ,disNone : disNoneBol}">{{placeholderText}}</p>
      <ul>
        <li v-for="(item,index) in product" :key="index" @click="myString(item)">{{item}}</li>
        <li class="del" @click="backspace"></li>
        <li @click="joinMyString">{{last}}</li>
        <li class="comfirm" id="comfirm" @click="comfirmSubmit">确定</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    //接收父组件传值
    props: ['KeyBoardBol', 'typeBol', 'btnText'],
    data() {
      return {
        //定义数字键盘中数字所组成的数组
        randomNum: [5, 0, 7, 3, 1, 9, 6, 2, 8, 4],
        //定义数组接收前9位数字I
        product: [],
        //最后一位数字
        last: '',
        iptType: 'text',
        //输入框中的数据绑定
        randomKey: "",
        disNoneBol: false,
        placeholderText: '请输入手机验证码',
      };
    },
    methods: {
      //点击确定，向父级传递密码,并且变化键盘的数字位置
      comfirmSubmit() {
        this.$emit('comfirmSubmit', this.randomKey);
        this.randomKey = '';
      },
      //点击获取验证码
      getPhoneCode() {
        this.$emit('getPhoneCode');
      },
      //定义方法向父组件传参，隐藏键盘。并且变化键盘的数字位置
      hideKeyboard() {
        this.$emit('hide');
        this.randomKey = ''
      },
      //往输入框中添加值
      myString(item) {
        if (this.randomKey.length < 20) {
          let set = setTimeout(() => {
            this.randomKey += item;
            clearTimeout(set)
          }, 200)
        }
      },
      //往输入框添加位置为键盘最后一位的数值
      joinMyString() {
        if (this.randomKey.length < 20) {
          let set = setTimeout(() => {
            this.randomKey += this.last;
            clearTimeout(set)
          }, 200)
        }
      },
      //回删输入框中的值
      backspace() {
        if (this.randomKey.length > 0) {
          let set = setTimeout(() => {
            this.randomKey = this.randomKey.substring(0, this.randomKey.length - 1);
            clearTimeout(set)
          }, 200)
        }
      }
    },
    created() {
      if (!this.typeBol) {
        this.placeholderText = '请输入安全密码';
        this.iptType = 'password'
      }
      //初始化操作，打乱数字键盘
      const ran = this.randomNum.sort(() => {
        return Math.random() - 0.5
      });
      this.last = ran[ran.length - 1];
      this.product = ran.slice(0, -1);


    },
    watch: {
      //监听键盘的显示隐藏，改变键盘的随机数
      KeyBoardBol: function (value) {
        if (value) {
          const ran = this.randomNum.sort(() => {
            return Math.random() - 0.5
          });
          this.last = ran[ran.length - 1];
          this.product = ran.slice(0, -1);
        }
      },
      //监听键盘的调用类型，改变输入提示
      typeBol: function (value) {
        if (value === true) {
          this.placeholderText = '请输入手机验证码';
          this.iptType = 'text';
          // this.$emit('chengeText','请输入手机验证码')
        } else {
          this.placeholderText = '请输入安全密码';
          this.iptType = 'password';
          // this.$emit('chengeText','请输入安全密码')
        }
      },
      randomKey:function (value) {
        if (value.length > 0) {
          this.disNoneBol = true;
        }else {
          this.disNoneBol = false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  .mains {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0;
    transition: height .2s;
    /*overflow: hidden;*/
    overflow:scroll;
    &.myActive {
      height: 100%;
    }
  }

  /*上半部分蒙版*/
  .matte {
    width: 100%;
    height: 55%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, .1);
  }

  /*下半部分键盘*/
  .keyboard {
    width: 100%;
    height: 45%;
    background-color: #f5f5f9;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    z-index: 9;
    >.placeholderText{
      height: 15%;
      width: 70%;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      &.myActive {
        width: 100%;
      }
      &.disNone{
        display: none;
      }
    }
    > .getPhoCode {
      position: absolute;
      height: 15%;
      align-items: center;
      top: 0;
      right: 0;
      width: 30%;
      z-index: 99;
      justify-content: center;
      background-color: #ccc;
      display: none;
      color: #000;
      &:active {
        background-color: #ddd;
      }
      &.myActive {
        display: flex;
      }
    }
    > input::-webkit-input-placeholder {
      font-size: 1.1rem;
    }
    >.iptBox{
      width: 70%;
      height: 15%;
      position: absolute;
      top: 0;

      &.myIptActive {
        width: 100%;
      }
      > input {
        height: 100%;
        background-color: #fff;
        outline: none;
        border: none;
        padding: 0 1rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 1.2rem;
        width: 100%;
        /* display: flex;
         justify-content: center;
         align-items: center;*/

      }
    }

    /*数字部分*/
    > ul {
      width: 96%;
      height: 81%;
      margin: 2%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: space-around;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      > li {
        width: 30%;
        height: 20%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        box-sizing: border-box;
        font-size: 1.4rem;
        font-weight: 500;
        -webkit-box-shadow: 3px 3px 3px #ccc;
        -moz-box-shadow: 3px 3px 3px #ccc;
        box-shadow: 3px 3px 3px #ccc;
        transition: box-shadow .2s;
        color: #555;
        &:active {
          box-shadow: none;

        }
        /*回删键*/
        &.del {
          background: url("../assets/del.png") no-repeat center;
          background-size: 1.4rem;
          background-color: #aaa;
        }
        /*确定键*/
        &.comfirm {
          background-color: #4c9ee4;
          color: #fff;
        }
      }
    }
  }
</style>


