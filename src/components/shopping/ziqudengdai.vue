<template>
  <div class="box">
    <div class="box-container">
    <div class="nav-top">
      <div class="nav">
        <div class="navvan">
        	<van-icon @click="fh()" class="nav-left" color="#FFFFFF" name="arrow-left" size="0.5rem"/>
        	<p style="color:#FFFFFF">订单详情</p>
        </div>
        <p class="nav-top-p"  v-if="stq == 3 ? true:false">等待取货</p>
		<p class="nav-top-pp" v-if="stq == 3 ? true:false"> 商家已准备完成</p>
		<p class="nav-top-p" v-if="stq == 2 ? true:false">买家已付款</p>
		<p class="nav-top-pp" v-if="stq == 2 ? true:false"> 商家已接单，准备中</p>
        <div class="dz">
         <p>取件码：<span style="color: red;">{{listData.order_sn}}</span></p>
         <p>自取时间：<span>{{listData.takes_time}}</span></p>
         <p>商家地址：{{listData.shopaddr.province+listData.shopaddr.city+listData.shopaddr.area+listData.shopaddr.street+listData.shopaddr.address}}</p>
        </div>
      </div>
    </div>
   
    <div  class="concat">
      <div class="concat-a">
        <img alt="" src="../../assets/dingdan_dianpu.png">
        <p>{{listData.sname}}</p>
      </div>
      <div class="concat-b" v-for="(item ,index) in listData.goods" :key="index">
        <img :src="item.headimg" alt="">
        <p class="concat-b-a">{{item.gtitle}}</p>
        <p class="concat-b-b">{{item.specification}}</p>
        <p class="concat-b-c">￥{{item.ogprice}}</p>
        <p class="concat-b-d">x{{item.num}}</p>
      </div>

     <p class="concat-c">到店自取 <span>￥0.00</span></p>
     <p class="concat-ml">店铺优惠 <span>￥0.00</span> </p>
      <div class="concat-d">
        订单备注 <input placeholder="暂无备注" type="text" v-model="listData.remark_member" >
      </div>
      <p class="jia">订单价格 <span>￥{{listData.oldmoney}}</span></p>
      <p class="concat-e"> 需付款: <span> ￥{{listData.money}}</span></p>
    </div>
    <div class="xin">
      <p>订单信息</p>
      <p>订单编号
        <span>{{listData.order_sn}}</span>
        <button class="fz" type="button"
                v-clipboard:copy="listData.order_sn"
                v-clipboard:error="onError"
                v-clipboard:success="onCopy">复制
        </button>
      </p>
      <p>下单时间 <span>{{listData.add_time}}</span></p>
      <p>成交时间 <span>{{listData.paytime}}</span></p>
			<div class="liann">
				<div><p><img alt="" src="../../assets/kehufuwu.png">联系客服</p></div>
				<div><p @click="lianxi()"><img alt="" src="../../assets/dingdan_bodadianhua.png">拨打电话</p></div>
			</div>
    </div>
    <div style="height: 3rem"></div>
    <div class="footer">
		<p v-show="stq == 2 ? true:false">准备中</p>
      <p @click="shouhuo()" v-show="stq == 3 ? true:false">确认收货</p>
    </div>
    </div>
    <meta name="format-detection" content="telephone=yes" />
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  export default {
    name: "querengshouhuotwo",
    data() {
      return {
        listData: [],
        id:"",
        ative:"",
        phone:15139020714,
		stq:this.$route.query.status
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'ddd',
          query:{
            id:this.ative
          }
        })
      },
      onCopy: function (e) {
        Toast('复制成功');
      },
      onError: function (e) {
        Toast('复制失败');
      },
      Fast() {
        this.request({
          url: "api/users/orderdetail",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            order_id: this.id,
          },
        }).then(res => {
          console.log(res)
          this.listData = res.data.data
        })
      },
     shouhuo(){
       this.request({
         url: "api/order/orderok",
         method: "post",
         data: {
           user_id: this.$store.state.username.id,
           order_id: this.listData.id,
         },
       }).then(res => {
         //console.log(res)
        if (res.data.code == 200){
          this.$router.push({
            name: 'shcg',
          })
        }
       })
     },
      lianxi(){
        this.$dialog.alert({
          title: "客服电话", //加上标题
          message: this.phone, //改变弹出框的内容
          showCancelButton: true //展示取水按钮
        })
          .then(() => { //点击确认按钮后的调用
            window.location.href = 'tel://' + this.phone

          })
          .catch(() => { //点击取消按钮后的调用


          })
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.ative = this.$route.query.ative
      this.Fast()

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
    background: #F9F9F8;

  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  .nav-top {
    width: 100%;
    height: 4.63rem;
    background-image: url(../../assets/diangdandaifahuo.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 1.1rem;
  }

  .nav {
      width: 100%;
      height: 0.88rem;
      position: relative;
    }
  .navvan{
  	width: 100%;
  	height: 0.88rem;
  	font-size: 0.36rem;
  	line-height: 0.88rem;
  	text-align: center;
  }
  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
  }
.nav-top-pp {
    text-align: center;
    height: 0;
    font-size: 0.24rem !important;
    color: #FFFFFF;
    margin-top: 0.2rem;
  }
  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .nav-top-p {
    text-align: left;
    height: 0.45rem;
    font-size: 0.36rem;
    color: #FFFFFF;
    margin-top: 0.8rem;
    margin-left: 1rem;
  }

  .nav-top-pp {
    text-align: left;
    height: 0;
    font-size: 0.24rem !important;
    color: #FFFFFF;
    margin-left: 1rem;
  }

  .dz {
    width: 6.9rem;
    height: 1.7rem;
    margin: 0.2rem auto 0.2rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    margin-left: -3.45rem;
    top: 3.55rem;
  	text-align: left;
  }
  .dz>p{
  	  margin-top: 0.1rem;
  	  font-size: 0.24rem;
  	  margin-left: 0.3rem;
  }
  .dz>p:first-child{
  	   color: #333333;
  }
  .dz>p{
  	   color: #777777;
  }

  .dzz {
    width: 6.9rem;
    height: 1.7rem;
    margin: 0.2rem auto 0.2rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;

  }

  .dzz img:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    float: left;
    margin-top: 0.55rem;
    margin-left: 0.2rem;

  }

  .dzz-a {
    width: 5.9rem;
    height: 1.4rem;
    float: right;
    margin-top: 0.15rem;

    text-align: left;
  }

  .dzz-a p:nth-child(1) {

    height: 0.5rem;
    width: 5rem;
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #00A0E9;
  }

  .dzz-a p:nth-child(2) {
    font-size: 0.2rem;
    color: #777777;
    margin-top: 0.6rem;
  }

  .dzz-img {
    width: 0.14rem;
    height: 0.24rem;
    position: absolute;
    top: 50%;
    margin-top: -0.12rem;
    right: 0.5rem;
  }


  .concat {
    width: 6.9rem;
    min-height: 5.75rem;
    border-radius: 10px;
    background: #FFFFFF;
    margin: 0 auto;
    margin-top: 0.2rem;

  }

  .concat-a {
    width: 100%;
    height: 0.88rem;
  }

  .concat-a img {
    width: 0.3rem;
    height: 0.3rem;
    float: left;
    margin-top: 0.3rem;
    margin-left: 0.2rem;
  }

  .concat-a p {
    text-align: left;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.24rem;
    font-weight: bold;
    color: #333333;
    text-indent: 0.15rem;
  }

  .concat-b {
    width: 6.5rem;
    height: 1.6rem;
    position: relative;
    margin: 0.1rem 0 0 0.2rem;
  }

  .concat-b img {
    width: 1.6rem;
    height: 1.6rem;
    float: left;
  }

  .concat-b-a {
    width: 3.4rem;
    margin-left: 1.8rem;
    text-align: left;
    font-size: 0.24rem;
    line-height: 0.29rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .concat-b-b {
    text-align: left;
    font-size: 0.2rem;
    color: #777777;
    text-indent: 0.2rem;
    line-height: 0.4rem;
  }

  .concat-b-c {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.2rem;
  }

  .concat-b-d {
    position: absolute;
    right: 0;
    top: 0.25rem;
    font-size: 0.2rem;
    color: #777777;
  }

  .concat-c {
    font-size: 0.24rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }
.concat-ml{
	  font-size: 0.24rem;
	  height: 0.5rem;
	  text-align: left;
	  text-indent: 0.2rem;
	  color: #777777;
  }
.concat-ml span:nth-child(1) {
    margin-left: 0.4rem;
    font-size: 0.24rem;
    color: #777777;
    float: right;
	position: absolute;
	right: 0.3rem;
    margin-right: 0.25rem;
  }
  .jia {
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.3rem;
  }

  .jia span {
    float: right;
    margin-right: 0.4rem;
    font-size: 0.3rem;
  }

  .concat-c span:nth-child(1) {
    margin-left: 0.4rem;
    font-size: 0.24rem;
    color: #777777;
    float: right;
    margin-right: 0.25rem;
  }

  .concat-d {
    text-align: left;
    font-size: 0.24rem;
    text-indent: 0.2rem;
    color: #777777;
  }

  .concat-d input {
    border: 0;
    margin-left: 0.2rem;
    width: 4rem;
  }

  .concat-e {
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: right;
    font-size: 0.24rem;
    margin-right: 0.4rem;
  }

  .concat-e span {
    color: #EF0600;
    font-size: 0.3rem;
  }

.footer {
      width: 100%;
      height: 0.9rem;
      background: #FFFFFF;
      position: fixed;
      bottom: 0;	  
    }
  .footer p:first-child{
    display: inline-block;
    width: 1.8rem;
    height: 0.6rem;
    border: 1px solid #777777;
    border-radius: 30px;
    line-height: 0.6rem;
    font-size: 0.3rem;
    position: absolute;
	color: #333333;
    top: 50%;
    right: 0.3rem;
    margin-top: -0.3rem;
  }
    .footer p {
		color: red;
      display: inline-block;
      width: 1.8rem;
      height: 0.6rem;
      border: 1px solid #EF0600;
      border-radius: 30px;
      line-height: 0.6rem;
      font-size: 0.3rem;
      position: absolute;
      top: 50%;
      right: 0.3rem;
      margin-top: -0.3rem;
    }
  .liann img {
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
  
  .xin .liann {
        width: 100%;
        height: 0.8rem;
        background: #FFFFFF;
    		display: flex;
    		margin-top: 0.2rem;
      }
    .xin .liann>div{
    	flex: 1;
    }
      .xin .liann>div:nth-child(1)>p {
        width: 1.8rem;
        height: 0.6rem;
        border: 1px solid rgba(241, 21, 15, 1);
        border-radius: 30px;
        line-height: 0.6rem;
        color: #EF0600;
        font-size: 0.24rem;
    		margin-left: 0.1rem;
      }
    
      .xin .liann>div:nth-child(2)>p {
        width: 1.8rem;
  			border: 1px solid rgba(241, 21, 15, 1);
  			color: #EF0600;
        height: 0.6rem;
        border-radius: 30px;
        line-height: 0.6rem;
        font-size: 0.24rem;
    		position: absolute;
    		right: 0.4rem;
      }
  
  
    .xin {
      width: 6.9rem;
      height: 3.3rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin: 0.2rem auto;
    }

  .xin>p:nth-child(1) {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.3rem;
    text-align: left;
    text-indent: 0.2rem;
  }

  .xin>p:nth-child(2) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }

  .xin>p:nth-child(3) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }

  .xin>p:nth-child(4) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }

  .xin>span {
    font-size: 0.24rem;
    color: #333333;
    margin-left: 0.5rem;
  }

  .fz {
    width: 0.67rem;
    height: 0.3rem;
    border-radius: 10px;
    line-height: 0.3rem;
    background: #EF0600;
    color: white;
    font-size: 0.24px;
    list-style: none;
    border: 0;
    float: right;
    margin-right: 0.5rem;
  }


</style>

