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
   <div style="margin-top: 1.2rem;height: 5rem;" ><!-- v-if="poiu.state ==10|poiu.state ==-1 ? false:true" -->
	   <div id="container">  
	   </div> 
   </div>
   <div class="shangjie" v-if="poiu.state ==10||poiu.state ==-1 ? false:true">
	   <p v-if="poiu.state == 1 ? true:false" style="font-size: 0.34rem;">商家已接单</p>
	   <p v-if="poiu.state == 3 ? true:false" style="font-size: 0.34rem;">骑手已接单</p>
	   <p v-if="poiu.state == 4 ? true:false" style="font-size: 0.34rem;">骑手已接单，正在赶往商家</p>
	   <p v-if="poiu.state == 5 ? true:false" style="font-size: 0.34rem;">骑手正在送货</p>
	   <p>预计送达<span>{{poiu.expectedarrive_time}}</span></p>
	   <p>
		   <button @click="tui()" v-if="poiu.state === 1||poiu.state === 3 ? true:false">申请退款</button>
		   <button style="margin-left: 0.05rem;">催单</button>
		   <button @click="shouhuo()" v-if="pstatu == 6 ? true:false" style="background: #EF0600;color: #fff;border: #EF0600;margin-left: 0.05rem;">确认收货</button>
	   </p>
   </div>
   <div class="shangjia" v-if="poiu.state ===10 ? true:false">
     <p style="font-size: 0.3rem;">订单已完成</p>	   
     <p>感谢您的支持，欢迎下次光临</p>	  
   		<button @click="pingjia()">评价</button>		   
   </div>
   <div class="shangjia" v-if="poiu.state ==-1 ? true:false">
     <p style="font-size: 0.3rem;">订单已取消</p>	   
     <p>感谢您的支持，欢迎下次光临</p>	  		   
   </div>
   <div class="qsxm" v-if="poiu.state !== 1 ? true:false">
   	  <dt>
		  <img :src=poiu.driver_photo alt="">
	  </dt>
	  <dd v-if="value!=null">
		  <p style="margin-left: 0.05rem;">{{poiu.driver_name}}</p>
		  <p style="display: flex;"><van-rate v-model="value" readonly /><span>{{value}}分</span></p>
	  </dd>
	  <dd v-if="value==null">
	  		  <p style="margin-left: 0.05rem;margin-top: 0.2rem;">{{poiu.driver_name}}</p>
	  </dd>
	  <div class="ph">
		  <img src="../../assets/phone.png" alt="">
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

     <p class="concat-c">配送费 <span>￥{{listData.freight}}</span></p>
     <p class="concat-ml">店铺优惠 <span>￥{{listData.couponprice}}</span> </p>
      <div class="concat-d">
        订单备注 <input placeholder="暂无备注" type="text" v-model="listData.remark_member" >
      </div>
      <p class="jia">订单价格 <span>￥{{listData.money}}</span></p>
      <p class="concat-e"> 需付款: <span> ￥{{listData.money}}</span></p>
    </div>
	<div class="pei">
		<p>配送时间：<span>{{poiu.finish_time}}</span></p>
		<p>配送地址：<span>{{poiu.to_address}}</span></p>
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
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=e785b2d68f5c945dd0b7f293c6db3d3b"></script> 
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
		listid:'',
        ative:"",
		pstatu:this.$route.query.status,
		value:2,
		list:'',
		name:"",
		time:'',
		photo:'',
		di:'',
		ytime:'',
		poiu:[]
      }
    },
	created() {
		
	},
    methods: {
		xiang(){
			  console.log(this.listid)
			  this.request({
			    url: "api/order/detailsxq",
			    method: "post",
			    data: {
			      id:this.listid,
			    },
			  }).then(res => {
			    console.log(JSON.parse(res.data.msg))
				this.poiu=JSON.parse(res.data.msg)
				this.value=JSON.parse(res.data.msg).start_level
			  })
			  
		},
		ditudu(){
			//显示地图
					  var map = new AMap.Map('container', {
					  resizeEnable: true,
					  zoom:16,
					  center: [window.sessionStorage.getItem('lng'),window.sessionStorage.getItem('lat') ],
					  })
					  // var asd=[113.71062,34.75334 ]
					  // var zxc=[115.71072,36.75374]
					  /**
					   * 开始搜索路径规划方案
					   */
					  // AMap.public void searchRouteResult(int routeType, int mode) {
					  //     if (mStartPoint == null) {
					  //         ToastUtil.show(mContext, "曼哈顿商业广场");
					  //         return;
					  //     }
					  //     if (mEndPoint == null) {
					  //         ToastUtil.show(mContext, "沈庄新城");
					  //     }
					  //     showProgressDialog();
					  //     final RouteSearch.FromAndTo fromAndTo = new RouteSearch.FromAndTo(
					  //         mStartPoint, mEndPoint);
					  //     if (routeType == ROUTE_TYPE_BUS) {// 公交路径规划
					  //         BusRouteQuery query = new BusRouteQuery(fromAndTo, mode,
					  //             mCurrentCityName, 0);// 第一个参数表示路径规划的起点和终点，第二个参数表示公交查询模式，第三个参数表示公交查询城市区号，第四个参数表示是否计算夜班车，0表示不计算
					  //         mRouteSearch.calculateBusRouteAsyn(query);// 异步路径规划公交模式查询
					  //     } else if (routeType == ROUTE_TYPE_DRIVE) {// 驾车路径规划
					  //         DriveRouteQuery query = new DriveRouteQuery(fromAndTo, mode, null,
					  //             null, "");// 第一个参数表示路径规划的起点和终点，第二个参数表示驾车模式，第三个参数表示途经点，第四个参数表示避让区域，第五个参数表示避让道路
					  //         mRouteSearch.calculateDriveRouteAsyn(query);// 异步路径规划驾车模式查询
					  //     } else if (routeType == ROUTE_TYPE_WALK) {// 步行路径规划
					  //         WalkRouteQuery query = new WalkRouteQuery(fromAndTo, mode);
					  //         mRouteSearch.calculateWalkRouteAsyn(query);// 异步路径规划步行模式查询
					  //     }
					  // }
		},

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
		  this.list=res.data.data.goods
		  this.listid=res.data.data.id
		  this.xiang()
        })
		console.log(this.listData)
		
      },
	  shouhuo(){
		  console.log(this.listData)
	    this.request({
	      url: "api/order/orderok",
	      method: "post",
	      data: {
	        user_id: this.$store.state.username.id,
	        order_id: this.listData.id,
	      },
	    }).then(res => {
	      console.log(res)
	     if (res.data.code == 200){
	       this.$router.push({
	         name: 'psw',
			 query:{
			  id:this.id,
			  ative:this.ative
			 }
	       })
	     }
	    })
	  },
	  
	  tui(){
		  console.log(this.list)
		  this.$router.push({
		    name: 'sqtk',
		    query:{
		      id: this.list,
		      order_id: this.listData.id,
		      f: this.listData.id,
		      g:6
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
	  this.ditudu()
    }
  }
</script>
 <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
<style scoped>
	#container {
		width:100%; 
		height: 100%;
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

  .shangjie{
	  margin: 0.5rem 0.3rem 0.2rem 0.3rem;
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
  
  .shangjia{
	  margin: 1.2rem 0.3rem 0.2rem 0.3rem;
	  border-radius: 10px;
	  background: #fff;
	  padding-bottom: 0.2rem;
	  padding-top: 0.15rem;
  }

 .shangjia p{
	 font-size: 0.25rem;
	 margin-bottom: 0.2rem;
 }
.shangjia span{
	color: #7BA6EB;
 }
 .shangjia button{
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

