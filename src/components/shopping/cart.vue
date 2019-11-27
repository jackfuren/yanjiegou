<template>
  <div class="wind">
    <div class="box-container">
      <div class="One1">
        <span class="One1sp1">购物车</span>
        <span @click="ment" v-if="bol" class="One1sp3">管理</span>
        <span @click="ments" v-else class="One1sp2">完成</span>
        <img class="ld" src="../../assets/gouwuche_xiaoxi_normal.png" alt="">
      </div>
      <div class="scroll">
<!--        <p>阿迪达斯特卖会将在5-15日开始，可提前加入购物车抢购！</p>-->
        <van-notice-bar  mode="link"  background="#FAB69A" color="#FFFEFE" @click="dt">
          阿迪达斯特卖会将在5-15日开始，可提前加入购物车抢购！
        </van-notice-bar>
      </div>
      <div class="boxes" v-show="dataList.length > 0">
        <div class="boxes-div" v-for="(item,shop_index) in dataList" :key="shop_index" >
          <div class="chevkbox">
            <van-checkbox  v-model="item.check" @click="shop_all_check(shop_index)" style="width: 0.4rem;display: inline-block;position: relative;top: 0.17rem" >
              </van-checkbox>
            <img class="pj" src="../../../src/assets/gouwuche_icon.png" alt="">
            <span  style="font-size: 0.24rem;font-weight: bold;z-index: 99999;position: relative">{{item.name}}</span>
            <img class="pjj" src="../../../src/assets/gouwuche_button_xiayibu.png" alt="">
          </div>

          <div class="boxes-div-one" v-for="(ite ,product_index) in  item.goods " :key="product_index" >
            <van-checkbox v-model="ite.check" class="boxes-div-one-check" @click="product_checked_click(shop_index,product_index)" ></van-checkbox>
            <div @click="xian(ite.goods_id)" class="boxes-div-two"><img :src="ite.headimg" alt=""></div>
            <div   class="boxes-div-there">
              <p  @click="xian(ite.goods_id)">{{ite.title}}</p>
              <p  @click="xian(ite.goods_id)">{{ite.goods_attr}}</p>
              <p  @click="xian(ite.goods_id)">￥ <span style="font-weight: bold">{{ite.price}}</span></p>

              <div class="product_number_content">
                <div class="product_number_buttonn">
                  <button v-if="ite.num > 1" @click.stop="product_reduce(shop_index,product_index)">-</button>
                </div>
                <div class="product_number_input">
                  <input type="number" v-model="ite.num"  @input="inFunction(shop_index,product_index)" />
                </div>
                <div class="product_number_button" @click.stop="product_add(shop_index,product_index)">
                  <button >+</button>
                </div>
              </div>
            </div>
          </div>

      </div>

      </div>
      <div class="kong" v-show="dataList.length == 0">

        <img src="../../assets/zhu.png" alt="">
        <p>你的购物车还没有商品哦</p>
      </div>
      <div class="db"></div>
      <div v-show="dataList.length >0" class="One4">
        <van-checkbox checked-color="#EF0600" v-model="checked_all" @click="all_products_checked"><span style="font-size: 0.24rem">全选</span></van-checkbox>

        <div v-if="bol" class="One42">
          <span class="Oe1sp0">合计：￥<span style="font-weight: bold;font-size: 0.3rem">{{total_amount | priceFilter}} </span></span>
          <span @click="Pays()" class="Oe1sp1">去结算({{selected_products }})</span>
        </div>
        <div v-else class="One41">

        <span @click="zhe()" class="Oe1sp13"><img class="sq" src="../../../src/assets/gouwuche_bianji_shanchu@2x.png"
                                                  alt="">快速删除</span>
          <span @click="shoucang()"  class="Oe1sp12">移入收藏</span>
          <span @click="removeCart" class="Oe1sp11">删除</span>
        </div>
      </div>
      <div class="bj" v-show="beijing">
        <div @click="zhe()" class="bjj"></div>
        <div class="ks">
          <p>快速删除</p>
          <p>现有{{dataListTwo.length}}件商品，购物车上限150个</p>
          <div class="phh">
           <div class="phh-div" v-for="(item ,index) in dataListTwo">
             <van-checkbox v-model="item.check" class="phh-div-check"></van-checkbox>
             <img class="" :src="item.headimg" alt="">
           </div>

          </div>
          <p class="ps" @click="Delete()">删除</p>
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
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import shop from '../../../static/shopping'
  const cityOptions = [16, 14, 17, 18];
  import { NoticeBar } from 'vant';
	import request from "../utils/request"
  export default {

    name: "cart",
    data() {
      return {
        bol: true, // 页面状态
        dataList: [],
        beijing:false,
        active4: 2,
        checked_all: false,
         arrList:[],
				 skulist:[],
         dataListTwo:[],
        arrListTwo:[],
         link:"https://www.adidas.com.cn/?utm_source=baidu&utm_medium=sem&utm_campaign=2018-xcat-brandzone&utm_content=title-bzpc&utm_term=brandzonepc"

      }
    },
		created(){
			request({
			  url: "api/goods/getgoodsttr",
			  method: "post",
					data: {
					  goods_id:1
					},
			}).then(res => {
				console.log(res)
				this.skulist=res.data.data.list
			})
		},
    methods: {
      Delete(){
        for (var i=0 ;i<this.dataListTwo.length;i++){
          if (this.dataListTwo[i].check ){
            this.arrListTwo.push(this.dataListTwo[i].id)
          }
        }
				//删除
        this.request({
          url: "api/goods/delcart",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            cart_id:this.arrListTwo.join(","),
          },
        }).then(res => {
          if (res.data.code == 200){
            this.gian()
          }
        })

      },
      Pays(){
        this.arrList =[]
        for (var i=0 ;i < this.dataList.length ;i++){
          for (var j=0; j < this.dataList[i].goods.length; j++){
           if (this.dataList[i].goods[j].check) {
              this.arrList.push(this.dataList[i].goods[j].id)
           }
          }
        }
				console.log(this.total_amount,this.selected_products)
        if (this.arrList.length == 0 ){
            Toast('请选择商品结算')
        } else {
          this.$router.push({
            name: 'js',
            query:{
              cart_id:this.arrList.join(","),
              total_amount:this.total_amount,
              selected_products:this.selected_products
            }
          })
        }
      },
      zhe(){
        this.beijing =! this.beijing
        this.Fast()
      },
       Fast(){
         let a =[]
         for (var i=0;i<this.dataList.length;i++){
           for (var j =0 ; j<this.dataList[i].goods.length ;j++){
             a.push(this.dataList[i].goods[j])
           }
         }
         for (let i in a) {
           a[i].check = false;
         }
         this.dataListTwo =a
       },
      ment() {
        this.bol = false;
      },
      ments() {
        this.bol = true;
      },
      gian(){
				//我的购物车
        this.request({
          url: "api/users/mycart",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
          },
        }).then(res => {
          console.log(res)
          let temp = res.data.data;
          for (let i in temp) {
            temp[i].check = false;
            for (let j in temp[i].goods) {
              temp[i].goods[j].check =false
            }
          }
          this.dataList = temp;
          this.Fast()
        })
      },
      // 店铺下属商品全部选择时
      shop_all_check(shop_index) {

        var shop = this.dataList[shop_index]
        shop.check = !shop.check
        for (var i = 0; i < shop.goods.length; i++) {
          shop.goods[i].check = shop.check;
        }
// 检测购物车内的商品是否全部选中
        for (var i = 0; i < this.dataList.length; i++) {
          if (!this.dataList[i].check) {

            this.checked_all = false
            return
          }

        }
        this.checked_all = true

      },
      // 商品选择时
      product_checked_click(shop_index, product_index) {
			console.log(this.dataList)
        var product = this.dataList[shop_index].goods[product_index]
        product.check = !product.check

        // 检测是否该店铺内的商品全选
        for (var i = 0; i < this.dataList[shop_index].goods.length; i++) {
          if (!this.dataList[shop_index].goods[i].check) {
            this.dataList[shop_index].check = false
            this.checked_all = false
            return;
          }
        }
        this.dataList[shop_index].check = true

        // 检测购物车内的商品是否全部选中
        for (var i = 0; i < this.dataList.length; i++) {
          if (!this.dataList[i].check) {
            this.checked_all = false
            return
          }
        }
        this.checked_all = true
      },
      // 减购商品，每次减少1
      product_reduce(shop_index, product_index) {
        var product = this.dataList[shop_index].goods[product_index]
        if ((product.num - 1)) {
          product.num--
        }
        this.request({
          url: "api/goods/makecart",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            cart_id:product.id,
            ctype:2
          },
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){

          }
        })
      },

      // 加购，每次加1
      product_add(shop_index, product_index) {
        var product = this.dataList[shop_index].goods[product_index]
        if ((product.num + 1) < 101) {
          product.num++
        }
        this.request({
          url: "api/goods/makecart",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            cart_id:product.id,
            ctype:1
          },
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){

          } else  if (res.data.code == 0){
             Toast('库存不足')

          }
        })
      },

      // 检测购物车内的商品全部
      all_products_checked() {
        this.checked_all = !this.checked_all
        for (var i = 0; i < this.dataList.length; i++) {
          this.dataList[i].check= this.checked_all
          for (var j = 0; j < this.dataList[i].goods.length; j++) {
            this.dataList[i].goods[j].check = this.checked_all
          }
        }

      },
      //物品删除
      removeCart(){
        this.arrList =[]
        for (var i=0 ;i < this.dataList.length ;i++){
          for (var j=0; j < this.dataList[i].goods.length; j++){
            //console.log(11111)
            if (this.dataList[i].goods[j].check) {
              this.arrList.push(this.dataList[i].goods[j].id)
            }
          }
        }
        this.request({
          url: "api/goods/delcart",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            cart_id:this.arrList.join(","),
          },
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){
            Toast('删除成功')
            this.gian()
          }
        })


      },
      //商品收藏
      shoucang(){
        this.arrList =[]
        for (var i=0 ;i < this.dataList.length ;i++){
          for (var j=0; j < this.dataList[i].goods.length; j++){
            //console.log(11111)
            if (this.dataList[i].goods[j].check) {
              this.arrList.push(this.dataList[i].goods[j].goods_id)
            }
          }
        }
        this.request({
          url: "api/users/collectiongoods",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            goods_id:this.arrList.join(","),
          },
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){
            Toast('收藏成功')
            this.gian()
          }
          if (res.data.code == 0){
            Toast('你已经收藏该商品了')
            this.gian()
          }
        })
      },
      inFunction(shop_index,product_index){
       // event.preventDefault()
       // window.event.returnValue = false
        let b = this.dataList[shop_index].goods[product_index].num
        if (b > 100){
          let  b = 100
          this.dataList[shop_index].goods[product_index].num = 100
          this.request({
            url: "api/goods/makecart",
            method: "post",
            data:{
              user_id:this.$store.state.username.id,
              cart_id:this.dataList[shop_index].goods[product_index].id,
              ctype:3,
              num:b
            },
          }).then(res => {
            //console.log(res)
            if (res.data.code == 200){
              //this.gian()
            }
          })
        } else {
          this.request({
            url: "api/goods/makecart",
            method: "post",
            data:{
              user_id:this.$store.state.username.id,
              cart_id:this.dataList[shop_index].goods[product_index].id,
              ctype:3,
              num:b
            },
          }).then(res => {
            //console.log(res)
            if (res.data.code == 200){
              //this.gian()
            }
          })
        }
      },
      dt(){
       window.location.href=this.link
      },
      xian(i){
        this.$router.push({
          name: 'wpxq',
          query:{
            token:7,
            goods_id:i
          }

        })
      }
    },
    computed: {
			
      // 已选择商品数目
      selected_products() {
        var selected_products = 0
        for (var i = 0; i < this.dataList.length; i++) {
          var product = this.dataList[i].goods
          for (var j = 0; j < product.length; j++) {
            if (product[j].check) {
              selected_products+= product[j].num
            }
          }
        }
        return selected_products
      },

      // 购买商品总金额
      total_amount() {
        var total_price = 0.00
        for (var i = 0; i < this.dataList.length; i++) {
          var product = this.dataList[i].goods
          for (var j = 0; j < product.length; j++)
            if (product[j].check) {
              total_price += product[j].num * product[j].price
            }
        }
        return total_price
      },

      // 购物车全选
        check() {
        //console.log(33333333)
        for (var i = 0; i < this.dataList.length; i++) {
          if (!this.dataList[i].check) {
            return false
            //console.log(1111111)
          }
        }
        //console.log(222222222)
        return true
      }
    },
    filters: {
      // 金额显示过滤 两位小数点，不足补0
      priceFilter(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            value = value.toString() + "0";
          }
          return value;
        }
      }
    },
    mounted() {
			

      this.gian()
    },
     components:{
      NoticeBar
     }
  }
</script>

<style scoped>
  .wind  {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }

  .wind  .box-container {
    position: relative;
    min-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: white;

  }

  .wind  .box-container::-webkit-scrollbar {
    display: none;
  }

  .One1 {
    position: relative;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    z-index: 99;
    text-align: center;
  }

  .One1sp1 {
    color: black;
    font-size: 0.36rem;

  }

  .One1sp2 {
    position: absolute;
    font-size: 0.24rem;
    right: 0.96rem;

  }

  .One1sp3 {
    position: absolute;
    font-size: 0.24rem;
    color: black;
    right: 0.96rem;
  }

  .ld {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.2rem;
    text-align: center;
    top: 0.2rem;
  }

  .scroll {
    width: 100%;
    height: 0.5rem;
    background: #FAB69A;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: white;
  }
  .boxes{
    width: 7.1rem;
    height:100%;
    margin: 0 auto ;
    text-align: left;
    position: relative;
    top: 0.15rem;

  }
  .boxes-div{
    width: 7.1rem;
    margin-bottom: 0.3rem;
  }
  .boxes-div-one{
    width: 6.56rem;
    height: 2rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px 0px rgba(204,204,204,0.5);
    border-radius:10px;
    position: relative;
    left: 0.5rem;
    top: 0.15rem;
    margin-bottom: 0.2rem;
    display: flex;
  }
  .boxes-div-two{
      width: 1.6rem;
    padding: 0.2rem;

  }
  .boxes-div-two img{
    width: 1.6rem;
    height: 1.6rem;
    border-radius:10px;
  }
  .boxes-div-one-check{
    position: absolute;
    left: -0.5rem;
    top: 0.8rem;
  }
  .boxes-div-there{
    width: 4.5rem;
    height: 1.85rem;
    padding-top: 0.15rem;
    position: relative;
  }
  .boxes-div-there p:nth-child(1){

    font-size: 0.24rem;
    color:#333333 ;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .boxes-div-there p:nth-child(2){
    font-size: 0.2rem;
    position: absolute;
    top: 0.9rem;
  }
  .boxes-div-there p:nth-child(3){
    font-size: 0.24rem;
    color: #EF0600;
    margin-top: 0.2rem;
    position: absolute;
    top: 1.27rem;
  }
  .boxes-div-there p:nth-child(3) span{
    font-size: 0.3rem;
  }
  /deep/ .van-checkbox__icon--checked .van-icon{
    color: #fff;
    border-color: #EF0600;
    background-color: #EF0600;
  }

  .product_number_input input{
    width: 0.5rem;
    height: 0.3rem;
    background: #F7F7F7;
    border: 0;
    text-align: center;
  }
  .product_number_content{
    position: absolute;
    right: 0.6rem;
    bottom: 0.1rem;
  }
 .product_number_button {
   position: absolute;
   left: 0.5rem;
   bottom: 0rem;
 }
  .product_number_button button{
    width: 0.3rem;
    height: 0.3rem;
    background:white;
    border:  0;
    font-size: 0.3rem;
    text-align: center;
  }
  .product_number_buttonn{
     position: absolute;
     right: 0.55rem;
     bottom: 0.01rem;
  }
  .product_number_buttonn button{
    width: 0.3rem;
    height: 0.3rem;
    background:white;
    border:  0;
    font-size: 0.36rem;
  }
  .pj {
    width: 0.3rem;
    height: 0.3rem;
    position: relative;
    top: 0.06rem;
    font-size: 0.24rem;
  }

  .pjj {
    width: 0.15rem;
    height: 0.2rem;
    position: relative;
    top: -0.00rem;
    left: 0.15rem;

  }

  .One3 img {
    width: 1.6rem;
    height: 1.6rem;
    position: relative;

    border-radius: 10px;
  }


  .One4 {
    width: 100%;
    height: 0.9rem;
    background-color: #ffffff;
    margin: 0 auto;
    color: #fff;
    display: flex;
    padding-left: 0.2rem;
    position: fixed;
    bottom: 1.15rem;
    left: 0;
    right: 0;
    z-index: 999;
    justify-content: space-between;
    align-items: center;

  }


  .One4 van-checkbox {
    color: #fff;
  }

  .Oe1sp1 {
    display: inline-block;
    width: 2.16rem;
    height: 0.9rem;
    background: #fe5167;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.27rem;
    color: #fff;
    position: relative;
  }

  .Oe1sp0 {
    color: black;
    font-size: 0.3rem;
    position: absolute;
    line-height: 0.9rem;
    left: 1.4rem;

  }

  .db {
    width: 100%;
    height: 2rem;
  }

  .Oe1sp11 {
    display: inline-block;
    width: 1rem;
    height: 0.5rem;
    color: black;
    line-height: 0.5rem;
    border-radius: 25px;
    border: solid 1px #777777;
    text-align: center;
    font-size: 0.24rem;
    position: relative;
    right: 0.4rem;
  }

  .Oe1sp12 {
    display: inline-block;
    width: 1.5rem;
    height: 0.5rem;
    color: black;
    line-height: 0.5rem;
    border-radius: 25px;
    border: solid 1px #777777;
    text-align: center;
    font-size: 0.24rem;
    position: relative;
    right: 0.5rem;
  }

  .Oe1sp13 {
    display: inline-block;
    width: 1.8rem;
    height: 0.5rem;
    color: #EF0600;
    line-height: 0.5rem;
    border-radius: 25px;
    border: solid 1px #EF0600;
    text-align: center;
    font-size: 0.24rem;
    position: relative;
    right: 0.6rem;
  }

  .sq {
    width: 0.3rem;
    height: 0.3rem;
    color: #EF0600;
    position: relative;
    top: 0.05rem;
  }

  .bj {
    width: 100%;
    height: 13.34rem;
    position: fixed;
    top: 0;
    z-index: 99999;
  }

  .ks {
    width: 100%;
    height: 9.74rem;
    background: #FFFFFF;
    position: absolute;
    bottom: 0;

  }

  .ks p:nth-child(1) {
    font-size: 0.3rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .ks p:nth-child(2) {
    font-size: 0.24rem;
    margin-bottom: 0.3rem;
  }
  .ps{
    width: 5.5rem;
    height: 0.8rem;
    color: white;
    background: #EF0600;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.36rem;
    margin: 0.16rem auto;
    border-radius: 5px;
  }
  .bjj {
    width: 100%;
    height: 7rem;
    background: #777777;
    opacity: 0.5;
    position: absolute;
    top: 0;

  }
  .phh{
    width: 100%;
    height: 7rem;
    overflow-x:hidden;
    overflow-y:scroll;;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }
 .phh-div{
   width: 1.66rem;
   height: 1.66rem;
   margin: 0.1rem  0 0.1rem 0;
   border-radius: 5px;
   position: relative;
   margin: 0.105rem;
 }
  .phh-div img{
    width: 1.66rem;
    height: 1.66rem;
    margin: 0.1rem  0 0.1rem 0;
    border-radius: 5px;
  }
  .phh-div-check{
    position: absolute;
    bottom: -0.12rem;
    right: 0.05rem;

  }
  /deep/ .van-checkbox__icon .van-icon{

    width: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    font-size: 0.24rem;
  }

  .kong{
    padding-top: 2rem;
  }
  .kong img{
    width: 3.4rem;
    height: 2rem;
  }
  .kong p{
    font-size: 0.28rem;
    color: #333333;
  }
  /deep/.van-notice-bar{
    height: 0.5rem;
  }
  .chevkbox{
    width: 100%;
    height: 0.4rem;
    margin-bottom: 0.1rem;
    line-height: 0.4rem;
  }
</style>
