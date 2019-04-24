<template>
    <div class="contest_wrap">
        <div class="contest">
            <!-- 榜单头部 -->
            <div class="ct_header">
                <div class="header_wrap">
                   <p  @click="tab1()" :class="{active:bol}">今日榜单</p>
                   <p @click="tab2()" :class="{active:hosBol}">历史榜单</p>
                </div>
            </div>
            <!-- 榜单banner -->
            <!-- <div class="banner">
                <p>今日我的排名 999+</p>
                <p>当日排名第一的用户奖励</p>
                <p>300bcb糖果</p>
            </div> -->
            <div v-show="isShow">
                <table class="tab"  >
                    <thead>
                        <th>名次</th>
                        <th>账户</th>
                        <th>邀请一级好友数</th>
                    </thead>
                    <tr v-for="(item,index ) in todayPH" :key="index">
                        <td>{{index+1}}</td> 
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                    </tr>
                </table>
                <div class="btn" @click="gettodayph()" >
                    <button v-show="flag1">更多</button>
                    <p class="btnp" v-show="!flag1">已经到最底部</p>
                </div>
            </div>
            <div v-show="!isShow">
                <table class="tab01"  >
                    <thead>
                        <th>名次</th>
                        <th>账户</th>
                        <th>邀请一级好友数</th>
                    </thead>
                    <tr v-for="(item,index ) in historyPH" :key="index">
                        <td>{{index+1}}</td> 
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                    </tr>
                 </table>
                 <div class="btn01">
                    <button @click="gethistoryph()" v-show="flag">更多</button>
                    <P class="btn01p" v-show="!flag">已经到最底部</P>
                </div>
            </div>

             <!-- 榜单头部 -->
            <div class="all_hdWrap" v-show="false">
                <div class="all_hd">
                   <p>总榜单</p>
                </div>
                <h2>5月1日 0：00 - 5月31日24：00</h2>
                <div class="banner02">
                     <p>总榜单第一名将获得</p>
                     <p>1枚ETC</p>
                     <p>我的总榜排名 999+</p>
                </div>
                 <div>
                     <table class="tab02">
                        <thead>
                            <th>名次</th>
                            <th>账户</th>
                            <th>邀请M1级好友数</th>
                        </thead>
                        <tr v-for="(item,index ) in activityPH" :key="index">
                            <td >{{index+1}}</td> 
                            <td>{{item.name}}</td>
                            <td>{{item.count}}</td>
                         </tr>          
                    </table>
                       <div v-if="activityPH.length==0" class="ts">
                         <p>活动暂未开启,敬请等候！！！</p>
                      </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getdata} from '@/services/mining.js'
export default {
    name:'ifd-contest',
    data(){
        return{
            isShow:true,
            bol:true,
            hosBol:false,
            todayPH:[],
            historyPH:[],
            activityPH:[],
            TDcount:1,
            HDcount:1,
            flag:true,//今日榜单更多按钮是否显示标识
            flag1:true,//历史榜单更多按钮是否显示标识

        }
    },
    methods:{
        tab1(){
            this.isShow=true;
            this.bol = true;
            this.hosBol = false;
        },
        tab2(){
            this.isShow=false;
            this.bol = false;
            this.hosBol = true;
        },
        gettodayph(){
             //获取今日榜单数据
             this.$vux.loading.show({
                    text: '正在加载'
             })
            getdata('/users/gettodayoneinviteleaderboard',{
                token:this.$token,
                mark:this.$mark,
                page:this.TDcount,
                pagesize:10,
            })
            .then(result=>{
                if(result.data.code==10000){
                    for(var i=0;i<result.data.result.length;i++){
                        this.todayPH.push(result.data.result[i]);
                    }
                    if(result.data.result.length<10||this.TDcount==10){
                        this.flag1=false;
                    }
                    this.TDcount++;
                }else{
                     this.flag1=false;
                }
                 this.$vux.loading.hide()
            })
        },

        gethistoryph(){
              //获取历史榜单数据
             this.$vux.loading.show({
                    text: '正在加载'
             })
            getdata('/users/getalloneinviteleaderboard',{
                token:this.$token,
                mark:this.$mark,
                page:this.HDcount,
                pagesize:10,
            })
            .then(result=>{
               if(result.data.code==10000){
                    for(var i=0;i<result.data.result.length;i++){
                        this.historyPH.push(result.data.result[i]);
                    }
                  if(result.data.result.length<10||this.HDcount==10){
                      this.flag=false;
                  }
                     this.HDcount++;
                }else{
                     this.flag=false;
                }
            
               
                this.$vux.loading.hide()
            })
        },
        getmonthph(){
             //获取历史榜单数据
            getdata('/users/getfifthmonthinviteleaderboard',{
                token:this.$token,
                mark:this.$mark,
                page:1,
                pagesize:10,
            })
            .then(result=>{
            
            })
        }
    
     },
    beforeMount(){
       this.gettodayph();
       this.gethistoryph();
    },
    mounted(){
        //测试方法  text();
    }

}
</script>
<style lang="less" scoped>
	@import url("../../styles/var.less");
    .contest_wrap{
        width: 100%;
        height: auto;
        background: #22253b;
    }
    .contest{
        width: 100%;
        height: auto;
     
    }
    .ct_header{
        width: 100%;
        height: 4rem;
        background: url('imgs/ifd_02.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        border: 2px solid #22253b;
        box-sizing: border-box;

    }
    .header_wrap{
        width: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        p{
            height: 3rem;
            line-height: 3rem;
            color: #777b86;
            font-size: 1.2rem;
            font-weight: 500;
        &.active{
                border-bottom: 2px solid #a67c40;
                color: #a67c40;
                font-size: 1.4rem;
            }
        }
    }
    .banner{
        width: 100%;
        height: 8rem;
        background:url('imgs/ifd_bn.png') no-repeat center;
        background-size: 100% 100%;
        :nth-child(1){
            width: 50%;
            padding-top:2rem;
            padding-left:3rem; 
            color: #f1e1b0;
            font-size: 1.2rem;
        }
         :nth-child(2){
            width: 50%;
            padding-top:0.5rem;
            padding-left:3rem; 
            color: #f1e1b0;
            font-size: 0.8rem;
            height: 1.3rem;
           
        }
         :nth-child(3){
            margin-top:0.5rem;
            margin-left:3rem; 
            color:white;
            width: 32%;
            height: 1.5rem;
            font-size: 1rem;
            background: url(imgs/ctn01.png) no-repeat center;
            background-size: 100% 100%;
        }
    }
    .tab,.tab01,.tab02{
        width: 100%;
        height: auto;
        background: #13151f;
        padding-bottom: 2rem;
        thead{
           width: 100%;
          border-top:0.5rem solid #13151f;
           th{
               text-align: center;
               height: 2.42rem;
               background: #1d202f;
               color: #a9acb5;
           }
            :nth-child(1){
                width: 30%;
            }
            :nth-child(2){
                width: 40%;
            }
            :nth-child(3){
                width: 30%;
            }
        }
        tr{
             width: 100%;
          border-top:0.5rem solid #13151f;
          td{
              text-align: center;
               height: 2.42rem;
               background: #171925;
               color: #a9acb5;
          }
        }
    }
    .all_hd{
        background: url('imgs/ifd_bn01.png') no-repeat center;
        background-size:100% 100%;
        height: 4rem;
        border: 2px solid #22253b;
        box-sizing: border-box;
        p{
            width: 31.7%;
            margin: 0 auto;
            text-align: center;
            color: #a67c40;
            font-size: 1.2rem;
            font-weight: 500;
            height: 4rem;
            line-height: 4rem;
            
        }
    }
    .all_hdWrap{
        h2{
            text-align: center;
            height: 2.33rem;
            color: #4a4849;
            line-height: 2.33rem;
            font-size: 0.83rem;
            font-weight: 500;
        }
        .banner02{
            width: 100%;
            height: 8rem;
            background:url('imgs/ifd_06.png') no-repeat center;
            background-size: 100% 100%;
            :nth-child(1){
                width: 50%;
                padding-top:2rem;
                padding-left:3rem; 
                color:#f1e1b0;
                font-size: 1.2rem;
            }
            :nth-child(2){
                width: 50%;
                padding-top:0.5rem;
                padding-left:3rem; 
                color: #f1e1b0;
                font-size: 0.8rem;
                height: 1.3rem;
            
            }
            :nth-child(3){
                margin-left:3rem; 
                color:#f1e1b0;
                width: 50%;
                height: 1.5rem;
                font-size: 1rem;
            }
        }
    }
    .btn,.btn01{
        width: 100%;
        height: 4rem;
        border-top:0.5rem solid #13151f;
        background: #171925;
        position: relative;
        button{
            border: none;
            border: 1px solid #a67c40;
            width: 7rem;
            height: 2rem;
            background: #171925;
            position: absolute;
            color: #a2a5ae;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
        .btn01p{
            width: 100%;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            color: #a2a5ae;
            font-size: 1.3rem;
        }
        .btnp{
             width: 100%;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            color: #a2a5ae;
            font-size: 1.3rem;
        }
    }
    .ts{
        width: 100%;
        height: 5rem;
        position: relative;
         background: #1d202f;
         border: 1px solid#13151f;
        p{
            height: 2rem;
            text-align: center;
            font-size: 16px;
            color: #a2a5ae;
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }
    }
</style>
