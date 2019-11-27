<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <div @click="gps()" class="location">
          <img src="../../assets/dddd.png" alt="">
          <p>{{dz }} </p>
          <van-icon class="loc-down" name="arrow-down"/>
        </div>
        <div @click="seek()" class="search">
          <van-icon class="icon" color="#EF0600" name="search" size="0.4rem"/>
          <span>&nbsp;&nbsp;&nbsp;搜索</span>
        </div>
      </div>
      <!--轮播图-->
      <div class="swiper-container index_carsel" style="padding:15px;background: #FFFFFF">
        <div class="swiper-wrapper">
          <div :key="index" class="swiper-slide swiper_ses" v-for="(item,index) in carselist">
            <img :src="item.pic" class="main-img">
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper_dot" id="pagination"></div>
      <!--导航按钮-->
      <div class="hot">
        <div :key="index" @click="skip(index)" v-for="(item,index) in hots">
          <img :src="item.img_url" alt="">
          <p>{{item.title}}</p>
        </div>
      </div>
      <!--商品列表-->
      <div :key="item.id" class="index_city" v-for="(item) in list">
        <div @click="market(item.id)" class="city_images">
          <img :src="item.headimg" alt="">
          <div class="bg">
            <span><b>-</b> &nbsp;{{item.name}}&nbsp; <b>-</b></span>
            <p>{{item.intro}}</p>
          </div>
        </div>
      </div>
      <!--商品详情-->

<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
 <div :key="index" class="details-div" v-for="(item,index) in dataList" @click="xianqing(index)">
      <div class="details-one">
        <img :src="item.shoplogo" alt="">
        <p>{{item.name}}</p>
      </div>
      <div class="details-two">
        <div class="details-there">
          <img :src="item.headimg" alt="">
        </div>
        <div class="details-four">
          <p>{{item.title}}</p>
          <p>全球热卖</p>
          <p>断码清仓</p>
          <p>¥<span>{{item.price}}</span></p>
          <p>{{item.distance}}</p>
        </div>
      </div>
    </div>
</van-list>
      <div style="height: 1rem"></div>
      <van-tabbar
        active-color="#EF0600"
        inactive-color="#333333"
        v-model="active4" >
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="hot-o" to="/hd">活动</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/Shop">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/My">我的</van-tabbar-item>
      </van-tabbar>
      <!-- 定位成功-->
      <van-popup v-model="show">
        <div class="van-popup-div">
          <p>当前位置</p>
          <img src="../../assets/diwei.png" alt="">
          <p>{{formattedAddress}}</p>
          <div class="van-popup-div-div">
            <p @click="qux()">取消</p>
            <p @click="que()">确认</p>
          </div>
        </div>
      </van-popup>
      <!--定位失败-->
      <van-popup v-model="showw">
        <div class="van-popup-divv">
          <p></p>
          <img src="../../assets/dingweishibai.png" alt="">
          <p>无法获取当前位置，请确保开启浏览器定位</p>
          <p @click="shou()">手动定位</p>
          <p @click="cong()">重新定位</p>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.3&key=e785b2d68f5c945dd0b7f293c6db3d3b"></script>
<script>
	import areaList from '../../../config/area';
  import Swiper from "swiper"
  import request from "../utils/request.js"
  import Vue from 'vue'
  import { List } from 'vant';
  Vue.use(List); 
  import VueScroller from 'vue-scroller'
  export default {
    name: "home",
    data() {
      return {
				areaList,
        carselist: [],
        hots: [
          {img_url: require("../../assets/img/pinpairemai@2x.png"), title: '品牌热卖'},
          {img_url: require("../../assets/img/duanmaqingcang@2x.png"), title: '断码清仓'},
          {img_url: require("../../assets/img/tjiayouzhe@2x.png"), title: '特价优折'},
          {img_url: require("../../assets/img/jingxuanpaihang.png"), title: '精选排行'},
          {img_url: require("../../assets/meiriqiandao.png"), title: '签到'},
        ],
        list: [],
        items: [],
        dataList: [],
        active4: 0,
        loading: false,
        page: 1,//当前的页码，默认是1
        total: 4,//每页显示的条数，默认是10条
        chang: "",
        dz: window.sessionStorage.getItem('site') || "正在获取",
        dj: "",
        show: false,
        showw: false,
        formattedAddress: "",
        dzz: "",
        dzzz: '',
		lat:'',//weidu
		lnt:'',//jingdu
		shuju:'',
		finished: false,
      }
    },
    methods: {
      gps() {
        this.$router.push({
          name: 'gps',
        })
      },
      seek() {
        this.$router.push({
          name: 'seek',
        })
      },
      skip(i) {
         if (i ==0){
           this.$router.push({
             name: 'reimai',
						 query: {
						   lat:this.lat,
						   lng:this.lng
						 }
           })
         }
        if (i == 4){
          this.$router.push({
            name: 'qd',
          })
        }
        if (i== 1){
          this.$router.push({
            name: 'dm',
          })
        }
        if (i== 2){
          this.$router.push({
            name: 'tj',
          })
        }
        if (i== 3){
          this.$router.push({
            name: 'ph',
          })
        }
      },
      xianqing(i) {
        this.$router.push({
          name: 'wpxq',
          query: {
            goods_id: this.dataList[i].id,
			price:this.dataList[i].price,
            token: 2,
          }
        })
      },
      market(i) {
        this.$router.push({
          name: 'mar',
        })
        window.sessionStorage.setItem("SQ", JSON.stringify(i))
      },
      swiper() {
        this.swiper = new Swiper(".swiper-container", {
          slidesPerView: '1.03',
          /**设置slider容器能够同时显示的slides数量,可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。 */
          centeredSlides: true,
          /**活动块会居中 */
          // spaceBetween:1, /**slide之间的距离 */
          //autoplay:true,
          loop: true,
          autoAdditionalSlides: 20,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
        });
      },
      Site() {
        let a = window.sessionStorage.getItem('site')
        if (a == null) {
          this.getLocation()
        }
      },
      getLocation() { 
				// 从高德地图api获取浏览器定位
			const that = this
			var map1 = new AMap.Map('container1', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function () {
           let geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：5s
				buttonPosition: 'RB',    //定位按钮的停靠位置
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点	
          })
		  map1.addControl(geolocation);
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)
          function onComplete(data) {
		  console.log(data)
		  this.shuju=data
		  this.lat=data.position.lat
		  this.lng=data.position.lng
		  window.sessionStorage.setItem('lat', this.lat)
		  window.sessionStorage.setItem('lng', this.lng)
		  console.log(this.lat,this.lng)
		  let aaa=data.formattedAddress
		  let ccc="路"
		  let eee=data.addressComponent.streetNumber
		   for(var l=0;l<aaa.length;l++){
		  	 if(ccc==aaa[l]){
		  		 that.dzz=aaa.substring(l+1,aaa.length).split(eee).join("")
		  	 }
		   }
		    that.dzz=data.addressComponent.building
            // data是具体的定位信息
             console.log(data)
            // that.dzz = data.addressComponent.township
            //addressComponent.street //data.addressComponent.township
            //that.dzzz=data.addressComponent.street
            that.formattedAddress = data.formattedAddress
            that.show = true
          }
          function onError(data) {
			console.log(data)
            // 定位出错
            that.showw = true
          }
        })
      },
      getLatLngLocation() {
        const that = this
        AMap.plugin('AMap.CitySearch', function () {
          let citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              AMap.plugin('AMap.Geocoder', function () {
                let geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: result.citycode
                })
                let lnglat = result.rectangle.split(";")[0].split(",")
                geocoder.getAddress(lnglat, function (status, data) {
                  if (status === 'complete' && data.info === 'OK') {
                    // data为对应的地理位置详细信息
                    that.show = true
                    that.formattedAddress =data.regeocode.formattedAddress
                    console.log(data)
                    that.dzz = data.regeocode.formattedAddress
                  }
                })
              })
            }
          })
        })
      },
	  onLoad() {
		  console.log(window.sessionStorage.getItem('lat'),window.sessionStorage.getItem('lng'))
	    request({
	      url: "api/index/goods",
	      method: "post",
	      data: {
	        p: this.page,
	        rows: this.total,
	    	lat:window.sessionStorage.getItem('lat'),
	    	lng:window.sessionStorage.getItem('lng')
	      }
	    }).then(res => {
	      console.log(res)
	      let myData = []
	      myData = res.data.data		    
	      for (let i = 0; i < myData.length; i++) {
	        this.dataList.push(myData[i])
	      }
		  if (this.dataList.length >= myData.length) {
		            this.finished = true;
		  }
		  console.log(this.dataList)
	      this.loading = false;
	      this.page = this.page + 1
	    })
	  },
      que() {
        this.show = false
        window.sessionStorage.setItem('site', this.dzz)
        let b = window.sessionStorage.getItem('site')
        window.localStorage.setItem('site', b)
        this.dz = window.localStorage.getItem('site')
      },
      cong() {
        this.getLocation()
        this.showw = false
      },
      shou() {
        this.$router.push({
          name: 'gps',
        })
      },
      qux(){
        var b = '郑州'
        window.localStorage.setItem('site', b)
        window.sessionStorage.setItem('site',b)
        this.dz = window.localStorage.getItem('site')
        this.show = false
      }

    },
    mounted() {
      //this.dataList = shop.data
      //轮播图
      request({
        url: "api/index/adv",
        method: "get"
      }).then(res => {
        this.carselist = res.data.data
        //consoleog(res.data.data)
        this.$nextTick(() => {
          this.swiper()
        })
      })
      request({
        url: "api/index/bigshop",
        method: "post",
      }).then(res => {
        this.list = res.data.data
      })
       this.Site()
    },
    components: {
      VueScroller
    },
    filters: {
      getCaption(obj) {
       // var obj = "河南省郑州市管城回族区商都路街道榆林北路升龙广场"
        var index = obj.lastIndexOf("路");
        obj = obj.substring(index + 1, obj.length);
        var index = obj.lastIndexOf("道")
        obj = obj.substring(index + 1, obj.length);
        return obj;
      }
    }
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
    background: #F7F7F7;
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
    width: 7.5rem;
    height: 0.88rem;
    text-align: left;
    background: #FFFFFF;
  }

  .location {
    font-size: 0.28rem;
    min-width: 2rem;
    height: 0.88rem;
    line-height: 0.88rem;
    position: relative;
    text-align: left;
  }

  .location img {
    width: 0.23rem;
    height: 0.3rem;
    margin-left: 0.3rem;
  }

  .loc-down {
    position: relative;
    top: 0.04rem;
  }

  .location p {
    line-height: 1rem;
    position: relative;
    top: -0.02rem;
    display: inline-block;
    font-size: 0.28rem;
  }

  .search {
    width: 2.5rem;
    height: 0.6rem;
    border: 1px solid rgba(239, 6, 0, 1);
    border-radius: 35px;
    line-height: 0.7rem;
    display: inline-block;
    font-size: 0.3rem;
    color: #CCCCCC;
    margin-top: 0.14rem;
    position: absolute;
    top: 0;
    right: 0.3rem;
    margin-left: 0.1rem;
  }

  .icon {
    position: relative;
    top: 0.08rem;
    left: 0.2rem;
  }

  /*轮播图*/
  .index .index_carsel {
    background: #fff;
    position: relative;
    // padding:15px;
    padding: 0.3rem;
    top: 0.88rem;
    padding-bottom: 0.52rem;
  }

  .swiper_ses {
    /*// margin:0 auto;*/
    text-align: center;
    /*// width:330px !important;*/
    height: 3.2rem;
    /*margin:0 7px !important;*/
    border-radius: 5px;
    overflow: hidden;
  }

  /deep/ .swiper-slide-active {
    transform: scale(1.08);
    /*// box-shadow: 0 0 10px 2px rgb(252, 228, 228);*/
  }

  .swiper_ses .main-img {
    width: 6.25rem;
    height: 3.2rem;
    box-shadow: 0 0 6px 1px rgb(253, 230, 230);
    border-radius: 5px;
    overflow: hidden;
  }

  .swiper_dot {
    position: absolute;
    text-align: center;
    top: 4.2rem;
    right: 0.6rem;
  }

  .swiper-pagination-bullet {
    margin: 0 1px;
    background: none;
    border: 1px solid #EF0600;
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background: #EF0600;
  }

  .swiper-wrapper {
    margin: 6px 0 !important;
  }

  /*  导航按钮*/
  .hot {
    width: 7.5rem;
    height: 1.36rem;
    background: #FFFFFF;
    display: flex;
    font-size: 0.24rem;
    justify-content: space-around;
  }

  .hot img {
    width: 0.88rem;
    height: 0.88rem;
  }

  /*商品列表*/
  .index_city {
    width: 7.5rem;
    height: 2.27rem;
    margin-top: 0.2rem;
    position: relative;
  }

  .index_city img {
    width: 7.5rem;
    height: 2.26rem;
  }

  .bg {
    position: absolute;
    top: 0.55rem;
    color: #FFFFFF;
    left: 50%;
    margin-left: -2.5rem;
  }

  .bg span {
    font-size: 0.36rem;

  }

  .bg p {
    font-size: 0.24rem;
    width: 5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 0.4rem;
  }

  /* 商品详情*/
  .details {
    margin: 0.2rem 0 1rem 0;
  }

  .details-div {
    width: 6.9rem;
    height: 3.2rem;
    background: #FFFFFF;
    margin: 0.2rem auto;
    text-align: left;
  }

  .details-one {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    position: relative;
  }

  .details-one img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin: 0.2rem;
  }

  .details-one p {
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .details-two {
    width: 100%;
    height: 2rem;

    display: flex;
  }

  .details-there {
    width: 2rem;
    height: 2rem;

  }

  .details-there img {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
  }

  .details-four {
    width: 4.8rem;
    height: 2rem;
    position: relative;
    margin-left: 0.2rem;
  }

  .details-four p:nth-child(1) {
    width: 4.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.28rem;
  }

  .details-four p:nth-child(2) {
    display: inline-block;
    background: #EAE4FF;
    font-size: 0.22rem;
    font-weight: 500;
    color: rgba(128, 100, 227, 1);
    padding: 0.05rem;


    margin-top: 0.15rem;
  }

  .details-four p:nth-child(3) {
    display: inline-block;
    background: #FFF0E4;
    font-size: 0.22rem;
    font-weight: 500;
    color: rgba(255, 170, 70, 1);
    padding: 0.05rem;

    margin-left: 0.1rem;
  }

  .details-four p:nth-child(4) {
    position: absolute;
    bottom: 0rem;
    color: #EF0600;
    font-size: 0.15rem;
    margin-left: 0.15rem;

  }

  .details-four p:nth-child(4) span {
    font-size: 0.26rem;
    font-weight: bold;
  }

  .details-four p:nth-child(5) {
    font-size: 0.24rem;
    color: #777777 !important;
    position: absolute;
    right: 0.19rem;
    bottom: 0;
  }

  .van-tabbar {
    position: fixed;
    bottom: -0.06rem;
  }

  ._v-container[data-v-ecaca2b0] {
    position: static;
  }

  .van-popup-div {
    width: 5.6rem;
    min-height: 5.1rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    text-align: center;
    position: relative;
  }

  .van-popup-div img {
    width: 3.4rem;
    height: 2rem;
  }

  .van-popup-div p:nth-child(3) {
    margin: 0 auto;
    width: 4.4rem;
    font-size: 0.24rem;
    color: #333333;
  }

  .van-popup-div-div p:nth-child(1) {

    width: 1.2rem;
    height: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.55rem;
    color: #666666;
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 0.26rem;
    padding: 0!important;

  }

  .van-popup-div-div p:nth-child(2) {

    width: 1.2rem;
    height: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.55rem;
    color: #EF0600;
    border: 1px solid #EF0600;
    border-radius: 0.26rem;

  }

  .van-popup-div-div{
    width: 5.6rem;
    height: 0.8rem;
    display: flex;
    justify-content:space-around;
    position: fixed;
    bottom: 0.3rem;
  }


  .van-popup-div p:nth-child(1) {
    font-size: 0.34rem;
    padding: 0.3rem;
  }



  .van-popup-divv {
    width: 5.6rem;
    min-height: 5.1rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    text-align: center;
    position: relative;
  }



  .van-popup-divv img {
    width: 3.4rem;
    height: 2rem;
  }

  .van-popup-divv p:nth-child(3) {
    margin: 0 auto;
    width: 4.4rem;
    font-size: 0.24rem;
    color: #333333;
  }

  .van-popup-divv p:nth-child(4) {

    width: 1.8rem;
    height: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.5rem;
    color: #EF0600;
    border: 1px solid #EF0600;
    border-radius: 0.26rem;
    position: absolute;
    bottom: 0.4rem;
    left: 0.7rem;
  }

  .van-popup-divv p:nth-child(5) {

    width: 1.8rem;
    height: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.5rem;
    color: #666666;
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 0.26rem;
    position: absolute;
    bottom: 0.4rem;
    right: 0.7rem;
  }

  .van-popup-divv p:nth-child(1) {
    font-size: 0.34rem;
    padding: 0.3rem;
  }


  /deep/ .van-popup {
    border-radius: 0.2rem;
  }

  /deep/ .swiper-pagination-bullet {
    width: 0.098rem !important;
    height: 0.098rem !important;
    margin: 0 0.1rem;
  }

  /deep/ .swiper-pagination-bullet-active {
    background: #EF0600;
  }
</style>
