<template>
  <div class="box">
    <div class="box-container">
    <div class="nav">
      <img src="../../assets/backgroud.png" alt="">
      <div class="nav-a">
        <img @click="xiaoxi()" alt="" src="../../assets/nav_xiaoxi_nomal.png">
      </div>
      <div class="nav-ph" @click="gerei()"><img :src="img" alt=""></div>
    </div>
    <p class="name" @click="register()"> {{name}}   </p>
    <div class="dingdan">
      <div @click="Next()" class="nav-dd">
        <span>我的订单</span>
        <span>查看全部订单 <img src="../../assets/gouwuche_button_xiayibu.png" alt=""></span>
      </div>
      <div class="xian"></div>
      <div class="nav-xx">
        <div @click="fukaun()" class="nav-con">
		  <p class="shu" v-show="kuan.length>0 ? true : false">{{kuan.length}}</p>
          <img src="../../assets/wode_daifukuan@3x.png" alt="">
          <p>待付款</p>
        </div>
        <div @click="fahua()" class="nav-con">
			<p class="shu" v-show="fa.length>0 ? true : false">{{fa.length}}</p>
          <img src="../../assets/wode_daifahuo@2x.png" alt="">
          <p>待发货</p>
        </div>
        <div @click="shouhuo()" class="nav-con">
			<p class="shu" v-show="shou.length>0 ? true : false">{{shou.length}}</p>
          <img src="../../assets/wode_daishouhuo@3x.png" alt="">
          <p>待收货</p>
        </div>
        <div @click="pingjia()" class="nav-con">
			<p class="shu" v-show="ping.length>0 ? true : false">{{ping.length}}</p>
          <img src="../../assets/wode_daipingjia@3x.png" alt="">
          <p>待评价</p>
        </div>
        <div @click="shouhon()" class="nav-con">
			<p class="shu" v-show="hou.length>0 ? true : false">{{hou.length}}</p>
          <img src="../../assets/wode_shouhou@3x.png" alt="">
          <p>售后</p>
        </div>
      </div>
      <div class="nav-wl">
        <p>最近物流</p>
        <div class="nav-qs" @click="wuliu()">
          <div class="nav-qsp" v-for="(imet,index) in shou">
            <img
              :src=imet.goods[0].headimg
              alt="">
            <div class="nav-right">
              <van-checkbox checked-color="#EF0600"disabled  class="dian" label-position="right" v-model="item"></van-checkbox>
              <p class="dsd">您的快件已经发货</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-gj">
      <div class="nav-dd">
        <span>常用工具</span>
<!--        <span>查看全部工具 <img src="../../assets/gouwuche_button_xiayibu.png" alt=""></span>-->
      </div>
      <div class="xian"></div>
      <div class="nav-xx">
				<div @click="shangpin()"  class="nav-conn">
				  <p><img src="../../assets/shoucang.png" alt=""></p>
				  <p>我的收藏</p>
				</div>
				<div @click="youhuijian()"  class="nav-conn">
				  <p><img src="../../assets/youhuiquan.png" alt=""></p>
				  <p>优惠卷</p>
				</div>
        <div @click="help()"  class="nav-conn">
          <p><img src="../../assets/wentifankui.png" alt=""></p>
          <p>帮助反馈</p>
        </div>
        <div @click="she()" class="nav-conn">
          <p><img src="../../assets/shezhi.png" alt=""></p>
          <p>设置</p>
        </div>
      </div>
    </div>
    <div class="nav-hy">
      <img src="../../assets/huiyuan.png" alt="">
    </div>
    <tuijie v-show="this.$store.state.username == null ? false :true"></tuijie>
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
  import  request from "../utils/request"
  import tuijie from  "../../components/gongyongzujian/tuijian"
  export default {
    name: "myCenter",
    data() {
      return {
        item: true,
        active4: 3,
        name:"",
		kuan:[],
		fa:[],
		shou:[],
		ping:[],
		hou:[],
        img:require("../../assets/touxiang.png"),
        shop:0, //商品长度
        stor:0,//店铺长度
        coupon:0,//优惠券
        ddd:[],

      }
    },
    methods: {
      gerei(){
        this.$router.push({
          name: 'pim',
        })
        window.sessionStorage.setItem("pim" ,3)
      },
			help() {
			  this.$router.push({
			    name: "Help"
			  })
			},
      she() {
        //console.log(1111)
        this.$router.push({
          name: 'set',
          params: {}
        })
      },
      Next(){
        this.$router.push({
          name: 'ddd',

        })
      },
			wuliu() {
			  this.$router.push({
			    name: 'wl',
			  })
			},
      xiaoxi() {
        this.$router.push({
          name: 'news',
        })
      },
      fukaun() {
        this.$router.push({
          //name: 'dd',
          name:"ddd",
          query:{
            id:1
          }
        })
      },
      fahua() {
        this.$router.push({
          //name: 'fh',
          name:"ddd",
          query:{
            id:2
          }
        })
      },
      shouhuo() {
        this.$router.push({
          //name: 'sh',
          name:"ddd",
          query:{
            id:3
          }
        })
      },
      pingjia(){
        this.$router.push({
          //name: 'sh',
          name:"ddd",
          query:{
            id:4
          }
        })
      },
      shouhon(){
        this.$router.push({
          name: 'tk',
          // query:{
          //   id:5
          // }
        })
      },
      shangpin(){
        this.$router.push({
          name: 'shangpin',
          query:{
            id:1
          }
        })
      },
      store(){
        this.$router.push({
          name: 'shangpin',
          query:{
            id:2
          }
        })
      },
      liulan(){
        this.$router.push({
          name: 'll',
        })
      },
      youhuijian(){
        this.$router.push({
          name: 'yhj',
        })
      },
      register(){
        this.$router.push({
          name: 'pim',
        })
        window.sessionStorage.setItem('reg',4)
      },
      Name(){
        if (this.$store.state.username == null ) {
          this.name = "点击登录/注册"
        }else {
          if (this.$store.state.username.username == null){
            this.name= "沿街购"
          }else {
            this.name = this.$store.state.username.username
          }
        }

      },
      portrait(){
        if (this.$store.state.username ==null){

        } else {
         this.img = this.$store.state.username.avatar
        }
      },
      dingdan(){
		request({
		//我的订单
		    url: "api/users/order",
		    method: "post",
		    data: {
		      user_id: this.$store.state.username.id,
		    }
		  }).then(res => {
		    console.log(res)
			for(var i in res.data.data){
				if(res.data.data[i].status==1){
					this.kuan.push(res.data.data[i])
				}if(res.data.data[i].status==2){
					this.fa.push(res.data.data[i])
				}if(res.data.data[i].status==3){
					this.shou.push(res.data.data[i])
					console.log(this.shou)
				}if(res.data.data[i].status==4){
					this.ping.push(res.data.data[i])
				}
			}
		  })
		  this.request({
		    url: "api/order/aftersale",
		    method: "post",
		    data: {
		      user_id: this.$store.state.username.id,
		    },
		  }).then(res => {
		    console.log(res)
			for(var n in res.data.data){
				this.hou.push(res.data.data[n])
			}
		  })
	  },
	Shopping(){
        request({
          url: "api/users/mycollectiongoods",
          method: "post",
          data:{
            user_id:this.$store.getters.userName.id,
          }
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){
            this.shop =res.data.data.length

        }
        })
        request({
          url: "api/users/mycollectionshop",
          method: "post",
          data:{
            user_id:this.$store.getters.userName.id,
          }
        }).then(res => {
          if (res.data.code == 200){
            this.stor =res.data.data.length
          }
        })
        request({
          url: "api/coupon/mycoupon",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            type_id:2
          }
        }).then(res => {
          if (res.data.code == 200){
            this.coupon =res.data.data.length
          }
        })
      }
    },
    mounted() {
     this.Name()
     this.portrait()
      this.Shopping()
	  this.dingdan()
    },
    components:{
      tuijie
    }

  }
</script>

<style scoped>
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
    background: #F9F9F8;

  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }


  .nav img {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .nav-a {
    position: absolute;
    top: 0.68rem;
    right: 0.2rem;
  }
  .nav-a img {
    width: 0.4rem;
    height: 0.4rem;

  }

  .nav-ph {
    position: absolute;
    top: 1.6rem;
    left: 50%;
    margin-left: -0.75rem;
    border-radius: 50%;
    overflow: hidden;
    width: 1.5rem;
    height: 1.5rem;
    display: table-cell;
    text-align: center;
    vertical-align: middle;

  }

  .nav-ph img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .name {
    text-align: center;
    font-size: 0.36rem;
    margin-bottom: 0.4rem;
  }

  .dingdan {
    width: 6.9rem;
    height: 4rem;
    background: #FFFFFF;
    margin: 0 auto;
    border-radius: 5px;
  }

  .nav-dd {
    padding: 0 0.2rem 0 0.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;

  }

  .nav-dd span:nth-child(1) {
    font-size: 0.3rem;
  }

  .nav-dd span:nth-child(2) {
    font-size: 0.24rem;
  }

  .nav-dd span:nth-child(2) img {
    width: 0.15rem;
    height: 0.2rem;
    margin-left: 0.1rem;
  }

  .xian {
    width: 6.9rem;
    height: 1px;
    background-color: #eeeeee;
  }

  .nav-xx {
    width: 6.24rem;
    height: 1rem;

    margin: 0.32rem auto;
    display: flex;
    justify-content: space-between;
  }
 .nav-xx img{
	 width: 30px;
 }
  .nav-con {
    height: 1rem;
    font-size: 0.24rem;
	position: relative;
  }
  .shu{
	  position: absolute;
	  left: 0.5rem;
	  top: -0.05rem;
	  background: #fff;
	  padding: 0.01rem 0.08rem 0.01rem 0.08rem;
	  border: 1px solid #EF1C11;
	  color: #EF1C11;
	  border-radius: 10px;
  }
  .nav-con img {
    width: 0.44rem;
    height: 0.44rem;
    margin: 0.1rem;
  }

  .nav-wl {
    width: 6.5rem;
    height: 1.6rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    background: #F9F9F8;
  }

  .nav-wl>p {
    text-align: left;
    font-size: 0.2rem;
    margin: 0.2rem;
    padding-top: 0.2rem;
  }

  .nav-qs {
    width: 6rem;
    height: 0.8rem;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: scroll;;

  }

  .nav-qsp {
    height: 0.8rem;
    width: 6rem;
  }

  .nav-qsp img {
    width: 0.8rem;
    height: 0.8rem;
    float: left;
  }

  .dian {
    float: left;
    margin-left: 0.3rem;

  }

  .dsd {
    position: relative;
    top: 0.5rem;
    right: 1.25rem;
    color: black;
    font-size: 0.2rem;

  }

  .nav-gj {
    width: 6.9rem;
    height: 2rem;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 0.2rem;
  }

  .nav-conn {
    height: 1rem;
    font-size: 0.24rem;
  }

  .nav-conn p:nth-child(1) {
    font-size: 0.36rem;

  }

  .nav-conn p:nth-child(2) {
    font-size: 0.24rem;

  }

  .nav-hy {
    width: 100%;
    height: 2rem;
    margin-top: 0.2rem;
  }

  .nav-hy img {
    width: 7rem;
    height: 2rem;
  }


  .nav-tj-bottom-div-ppp span:nth-child(1) {
    font-size: 0.22rem;
    color: #EF0600;
    float: left;
    position: relative;
    bottom: -0.05rem;
  }

  .nav-tj-bottom-div-ppp span:nth-child(2) {
    font-size: 0.32rem;
    color: #EF0600;
    float: left;
  }

  .nav-tj-bottom-div-ppp span:nth-child(3) {
    font-size: 0.24rem;
    color: #777777;
    float: right;
    margin-right: 0.28rem;
  }

  /deep/ .van-checkbox__icon--disabled .van-icon {
    border-color: #ef0600;
    background-color: white  ;
  }
  /deep/ .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
     color:  #ef0600;
  }

  /deep/ .van-checkbox__icon .van-icon{
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.24rem;
  }
</style>
