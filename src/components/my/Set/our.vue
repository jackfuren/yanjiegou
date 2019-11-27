<template>
	<div class="box">
		<div class="nav">
		  <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
		  <p>关于我们</p>
		</div>
		<img :src=this.img alt="">
		<p style="font-size: 18px;">{{this.name}}</p>
		<p style="font-size: 15px;">1.1.0版本</p>
		<div style="margin-top: 8px;">
			<div class="bottom">
			  <span>官方微信</span>
			  <span>沿街购</span>
			</div>
			<div class="bottom">
			  <span>客服电话</span>
			  <span>{{this.phon}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	  import request from "../../utils/request"
	export default {
	  name: "our",
	  data() {
	    return { 
				img:'',
				phon:'',
				name:''
	    }
	  },
		created(){
			request({
			  url: "api/activity/about",
			    method:"post",
			  }).then(res => {
			  	console.log(res)
					this.img=res.data.data.logo
					this.phon=res.data.data.tel
					this.name=res.data.data.name
			  })
				
		},
	  methods: {
	    fh() {
	      this.$router.go(-1)
	    }
	  }
	}
</script>

<style scoped>
	.box {
	  width: 100%;
	  min-height: 100vh;
	  background: #F7F7F7;
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
	img{
		width: 103px;
		height: 103px;
		margin: 20px 0 3px 0;
	}
	p{
		margin-bottom: 3px;
		
	}
	.bottom {
	  width: 6.9rem;
	  height: 1rem;
	  line-height: 1rem;
	  padding: 0 0.3rem;
	  font-size: 0.3rem;
	  text-align: left;
	  position: relative;
		background: #fff;
		border-bottom: 1px solid #F7F7F7;
	}
	
	.bottom span:nth-child(2) {
	  font-size: 0.28rem;
	  color: #777777;
	  display: inline-block;
	  text-align: right;
		position: absolute;
		right: 15px;
	}
</style>
