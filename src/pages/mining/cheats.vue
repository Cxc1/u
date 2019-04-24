<template>
 <transition enter-active-class="slideInRight">
        <div v-show="flag">
             <div class="cheatsbg">
            </div>
           <header class="header">
                 <span class="back" @click="exitP"></span>
            <h2>算力秘籍</h2>
          </header>
            <div class="cheatswrap">
                    <div class="cheats">
                        <div class="cheats_t">
                                <h2>什么是HC</h2>
                                <!-- <p>信链BCB是将区块链与“公益慈善”相结合的技术，借助区块链去中心化、分布式数据库等技术特点，使公益慈善的全过程更加安全、透明，使“用商业理念做公益”成为可能，最终实现公益活动的长期可持续性。</p>
                                <p>如果试图以传统方式解决上述问题，需要投入大量的物流监控成本、财务审计成本、信息采集和分析成本，只有如此才能保证公益活动的高透明度。然而这仍然遗留两个问题：如何向公众证明他们看到的结果是真实的，相关人员的回报问题依然无法解决。另一方面，由于大量成本的投入，会极大地降低资金使用效率。</p>
                                <p>信链是关于信仰、关于公益的区块链，是一种和比特币、以太坊类似性质的区块链技术。</p>
                                <p>信链是将区块链与“公益慈善”相结合的技术，借助区块链去中心化、分布式数据库等技术特点，记录整个公益活动的过程和结果，形成从公益资源捐赠开始，经过公益渠道、公益组织的一系列活动，最终将物资送抵受益人群这个链条的完整记录，每项捐赠资源的去向都将得到记录。</p>
                                <p>信链的分布式特点和不可篡改性，让它可以成为公益活动中的价值载体，随着公益规模的扩大，信链的升值也成为必然，这为捐赠者提供了获得回报的可能。</p> -->
                        </div>
                        <div class="cheats_t cheats_b">
                                <h2>什么是算力</h2>
                                <!-- <p>信链BCB是将区块链与“公益慈善”相结合的技术，借助区块链去中心化、分布式数据库等技术特点，使公益慈善的全过程更加安全、透明，使“用商业理念做公益”成为可能，最终实现公益活动的长期可持续性。</p>
                                <p>如果试图以传统方式解决上述问题，需要投入大量的物流监控成本、财务审计成本、信息采集和分析成本，只有如此才能保证公益活动的高透明度。然而这仍然遗留两个问题：如何向公众证明他们看到的结果是真实的，相关人员的回报问题依然无法解决。另一方面，由于大量成本的投入，会极大地降低资金使用效率。</p>
                                <p>信链是关于信仰、关于公益的区块链，是一种和比特币、以太坊类似性质的区块链技术。</p>
                                <p>信链是将区块链与“公益慈善”相结合的技术，借助区块链去中心化、分布式数据库等技术特点，记录整个公益活动的过程和结果，形成从公益资源捐赠开始，经过公益渠道、公益组织的一系列活动，最终将物资送抵受益人群这个链条的完整记录，每项捐赠资源的去向都将得到记录。</p>
                                <p>信链的分布式特点和不可篡改性，让它可以成为公益活动中的价值载体，随着公益规模的扩大，信链的升值也成为必然，这为捐赠者提供了获得回报的可能。</p> -->
                        </div>
                    </div>

                    <p class="bottombtn" @click="promote">立即提升算力</p>


                </div>
         </div>
 </transition>
</template>
<script>
import {getCookie,exitpage,gotopromote} from '@/utils/tool.js'
export default {
    name:'cheats',
    components:{

    },
    data(){
        return{
         flag:false,
        }
    },
    methods:{
        //退出页面
        exitP(){
             exitpage();
        },
        //跳转到算力秘籍页面
        promote(){
            gotopromote();
        }
    },
    mounted(){
        this.flag=true;
    }
}
</script>

<style lang='less'  scoped>
     @import url("../../styles/record.less");
      #invitefriend{
         position: absolute;
         top: 0;
         right: 0;
         left: 0;
         bottom: 0;

     }
    header{
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9998;
    background: #1d202d;
    color: white;
    h2{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
    }
}
.back{
    position: absolute;
    top: 0;
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../../assets/back_icon.png)  no-repeat  center;
    background-size:50%;
}
     .cheatsbg{
         position: fixed;
         padding-top:8rem;
         padding-bottom:2rem;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background: url(/static/imgs/cheats_bg.png)   no-repeat;
         background-size: 100% 100%;
         z-index: 0;
     }
     .cheatswrap{
         position: relative;
         padding-top:8rem;
         padding-bottom:2rem;
         top: 0;
         left: 0;
         right: 0;
         bottom: 44px;
         z-index: 9;
     }
     .cheats_t{
         width: 80%;
         margin: 0 auto;
         background:white;
         padding-top:2rem;
         margin-bottom:3rem;
         padding-bottom:2rem;
         border-radius: 8px;
            p{
                margin-top: 1rem;
                font-size: 0.75rem;
                color: #848484;
                text-indent: 1.5rem;
                padding: 0 1rem;
                }
            h2 {
            width: 11.67rem;
            height: 2.91rem;
            background: #d4b04a;
            border-radius: 2.91rem;
            margin: 0 auto;
            text-align: center;
            line-height: 2.91rem;
            font-size: 1.1rem;
            color: #fff;
        }
       .cheats_b{

       }
        .cheats{
            position: absolute;
            top: 0;
            z-index: 99;
        }
}
  .bottombtn{
        height: 4rem;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        background: #d4b04a;
        line-height: 4rem;
        position: fixed;
        bottom: 0;
     }
</style>

