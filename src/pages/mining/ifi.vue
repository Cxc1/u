<template>
  <transition enter-active-class="slideInRight">
    <div class="ifn_num">
      <header class="header">
        <router-link to="/ifd" slot="right">
          <span class="back"></span>
        </router-link>
        <h2>收入明细</h2>
      </header>
      <p-refresh
        @refresh-page='refreshpage'
        @pullup-loading='pulluploading'
        ref='refresh'
        v-if='flag1'>
        <ul class="ifd_list">
          <li v-for="(item,index) in list" :key="index">
            <p>
              <span>{{list[index].cl_explain}}</span>
              <span>+{{list[index].cl_value}} {{list[index].coinname}}</span>
            </p>
            <p>
              <span>{{list[index].name}}</span>
              <span>{{list[index].cl_time}}</span>
            </p>
          </li>
        </ul>
      </p-refresh>


    </div>
  </transition>
</template>
<script>
  import {getdata} from '@/services/mining.js'

  export default {
    name: 'ifn_num',
    // components:{
    //   [Ifn_details.name]:Ifn_details,
    // },
    data() {
      return {
        list: [],
        pageno: 1,
        flag: true,//判断是否有数据的标识，默认有数据
        flag1: false,//数据加载成功后创建动态组件
        flag2: false,
        flag3: true,
      }
    },
    methods: {
      //下拉刷新
      refreshpage() {
        this.$refs.refresh.hidepullupbox();
        this.list = [];
        this.flag2 = true;
        this.pageno = 1;
        this.requesIncomedetails();
      },
      //上拉加载
      pulluploading() {
        this.requesIncomedetails()
      },
      //请求收入明细数据
      requesIncomedetails() {
        //调用请求收入明细数据接口
        getdata('/users/showMyCandy', {
          token: this.$token,
          mark: this.$mark,
          page: this.pageno,
          pagesize: 13,
        })
          .then(result => {
            if (result.data.code == 10000) {
              for (var i = 0; i < result.data.result.length; i++) {
                if (!this.flag1) {
                  this.list.push(result.data.result[i])
                }
                else if (this.flag2) {
                  this.list.push(result.data.result[i]);
                  this.$refs.refresh.showpullupbox();
                  this.$vux.toast.text('刷新成功');
                }
                else {
                  this.list.push(result.data.result[i]);
                  this.$nextTick(() => {
                    this.$refs.refresh.refreshbox();
                  })

                }
              }
              this.pageno++;
              this.flag1 = true;
              this.flag2 = false;
            }
            else if (result.data.code == 10002) {
              this.$vux.toast.text('暂无更多数据');
              this.$refs.refresh.pulluploading();
            }
            else {
              this.$refs.refresh.pulluploading();

            }
          })
      }
    },
    created() {
      this.requesIncomedetails()
    }
  }
</script>

<style lang='less' scoped>
  .ifn_num {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    z-index: 0;
  }

  .ifd_list {
    color: #9fa1b0;

    li {
      height: 4.5rem;

      margin-bottom: 4px;
      padding-top: 0.5rem;
      p {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;

      }
      p:nth-child(1) {
        height: 2rem;
        font-size: 1.2rem;
        :nth-child(1) {
          height: 2rem;
          line-height: 2rem;
        }
        :nth-child(2) {
          height: 2rem;
          line-height: 2rem;
          color: #dbba53;
        }
      }
      p:nth-child(2) {
        height: 1.5rem;
        font-size: 1rem;
        :nth-child(1) {
          height: 2rem;
          line-height: 2rem;
        }
        :nth-child(2) {
          height: 2rem;
          line-height: 2rem;
        }
      }
    }
    li:last-child {
      margin: 0;
    }
  }
</style>
