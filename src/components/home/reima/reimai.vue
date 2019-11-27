<template>
  <div  class="box">
    <div class="box-container">
      <div id="n" ></div>
      <div class="nav">
        <van-icon  @click="fh()" class="nav-left" color="#333333" name="arrow-left" size="0.5rem"/>
        <p >品牌热卖</p>
        <van-icon @click="dd()"  name="wap-nav" size="0.4rem" class="nav-van"/>
        <div v-show="rapid"  class="nav-top-back">
          <p @click="xiaoxi"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem" src="../../../assets/shangjiaye_wuxiaoxi.png" alt=""><span>消息</span></p>
          <p @click="shop"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem" src="../../../assets/shangjaiyetanchuang_gouwuche.png" alt=""><span style="position: relative;left: 0.14rem">购物车</span></p>
          <p @click="homm"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem" src="../../../assets/shangjiayetanchuang_shouyee.png" alt=""><span>首页</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem" src="../../../assets/shangjaiye_fenxiang.png" alt=""> <span style="position: relative;left: -0.02rem;bottom: 0.04rem">分享</span></p>
        </div>
      </div>


      <div class="swiper-container index_carsel" style="padding:15px;background: #FFFFFF">
        <div class="swiper-wrapper">
          <div :key="index" class="swiper-slide swiper_ses" v-for="(item,index) in carselist">
            <img :src="item.pic" class="main-img">
          </div>
        </div>

      </div>
      <div class="swiper-pagination swiper_dot" id="pagination"></div>
      <div class="all">
        <div class="all-div" v-for="(inte,index) in pin" :key="index">
          <div class="all-div-div">
            <img :src="inte.pic" alt="">
          </div>
          <p>{{inte.title}}</p>
        </div>
        
        <div class="all-div" @click="all()">
          <div class="all-div-yuan">
            <span>查看全部</span>
          </div>
        </div>


      </div>
      <div class="brand">
        <p>精选品牌</p>
        <div class="brand-one" v-for="(item,index) in dataLIst" :key="index">
          <div class="brand-two">
            <div class="brand-two-div">
            <img :src="item.pic" alt="">
            </div>
            <span>{{item.title}}</span>
          </div>
          <div class="brand-div-div-one" >
            <div style="width: 2.2rem" v-for="(ite,index) in item.goods" :key="index"  @click="details(ite.id)">
              <div class="brand-div-div-div">
                <img :src="ite.headimg" alt="">
              </div>
              <p>{{ite.title}}</p>
              <p>￥<span>{{ite.price}}</span> <span>￥{{ite.original_price}}</span></p>
            </div>

          </div>
        </div>
      </div>
      <div class="brandd">
        <p>推荐单品</p>
        <div class="product">
          <div class="product-div" v-for="(item,index) in arrList" @click="details(item.id)">
            <div>
              <img :src="item.headimg" alt="">
            </div>
            <p>{{item.title}}</p>
            <p>{{item.name}}</p>
            <p>￥<span>{{item.price}}</span></p>
            <p>
							<van-icon v-show="item.is_collection == 0 ? true :false" color="#F21D13" name="star-o" size="0.4rem"/>
							<van-icon v-show="item.is_collection == 1 ? true :false" color="#FBA39A" name="star" size="0.4rem"/>
							<span>{{item.collection_num}}</span>
						</p>
          </div>
        </div>
      </div>
      <img class="img" @click="ding()" src="../../../assets/huidingbu@2x.png" alt="">
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper"
  export default {
    name: "reimai",
    data() {
      return {
        carselist: [],
        dataLIst:[],
        arrList:[],
        rapid:false,
				pin:[],
				pai:[],
				shou:''
      }
    },
    methods: {
      swiper() {
        this.swiper = new Swiper(".swiper-container", {
          slidesPerView: '1',
          /**设置slider容器能够同时显示的slides数量,可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。 */
          spaceBetween: 30,
          centeredSlides: true,
          /**活动块会居中 */
          //spaceBetween:1, /**slide之间的距离 */
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
          // observer:true,
          //observeParents:true,
        });
      },
      fh() {
        this.$router.push({
          name: 'home',
        })
      },
     all(){
       this.$router.push({
         name: 'com',
       })
     },
      ding(){
        window.location.href ="#n"
      },
      ping(){
        this.request({
          url: "api/brand/lists",
          method: "post"
        }).then(res => {
         //console.log(res)
          this.dataLIst = res.data.data
          //consoleog(res.data.data)

        })

      },
      brand(){
        this.request({
          url: "api/brand/jxlists",
          method: "post"
        }).then(res => {
          this.dataLIst = res.data.data
          //consoleog(res.data.data)
        })
      },
      recommend(){
		 
        this.request({
          url: "api/index/goods",
		  data: {
			 user_id: this.$store.state.username.id,
			 lat:window.sessionStorage.getItem('lat'),
			 lng:window.sessionStorage.getItem('lng')
		  },
          method: "post",
        }).then(res => {
          console.log(res)
          this.arrList = res.data.data
        })
      },
      details(i){
        this.$router.push({
          name: 'wpxq',
          query: {
            goods_id: i,
            token:33
          }
        })
      },
      xiaoxi(){
        if (this.$store.state.username == null ){
          this.$router.push({
            name: 'regi',
          })
        } else {
          this.$router.push({
            name: 'news',
            query: {
              token: this.token,
              id: this.goods_id
            }
          })
        }
      },
      shop(){
        this.$router.push({
          name: 'Shop',
        })
      },
      homm(){
        this.$router.push({
          name: 'home',
        })
      },
      dd(){
        this.rapid =! this.rapid
      }
    },
    mounted() {
      this.request({
        url: "api/index/adv",
        method: "get"
      }).then(res => {
        this.carselist = res.data.data
        this.$nextTick(() => {
          this.swiper()
        })

      })
			this.request({
			  url: "api/brand/bandsAdv",
			  method: "post"
			}).then(res => {
			  console.log(res)
				console.log(res.data.data.length)
				for(var i=0;i<res.data.data.length;i++){
						this.pin.push(res.data.data[i])
				// 	for(var j in this.pin){
				// 		console.log(this.pin[j].son)
				// 		this.pai=this.pin[j].son
				// 	}
				}
				console.log(this.pin)
			})
      //this.ping()
      this.brand()
      this.recommend()
    },
    components: {
      Swiper
    }
  }
</script>

<style scoped lang="less">
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
    width: 100%;
    height: 0.7rem;
    //line-height: 0.7rem;
    text-align: center;
    position: relative;
    background: white;
  }

  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: black;
    position: relative;
    bottom: -0.2rem;
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
    clear: both;
    z-index: 999999;
  }

  .nav-van {
    position: absolute;
    right: 0.3rem;
    top: 0.25rem;
  }
  .nav-top-back {
    background-image: url(../../../assets/shangjiaye_xialakuang.png);
    width: 2.9rem;
    height: 3.6rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0.25rem;
    z-index: 999;
    top: 0.6rem;
    padding-top: 0.2rem;
  }

  .nav-top-back p {
    width: 2.5rem;
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #FFFFFF;
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
    //transform: scale(1.08);
    /*// box-shadow: 0 0 10px 2px rgb(252, 228, 228);*/
  }

  .swiper_ses .main-img {
    width: 6.9rem;
    height: 3.2rem;
    box-shadow: 0 0 6px 1px rgb(253, 230, 230);
    border-radius: 5px;
    overflow: hidden;
  }

  .swiper_dot {
    position: absolute;
    text-align: center;
    top: 4.4rem;
    left: 3.3rem;


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

  /deep/ .swiper-pagination-bullet {
    width: 0.098rem !important;
    height: 0.098rem !important;
    margin: 0 0.1rem;
  }

  /deep/ .swiper-pagination-bullet-active {
    background: #EF0600;
  }

  .all {
    width: 6.9rem;
    height: 4.6rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.2rem;
    background: white;
  }

  .all-div {
    width: 1.65rem;
    height: 2.3rem;
		margin-right: 0.07rem;
    position: relative;
  }

  .all-div-div {
    margin-top: 0.2rem;
    width: 1.65rem;
    height: 1.4rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    top: 0.2rem;
    padding: 0 0.1rem;
  }

  .all-div-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .all-div p {
    font-size: 0.28rem;
    font-weight: bold;
    display: inline-block;
    margin-top: 0.3rem;
    border-bottom: 2px solid #FCD7D6;
  }

  .all-div-yuan {
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-radius: 50%;
    background: #F7F7F7;
    margin: 0 auto;
    margin-top: 0.55rem;
  }

  .all-div-yuan span {
    font-size: 0.22rem;
    color: #999999;
  }

  .brand {
    width: 6.9rem;
    min-height: 4.3rem;
    padding: 0.2rem 0.3rem;
    text-align: left;
    background: white;
    margin-top: 0.2rem;
  }

  .brand-one {
    width: 6.9rem;
    margin-bottom: 0.1rem;
  }
  .brand-two{
    width: 6.9rem;
    height: 0.6rem;
    padding: 0.2rem 0;
    text-align: left;
    height: 0.6rem;
  }
  .brand-two-div{
    display: table-cell;
    vertical-align: middle;
    position: relative;
    width: 0.6rem;
    height: 0.6rem;
  }
    .brand-two img{
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
    }
   .brand-two span{
     font-size: 0.28rem;
     position: relative;
     bottom: 0.5rem;
     left: 0.78rem;
   }


  .brand p:nth-child(1) {
    font-size: 0.3rem;
    color: #333333;
    border-left: 2px solid #EF0600;
    display: inline-block;
    text-indent: 0.1rem;
    font-weight: bold;
  }

  .brand-div {
    margin-top: 0.3rem;
    border-radius: 0.2rem;
    height: 3.2rem;
    width: 6.9rem;
    position: relative;
    text-align: center;
  }

  .brand-div img {
    width: 6.9rem;
    height: 3.2rem;
    border-radius: 0.2rem;
  }

  .brand-div-div {
    width: 6.9rem;
    height: 3.2rem;
    position: absolute;
    top: 0;
    background: black;
    box-shadow: 0px 0px 16px 0px rgba(255, 95, 58, 0.22);
    opacity: 0.2;
    border-radius: 0.2rem;
  }

  .brand-div p:nth-child(3) {
    font-size: 0.44rem;
    color: white;
    position: absolute;
    top: 0.9rem;
    z-index: 455;
    width: 4rem;
    text-align: center;
    border-bottom: 1.2px solid white !important;
    left: 50%;
    margin-left: -2rem;
    height: 0.7rem;
  }

  .brand-div p:nth-child(4) {
    font-size: 0.24rem;
    position: relative;
    top: -1.6rem;
    z-index: 455;
    color: white;
  }

  .brand-div p:nth-child(5) {
    width: 1.5rem;
    height: 0.5rem;
    border: 1px solid white;
    font-size: 0.24px;
    position: absolute;
    top: 2.1rem;
    line-height: 0.5rem;
    color: white;
    z-index: 455;
    border-radius: 0.1rem;
    left: 50%;
    margin-left: -0.75rem;
  }

  .brand-div-div-one {
    width: 6.9rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .brand-div-div-div {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.1rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    background: #F7F7F7;
  }

  .brand-div-div-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .brand-div-div-one p:nth-child(2) {
    width: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.24rem;
    margin-top: 0.13rem;
  }

  .brand-div-div-one p:nth-child(3) {
    font-size: 0.24rem;
    color: #EF0600;
    text-align: center;
    margin-top: 0.1rem;
  }

  .brand-div-div-one p:nth-child(3) span:nth-child(1) {
    font-size: 0.3rem;

  }

  .brand-div-div-one p:nth-child(3) span:nth-child(2) {
    font-size: 0.2rem;
    color: #CCCCCC;
    text-decoration: line-through
  }
  .brandd {
    width: 6.9rem;
    min-height: 7rem;
    padding: 0.2rem 0.2rem;
    text-align: left;
    background: white;
    margin-top: 0.2rem;
  }
  .brandd p:nth-child(1) {
    font-size: 0.3rem;
    color: #333333;
    border-left: 2px solid #EF0600;
    display: inline-block;
    text-indent: 0.1rem;
    font-weight: bold;
  }
  .product{
    width: 7.1rem;
    padding: 0.3rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .product-div{
    width: 3.46rem;
    height: 5.84rem;
    box-shadow:0px 0px 9px 0px rgba(51,51,51,0.22);
    border-radius:0.1rem;
    position: relative;
    margin-bottom: 0.2rem;
  }
  .product-div div{
    width: 3.46rem;
    height: 3.46rem;
    display: table-cell;
    vertical-align: middle;

  }
  .product-div img{
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
  .product-div p:nth-child(2){
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 0.63rem;
    font-size: 0.28rem;
    line-height: 0.35rem;
    width: 3.2rem;
    position: absolute;
    bottom: 1.55rem;
    left: 0.15rem;

  }
  .product-div p:nth-child(3){
   font-size: 0.24rem;
    color: #795DDE;
    border: 1px solid #795DDE;
    height: 0.32rem;
    line-height: 0.32rem;
    padding: 0 0.05rem;
    position: absolute;
    left: 0.2rem;
    bottom: 1.05rem;
   }
  .product-div p:nth-child(4){
    font-size: 0.24rem;
    color: #ef0600;
    position: absolute;
    bottom: 0.55rem;
    left: 0.2rem;
  }
  .product-div p:nth-child(4) span{
    font-size: 0.36rem;
  }
  .product-div p:nth-child(5){
    height: 0.3rem;
    bottom: 0.2rem;
    left: 0.2rem;
    position: absolute;
  }
  .product-div p:nth-child(5) span{
    font-size: 0.21rem;
    position: relative;
    bottom: 0.05rem;
  }
  .img{
    width: 0.6rem;
    height: 0.6rem;
    position: fixed;
    bottom: 1.3rem;
    right: 0.26rem;
  }
</style>
