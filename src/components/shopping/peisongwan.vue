<template>
  <div class="box">
    <div class="box-container">
    <div class="nav-top">
      <div class="nav">
        <div class="navvan">
        	<van-icon @click="fh()" class="nav-left"  name="arrow-left" size="0.5rem"/>
        	<p>订单详情</p>
        </div>
      </div>
    </div>
   <div class="shangjie">
	   <p style="font-size: 0.3rem;">订单已完成</p>	   
	   <p>感谢您的支持，欢迎下次光临</p>	  
		<button @click="pingjia()">评价</button>		   
   </div>
   <div class="qsxm" v-if="pstatu !== 0 ? true:false">
   	  <dt>
		  <img  src="../../assets/touxiang.png" alt="">
	  </dt>
	  <dd>
		  <p style="margin-left: 0.05rem;">骑手姓名</p>
		  <p style="display: flex;"><van-rate v-model="value" readonly /><span>4.9分</span></p>
	  </dd>
	  <div class="ph">
		  <img src="../../assets/phone.png" alt="">
	  </div>
   </div>
    <div  class="concat">
      <div class="concat-a">
        <img alt="" src="../../assets/dingdan_dianpu.png">
        <!-- <p>{{listData.sname}}</p> -->
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
	<div class="pei">
		<p>配送时间：<span>{{listData.takes_time}}</span></p>
		<p>配送地址：<span>{{listData.province + listData.city + listData.area + listData.address}}</span></p>
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
		pstatu:4,
		value:2
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
	  pingjia(){
		  console.log(this.listData.goods[0])
		  this.$router.push({
		    name: 'pj',
		    query:{
		      active:this.ative,
			  b: this.listData.goods[0],
			  c:this.listData.goods[0].gtitle
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
console.log(this.id)
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
    height: 1rem;
	position: fixed;
	z-index: 2000;
  }

  .nav {
      width: 100%;
      height: 0.88rem;
      position: relative;
	  background: #fff;
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
  .shangjie{
	  margin: 1rem 0.3rem 0.2rem 0.3rem;
	  border-radius: 10px;
	  background: #fff;
	  padding-bottom: 0.2rem;
	   padding-top: 0.2rem;
  }

 .shangjie p{
	 font-size: 0.25rem;
	 margin-bottom: 0.3rem;
 }
 .shangjie button{
	 border: 1px solid #000000;
	 background: #fff;
	 padding: 0.05rem 0.1rem 0.05rem 0.1rem;
	 width: 1.3rem;
	 border-radius: 5px;
 }

 .qsxm{
	 background: #fff;
	 display: flex;
	 border-radius: 10px;
	 text-align: left;
	 margin: 0 0.3rem 0.2rem  0.3rem;
	 padding: 0.1rem 0.2rem 0.1rem 0.2rem;
 }

 .qsxm dt{
	 flex: 1;
	 padding: 0.1rem;
 }
 .qsxm dd{
 	 flex: 5;
	 margin-top:0.15rem;
	 font-size: 0.28rem;
 	 padding: 0.1rem;
 }
 .qsxm dd p{
	 margin-bottom: 0.1rem;
 }
 .qsxm dt img{
	 margin-top:0.15rem;
 	 width: 100%;
 }
 .qsxm .ph{
	 flex: 1;
 }
 .ph img{
	 margin: 0.35rem 0.1rem 0.35rem 0.1rem;
	 width: 0.6rem;
 }
  .concat {
    width: 6.9rem;
    min-height: 5.75rem;
    border-radius: 10px;
    background: #FFFFFF;
    margin: 0 auto;
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

.pei{
	background: #fff;
	border-radius: 10px;
	text-align: left;
	font-size: 0.25rem;
	 margin: 0.2rem 0.3rem 0.2rem  0.3rem;
	 padding: 0.1rem 0.2rem 0.1rem 0.2rem;
}

.pei p{
	margin-bottom: 0.15rem;
}

.footer {
      width: 100%;
      height: 0.9rem;
      background: #FFFFFF;
      position: fixed;
      bottom: 0;
    }
  
    .footer p {
      display: inline-block;
      width: 1.8rem;
      height: 0.6rem;
      border: 1px solid #777777;
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

