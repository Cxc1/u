<template>
  <div class="commonAddress">
    <myHeader title="常用钱包地址">
      <span class="right_icon" @click="showAddressBox"></span>
    </myHeader>
    <div class="main">
      <ul class="Address_obj">
        <li class="Address_obj_one" v-for="(item,index) in addresslist" :key="index">

          <router-link tag="div" :to="{
          path :'withdrawMoney' ,
          query : {wc_id : wc_id , wal_id : item.wal_id ,tabIndex : tabIndex}
          }" class="Address_obj_one_text">
            <p>{{item.wal_tag}}</p>
            <p>{{item.wal_address}}</p>
          </router-link>
          <span class="img" alt="" @click="showModifyAddressBox(item)"></span>
        </li>
      </ul>
    </div>
    <div class="addAddressBox" :class="{myActive:AddressBoxBol}">
      <h3>{{title}}</h3>
      <p class="address"><input placeholder="请粘贴地址" v-model="address" type="text">
        <img src="../../assets/sysh.png" alt="" v-show="!deleBol" @click="saoyisao"></p>
      <p><input placeholder="请输入地址标签（例：张三）" v-model="addrTag" maxlength="20" type="text"></p>
      <p class="addAddressBox_foot">
        <span :class="{myActive :deleBol}" @click="CanNdelAddress">{{canNdel}}</span>
        <span @click="saveAddress">保存</span>
      </p>
    </div>
    <div class="addAddres" :class="{myActive:AddressBoxBol}" @click="removeHis">

    </div>
    <div class="mask" @click="fotBol=false" :class="{myActive : fotBol}">

    </div>
    <div class="mask_bottom" :class="{myActive : fotBol}">
      <p>确定删除此常用地址？</p>
      <p @click="deleteaddress">删除</p>
      <p @click="fotBol=false">取消</p>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdataBz} from "@/services/mining";
  import {saoyisao} from "@/utils/tool";

  export default {
    name: "commonAddress",
    components: {
      myHeader
    },
    data() {
      return {
        //弹出框
        AddressBoxBol: false,
        //币种id
        wc_id: this.$route.query.wc_id,
        //地址列表
        addresslist: [],


        tabIndex: this.$route.query.tabIndex,
        //地址
        address: '',
        //地址标签
        addrTag: '',
        //是否有删除键
        deleBol: false,
        //
        canNdel: '',
        //弹框标题
        title: '',
        //钱包地址id
        walid: '',
        //控制底部弹框
        fotBol: false,

      };
    },
    methods: {
      //扫一扫方法
      saoyisao() {
        saoyisao()
      },


      // 定义扫码后原生调用的方法，
      showname(name) {
        this.address = name
      },


      //显示弹出框
      showAddressBox() {
        this.AddressBoxBol = true;
        this.deleBol = false;
        this.canNdel = '取消';
        this.title = '添加地址';
        this.address = '';
        this.addrTag = '';
        this.walid = '';
      },


      //隐藏弹出狂
      removeHis() {
        this.AddressBoxBol = false
      },


      //修改地址
      showModifyAddressBox(item) {
        this.AddressBoxBol = true;
        this.deleBol = true;
        this.canNdel = '删除';
        this.title = '修改地址';
        this.address = item.wal_address;
        this.addrTag = item.wal_tag;
        this.walid = item.wal_id
      },


      //底部弹框
      CanNdelAddress() {
        this.AddressBoxBol = false
        if (this.deleBol) {
          this.fotBol = true;
        }
      },


      //删除钱包地址接口
      deleteaddress() {
        getdataBz('/Wallet/deleteaddress', {
          token: this.$token,
          mark: this.$mark,
          walid: this.walid,
        }).then(res => {
          this.$vux.toast.text(res.data.message);
          if (res.data.code == 10000) {
            if (this.addresslist.length > 1) {
              this.getAddresslist();
            } else {
              this.addresslist = ''
            }
            this.AddressBoxBol = false;
            this.fotBol = false;
          }
        })
      },


      //获取钱包地址列表
      getAddresslist() {
        getdataBz('/Wallet/addresslist', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.wc_id,
        }).then(res => {
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.addresslist = res.data.result
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //保存钱包地址
      saveAddress() {
        if (this.address != '' && this.addrTag != '') {
          getdataBz('/Wallet/saveaddress', {
            token: this.$token,
            mark: this.$mark,
            wcid: this.wc_id,
            address: this.address,
            tag: this.addrTag,
          }).then(res => {
            this.$vux.toast.text(res.data.message);
            if (res.data.code == 10000) {
              this.getAddresslist();
              this.AddressBoxBol = false;
            }
          })
        } else {
          if (this.address == '') {
            this.$vux.toast.text('钱包地址不能为空');
          } else if (this.addrTag == '') {
            this.$vux.toast.text('地址标签不能为空');
          }
        }
      },
    },
    created() {
      window.showname = this.showname;
      this.getAddresslist();
    }
  }
</script>

<style lang="less" scoped>

  .commonAddress {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    > .mask {
      position: absolute;
      bottom: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .2);
      display: none;
      &.myActive {
        display: block;
      }
    }
    > .mask_bottom {
      height: 0;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      overflow-y: hidden;
      transition: height .5s;
      z-index: 1;
      &.myActive {
        height: 17rem;
      }
      > p {
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        color: #666;
        font-size: 1.4rem;
        border-radius: .5rem;
        width: 90%;
        margin: auto;
        margin-bottom: 1rem;
        &:nth-child(1) {
          text-align: left;
          font-weight: bolder;

        }
        &:nth-child(2) {
          background-color: #3e84f5;
          color: #fff;

        }
        &:nth-child(3) {
          background-color: #ccc;
        }
      }
    }
  }

  .right_icon {
    width: 2rem;
    background: url("imgs/add_icon.png") no-repeat center;
  }

  .Address_obj {
    overflow-y: scroll;
    .Address_obj_one {
      height: 4.1rem;
      background-color: #fff;
      margin-bottom: 0.5rem;
      position: relative;
      color: #eee;
      .img {
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 1rem;
        margin: auto 0.75rem;
        background: url("imgs/bj.png") no-repeat center;
        background-size: 60%;
        background-color: #4B8BF9 ;
        border-radius: 1rem;
      }
      .Address_obj_one_text {
        height: 100%;
        position: absolute;
        left: 1rem;
        right: 5rem;


        p {
          line-height: 2.2rem;
          font-size: 1.2rem;
          color: #333;
          &:nth-child(2) {
            line-height: 1.4rem;
            font-size: 1rem;
            margin-right: 1rem;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            color: #666
          }
        }
      }
    }
  }

  .addAddres {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    display: none;
    &.myActive {
      display: block;
    }
  }

  .addAddressBox {
    width: 80%;
    height: 15rem;
    background-color: #f4f4f4;
    position: absolute;
    top: -18rem;
    left: 0;
    right: 0;
    margin: auto;
    padding: 0 1.8rem;
    box-sizing: border-box;
    z-index: 1;
    overflow: hidden;
    transition: top .5s;
    display: block;
    background-color: #fff;
    &.myActive {
      top: 25%;
    }
    &.heigth_18 {
      height: 18rem;
    }
    h3 {
      font-weight: 500;
      color: #333;
      font-family: HiraginoSansGB-W3;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.4rem;
    }
    p {
      height: 2.5rem;
      margin-bottom: 1rem;
      box-sizing: border-box;
      &:nth-child(5) {
        text-align: center;
        border-top: 1px solid #ccc;
        line-height: 3rem;
        color: #666;
        &:active {
          color: #bbb;
        }
      }
      input {
        height: 100%;
        width: 100%;
        outline: none;
        border: 1px solid #ddd;
        background-color: #fff;
        padding-left: 0.5rem;
        padding-right: 2.5rem;
        box-sizing: border-box;
      }
    }
    .address {
      position: relative;
      img {
        position: absolute;
        right: 0.3rem;
        height: 60%;
        top: 0;
        bottom: 0;
        margin: auto;
        &.myActive {
          display: none;
        }
      }
    }
    .addAddressBox_foot {
      line-height: 3rem;
      span {
        display: inline-block;
        width: 48%;
        text-align: center;
        color: #b8b8b8;
        &.myActive {
          color: #ff4500;
        }
        &:nth-child(2) {
          color: #4B8BF9 ;
        }
      }
    }
  }
</style>
