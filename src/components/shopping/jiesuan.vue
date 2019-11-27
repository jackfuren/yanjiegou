<template>
  <div class="wind">
	  <!-- <transition name="fade"> -->
	      <!-- <loading v-if="isLoading"></loading> -->
	  <!-- </transition> -->
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>确认订单</p>
      </div>
	  
	  <div class="po">
			<ul class="cos">
				<li v-for="(item,index) in swe" :key="index" @click="kuai(index)" :class="song==index?'ac':''">{{item}}</li>
			</ul>
			<div @click="sitee()" class="dzz" v-if="location">
			  <img src="../../assets/ui.png" alt="">
			  <p>请前往添加收货地址</p>
			  <img alt=""  class="dzz-img" src="../../assets/dingdan_xiayibu.png">
			</div>
			<div class="dz" v-if="locationn">
			  <img alt="" src="../../assets/dingdan_dizhi.png">
			  <div class="dz-a">
			    <p> {{listarr.consignee}} <span>{{listarr.phone}}</span></p>
			    <p>{{listarr.province +listarr.city +listarr.area+listarr.address}}</p>
			  </div>
			  <img alt="" @click="site()" class="dz-img" src="../../assets/dingdan_xiayibu.png">
			</div>
			<p class="paotui" v-show="song ===1 ? true : false" @click="time()">
				立即送出<span>大约{{timm}}送达</span><img alt="" class="dz-img" src="../../assets/dingdan_xiayibu.png">
			</p>
			<div class="ziqu" v-show="song ===2 ? true : false">
				<li style="border-right: 0.01rem solid #E5E5E5;" @click="time()"><p>自取时间</p><p>{{timm}}</p><img alt="" class="dimg" src="../../assets/dingdan_xiayibu.png"></li>
				<li><p>预留电话</p><p><input type="text" :value=vaue></p><img alt="" class="dimg" src="../../assets/dingdan_xiayibu.png"></li>
			</div>
	  </div>	  
      <div :key="index" class="concat" v-for="(item ,index) in listData" >
        <div style="background: #fff;">
			<div class="concat-a">
			  <img alt="" src="../../assets/dingdan_dianpu.png">
			  <p>{{item.name}}</p>
			</div>
			<div class="concat-b" v-for="(ite ,i) in item.goods" :key="i">
			  <img :src="ite.headimg" alt="">
			  <p class="concat-b-a">{{ite.title}}</p>
			  <p class="concat-b-b">{{ite.goods_attr_val}}</p>
			  <p class="concat-b-c">￥{{ite.price}}</p>
			  <p class="concat-b-d">x{{ite.num}}</p>
			</div>
			<div class="concat-x">
			  配送方式 
			  <p style="display: inline;">
				  <span v-show="song ===0 ? true : false">快递配送</span>
				  <span v-show="song ===1 ? true : false">专业配送</span>
				  <span v-show="song ===2 ? true : false">到店自取</span>
			  </p>
			  <p style="display: inline;">
				  <span v-show="song ===0 ? true : false">快递   ￥{{youfei[index]}}</span>
				  <span v-show="song ===1 ? true : false">配送   ￥{{youfei[index]}}</span>
				  <span v-show="song ===2 ? true : false"></span>
			  </p>
			</div>
				<van-cell-group>
				  <van-field
				    v-model="item.remark_member"
				    rows="1"
				    autosize
				    label="订单备注"
				    type="textarea"
				    placeholder="请输入留言"
				  />
				</van-cell-group>
			<div class="concat-y" v-show="item.coupon_name !='' ? true : false">
			  店铺优惠<span>{{item.coupon_name}}</span>
			</div>
			<p v-if="song !=2 ? true : false" class="concat-e">共{{item.totalnum}}件 小计: ￥<span id="pop"> {{item.totalprice-item.coupon_price+youfei[index]}}</span></p>
			<p v-if="song ===2 ? true : false" class="concat-e">共{{item.totalnum}}件 小计: ￥<span id="pop"> {{item.totalprice-item.coupon_price}}</span></p>
		</div>
      </div>
	  <div class="pingtai" v-show="is_public ===1 ? true : false">
	  	<div class="pingtai-a">
	  		平台优惠<span>{{pinyou.name}}</span>
	  	</div>
	  </div>
      <div class="zf">
        <p class="zf-a" @click="xz()">
          <span>支付方式</span>
          <span class="zf-paa" v-show="show ===1 ? true : false"><img alt="" src="../../assets/zhifubao.png">支付宝<van-icon
             class="concat-right" color="#CCCCCC" name="arrow-down" size="0.3rem;"
            style="width:0px;position: absolute;right: 0.5rem;top:0.3rem"/></span>
          <span class="zf-paa" v-show="show ===2 ? true : false"><img alt="" src="../../assets/weixin.png">微信支付<van-icon
             class="concat-right" color="#CCCCCC" name="arrow-down" size="0.3rem;"
            style="width:0px;position:  absolute;right: 0.5rem;top:0.3rem"/></span>
          <span class="zf-paa" v-show="show ===3 ? true : false"><img alt="" src="../../assets/yinlian.png">银联支付<van-icon
             class="concat-right" color="#CCCCCC" name="arrow-down" size="0.3rem;"
            style="width:0px;position: absolute;right: 0.5rem;top:0.3rem"/></span>
        </p>
        <div class="zf-yc" v-show="show1">
          <p @click="zfb()"><img alt="" src="../../assets/zhifubao.png">支付宝
            <van-checkbox  checked-color="#EF0600" class="zf-a-right" v-model="checkeda"></van-checkbox>
          </p>
          <p @click="wx()"><img alt="" src="../../assets/weixin.png">微信支付
            <van-checkbox checked-color="#EF0600" class="zf-a-right" v-model="checkedb"></van-checkbox>
          </p>
          <p  @click="yl()" style="display: none"><img alt="" src="../../assets/yinlian.png">银联支付
            <van-checkbox checked-color="#EF0600" class="zf-a-right" v-model="checkedc"></van-checkbox>
          </p>
        </div>
      </div>	  
	  <timepicker v-show="meti ===1 ? true : false"  @sendmsg="shuju"></timepicker>
      <div class="footer">
        <div>共{{selected_products}}件 <span>合计:</span> <span>￥{{ total_amount}}</span></div>
        <div v-show="ti ===0 ? true : false" @click="Submit()">提交订单</div>
		<div style="background: #CCCCCC;" v-show="ti ===1 ? true : false">提交订单</div>
		<div style="background: #CCCCCC;" v-show="ti ===2 ? true : false" @click="tix()">提交订单</div>
      </div>
      <div style="width: 100%;height: 1px"></div>
    </div>
	<div @click="guan()" v-show="meti ===1 ? true : false" style="height: 100%;width: 100%;background-color: rgba(0,0,0,.7);position: fixed;top: 0.01rem;z-index: 900;"></div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import timepicker from "@/components/shopping/timepicker.vue" 
	import { Toast } from 'vant';
	Vue.use(Toast);
	// import Loading from '@/components/gongyongzujian/loading.vue'
  export default {
    name: "jiesuan",
	components:{
	      timepicker,    // 将组件隐射为标签
		  // Loading
	},
    data() {
      return {
		isLoading: true,
		ti:0,
        listData: [],
		lis:[],
		is_public:0,
		cose:1,
		listarr:[],
        money: '',
        show: 1,
        show1: false,//显示所有支付方式以供选择
        checkeda: true,//支付宝支付
        checkedb: false,//微信支付
        checkedc: false,//银联支付
        c: false,
        bei: [],
        cart_id: [],
        total_amount:0,
        selected_products:0,
        arrList: [],
        datadorm: "",
        token: "",
        id: '',
        idd: '',
        location: false,
        locationn: true,
		msg:'',
		con:'',
		qqq:[],
		pu:[],
		vaue:'',
		minp:[0],
		minnp:'',
		heji:[],
		heshu:[],
		song:0,
		swe:["快递配送","专业配送","到店自取"],
		meti:0,
		tim:'',
		ip:'',
		shop_id:'',
		cart_id:'',
		timm:'',
		dhao:'',//随机订单号
		youfei:[],//邮费
		price_token:[],
		order_price:[],
		youyo:[],
		aa:'',
		yuanjia:'',
		youhui:'',
		dyou:'',
		youy:'',
		pinyou:{//品牌优惠券
				name:'',
				price:0,
				pid:'',
				ji:''
			}
	  }  
    },
	
    methods: {
		//获取用户ip
		getUserIP(onNewIP) {
		        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
		        let pc = new MyPeerConnection({
		            iceServers: []
		          });
		        let noop = () => {
		          };
		        let localIPs = {};
		        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
		        let iterateIP = (ip) => {
		          if (!localIPs[ip]) onNewIP(ip);
		          localIPs[ip] = true;
		        };
		        pc.createDataChannel('');
		        pc.createOffer().then((sdp) => {
		          sdp.sdp.split('\n').forEach(function (line) {
		            if (line.indexOf('candidate') < 0) return;
		            line.match(ipRegex).forEach(iterateIP);
		          });
		          pc.setLocalDescription(sdp, noop, noop);
		        }).catch((reason) => {
		        });
		        pc.onicecandidate = (ice) => {
		          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
		        };
		      },
		shuju(data){
			console.log(data)
			this.tim=data
		},
		time(){
			this.meti=1
		},
		guan(){
			this.meti=0
			this.timm=this.tim
			// console.log(this.timm)
		},
      fh() {
        if (this.token == 55) {
          this.$router.push({
            name: 'wpxq',
            query: {
              goods_id: this.id,
              token: this.idd
            }
          })
        } else {
          this.$router.push({
            name: 'Shop',
          })
        }
      },
	  kuai(index){
		  this.ti=0
		  console.log(this.youfei,this.youyo)
			// console.log(this.song)
			if(this.listData.length>1){
				// this.song=index
				if(index==2){
					this.song==0
					Toast('不在同一个商家不可以选择自取');
				}else{
					this.song=index
				}
			}else{
					this.song=index
				}
				 this.ptmoney()
	  },
	  openid(){ 
	  },
      site() {
        this.$router.push({
          name: 'sho',
          query: {
            cart_id: this.cart_id,
            total_amount: this.total_amount,
            selected_products: this.selected_products,
            token: 1
          }
        })
      },
      onSubmit() {
        this.$store.dispatch('Bei', this.bei)
      },
      xz() {
        this.show1 = !this.show1
      },
      zfb() {
        this.checkeda = true
        this.checkedb = false
        this.checkedc = false
        this.show = 1
        this.show1 = false
      },
      wx() {
        this.checkeda = false
        this.checkedb = true
        this.checkedc = false
        this.show = 2
        this.show1 = false
      },
      yl() {
        this.checkeda = false
        this.checkedb = false
        this.checkedc = true
        this.show = 3
        this.show1 = false
      },
      Fast() {
        this.request({
          url: "api/order/index",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            cart_id: this.cart_id,
          },
        }).then(res => {
			console.log(res)
          if (res.data.code == -1) {
			this.msg=res.data.code
            this.location = true
            this.locationn = false
            window.sessionStorage.setItem("lijitoken", JSON.stringify(1))
            var list = {
              A: this.cart_id,
              B: this.total_amount,
              C: this.selected_products,
              D: this.token,
              E: this.id,
              F: this.idd
            }
            window.sessionStorage.setItem("llll", JSON.stringify(list))
            this.listData = res.data.data.shop
			this.dhao=res.data.data.origin_id
            this.pd()
			this.ptmoney()
          } else {
            this.location = false
            this.locationn = true
			window.sessionStorage.setItem("lijitoken", JSON.stringify(1))
			var list = {
			  A: this.cart_id,
			  B: this.total_amount,
			  C: this.selected_products,
			  D: this.token,
			  E: this.id,
			  F: this.idd
			}
			window.sessionStorage.setItem("llll", JSON.stringify(list))
            this.listData = res.data.data.shop
			this.dhao=res.data.data.origin_id
			for(var i in res.data.data.shop){
				this.heshu.push(res.data.data.shop[i].totalnum)
				this.pu.push(res.data.data.shop[i].is_public)
			}
			for(var j=0;j<this.heshu.length;j++){
				this.selected_products+=this.heshu[j]
			}
			var a=0
			for(var j=0;j<this.pu.length;j++){
				a+=this.pu[j]
			}
			//通过判断每个店铺的is_public相加是否等于0，不是0则代表有店铺同意平台优惠券。此时判断平台是否有优惠券
			if(a!=0&&res.data.data.ping_coupon.length!=0){
				this.is_public=1
			}else{
				this.is_public=0
			}
			if(res.data.data.ping_coupon!=0){
				this.pinyou.name=res.data.data.ping_coupon.name
				this.pinyou.price=res.data.data.ping_coupon.price
				this.pinyou.pid=res.data.data.ping_coupon.clogid
				this.pinyou.ji=res.data.data.ping_coupon.min_price
			}
			this.listarr=res.data.data.recvaddr//收货人
			// this.con=res.data.data.shop[0].coupons//领取的全部优惠券
			this.pd()
			this.ptmoney()//邮费
			console.log(this.listData )
			// this.isLoading=false
          }
        })
      },
      sitee() {
        this.$router.push({
          name: 'sho',
        })
      },
			tix(){
				Toast('超出配送范围，请选择快递配送或修改收货地址')
			},
	  //邮费接口
	  ptmoney(){
			if(this.song===0){
				this.youyo=[]
				this.youfei=[]
				this.heji=[]
				for (let i = 0; i < this.listData.length; i++) {
					this.request({
						  url: "api/order/ptyf",
						  method: "post",
						  data: {
								user_id:this.$store.state.username.id,
								shop_id:this.listData[i].id,
								cart_id:this.listData[i].cart_id 
						  },
					}).then(res => {
							this.youyo.push(res.data.data)
							for(let m in this.youyo){
								this.total_amount=0
								if(this.listData[i].id==this.youyo[m].shop_id){
									this.youfei.push(Number(this.youyo[m].dispatchprice))
									console.log(this.youfei)
									
								}
							}
							this.heji.push(this.listData[i].totalprice-this.listData[i].coupon_price+this.youfei[i])
							console.log(this.listData[i].totalprice,this.listData[i].coupon_price,this.youfei[i])
							for(let j=0;j<this.heji.length;j++){
								this.total_amount+=this.heji[j]
							}
							if(this.listData[i].totalprice>this.pinyou.ji){
								this.total_amount=this.total_amount-this.pinyou.price
							}else{
								this.total_amount=this.total_amount
							}
					})
					console.log(i)
					console.log(this.youfei[i])
					
				}
				
			}else if(this.song===1){
				this.youyo=[]
				this.youfei=[]
				this.heji=[]
				for (let i = 0; i < this.listData.length; i++) {
					this.request({
						  url: "api/order/delivery",
						  method: "post",
						  data: {
						    origin_id:this.dhao,
						    from_address:this.listData[i].province +this.listData[i].city +this.listData[i].area,
							 to_address:this.listarr.province +this.listarr.city +this.listarr.area+this.listarr.address,
							 city_name:this.listarr.city ,
							 send_type:0,
							 shop_id:this.listData[i].id,
							 to_lat:window.sessionStorage.getItem('lat'),
							 to_lng:window.sessionStorage.getItem('lng'),
						  },
						}).then(res => { 
							console.log(res)
								 this.youyo.push(JSON.parse(res.data.msg))
								 for(let m in this.youyo){
								 	this.total_amount=0//总计
								 	if(this.listData[i].id==this.youyo[m].shop_id){
										console.log(this.youyo[m].need_paymoney)
										if (this.youyo[m].need_paymoney!=undefined) {
											this.ti=0
											this.youfei.push(Number(this.youyo[m].need_paymoney))//所有的邮费
											this.price_token.push(this.youyo[m].price_token)
											this.order_price.push(Number(this.youyo[m].total_money))
											this.heji.push(this.listData[i].totalprice-this.listData[i].coupon_price+this.youfei[i])//每个商家的合计	
											for(let j=0;j<this.heji.length;j++){
												this.total_amount+=this.heji[j]
											}
											if(this.listData[i].totalprice>this.pinyou.ji){
												this.total_amount=this.total_amount-this.pinyou.price
											}else{
												this.total_amount=this.total_amount
											}
										}else{
											this.ti=2
											
											this.youyo[m].need_paymoney=0
											this.youfei.push(Number(this.youyo[m].need_paymoney))//所有的邮费
											this.price_token.push(this.youyo[m].price_token)
											this.order_price.push(Number(this.youyo[m].total_money))
											this.heji.push(this.listData[i].totalprice-this.listData[i].coupon_price+this.youfei[i])//每个商家的合计	
											for(let j=0;j<this.heji.length;j++){
												this.total_amount+=this.heji[j]
											}
											if(this.listData[i].totalprice>this.pinyou.ji){
												this.total_amount=this.total_amount-this.pinyou.price
											}else{
												this.total_amount=this.total_amount
											}
										}
								 		
								 	}
								 }
						})
				}
				console.log(this.youfei)
			}else if(this.song===2){
				this.youyo=[]
				this.youfei=[]
				this.heji=[]
				for (let i = 0; i < this.listData.length; i++) {
					this.heji.push(this.listData[i].totalprice-this.listData[i].coupon_price+0)//每个商家的合计	
					if(this.listData[i].totalprice>this.pinyou.ji){
						this.total_amount=this.heji[0]-this.pinyou.price
					}else{
						this.total_amount=this.heji[0]
					}
				}
			}
			  
			 
		
		
	  },
      Submit() {
		  this.ti=1
		  console.log(this.arrList)
				if(this.msg=="-1"){
					Toast('您还没有设置地址')
				}
				this.arrList=[]
        for (var i = 0; i < this.listData.length; i++) {
			console.log(this.youfei)
          this.arrList.push({
            "shop_id": this.listData[i].id,
            "cart_id": this.listData[i].cart_id,
			"coupon_id": this.listData[i].coupon_clogid,
			"send_type":this.song,
			"freight":this.youfei[i],
			"price_token":this.price_token[i],
			"order_price":this.order_price[i],
            "remark_member": this.listData[i].remark_member//不确定是什么
          })
        }
		console.log(this.timm,this.vaue,this.song)
        // console.log(JSON.stringify(this.arrList))				
					this.request({
					  url: "api/order/ordersub",
					  method: "post",
					  data: {
					    user_id: this.$store.state.username.id,
						receiver:this.listarr.consignee,
					    pay_type: this.show,
					    myshop: JSON.stringify(this.arrList),
						coupon_id:this.pinyou.pid,
						money:this.total_amount,
						takes_time:this.timm,
						takes_mobile:this.vaue
					  },
					}).then(res => {
						console.log(res)
					  if (res.data.code == 200) {
					    if (this.show == 1){
					      this.request({
					        url: "api/payment/pay",
					        method: "post",
					        data: {
					          user_id: this.$store.state.username.id,
					          pay_type: this.show, 
					          out_trade_no: res.data.data.out_trade_no
					        },
					      }).then(res => {
					        this.datadorm = res.data;
					        const div = document.createElement('div');
					        div.innerHTML = this.datadorm;
					        document.body.appendChild(div);
					        document.forms['alipaysubmit'].submit();
					      })
					    } else if (this.show == 2){
					      this.request({
					        url: "api/payment/pay",
					        method: "post",
					        data: {
					          user_id: this.$store.state.username.id,
					          pay_type: this.show,
					          out_trade_no: res.data.data.out_trade_no
					        },
					      }).then(res => {
					        window.location.href =res.data
					      })
					    }
					  }
					})
      },
      pd(){
       if (this.listData.length ==0) {
        this.fh()
       }
      }
    },
	created() {
		
	},
    mounted() {
		this.getUserIP((ip) => {
		        this.ip = ip;
				console.log( this.ip)
		});
		this.vaue=this.$store.state.username.mobile
		this.timm='60分钟'
      this.cart_id = this.$route.query.cart_id
      this.token = this.$route.query.token
      this.id = this.$route.query.id
      this.idd = this.$route.query.idd
      this.Fast()
	  
    },
    computed: {}


  }
</script>

<style scoped>

  .wind {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }
  
  
  
  .wind .box-container {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #F7F7F7;

  }

  .wind .box-container::-webkit-scrollbar {
    display: none;
  }
  
  .van-cell{
	  position: relative;
	  display: flex;
	  width: 100%;
	  overflow: hidden;
	  box-sizing: border-box;
	  color: #323233;
	  background-color: #fff;
	  padding: 0 0.4rem 0 0;
	  text-align: left;
	  font-size: 0.24rem;
	  margin-top: 0.1rem;
	  text-indent: 0.25rem;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
  }

  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

   .po{
	   width: 6.9rem;
	   padding-top: 0.2rem;
	   border-radius: 10px;
	   background: #fff;
	   margin: 0.2rem auto 0;
   }
  .cos{ 	  
  	  display: flex; 
	  margin-bottom: 0.1rem;
  	  list-style: none;
  	  font-size: 0.24rem;
  	  background: #fff;
  }
  
  .cos li{
  	  flex: 1;
  }
  .ac{
	  color:red;
  }
  .dzz {
    width: 6.9rem;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    position: relative;
  }

  .dzz img:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    float: left;
    margin-top: 0.2rem;
    margin-left: 0.2rem;

  }

  .dzz p {
    font-size: 0.3rem;
    color: #333333;
    display: inline-block;
    position: absolute;
    top: 0.25rem;
    left: 1rem;
  }

  .dzz-img {
    width: 0.14rem;
    height: 0.24rem;
    position: absolute;
    top: 50%;
    margin-top: -0.12rem;
    right: 0.3rem;
  }

  .dz {
    height: 1.3rem;
	border-bottom: 0.01rem solid #E5E5E5;
    margin: 0 0.1rem 0 0.1rem;
    background: rgba(255, 255, 255, 1);
    position: relative;
  }

  .dz img:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    float: left;
    margin-top: 0.3rem;
    margin-left: 0.2rem;

  }
  .dz-a {
    width: 5.9rem;
    height: 1.1rem;
    float: right;
    margin-top: 0.15rem;
    text-align: left;
  }

  .dz-a p:nth-child(1) {
    font-size: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .dz-a>p:nth-child(1)>span {
    font-size: 0.24rem;
    color: #777777;
    margin-left: 0.15rem;
  }

  .dz-a p:nth-child(2) {
    width: 5.2rem;
    font-size: 0.24rem;
    color: #777777;
    line-height: 0.28rem;
  }

  .dz-img {
    width: 0.14rem;
    height: 0.24rem;
    position: absolute;
    top: 50%;
    margin-top: -0.12rem;
    right: 0.3rem;
  }
.paotui{
	margin-top: 0.1rem;
	font-size: 0.24rem;
	text-align: left;
	padding: 0 0.6rem 0.1rem 0.3rem;
	position: relative;
}
.paotui>span{
	float: right;
	color: #EF0600;
}
.ziqu{
	font-size: 0.24rem;
	text-align: left;
	display: flex;
}
.ziqu>li{
	flex: 1;
	/* margin-left: 0.3rem; */
	margin: 0.1rem 0 0.1rem 0.3rem;
	position: relative;
}
.ziqu>li>p:first-child{
	color: #777777;
	margin-bottom: 0.08rem;
}
.ziqu input{
	background:none;	
	outline:none;	
	border:0px;
}
.dimg{
	width: 0.14rem;
	height: 0.24rem;
	position: absolute;
	top: 50%;
	margin-top: -0.12rem;
	right: 0.3rem;
}
  .concat {
    width: 6.9rem;
    min-height: 4.5rem;
    border-radius: 10px;
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
    margin-left: 0.3rem;
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
    margin: 0 auto 0.2rem;
    position: relative;
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
.concat-y{
	text-align: left;
    font-size: 0.24rem;
	margin-top: 0.1rem;
    text-indent: 0.25rem;
}
.pingtai-a{
	text-align: left;
	font-size: 0.24rem;
	text-indent: 0.25rem;
}
.pingtai-a span{
	margin-left: 0.6rem;
	color: #777777;
}
.concat-y span{
	margin-left: 0.6rem;
	color: #777777;
}
  .van-field {
    font-size: 0.24rem;
  }
  .concat-d {
    text-align: left;
    font-size: 0.24rem;
	margin-top: 0.1rem;
    text-indent: 0.25rem;
  }
.concat-x {
    text-align: left;
    font-size: 0.24rem;
    text-indent: 0.25rem;
  }
  .concat-x p:first-child{
	  margin-left: 0.5rem;
	  color: #777777;
  }
  .concat-x p:last-child{
  	  position: absolute;
	  right: 0.8rem;
  	  color: #777777;
  }
  .concat input {
    border: 0;
    margin-left: 0.5rem;
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
  }

.pingtai{
	width: 6.9rem;
	margin: 0.2rem auto;
	border-radius: 10px;
	background: #FFFFFF;
	padding: 0.1rem 0 0.1rem 0;
}

  .zf {
    width: 6.9rem;
    border-radius: 10px;
    background: #FFFFFF;
    margin: 0.2rem auto;
    margin-bottom: 3rem;
  }

  .zf-a {
    width: 6.9rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.24rem;
    text-indent: 0.3rem;
    text-align: left;
    position: relative;
  }

  .zf-a img {
    width: 0.4rem;
    height: 0.4rem;
    position: relative;
    top: 0.1rem;
    margin-right: 0.2rem;
  }

  .zf-paa {
    position: absolute;
    right: 0.5rem;
  }

  .zf-yc {
    width: 6.9rem;
    height: 100%;
  }

  .zf-yc p {
    width: 6.9rem;
    height: 0.8rem;
    text-align: left;
    border-top: 1px solid #eeeeee;
    background: #FFFFFF;
    line-height: 0.8rem;
    position: relative;
  }

  .zf-yc img {
    width: 0.4rem;
    height: 0.4rem;
    position: relative;
    top: 0.15rem;
    margin-left: 0.3rem;
    margin-right: 0.2rem;
  }

  .zf-a-right {
    position: absolute;
    top: 0;
    right: 0.2rem;
  }

  .footer {
    width: 7.5rem;
    height: 0.88rem;
    position: fixed;
    bottom: 0rem;
    background: white;
    display: flex;
  }

  .footer div:nth-child(1) {
    line-height: 0.88rem;
    font-size: 0.24rem;
    text-align: right;
    width: 5rem;
    padding-right: 0.3rem;
  }

  .footer div:nth-child(1) span:nth-child(1) {
    font-size: 0.3rem;
  }

  .footer div:nth-child(1) span:nth-child(2) {
    font-size: 0.3rem;
    color: #ef0600;
  }

  .footer div:nth-child(2) {
    line-height: 0.88rem;
    font-size: 0.3rem;
    width: 2.2rem;
    text-align: center;
    color: white;
    background: #ef0600;
  }
  .footer div:nth-child(3) {
    line-height: 0.88rem;
    font-size: 0.3rem;
    width: 2.2rem;
    text-align: center;
    color: white;
    background: #ef0600;
  }
  .footer div:nth-child(4) {
    line-height: 0.88rem;
    font-size: 0.3rem;
    width: 2.2rem;
    text-align: center;
    color: white;
    background: #ef0600;
  }
</style>
