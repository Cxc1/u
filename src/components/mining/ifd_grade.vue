<template>
    <div class="ifd_content">
       <div class="grade_h">
           我的战绩
       </div>
           
            <ul class="ifdd_grade">                 
                <li @click="skip_next(1)">                             
                    <div class="invit">
                        <p><span>M1</span>({{m1}})</p>
                    </div>                               
                </li>     
                <li @click="skip_next(2)">
                    <div class="invit" >
                        <p><span>M2</span>({{m2}})</p>
                    </div>     
                </li>
                <li @click="skip_next(3)">     
                    <div class="invit">
                        <p><span>M3</span>({{m3}})</p>
                    </div>
                </li>
                <li @click="skip_next(4)">    
                        <div class="invit">
                        <p><span>M4</span>({{m4}})</p>
                    </div>     
                </li>
                <li @click="skip_next(5)">
                    <div class="invit">
                        <p><span>M5</span>({{m5}})</p>
                        <p></p>         
                    </div>
                </li>
                <li @click="skip_next(6)">               
                    <div class="invit" >
                        <p><span>M6</span>({{m6}})</p>
                    </div>               
                </li>        
            </ul>

            <div class="ifd_gains">
                <div class="gains_t">
                    <h2>当前邀请获得收益<router-link to="/ifi"><span>明细</span></router-link></h2>
                </div>
                <div class="gains_b">
                    <div class="gains_all">
                        <p>累计收益<span>（棒棒糖）</span></p>
                        <p>{{totalgains}}</p>
                    </div>
                    <div class="gains_today">
                        <p>今日收益<span>（棒棒糖）</span></p>
                        <p>{{todaygains}}</p>
                    </div>
                </div>
            </div>
      
    </div>
</template>
<script>
import {getdata} from '@/services/mining.js'
export default {
  name:'ifd-invitingGrade',
  data(){
      return{
          m1:'0',//邀请人数
          m2:'0',
          m3:'0',
          m4:'0',
          m5:'0',
          m6:'0',
          todaygains:'0',
          totalgains:'0',
      }
  },
  methods:{
      skip_next(id){
            this.$router.push('/exploits/'+id)
      }
  },
  beforeMount(){
      //获取邀请好友人数  显示六级
       this.$vux.loading.show({
             text: '正在加载中'
       })
      getdata('/users/inviteUsers',{
          mark:this.$mark,
          token:this.$token,
      }).then(result=>{
          if(result.data.code==10000){
             this.todaygains=result.data.result.mycurrencyInfo.todaycurrency;
             this.totalgains=result.data.result.mycurrencyInfo.totalcurrency;
             this.m1=(result.data.result.collectionlist[0]).num;
             this.m2=(result.data.result.collectionlist[1]).num;
             this.m3=(result.data.result.collectionlist[2]).num;
             this.m4=(result.data.result.collectionlist[3]).num;
             this.m5=(result.data.result.collectionlist[4]).num;
             this.m6=(result.data.result.collectionlist[5]).num;
          }else{

          }
           this.$vux.loading.hide()
      })
  }

}
</script>
<style lang="less" scoped>
    @import url("../../styles/var.less");
    .ifd_content{
        background: #1e202d;
        margin-top: 0.1rem;
    }

    .ifdd_grade li div{
        width: 100%;
        height: 3rem;
        position: absolute;
        margin:auto;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
    }
    .ifdd_grade li div p{
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color:#777b86;
        font-weight: 500;
    }
    .ifdd_grade li div p span{
        display: inline-block;
        font-size: 0.833rem;
        font-weight: 500;
        color: #dbba54;
    }
    
    .grade_h{
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 500;
        background: url(imgs/ifd_bg01.png) no-repeat ;
        background-size: 100% 100%;
        color: #a67c40;
    }
   .ifdd_grade{
       background: #13161f;
       width: 100%;
       display: flex;
       flex-wrap: wrap;
       height: auto;
       justify-content: space-between;
        padding-bottom:2px;
       li{
           width: 33%;
           height: 3rem;
           color: #a67c40;
            background: #1d202d;
            margin-top: 2px;
            position: relative;
           
       }
   }
   .ifd_gains{
       width: 100%;
       color: #9fa1b0;
       .gains_t{
           width: 100%;
           h2{
               text-align: center;
               font-size: 1rem;
               height: 3rem;
               line-height: 3rem;
               position: relative;
               span{
                    position: absolute;
                    right: 1rem;;
                   height: 2,4rem;
                   line-height: 2.4rem;
                   font-size: 1rem;
                   color: #dab950;
                   letter-spacing: 0.5rem;
                 
               }
           }
           p{
               text-align: center;
               font-size: 1.6rem;
               height: 3rem;
              
           }
       }

       .gains_b{
           width: 100%;
           background: #1a1e28;
           display: flex;
        
           .gains_all, .gains_today{
               flex: 1;
               text-align: center;
               :nth-child(1){
                   font-size: 1rem;
                   height: 2rem;
                   line-height: 2rem;
                    span{
                       color: #9a7e42;
                   }
               }
               :nth-child(2){
                   font-size: 1.2rem;
                   height: 2rem;
                   line-height: 2rem;
               }
           }
       }
   }
</style>

