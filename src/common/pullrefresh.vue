<template>
  <div>
    <!-- <header class="test_header">
        <h2>标题</h2>
    </header> -->
    <div id="iscroller_wrap" ref="iscroller_wrap">
      <div id="iscroller_content" ref="iscroller_content">
        <ul class="downpush">
          <li class="downpushimg" :class="{down: this.downpushStatus==1}">
            <img :src="downpushImg" />
          </li>
          <li class="downpushtext">
            {{downpushText}}
          </li>
        </ul>
        <ul :style="setheight" ref="scroller_box">
          <slot></slot>
        </ul>
        <div style="height:40px">
          <ul class="loadMore" v-show="flag">
            <li class="loadMoreimg" :class="{down: this.loadMoreStatus==1}">
              <img :src="loadMoreImg" />
            </li>
            <li class="loadMoretext">
              {{loadMoreText}}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'p-refresh',
    data(){
      return {
        downpushStatus: 0,//0下拉刷新，1释放立即刷新，2正在刷新
        loadMoreStatus:0,
        setheight:{},
        num:3,
        flag:true,
      }
    },
    methods: {
      hidepullupbox(){
        this.flag=false;
        this.$nextTick(()=>{
          this.refreshpage();
        })
      },
      showpullupbox(){
        this.flag=true;
        this.$nextTick(()=>{
          this.refreshpage();
        })
      },
      //刷新滚动容器
      refreshpage(){
        this.pageScroll.refresh();
        this.pageScroll.scrollTo(0, -40,200);
        this.downpushStatus=0;
      },
      //上拉加载
      pulluploading(){
        this.pageScroll.refresh();
        this.pageScroll.scrollTo(0, this.pageScroll.maxScrollY+40,300);
        this.loadMoreStatus=0;
      },
      refreshbox(){
        this.pageScroll.refresh();
        //  this.$refs.refresh.pulluploading()
      },
      setcontentheight(){
        // console.log(this.$refs.iscroller_wrap.clientHeight)
        // console.log(this.$refs.scroller_box.clientHeight)
        if(this.$refs.iscroller_wrap.clientHeight>this.$refs.scroller_box.clientHeight){
          this.setheight={height:this.$refs.iscroller_wrap.clientHeight+'px'}
          this.$nextTick(()=>{
            //更新轮播页面数量
            this.refreshpage()
          })
        }else{
          this.setheight = {};
          this.$nextTick(()=>{
            //更新轮播页面数量
            this.refreshpage()
          })
        }
      }
    },
    computed: {
      downpushText(){
        switch (this.downpushStatus){
          case 0:
            return '下拉刷新...';
          case 1:
            return '释放立即刷新...';
          case 2:
            return '正在刷新...';
        }
      },
      downpushImg(){
        return this.downpushStatus == 2?'../../../static/imgs/ajax-loader.gif':'../../../static/imgs/down.png';
      },
      loadMoreText(){
        switch (this.loadMoreStatus){
          case 0:
            return '上拉加载...';
          case 1:
            return '释放立即加载...';
          case 2:
            return '正在加载...';
        }
      },
      loadMoreImg(){
        return this.loadMoreStatus == 2?'../../../static/imgs/ajax-loader.gif':'../../../static/imgs/up.png';
      }
    },
    mounted(){
      let self=this;
      //创建滚动视图
      self.pageScroll = new IScroll(self.$refs.iscroller_wrap, {
        probeType: 3
      });
      this.refreshpage();
      this.setcontentheight();
      //1.进入页面，隐藏下拉刷新的div
      self.pageScroll.scrollTo(0, -40);
      self.pageScroll.on('scrollstart', ()=>{
        self.refreshpage();
      });
      //监听滚动时
      self.pageScroll.on('scroll', ()=>{
        if(self.pageScroll.y>-40 && self.pageScroll.y<0){
          self.downpushStatus=0;
        }
        else if(self.pageScroll.y>0){
          self.downpushStatus=1;
        }
        else if (self.pageScroll.y>self.pageScroll.maxScrollY ){
          self.loadMoreStatus=0;
        }
        else if(self.pageScroll.y<self.pageScroll.maxScrollY){
          self.loadMoreStatus=1;
        }
      })
      //监听滚动结束
      self.pageScroll.on('scrollEnd',function(){
        //未达到刷新
        if(self.pageScroll.y<0 &&self.pageScroll.y>-40){
          self.pageScroll.scrollTo(0, -40,200);
        }
        //达到下拉刷新
        else if(self.pageScroll.y==0){
          self.downpushStatus=2;
          self.$emit('refresh-page')
        }
        else if(self.pageScroll.y>self.pageScroll.maxScrollY &&self.pageScroll.y<self.pageScroll.maxScrollY+40){
          self.pageScroll.scrollTo(0, self.pageScroll.maxScrollY+40,200);
        }
        //达到上拉加载
        else if(self.pageScroll.y==self.pageScroll.maxScrollY){
          self.loadMoreStatus=2;
          self.$emit('pullup-loading')
        }
      })
    },
  }
</script>
<style lang="less" scoped>
  @import url("../styles/var.less");
  .test_header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
  }
  #iscroller_wrap{
    width: 100%;
    top: 44px;
    bottom: 0px;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }
  .downpush{
    width: 100%;
    height: 40px;
    display: flex;
    color: white;
    .downpushimg{
      display: inline-block;
      width:45%;
      padding-top: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      img{
        float: right;
        display: inline-block;
        width: 20px;
        transition: 400ms transform;
      }
    }
    .downpushimg.down img{
      transform: rotate(180deg);
    }
    .downpushtext{
      display: inline-block;
      width:55%;
      height: 40px;
      line-height: 40px;
      letter-spacing: 2px;
    }
  }
  .loadMore{
    width: 100%;
    height: 40px;
    display: flex;
    color: white;
    .loadMoreimg{
      display: inline-block;
      width:45%;
      padding-top: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      img{
        float: right;
        display: inline-block;
        width: 20px;
        transition: 400ms transform;
      }
    }
    .loadMoreimg.down img{
      transform: rotate(180deg);
    }
    .loadMoretext{
      display: inline-block;
      width:55%;
      height: 40px;
      line-height: 40px;
      letter-spacing: 2px;
    }
  }
</style>
