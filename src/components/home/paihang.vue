<template>
  <div class="box">
    <div class="box-container">
      <div id="n"></div>
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" color="#333333" name="arrow-left" size="0.5rem"/>
        <p>精选排行</p>
        <van-icon @click="dd()" name="wap-nav" size="0.4rem" class="nav-van"/>
        <div v-show="rapid"  class="nav-top-back">
          <p @click="xiaoxi"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem" src="../../assets/shangjiaye_wuxiaoxi.png" alt=""><span>消息</span></p>
          <p @click="shop"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem" src="../../assets/shangjaiyetanchuang_gouwuche.png" alt=""><span style="position: relative;left: 0.14rem">购物车</span></p>
          <p @click="homm"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem" src="../../assets/shangjiayetanchuang_shouyee.png" alt=""><span>首页</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem" src="../../assets/shangjaiye_fenxiang.png" alt=""> <span style="position: relative;left: -0.02rem;bottom: 0.04rem">分享</span></p>
        </div>
      </div>
      <div class="all">
        <div>
          <p :class="{p : 1 ===num}" @click="skip(1)">商品</p>
        </div>
        <div>
          <p :class="{p : 2 ===num}" @click="skip(2)">商家</p>
        </div>
      </div>

      <div v-if="left" class="all-div">

        <div class="product" >
          <div class="product-div" v-for="(item,index) in dataList" :key="index" @click="details(item.id)">
            <div>
              <img :src="item.headimg" alt="">
            </div>
            <p>{{item.title}}</p>
            <p></p>
            <p>￥<span>{{item.price}}</span>  <span>￥{{item.original_price}}</span></p>
            <div v-if="index > 2 ? false:true"  class="product-one">
              <img v-if="index == 0? true:false"  src="../../assets/qiyi.png" alt="">
              <img  v-if="index == 1? true:false" src="../../assets/qier.png" alt="">
              <img v-if="index == 2? true:false"  src="../../assets/qisan.png" alt="">
               <p>{{index+1}}</p>

                <p>爆款</p>

            </div>
            <div class="product-one-one">
              <img v-if="index >2 ?false:true" src="../../assets/huo.png" alt="">
              <span v-if="  index >2 ?false:true">爆买{{item.sold}}件</span>

              <span v-if="  5 >index  && index >2 " style="color: #EF0600;left: 0rem">爆买{{item.sold}}件</span>


              <span v-if="index >4 " style="color: #777777;left: 0rem;">爆买{{item.sold}}件</span>

            </div>
          </div>


        </div>

      </div>
      <div v-if="right" class="all-div-two">

        <div class="all-div-two-two" v-for="(item,index) in arrList" :key="index" @click="detail(item.id)">
           <div class="all-one">
             <img :src="item.headimg" alt="">
           </div>
           <div class="all-two">
             <p>{{item.name}}</p>
              <div class="all-two-div">
                <img  v-if="index >2 ?false:true" src="../../assets/huo.png" alt="">
                <span v-if="  index >2 ?false:true">销量{{item.num}}件</span>
                <span v-if="  5 >index  && index >2 " style="color: #EF0600;left: 0rem">销量{{item.num}}件</span>
                <span v-if="index >4 " style="color: #777777;left: 0rem;">销量{{item.num}}件</span>
              </div>
           </div>
          <div v-if="index > 2 ? false:true"  class="product-onee">
            <img v-if="index == 0? true:false"  src="../../assets/qiyi.png" alt="">
            <img  v-if="index == 1? true:false" src="../../assets/qier.png" alt="">
            <img v-if="index == 2? true:false"  src="../../assets/qisan.png" alt="">
            <p>{{index+1}}</p>

            <p>销量</p>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "paihang",
    data() {
      return {
        num: 1,
        left: true,
        right: false,
        dataList: [],
        arrList:[],
        mo:1,
        rapid:false

      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'home',
        })
      },
      skip(i) {
        if (i == 1) {
          this.mo=1
          this.left = true
          this.right = false
        }
        if (i == 2) {
          this.mo=2
          this.left = false
          this.right = true
        }
        this.num = i
      },
      brand() {
        this.request({
          url: "api/brand/phgoods",
          method: "post"
        }).then(res => {
          //console.log(res)
          this.dataList = res.data.data
          //consoleog(res.data.data)
        })
        this.request({
          url: "api/brand/phshops",
          method: "post"
        }).then(res => {
          //console.log(res)
          this.arrList = res.data.data
          //consoleog(res.data.data)
        })

      },
      details(i){
        this.$router.push({
          name: 'wpxq',
          query: {
            goods_id: i,
            token:36,
            mo:this.mo
          }
        })
      },
      detail(i){
        this.$router.push({
          name: 'dpxq',
          query: {
            goods_id: i,
            token:36,
            mo:this.mo
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
      this.brand()
      this.mo = this.$route.query.mo
      if (this.mo == null){
        this.skip(1)
      } else {
        this.skip(this.mo)
      }
    }
  }
</script>

<style scoped>
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
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    position: fixed;
    background: white;
    top: 0;
    z-index: 99;
  }

  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: black;

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
    background-image: url(../../assets/shangjiaye_xialakuang.png);
    width: 2.9rem;
    height: 3.6rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 0.26rem;
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
  .all {
    width: 7.5rem;
    display: flex;
    background: white;
    position: fixed;
    top: 0.88rem;
    z-index: 0;
  }

  .all div {
    width: 3.75rem;
    height: 0.6rem;
    text-align: center;
  }

  .all p {
    display: inline-block;
    font-size: 0.28rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }

  .p {
    border-bottom: 1.5px solid #ef0600;
    color: #ef0600;
  }

  .all-div {
    width: 7.1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #F7F7F7;
  }

  .product {
    width: 7.1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    top: 1.5rem;

  }
.product-one{
  width: 0.8rem!important;
  height: 1rem!important;
  position: absolute;
  top: 0;
  left: -0.01rem;
}
.product-one img{
  width: 0.8rem;
  height: 1rem;
}
.product-one p:nth-child(2){
  width: 0.4rem!important;
  font-size: 0.4rem!important;
  height: 0.4rem!important;
  line-height: 0.4rem!important;
  color: white;
  position: absolute;
  text-align: center!important;
  z-index: 888;
  top: 0.05rem!important;
  left: 50%!important;
  margin-left: -0.2rem!important;
  border-bottom: 1.5px solid white;
}
.product-one-one{
  width: 2rem!important;
  height: 0.4rem!important;
  position: absolute!important;
  bottom: 0.2rem;
  left: 0.23rem;
}
.product-one-one img{
  width: 2rem;
  height: 0.4rem;
}
.product-one-one span{
  font-size: 0.24rem;
  color: white;
  position: absolute;
  top: 0.02rem;
  left: 0.5rem;
}
.product-one p:nth-child(3){
   font-size: 0.24rem!important;
  border: 0!important;
  color: white!important;
  position: absolute;
  top: 0.5rem;
  left: 0.18rem!important;
}


  .product-onee{
    width: 0.6rem!important;
    height: 0.8rem!important;
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
  }
  .product-onee img{
    width: 0.6rem;
    height: 0.8rem;
  }
  .product-onee p:nth-child(2){
    width: 0.4rem!important;
    font-size: 0.32rem!important;
    height: 0.3rem!important;
    line-height: 0.3rem!important;
    color: white;
    position: absolute;
    text-align: center!important;
    z-index: 888;
    top: 0.05rem!important;
    left: 50%!important;
    margin-left: -0.2rem!important;
    border-bottom: 1.5px solid white;
  }
  .product-one-one{
    width: 2rem!important;
    height: 0.4rem!important;
    position: absolute!important;
    bottom: 0.2rem;
    left: 0.23rem;
  }
  .product-one-one img{
    width: 2rem;
    height: 0.4rem;
  }
  .product-one-one span{
    font-size: 0.24rem;
    color: white;
    position: absolute;
    top: 0.02rem;
    left: 0.5rem;
  }
  .product-onee p:nth-child(3){
    font-size: 0.2rem!important;
    border: 0!important;
    color: white!important;
    position: absolute;
    top: 0.4rem;
    left: 0.1rem!important;
  }









  .product-div {
    width: 3.46rem;
    height: 5.68rem;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
    border-radius: 0.1rem;
    position: relative;
    margin-bottom: 0.2rem;
  }

  .product-div div {
    width: 3.46rem;
    height: 3.46rem;
    display: table-cell;
    vertical-align: middle;

  }

  .product-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .product-div p:nth-child(2) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 0.63rem;
    font-size: 0.28rem;
    line-height: 0.35rem;
    width: 3.2rem;
    position: absolute;
    bottom: 1.45rem;
    left: 0.15rem;
    text-align: left;

  }

  .product-div p:nth-child(3) {

  }

  .product-div p:nth-child(4) {
    font-size: 0.24rem;
    color: #ef0600;
    position: absolute;
    bottom: 0.8rem;
    left: 0.2rem;
  }

  .product-div p:nth-child(4) span:nth-child(1) {
    font-size: 0.36rem;
  }

  .product-div p:nth-child(4) span:nth-child(2) {
    font-size: 0.2rem;
    color: #777777;

    text-decoration: line-through
  }

  .all-div-two {
    width: 7.5rem;
    position: relative;
    top: 1.7rem;
  }

  .all-div-two-two {
    width: 7.5rem;
    height: 2.2rem;
    margin-bottom: 0.2rem;
    background: white;
    display: flex;
  }
 .all-one{
   width: 1.8rem;
   height: 1.8rem;
   display: table-cell;
   vertical-align: middle;
   position: relative;
   margin-top: 0.2rem;
   margin-left: 0.2rem;
 }
 .all-one img{
   max-width: 100%;
   max-height: 100%;
   display: block;
   margin: auto;
 }
 .all-two{
   width: 4.3rem;
   height: 1.8rem;
   margin-left: 0.2rem;
   position: relative;
 }
 .all-two p{
   width: 3.89rem;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
   font-size: 0.3rem;
   text-align: left;
   margin-top: 0.2rem;
 }
 .all-two-div{
   width: 2.1rem;
   height: 0.5rem;
   position: absolute;
   bottom: -0.23rem;
   left: 0rem;
 }
 .all-two-div img{
   width: 2.1rem;
   height: 0.5rem;
 }
 .all-two-div span{
   font-size: 0.24rem;
    color: white;
   position: absolute;
   top: 0.08rem;
   left: 0.56rem;
 }
  .all-div-two-one {

  / / width: 6.9 rem;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0.2rem 0.3rem;
    text-align: left;
    position: relative;
  }

  .all-div-two-one img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .all-div-two-one-div {
    width: 0.6rem;
    height: 0.6rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    background: #F7F7F7;

  }

  .all-div-two-one span {
    font-size: 0.28rem;
    color: #333333;
    position: absolute;
    top: 0.22rem;
    left: 1.1rem;
  }

  .brand-div-div-one {
    padding: 0 0.3rem;
    width: 6.9rem;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .brand-div-div-div {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.1rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }

  .brand-div-div-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
    border-radius: 0.1rem;
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
</style>
