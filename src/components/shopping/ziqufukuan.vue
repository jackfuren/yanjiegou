<template>
  <div class="box">
    <div class="box-container">
      <div class="nav-top">
        <div class="nav">
          <div class="navvan">
			  <van-icon @click="fh()" class="nav-left" color="#FFFFFF" name="arrow-left" size="0.5rem"/>
			  <p style="color:#FFFFFF">订单详情</p>
		  </div>
		  <p><img style="width: 1rem;margin-top: 0.2rem;" src="../../assets/ztime.png" alt=""></p>
          <p class="nav-top-p">等待买家付款</p>
          <p class="nav-top-pp" :endTime="this.dataList.djs_time" :callback="callback" :endText="endText">
            {{content}}</p>
          <div class="dz">
           <p>取件码：<span style="color: red;">{{dataList.order_sn}}</span></p>
           <p>自取时间：<span>{{dataList.takes_time}}</span></p>
           <p>商家地址：{{dataList.shopaddr.province+dataList.shopaddr.city+dataList.shopaddr.area+dataList.shopaddr.street+dataList.shopaddr.address}}</p>
          </div>
        </div>
      </div>
      <div class="concat">
        <div class="concat-a">
          <img alt="" src="../../assets/dingdan_dianpu.png">
          <p>{{dataList.sname}}</p>
        </div>
        <div class="concat-b" v-for="(item ,i ) in dataList.goods" :key="i">
          <img :src="item.headimg" alt="">
          <p class="concat-b-a">{{item.gtitle}}</p>
          <p class="concat-b-b">{{item.specification}}</p>
          <p class="concat-b-c">￥{{item.ogprice}}</p>
          <p class="concat-b-d">x{{item.num}}</p>
        </div>
        <p class="concat-c">到店自取 <span>￥0.00</span></p>
		<p class="concat-ml">店铺优惠 <span>￥0.00</span> </p>
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
        <p>下单时间 <span>{{dataList.add_time}}</span></p>
				<div class="liann">
					<div><p><img alt="" src="../../assets/dingdan_bodadianhua.png">拨打电话</p></div>
					<div><p @click="show = true">取消订单</p></div>
				</div>
      </div>
      <div style="height: 3rem"></div>
      <div class="footer">
        <p @click="fukaun()">付款</p>
      </div>
      <van-popup v-model="show" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {Picker} from 'vant';
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "dingdan",
    data() {
      return {
        dataList: [],
        order_id: '',
        ative: '',
        show: false,
        columns: ['拍错', '不想要了', '不喜欢', '我高兴', '呵呵'],
        content: ''
      }
    },
    props: {
      endTime: {
        type: String,
        default: ''
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: ''
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'ddd',
          query: {
            id: this.ative
          }
        })
      },
      site() {
        this.$router.push({
          name: 'sho',
          query: {}
        })
      },
      cancel() {
        this.$router.push({
          name: 'qx',
        })
      },
      onCopy: function (e) {
        Toast('复制成功');
      },
      onError: function (e) {
        Toast('复制失败');
      },
      Place() {
				//订单详情
        this.request({
          url: "api/users/orderdetail",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            order_id: this.order_id
          }
        }).then(res => {
          this.dataList = res.data.data
          console.log(res)
        })
      },
      onConfirm(value, index) {
        this.request({
					//取消订单
          url: "api/order/cancleorder",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            order_id: this.dataList.id
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              name: 'qx',
              query: {
                id: this.dataList.id,
              }
            })
          }
        })
      },
      onCancel() {
        this.show = false
      },
      fukaun() {
        this.request({
					//拉起支付宝微信支付
          url: "api/payment/pay",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            pay_type: this.dataList.pay_type,
            out_trade_no: this.dataList.out_trade_no
          },
        }).then(res => {
          //consoleog(res)
          this.datadorm = res.data;
          const div = document.createElement('div');
          div.innerHTML = this.datadorm;
          document.body.appendChild(div);
          document.forms['alipaysubmit'].submit();
        })
      },
      countdowm() {
        let self = this;
        let timer = setInterval(function () {
          let nowTime = new Date();
          let endTime = self.dataList.djs_time;
          let t = endTime * 1000 - nowTime.getTime();
          if (t > 0) {
            let day = Math.floor(t / 86400000);
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = '';
            if (day > 0) {
              format = `剩余${day}天${hour}小时${min}分${sec}秒`;
            }
            if (day <= 0 && hour > 0) {
              format = `剩余${hour}小时${min}分${sec}秒`;
            }
            if (day <= 0 && hour <= 0) {
              format = `剩余${min}分${sec}秒`;
            }
            self.content = format;
          } else {
            clearInterval(timer);
            self.content = self.endText;
          }
        }, 1000);
      },
      _callback() {
        if (this.callback && this.callback instanceof Function) {
          this.callback(...this);
        }
      }


    },
    mounted() {
      // this.listData = this.$store.state.dataList
      // this.money = this.$store.state.money
      // this.bei = this.$store.state.bei
      this.order_id = this.$route.query.id
      this.ative = this.$route.query.ative
      this.Place()
      this.countdowm()

    },
    components: {
      Picker
    },
    watch:{
      content:function (i) {
        if (i == '已结束'){
          this.request({
            url: "api/order/cancleorder",
            method: "post",
            data: {
              user_id: this.$store.state.username.id,
              order_id: this.dataList.id
            }
          }).then(res => {
            if (res.data.code == 200) {
              this.$router.push({
                name: 'ddd',
                query: {
                  id: 1,
                }
              })
            }
          })
        }
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
    background: #F9F9F8;

  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  .nav-top {
    width: 100%;
    height: 4.63rem;
    background-image: url(../../assets/ccccc.png);
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
  .nav>p {
    font-size: 0.36rem;
    font-weight: 500;
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .nav-top-p {
    text-align: center;
    height: 0.45rem;
    font-size: 0.36rem;
    color: #FFFFFF;
    /* margin-top: 0.8rem; */
    /* margin-left: 1rem; */
  }

  .nav-top-pp {
    text-align: center;
    height: 0;
    font-size: 0.24rem !important;
    color: #FFFFFF;
    /* margin-left: 1rem; */
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
    margin: 0 auto;
    position: relative;
    margin-bottom: 0.15rem;
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
    height: 0.8rem;
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
.concat-ml span:nth-child(1) {
    margin-left: 0.4rem;
    font-size: 0.24rem;
    color: #777777;
    float: right;
	position: absolute;
	right: 0.3rem;
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
  .footer p{
    width: 2.17rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.3rem;
    text-align: center;
    background: #EF0600;
    display: inline-block;
    float: right;
    color: #FFFFFF;

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
      height: 0.6rem;
      border: 1px solid #777777;
      border-radius: 30px;
      line-height: 0.6rem;
      font-size: 0.3rem;
  		position: absolute;
  		right: 0.4rem;
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
