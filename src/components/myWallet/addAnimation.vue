<template>
  <div class="boxwrap">
    <div id="box">
      <canvas id="canvas"></canvas>
    </div>
    <div class="analog">
      <p>最新算力:</p>
      <div class="nwwest-roll" id="nwwest-roll">
        <ul class="dq_animation_box" id="roll-ul">

          <li class="dq_animation">{{str1}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addAnimation",
    data() {
      return {
        str1: "",
        arr: [],
        animate: true,
      }
    },
    methods: {
      creatStr() {
        let str = "";
        let arr = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',];

        arr.sort(() => {
          return Math.random() - 0.5
        });
        this.str1 = arr.join('')

      },
      creatArr() {

      },

    },
    created() {
      this.creatArr();

    },
    mounted() {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = document.getElementById('box').offsetHeight;
      ;
      canvas.width = document.getElementById('box').offsetWidth;
      var texts = '0123456789zxcvbnmasfdghjklqwertyuiopQWERTYUIOPAS01234567890123456789012345678901234567890123456789'.split('');
      var fontSize = 16;
      var columns = canvas.width / fontSize;
      var drops = [];
      for (var x = 0; x < columns; x++) {
        drops[x] = 1;
      }
      let that = this;

      function draw() {
        ctx.fillStyle = 'rgba( 0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1fc177';
        ctx.font = fontSize + 'px arial';
        for (var i = 0; i < drops.length; i++) {
          var text = texts[Math.floor(Math.random() * texts.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        that.creatStr()
      }

      setInterval(draw, 20);
    }
    ,
    watch: {},

  }
</script>

<style lang="less" scoped>
  #box {
    width: 100%;
    height: 10rem;
    overflow: hidden;
  }

  .boxwrap {
    width: 100%;
    height: 13rem;
  }

  .analog {
    font-size: 1.2rem;
    color: #9fa1b0;
    display: flex;
  }

  .dq_animation_box {
    position: relative;
  }

  .dq_animation {
    position: absolute;
    animation: myAnimation 20ms linear infinite;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #1fc177;
    width: 100%;
  }

  /*@keyframes myAnimation {*/
  /*0% {*/
  /*top: -.5rem;*/
  /*}*/
  /*100% {*/
  /*top: 1rem;*/
  /*}*/
  /*}*/

  .analog>p:nth-child(1) {
    flex: 1;
    display: inline-block;
    padding-left: 1rem;
    height: 3rem;
    line-height: 3rem;
    max-width: 23%;
    float: left;
    box-sizing: border-box;
  }

  .analog>div {
    flex: 1;
    float: left;
    max-width: 77%;
    position: relative;
    overflow: hidden;
    height: 3rem;
    line-height: 3rem;
  }

  .analog>div>p {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    padding-right: 1rem;
    position: absolute;
    color: white;
    box-sizing: border-box;
    white-space: nowrap;
  }
  #roll-ul {
    height: 3rem;
    width: 100%;
    line-height: 3rem;
  }

</style>
