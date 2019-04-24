<template>
  <div class="Information">
    <myHeader title="新闻详情">
    </myHeader>
    <div class="box">
      <h1 id="h1">{{article_title}}</h1>
      <p class="p">{{ time}}</p>
      <div class="ifm_content" ref="box" v-html="article_content">

      </div>
    </div>
  </div>
</template>
<script>
  import {getdata} from '@/services/mining.js'
  import myHeader from '@/common/myHeader.vue'
  import axios from 'axios'
  import API from '../../api'
  import qs from 'qs'

  export default {
    components: {
      myHeader,
    },
    data() {
      return {
        detailarticle: [],
        article_title: '',
        article_content: '',
        time: '',
      }

    },
    methods: {
      //废弃
      getdetailarticle() {
        let id = location.href.split('/')[location.href.split('/').length - 1]
        this.$http.get(api.host + '/article/detailarticle?article_id=' + id).then(res => {
          let result = res.data.result
          this.detailarticle = result
          this.article_title = result.article_title
          this.time = result.article_time
          this.article_content = result.article_content
        }).catch(error => {
          this.getdetailarticle();
        })
      },


      requestdetailarticle() {
        console.log(this.$route.params.id);
        let id = location.href.split('/')[location.href.split('/').length - 1]
        getdata('/news/detail', {
          article_id: id
        }).then(res => {
          let result = res.data.result
          this.detailarticle = result
          this.article_title = result.article_title
          this.time = result.article_time
          this.article_content = result.article_content
        })
      },
    },

    beforeMount() {
      this.requestdetailarticle()
    },
    filters: {
      filterTime: function (value) {
        let time = new Date(parseInt(value) * 1000)
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = time.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + m + '月' + d;
      }
    }
  }
</script>
<style lang="less">
  @import url("../../styles/var.less");
  @import url("../../styles/base.less");

  .box {
    background-color: #fff;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 1.2rem;
    overflow: auto;
    color: #333;
  }


  #h1 {
    color: @bule;
    font-size: 1.6rem;
    padding: 5px 20px;

  }

  .p {
    display: inline-block;
    padding-left: 20px;
    font-size: 1rem;
    color: #999;
  }

  .time {
    color: #ccc;
    padding-left: 2rem;
  }

  .MsoNormal {
    width: 100%;
  }

  .ifm_content {
    padding: 10px 20px;
    background-color: #fff;
    padding-top: 5px;
  }

  .ifm_content img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
  }

</style>
