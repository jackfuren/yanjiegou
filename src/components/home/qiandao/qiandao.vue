<template>
  <div class="box">
    <div class="box-container">
      <div class="background">
        <!-- 返回 详情-->
        <div class="nav">
          <van-icon @click="fh()" class="nav-left" color="#FFFFFF" name="arrow-left" size="0.5rem"/>
          <p>签到</p>
          <van-icon @click="right()" class="nav-right" color="#FFFFFF" name="wap-nav" size="0.5rem"/>
          <div class="xiala" v-show="xiala">
            <img alt="" src="../../../assets/qiandaoye_xialakuang.png">
            <p @click="wode()" class="xiala-p"><img alt="" src="../../../assets/qiandaoye_wodeqiandao.png">我的签到</p>
            <p class="xiala-pp"><img alt="" src="../../../assets/qiandaoye_qiandaoshuoming.png">签到说明</p>
          </div>
        </div>
        <!-- 轮播图-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div :key="index" @change="slideChange(index)" class="swiper-slide" v-for="(item ,index) in carselist">
              <img :src="item.img_url"  alt="">
              <img :src="item.img_src" alt="" style="width: 2.05rem;height: 0.64rem">
            </div>
          </div>
        </div>
      </div>
      <!-- 内容-->
      <div class="footer" v-show="array == 0 ? true : false">
        <p @click="qiandao()">{{text}} </p>

        <p><img alt="" src="../../../assets/qiandaoye_zhankuang1.png">今日签到战况<img alt="" src="../../../assets/qiandaoye_zhankuang2.png">
        </p>
        <p class="footer-p" v-for="(item , index) in dataList" ><span><img alt="" :src="item.avatar">沿街购</span> {{item.code}}<span>{{item.add_time}}</span></p>

        <p class="footer-di" v-show="false">---我是有底线的---</p>
      </div>
      <div class="footer" v-show="array == 1 ? true : false">
        <p style="background: #CCCCCC">未开始 </p>
        <p><img alt="" src="../../../assets/qiandaoye_zhankuang1.png">签到数据<img alt=""
                                                                               src="../../../assets/qiandaoye_zhankuang2.png">
        </p>
        <img alt="" class="dengdai" src="../../../assets/qiandao_dengdai.png">
        <p>等待签到开始</p>
      </div>
      <div class="footer" v-show="array == 2 ? true : false">
        <p style="background: #CCCCCC">已送出 </p>
        <p><img alt="" src="../../../assets/qiandaoye_zhankuang1.png">获奖用户<img alt="" src="../../../assets/qiandaoye_zhankuang2.png"></p>

        <p class="footer-p" v-for="(item , index) in dataListt" ><span><img alt="" :src="item.avatar">沿街购</span> {{item.code}}<span>{{item.add_time}}</span></p>

        <p class="footer-di" v-show="false">---我是有底线的---</p>
      </div>
      <!--弹出层-->
      <van-popup style="border-radius: 20px" v-model="show">
        <div class="pop">
          <img alt="" src="../../../assets/qiandaoye_qiandaochenggong.png">
          <p>签到成功</p>
          <div class="pop-div">
            <span>您的签到码</span>
            <p>{{code}}</p>
          </div>

        </div>
      </van-popup>


    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import Swiper from "swiper"
 import request from "../../utils/request"
  export default {
    name: "qiandao",
    data() {
      return {
        carselist: [

          {
            img_url: require("../../../assets/img/qiandaoye_shangpin.png"),
            img_src: require("../../../assets/img/qiandaoye_jinriqiandaobaoqian.png")
          },
          {
            img_url: require("../../../assets/img/qiandaoye_shangpin.png"),
            img_src: require("../../../assets/img/mingri.png")
          },
          {
            img_url: require("../../../assets/img/qiandaoye_shangpin.png"),
            img_src: require("../../../assets/img/zuori.png")
          }
        ],
        array:"",
        show: false,
        xiala: false,
        user_id:"", //用户编码
        dataList:[],
        dataListt:[],
        code:"",
        text:"立即签到"

      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'home',
        })
      },
      qiandao() {

        request({
          url: "api/signin/add",
          method: "post",
          data: {
            user_id:this.user_id
          }
        }).then(res => {

          if (res.data.code == 200) {
            this.show = true
            this.code =res.data.data.code
            this.text = "已签到"
            this.Sex()
            this.Sexx()

          }
           if (res.data.code == 0){
           Toast("今天已经签到过了")
           }
        })

      },
      right() {
        this.xiala = !this.xiala
      },
      wode() {
        this.$router.push({
          name: 'wdqd',
        })
      },

      Sex(){
        request({
          url: "api/signin/daysignlist",
          method: "post",
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            this.dataList = res.data.data
          }

        })
      },
      Sexx(){
        request({
          url: "api/signin/daysignlist",
          method: "post",
          data:{
            day:2
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            this.dataListt = res.data.data
          }

        })
      }
    },
    mounted() {
      this.user_id = this.$store.state.username.id
      this.Sex()
      this.Sexx()
      var that =this
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        autoplay: false,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        loopAdditionalSlides: 100,
        on: {
          slideChangeTransitionEnd: function(){
           //切换结束时，告诉我现在是第几个slide
            if (this.activeIndex == 3 ||this.activeIndex == 6){
            that.array = 0
            }
            if (this.activeIndex == 4 ){
              that.array = 1
            }
            if (this.activeIndex == 5 ||this.activeIndex == 2){
              that.array = 2
            }

          },
        },
      });

    },

  }
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }

  .box .box-container {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
  }

  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: white;
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .nav-right {
    position: absolute;
    right: 0.25rem;
    top: 0.2rem;
  }

  .background {
    width: 7.5rem;
    height: 5.79rem;
    background-image: url(../../../assets/qiandaoye_beijing.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 1.1rem;
  }

  .swiper-container {
    margin-top: 0.2rem;
    width: 7.5rem;
    height: 2.5rem;
    overflow: visible !important;
    position: relative;
    top: 2.8rem;
  }

  .swiper-container .swiper-wrapper .swiper-slide {
    width: 5rem;
    border-radius: 0.12rem;
  }

  .swiper-container .swiper-wrapper .swiper-slide img {
    width: 5rem;
    height: 2.5rem;
    border-radius: 0.12rem;

  }

  .swiper-container .swiper-wrapper .swiper-slide img:nth-child(2) {
    width: 2.06rem;
    height: 0.64rem;
    position: relative;
    top: -3rem;
  }


  .swiper-container .swiper-wrapper .swiper-slide-active {
    transform: scale(1.1);
  }

  .footer {
    width: 6.8rem;
    margin: 0 auto;
    clear: both;

  }

  .footer p:nth-child(1) {
    width: 5.5rem;
    height: 0.9rem;
    background: linear-gradient(0deg, rgba(250, 149, 117, 1) 0%, rgba(255, 182, 179, 1) 100%);
    border-radius: 45px;
    font-size: 0.36rem;
    color: white;
    line-height: 0.9rem;
    margin: 0 auto;
  }

  .footer p:nth-child(2) {
    width: 6.8rem;
    height: 0.9rem;
    border-radius: 45px;
    font-size: 0.36rem;
    color: black;
    line-height: 0.9rem;
    margin: 0.3rem auto;
  }

  .footer p:nth-child(2) img {
    width: 0.54rem;
    height: 0.14rem;
    margin: 0 0.1rem;
  }

  .footer-p {
    width: 6.8rem;
    height: 1rem;
    border-radius: 45px;
    font-size: 0.24rem;
    color: black;
    line-height: 1rem;
    margin: 0 auto;
    clear: both;
  }

  .footer-p img {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: relative;
    top: 0.1rem;
    margin-right: 0.15rem;
  }

  .footer-p span:nth-child(1) {
    float: left;
  }

  .footer-p span:nth-child(2) {
    float: right;
  }

  .footer-di {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(204, 204, 204, 1);
  }

  .pop {
    width: 5.6rem;
    height: 4.13rem;
    background: rgba(255, 255, 255, 1);
    margin: 0 auto;
    font-size: 0.28rem;
  }

  .pop img {
    width: 3.4rem;
    height: 2rem;
    margin-top: 0.35rem;
  }

  .pop-div {
    width: 4.2rem;
    height: 1rem;
    margin: 0 auto;
    text-align: left;
    padding-top: 0.3rem;
  }

  .pop-div p {
    display: inline-block;
    float: right;
    padding: 0.1rem;
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 28px;
    color: #EF0A05;
    font-size: 0.3rem;
  }

  .pop-div span {
    font-size: 0.28rem;
    color: #333333;
    position: relative;
    top: 0.1rem;
  }

  .dengdai {
    width: 3.4rem;
    height: 2rem;
    margin: 0 auto;
  }

  .xiala {
    width: 2.9rem;
    height: 1.9rem;
    position: absolute;
    right: 0.2rem;
    top: 0.72rem;

  }

  .xiala img {
    width: 2.9rem;
    height: 1.9rem;
  }

  .xiala-p {
    position: absolute;
    top: 0.2rem;
    left: 0.3rem;
    font-size: 0.3rem;
    color: #FFFFFF;
    text-align: center;
  }

  .xiala-p img {
    width: 0.4rem;
    height: 0.4rem;
    position: relative;
    top: 0.051rem;
    margin-right: 0.2rem;
  }

  .xiala-pp {
    position: absolute;
    top: 0.8rem;
    left: 0.3rem;
    font-size: 0.3rem;
    color: #FFFFFF;
    text-align: center;
  }

  .xiala-pp img {
    width: 0.4rem;
    height: 0.4rem;
    position: relative;
    top: 0.051rem;
    margin-right: 0.2rem;
  }
</style>
