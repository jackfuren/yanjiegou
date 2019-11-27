<template>
  <div class="box">
    <div class="box-container">
    <div class="nav-top">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" color="#FFFFFF" name="arrow-left" size="0.5rem"/>
        <p style="color: white">订单详情</p>
        <p class="nav-top-p">交易关闭</p>
        <p class="nav-top-pp">商品信息填写错误</p>
        <div class="dz">
          <img alt="" src="../../assets/dingdan_dizhi.png">
          <div class="dz-a">
            <p>{{dataList.getusername}} <span>{{dataList.mobile}}</span></p>
            <p>{{dataList.province + dataList.city + dataList.area + dataList.address}}</p>
          </div>

        </div>
      </div>
    </div>
    <div  class="concat" >
      <div class="concat-a">
        <img alt="" src="../../assets/dingdan_dianpu.png">
        <p>{{dataList.sname}}</p>
      </div>
      <div class="concat-b" v-for="(item ,index) in dataList.goods" >
        <img :src="item.headimg" alt="">
        <p class="concat-b-a">{{item.gtitle}}</p>
        <p class="concat-b-b">{{item.specification}}</p>
        <p class="concat-b-c">￥{{item.ogprice}}</p>
        <p class="concat-b-d">x{{item.num}}</p>
      </div>
      <p class="concat-c">运费(快递) <span>￥{{dataList.freight}}</span>
      </p>
      <div class="concat-d">
        订单备注 <input placeholder="暂无备注" type="text" v-model="dataList.remark_member">
      </div>
      <p class="jia">订单价格 <span>￥{{dataList.oldmoney}}</span></p>
      <p class="concat-e"> 需付款: <span> ￥{{dataList.money}}</span></p>
    </div>
    <div class="xin">
      <p>订单信息</p>
      <p>订单编号
        <span>{{dataList.order_sn}}</span>
        <button class="fz" type="button"
                v-clipboard:copy="dataList.order_sn"
                v-clipboard:error="onError"
                v-clipboard:success="onCopy">复制
        </button>
      </p>
      <p>下单时间 <span>2019-05-08 15:32:53</span></p>
			<div class="footer">
			  <div><p @click="lianxi()"><img  alt="" src="../../assets/dingdan_bodadianhua.png">拨打电话</p></div>
			
			  <div><p @click="Delete()">删除订单</p></div>
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
    name: "quxiaodiangdan",
    data() {
      return {
        dataList: [],
        id:'',
        ative:"",
        phone:15139020714
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'ddd',
          query:{
            id:0
          }
        })
      },
      cancel() {
        this.request({
          url: "api/order/delorder",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            order_id: this.id,
          },
        }).then(res => {
          if (res.data.code ==200){
            this.$router.push({
              name: 'ddd',
              query:{
                id:this.ative
              }
            })

          }
        })

      },
      onCopy: function (e) {
        Toast('复制成功');
      },
      onError: function (e) {
        Toast('复制失败');
      },
      Gian(){
        this.request({
          url: "api/users/orderdetail",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            order_id: this.id,
          },
        }).then(res => {
          //console.log(res)
          this.dataList =res.data.data
        })
      },
			Delete(){
			  this.request({
			    url: "api/order/delorder",
			    method: "post",
			    data: {
			      user_id: this.$store.state.username.id,
			      order_id: this.id,
			    },
			  }).then(res => {
			   if(res.data.code ==200){
			     Toast("删除订单完成")
			     this.$router.push({
			       name: 'ddd',
			       query:{
			         id:this.ative
			       }
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
      this.id =this.$route.query.id
      this.ative =this.$route.query.ative
      this.Gian()
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
    background-image: url(../../assets/jiaoyiguanbi.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 1.1rem;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
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
  }

  .dz img:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    float: left;
    margin-top: 0.55rem;
    margin-left: 0.2rem;

  }

  .dz-a {
    width: 5.9rem;
    height: 1.4rem;
    float: right;
    margin-top: 0.15rem;

    text-align: left;
  }

  .dz-a p:nth-child(1) {
    font-size: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .dz-a p:nth-child(1) span {
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

  .concat {
    width: 6.9rem;
    min-height: 5.2rem;
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

    position: relative;
    margin:  0.17rem auto;
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

  .xin .footer {
      width: 100%;
      height: 0.8rem;
      background: #FFFFFF;
  		display: flex;
  		margin-top: 0.2rem;
    }
  .xin .footer>div{
  	flex: 1;
  }
    .xin .footer>div:nth-child(1)>p {
      width: 1.8rem;
      height: 0.6rem;
      border: 1px solid rgba(241, 21, 15, 1);
      border-radius: 30px;
      line-height: 0.6rem;
      color: #EF0600;
      font-size: 0.24rem;
  		margin-left: 0.1rem;
    }
  
    .xin .footer>div:nth-child(2)>p {
      width: 1.8rem;
      height: 0.6rem;
      border: 1px solid #777777;
      border-radius: 30px;
      line-height: 0.6rem;
      font-size: 0.3rem;
  		position: absolute;
  		right: 0.4rem;
    }
    .xin .footer img {
      width: 0.3rem;
      height: 0.3rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    .xin {
      width: 6.9rem;
      height: 2.8rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin: 0.2rem auto;
    }

  .xin p:nth-child(1) {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.3rem;
    text-align: left;
    text-indent: 0.2rem;
  }

  .xin p:nth-child(2) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }

  .xin p:nth-child(3) {
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    text-align: left;
    text-indent: 0.2rem;
    color: #777777;
  }

  .xin span {
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
