<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>发表评价</p>
    </div>
    <div class="concat">
      <div class="concat-div">
        <div class="concat-div-div">
          <img :src="listData.headimg" alt="">
          <p>{{c}}</p>
        </div>
      </div>
      <textarea class="textarea-inherit" v-model="content"
                placeholder="请对商品做个完整的评价吧！让更多的人了解它！"></textarea>
      <div class="posting-uploader">
        <div :key="nn" class="posting-uploader-item" v-for="(item,nn) in postData">
          <img :src="item.content" alt="图片" class="imgPreview">
          <van-icon @click="delImg(nn)" class="delte" name="close" size="0.36rem"/>
        </div>

        <van-uploader :accept="'image/*'" :after-read="onRead" class="up" v-show="postData.length<=3">
          <img alt="等待传图" class="imgPreview" src="../../assets/bangzhu_fankui_tupian.png">
        </van-uploader>

      </div>
      <p>{{postData.length}}/4张</p>
    </div>
    <!--    <p class="ts">最多可上传4张图片，支持：JPG、JPEG、PNG格式</p>-->
    <div class="xing">
      <div class="xing-one">
        <img src="../../assets/logo1.png" alt="">
        <span>沿街购</span>
      </div>
      <div class="xing-two">
        <div>
          <span>物流服务</span>

        </div>
        <div>
          <span>服务态度</span>

        </div>
      </div>
      <van-rate
        v-model="A"
        allow-half
        void-icon="star"
        void-color="#eee"
        class="xing-top"
      />
      <van-rate
        v-model="B"
        allow-half
        void-icon="star"
        void-color="#eee"
        class="xing-bottom"
      />
    </div>
    <!--    <div @click="show1 = true" class="footer">-->
    <div @click="pan()" class="footer">
      <p>发布</p>
    </div>
    <van-popup style="border-radius: 10px" v-model="show1">

      <div class="dc">
        <img alt="" src="../../assets/fankuichenggong.png">
        <p>反馈成功</p>
      </div>

    </van-popup>


  </div>
</template>

<script>
  import request from '../utils/request'
  import {Rate} from 'vant';
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "pingjia",
    data() {
      return {
        show1: false,
        postData: [], //图片
        phDat: [], //图片返回参数
        phone: "", //手机号
        shi: 86400,
        content: "", //文本内容
        user_id: "",//用户编码
        listData: [],
        A: '',
        B: '',
        active:'',
        f:'',
		c:''
      }
    },
    methods: {
      fh() {
		  this.$router.go(-1)
       // if (this.active == 4){
       //   this.$router.push({
       //     name: 'ddd',
       //     query:{
       //       id:this.active
       //     }
       //   })
       // } else if (this.active == 5){
       //   this.$router.push({
       //     name: 'sqsh',
       //     query:{
       //       id:this.f
       //     }
       //   })
       // } else {
       //   this.$router.push({
       //     name: 'Help',
       //   })
       // }
      },
      delImg(index) {
        // 删除指定下标的图片对象
        if (isNaN(index) || index >= this.postData.length) {
          return false
        }
        let tmp = []
        for (let i = 0, len = this.postData.length; i < len; i++) {
          if (this.postData[i] !== this.postData[index]) {
            tmp.push(this.postData[i])
          }
        }
        this.postData = tmp
      },
      onRead(file) {
        // 上传图片到图片服务器
        this.postData.push(file)  // postData是一个数组
        request({
          url: "api/base/base64imgupload",
          method: "post",
          data: {
            file: file.content
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            this.phDat.push(res.data.data['filepath'])
            //console.log(this.phDat)

          }
        })

      },
      pan() {
        request({
          url: "api/goods/comment",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            goods_id: this.listData.gid,
            order_id:this.listData.ogid,
            content: this.content,
            logistics: this.A,
            manner: this.B,
            imgsrc: this.phDat.join(',')
          }
        }).then(res => {
          if (res.data.code == 200){
            Toast('评价成功')
          }
        })


      },

    },
    updated() {

    },
    mounted() {
      this.listData = this.$route.query.b
	  this.c = this.$route.query.c
      this.active =this.$route.query.active
      this.f =this.$route.query.f
      console.log(this.listData)
    },
    components: {
      Rate
    }

  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #F7F7F7;
  }

  .nav p {
    font-size: 0.36rem;

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .concat {
    width: 6.9rem;
    min-height: 5.1rem;
    margin: 0.2rem auto 0;
    background: #FFFFFF;
    border-radius: 10px;
    padding-top: 0.15rem;
  }

  .textarea-inherit {
    width: 90%;
    height: 2rem;
    overflow: auto;
    margin-top: 0.2rem;
    outline: none;
    font-size: 0.24rem;
    border: 0;
  }

  .up img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.11rem;
  }

  .posting-uploader-item {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    margin-left: 0.11rem;
  }

  .posting-uploader-item img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 10px;

  }

  .delte {
    position: absolute;
    z-index: 9999;
    color: black;
    top: -5px;
    right: -5px;
    size: 0.36rem;
  }

  .posting-uploader {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 6.5rem;
    margin: 0.7rem auto 0;
  }

  .concat p {
    font-size: 0.2rem;
    color: #CCCCCC;
    text-align: right;
    width: 6.5rem;
    margin-top: 0.22rem;
  }

  .ts {
    width: 6.9rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #777777;
    font-size: 0.2rem;
    text-indent: 10px;
    text-align: left;
    margin: 0 auto;
  }

  .footer {
    position: fixed;
    width: 5.5rem;
    bottom: 0.38rem;
    left: 50%;
    margin-left: -2.75rem;

  }

  .footer p {
    width: 5.5rem;
    height: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 0.36rem;
    background: #EF0600;
    line-height: 0.9rem;
    border-radius: 10px;
  }

  .lx {
    width: 6.9rem;
    height: 0.8rem;
    border-radius: 10px;
    background: #FFFFFF;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
    text-align: left;
    margin: 0 auto;
    text-indent: 15px;
  }

  .lx input {
    height: 0.8rem;
    font-size: 0.2rem;
    text-indent: 5px;
    border: 0;
  }

  .dc {
    width: 5.6rem;
    height: 3.1rem;
    border-radius: 10px;


  }

  .dc img {
    width: 3.4rem;
    height: 2rem;
    margin-top: 0.35rem;
  }

  .dc p {
    font-size: 0.28rem;
    margin-top: 0.1rem;

  }

  .concat-div {
    width: 6.5rem;
    height: 0.6rem;
    margin: 0 auto 0.15rem;
    position: relative;

  }

  .concat-div-div {
    width: 0.6rem;
    height: 0.6rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;

  }

  .concat-div-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .concat-div-div p {
    width: 5.3rem;
    font-size: 0.24rem;
    color: black;
    position: absolute;
    margin: 0;
    text-align: left;
    top: 0;
    left: 0.88rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .xing {
    width: 6.9rem;
    height: 2.7rem;
    background: white;
    border-radius: 0.1rem;
    margin: 0.2rem auto;
    position: relative;
  }

  .xing-one {
    width: 6.5rem;
    height: 0.6rem;
    padding: 0.15rem 0.2rem;
    text-align: left;
  }

  .xing-one img {
    width: 0.6rem;
    height: 0.6rem;
  }

  .xing-one span {
    font-size: 0.3rem;
    color: #333333;
    position: relative;
    left: 0.2rem;
    bottom: 0.2rem;
    font-weight: bold;
  }

  .xing-two {
    width: 6.9rem;
    height: 1.8rem;
  }

  .xing-two div {
    padding-left: 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.24rem;
    text-align: left;
    position: relative;
  }

  .xing-top {
    position: absolute;
    top: 1.1rem;
    left: 1.4rem;
  }

  .xing-bottom {
    position: absolute;
    bottom: 0.24rem;
    left: 1.4rem;
  }
</style>
