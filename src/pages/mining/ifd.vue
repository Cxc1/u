<template>
   <div id="invitefriend">
       <!-- 邀请码 banner图组件 -->
    <header class="header">
         <span class="back" @click="exitP"></span>
        <h2>邀请好友</h2>
    </header>
     <ifd-invite></ifd-invite>
      <!-- 我的战绩组件 -->
     <ifd-invitingGrade></ifd-invitingGrade>
     <!-- 榜单组件-->
     <ifd-contest></ifd-contest>
     <!-- 邀请好友规则 -->
     <ifd-billboard></ifd-billboard>
   </div>
</template>
<script>
import Ifd_banner from '@/components/mining/ifd_invite';
import Ifd_grade from '@/components/mining/ifd_grade';
import Ifd_content from '@/components/mining/ifd_contest';
import Ifd_billboard from '@/components/mining/ifd_billboard';
import {getCookie,exitpage} from '@/utils/tool.js'
export default {
    name:'mining',
    components:{
       [Ifd_banner.name]:Ifd_banner,
       [Ifd_grade.name]:Ifd_grade   ,
       [Ifd_content.name]:Ifd_content,
       [Ifd_billboard.name]:Ifd_billboard,
    },
    data(){
        return{

        }
    },
    methods:{
         exitP(){
             exitpage();
        },

    },
    created(){

    },
    mounted(){

    }
}
</script>

<style lang='less'  scoped>

     #invitefriend{
         position: absolute;
         top: 0;
         right: 0;
         left: 0;
         bottom: 0;

     }

</style>
