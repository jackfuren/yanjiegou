<template>
  <div class="box">
    <div class="box-container">
      <!--轮播图-->
      <div class="swiper-container index_carsel" style="padding:15px;background: #FFFFFF">
        <div class="swiper-wrapper">
          <div :key="index" class="swiper-slide swiper_ses" v-for="(item,index) in carselist"><img :src="item.pic"
                                                                                                   class="main-img">
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper_dot" id="pagination"></div>
      <div class="allow"></div>
      <div class="category_list">
        <ul>
          <li :class="{active:index === num}" :key="index" @click='tab(item,index)' v-for="(item,index) in titleItem"><a
            href="#"><span><img :src="item.img_url" alt=""></span><span>{{item.title}}</span></a></li>
        </ul>
        <div class="category_list_items">

          <div class="category_list_items-div">
          <div class="category_list_item_top"><span>{{title}}</span></div>
          <div class="category_list_content">
            <div class="category_list_content1">
              <div :key="index" class="category_list_item" v-for="(content,index) in contents" @click="xiangqing(content.id)">
                <div class="category_list_items_left"><img :src="content.headimg" alt=""></div>
                <div class="category_list_items_right">
                  <p class="category_title">{{content.name}}</p>
                  <p class="category_adress">{{content.name}}</p>
                  <p class="category_price"><span>￥<span style="font-size: 0.3rem;font-weight: bold">{{content.price}}</span><a href="#">￥{{content.price}}</a></span><span>&lt;{{content.sid}}公里</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          </div>

        </div>
      </div>
      <van-tabbar
        active-color="#EF0600"
        inactive-color="#333333"
        v-model="active4"
      >
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="hot-o" to="/hd">活动</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/Shop">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/My">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper"
  import  request from "../utils/request"
  export default {
    name: "huodong",
    data() {
      return {
        title: '热销',
        num: 1                       ,//活动下标
        active4: 1,
        carselist: [],
        titleItem: [
          {img_url: require("../../assets/img/activity_leftbar_rexiao.png"), title: '热销'},
          {img_url: require("../../assets/img/activity_leftbar_zhekou.png"), title: '折扣'},
          {img_url: require("../../assets/img/activity_leftbar_xinpin.png"), title: '新品'},
          {img_url: require("../../assets/img/activity_leftbar_tuangou.png"), title: '团购'},
          {img_url: require("../../assets/img/activity_leftbar_cuxiao.png"), title: '促销'},
          {img_url: require("../../assets/img/activity_leftbar_youxuan.png"), title: '优选'},
          {img_url: require("../../assets/img/activity_leftbar_tejia.png"), title: '特价'},
        ],
        contents: [],

      }
    },
    methods: {
      tab(item, index) {
        this.num = index;
        this.title = item.title
        //console.log(this.num)
        request({
          url: "api/activity/index",
          method: "post",
          data:{
            type:this.num,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng')
          }
        }).then(res => {
					console.log(this.$store.state.lat,this.$store.state.lng)
          this.contents =res.data.data
          console.log(res)
        })
      },
      swiper() {
        this.swiper = new Swiper(".swiper-container", {
          slidesPerView: '1.01',
          /**设置slider容器能够同时显示的slides数量,可以设置为数字（可为小数，小数不可loop），               或者 'auto'则自动根据slides的宽度来设定数量。 */
          centeredSlides: true,
          /**活动块会居中 */
// 　　　　　　spaceBetween:10, /**slide之间的距离 */
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
          }
        });
      },
      xiangqing(i){
        this.$router.push({
          name: "wpxq",
          query:{
            goods_id:i,
            token:1
          }
        })
      }
    },
    mounted() {
      request({
        url: "api/activity/index",
        method: "post",
        data:{
          type:1,
		  lat:window.sessionStorage.getItem('lat'),
		  lng:window.sessionStorage.getItem('lng')
        }
      }).then(res => {
         this.contents =res.data.data
        console.log(this.contents)
      })
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
    }
  }
</script>

<style lang="less" scoped>

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

  .swiper-slide-active {
    transform: scale(1.08);
    /*// box-shadow: 0 0 10px 2px rgb(252, 228, 228);*/
  }

  .swiper_ses .main-img {
    width: 6.4rem;
    height: 3.2rem;
    box-shadow: 0 0 6px 1px rgb(253, 230, 230);
    border-radius: 5px;
    overflow: hidden;
  }

  .swiper_dot {
    position: absolute;
    text-align: center;
    top: 3.2rem;
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

  .allow {
    width: 100%;
    height: 10px;
    background: #F7F7F7;
  }

  .category_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #F7F7F7;
    padding-bottom: 50px;
  }

  .category_list ul {
    display: inline-block;
    width: 1.6rem;
    list-style: none;
    height: 8rem;
    // background: #F7F7F7;
  }

  .category_list ul li {
    width: 100%;
    height: 0.8rem;
    text-align: center;
  }

  .category_list ul li.active {
    background: #fff;
  }

  .category_list ul li a {
    vertical-align: -webkit-baseline-middle;
    line-height: 0.8rem;
    width: 100%;
    height: 100%;
  }

  .category_list ul li a span:first-child {
    margin-right: 6px;
    vertical-align: -webkit-baseline-middle;
  }

  .category_list ul li a span:last-child {
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
    margin-top: -5px;
    font-size: 12px;
    color: #333;
  }

  .category_list_items {
    display: inline-block;
    width: 6rem;
    height: 100%;
    background: #fff;
    position: relative;
  }
   .category_list_items-div{
     width: 6rem;
     height: 8.3rem;
     position: relative;
     overflow-x: hidden;
     overflow-y: scroll;
   }
  .category_list_items-div::-webkit-scrollbar {
    display: none;
  }

  .category_list_content {
    width: 6rem;
  }

  .category_list_content > div {
    width: 6rem;
  }

  .category_list_item_top {
    width: 6rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: left;
  }

  .category_list_item_top span {
    font-size: 15px;
    color: #333;
    padding-left: 10px;
  }

  .category_list_item {
    width: 6rem;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 10px 10px;
    position: relative;
  }

  .category_list_items_left {
    width: 1.6rem;
    height: 1.6rem;
    background: #F7F7F7;
    margin-right: 10px;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }

  .category_list_items_left img {
    width: 100%;
    height: 100%;
    display: block;
    margin: auto;
  }

  .category_list_items_right {
    width: 3.6rem;
    position: absolute;
    right: 0.9rem;
    text-align: left;
  }

  .category_title {
    font-size: 14PX;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;

  }

  .category_adress {
    display: inline-block;
    background: #FFBCBA;
    font-size: 0.22rem;
    color: #EF0600;
    height: 0.32rem;
    line-height: 0.35rem;
    margin-bottom: 0.4rem;
    margin-top: 0.19rem;
  }

  .category_price {
    display: flex;
    justify-content: space-between;
    margin: 0px;
  }

  .category_price span:first-child {
    font-size: 0.24rem;
    color: #EF0600;

  }
  .category_price span:first-child a {
    font-size: 0.24rem;
    color: #ccc;
    margin-left: 4px;
    text-decoration: line-through;
  }

  .category_price span:last-child {
    font-size: 0.24rem;
    color: #777;
  }

  .van-tabbar--fixed {
    bottom: -0.05rem;
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
