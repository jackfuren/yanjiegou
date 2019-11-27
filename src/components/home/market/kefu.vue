<template>
	<div class="box">
		<div class="nav">
		  <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
		  <p class="name">{{name}}</p>
		  <p class="pu">店铺</p>
		</div>
		<div style="text-align: left;padding-top: 0.9rem;background:#F7F7F7 ;">
			<p class="time">今天 10:59</p>
			<div class="commodity">
				<dt>
					<img :src=img alt="">
				</dt>
				<dd>
					<p class="ti">{{title}}</p>
					<p class="money">￥{{money}}</p>
					<p class="send" @click="song()">发给商家</p>
				</dd>
			</div>
			<div class="masg" >
				<div class="oo" v-for="(item,index) in mag" :key="index">
					<dd v-show="item.ud == infooUid ? true:false"><img src='../../../assets/gggggg.png' alt=""></dd>
					<dt style="text-align: left;" v-show="item.ud == infooUid ? true:false"><div>{{item.ct}}</div></dt>
					<dt style="text-align: right;" v-show="item.ud == uid ? true:false"><div>{{item.ct}}</div></dt>
					<dd v-show="item.ud == uid ? true:false"><img :src=tou alt=""></dd>
				</div>
			</div>
		</div>
		<div class="shu">
			<div><input class="txt" type="text" v-model="text"><img src="../../../assets/biaoq.png" alt=""></div>
			<p class="tu"><img src="../../../assets/iiii.png"  @click="send()" alt=""></p>
		</div>
	</div>
</template>

<script>
	  import request from "../../utils/request"
	  export default {
		data(){
			return{
				user_id: this.$store.state.username.id,
				name:this.$route.query.name,
				path:"ws://121.199.17.119:8282",
				socket:"",
				text:'',
				tou:this.$store.state.username.avatar,
				mag:[],//用户发的消息
				title:this.$route.query.title,
				money:this.$route.query.money,
				img:this.$route.query.img,
				msag:'',
				maag:[],//商家会的消息
				uid:"user"+this.$store.state.username.id,
				infoUid:this.$route.query.sid,
				infooUid:"shop"+this.$route.query.sid,
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			fh(){
				this.$router.go(-1)
			},
			init: function () {
				if(typeof(WebSocket) === "undefined"){
					alert("您的浏览器不支持socket")
				}else{
					// 实例化socket
					this.socket = new WebSocket(this.path)
					// 监听socket连接
					this.socket.onopen = this.open
					// 监听socket错误信息
					this.socket.onerror = this.error
					// 监听socket消息
					this.socket.onmessage = this.getMessage
				}
			},
			open: function () {
				console.log("socket连接成功")
			},
			error: function () {
				console.log("连接错误")
			},
			getMessage: function (msg) {
				var data = eval("("+msg.data+")");
				if(data.type=="init"){
					request({
					  url: "api/char/bind",//绑定成功
					  method: "post",
					  data: {
					    client_id:data.data.client_id,
						uid: "user"+this.$store.state.username.id,
					  },
					}).then(res => {
					})
					request({
					  url: "api/char/msglog",//历史记录
					  method: "post",
					  data: {
					    infouid:"shop"+this.infoUid,
					    uid: "user"+this.$store.state.username.id,
					  },
					}).then(res => {
						this.msag=res.data.data
						for(var i in this.msag){
							var qq={
								ct:'',
								ud:''
							}
							if(this.msag[i].uid=="user"+this.$store.state.username.id){
								qq.ct=this.msag[i].content
								qq.ud="user"+this.$store.state.username.id
								this.mag.push(qq)
							}
							if(this.msag[i].uid=="shop"+this.infoUid){
								qq.ct=this.msag[i].content
								qq.ud="shop"+this.infoUid,
								this.mag.push(qq)
							}
						}
					})
				}
				if (data.type== 'message') {
					var qq={
						ct:'',
						ud:''
					}
					qq.ct=data.msg
					qq.ud="shop"+this.infoUid,
					this.mag.push(qq)
				}			
			},
			send: function () {
				var qq={
					ct:'',
					ud:''
				}
				qq.ct=this.text
				qq.ud="user"+this.$store.state.username.id,
				this.mag.push(qq)
				request({
				  url: "api/char/sendmsg",//发送消息
				  method: "post",
				  data: {
				    msg:this.text,
					infouid:"shop"+this.infoUid,
					uid: "user"+this.$store.state.username.id,
				  },
				}).then(res => {
					this.socket.send(this.text)
				})
				this.text=''
			},
			song(){
				this.mag.push()
			},
			close: function () {
				console.log("socket已经关闭")
			}
		},
		destroyed () {
			// 销毁监听
			this.socket.onclose = this.close
		}
	}
</script>

<style scoped>
	.box {
	  width: 100%;
	  height: 99vh;
	  background: #F7F7F7;
	}
	
	.nav {
		z-index: 100;
	  width: 100%;
	  height: 0.88rem;
	  background: #FFFFFF;
	  position: fixed;
	  top: 0;
	  text-align: center;
	  border-bottom: 1px solid #F7F7F7;
	}
	.name {
		line-height: 0.88rem;
	  font-size: 0.36rem;
	  font-weight: 500;
	  display: inline-block;
	  color: rgba(51, 51, 51, 1);
	}
	.nav-left {
	  position: absolute;
	  left: 0.25rem;
	  top: 0.2rem;
	}
	.pu{
		display: inline-block;
		font-size: 0.08rem;
		background:#FC6B58;
		color: #FFFFFF;
		position: absolute;
		right: 0.2rem;
		top: 0.2rem;
		border-radius: 0.3rem;
		padding: 0.15rem 0.2rem 0.15rem 0.2rem;
	}
	.time{
		background: #CCCCCC ;
		color: #FFFFFF;
		width: 1.3rem;
		text-align: center;
		margin: 0 auto;
		padding: 0.05rem 0 0.05rem 0;
		margin-top: 0.3rem;
		margin-bottom: 0.3rem;
		border-radius: 0.2rem;
	}
	.commodity{
		position: relative;
		margin: 0.2rem;
		height: 2.4rem;
		display: flex;
		text-align: left;
		font-size: 15px;
		background: #fff;
	}
	.commodity dt{
		flex: 1;
		margin: 0.2rem;
	}
	.commodity dt img{
		width: 100%;
	}
	.commodity dd{
		flex: 3;
		margin: 0.2rem;
	}
	.commodity dd .ti{
		width: 100%;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.money{
		color: #EF0600;
		font-size: 12px;
		margin: 0.1rem 0 0.1rem 0;
	}
	.send{
		background: #FD433F;
		color: #FFFFFF;
		width: 1rem;
		font-size: 12px;
		padding: 0.15rem;
		border-radius: 0.3rem;
		position: absolute;
		right: 0.5rem;
	}
	.shu{
		position: absolute;
		bottom: 0rem;
		text-align: left;
		width: 100%;
		display: flex;
		height: 0.65rem;
		background: #FFFFFF;
	}
	.shu div{
		height: 0.5rem;
		margin-left: 0.24rem;
		margin-top: 0.05rem;
		margin-right: 0.1rem;
		background:#EEEEEE;
		border-radius: 0.2rem;
	}
	.shu div img{
		height: 0.35rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		position: relative;
		top: 0.08rem;
	}
	.txt{
		width: 5.5rem;
		height: 0.45rem;
		background:#EEEEEE;  
		outline:none;  
		border:none;
		border-radius: 0.2rem;
	}
	.tu{
		position: absolute;
		right: 0.2rem;
		bottom: 0.05rem;
	}
	.masg {
		width: 100%;
	}
	.oo{
		display: flex;
		margin-top: 0.5rem;
		margin-bottom: 0.2rem;
	}
	.oo dt{
		flex: 5;
	}
	.oo dt div{
		padding: 0.05rem 0.1rem 0.05rem 0.1rem;
		border-radius: 0.1rem;
	}
	.oo dd{
		flex: 1;
		margin-right: 0.2rem;
		margin-left: 0.2rem;
	}
	.oo dd img{
		width: 100%;
	}
	.ooo{
		display: flex;
		margin-top: 0.5rem;
		margin-bottom: 0.2rem;
	}
	.ooo dt{
		flex: 5;
	}
	.ooo dt div{
		/* background: #FD433F; */
		text-align: right;
		/* color: #fff; */
		padding: 0.05rem 0.1rem 0.05rem 0.1rem;
		border-radius: 0.1rem;
	}
	.ooo dd{
		flex: 1;
		margin-right: 0.2rem;
		margin-left: 0.2rem;
	}
	.ooo dd img{
		width: 100%;
	}
</style>
