<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>我的订单</p>
      </div>
      <van-tabs v-model="active" @click="onClickDisabled">
        <van-tab title="全部">
          <div class="concat-there" v-if="dataList.length == 0 ? true : false">
            <img src="../../../assets/quangbu.png" alt="">
            <p>当前暂无订单</p>
          </div>
          <div class="concat" v-for="(item ,index) in dataList" :key="index">
            <div>
              <img src="../../../assets/gouwuche_icon.png" alt="">
              <span class="div-span">{{item.name}} <van-icon name="arrow" style="position:relative;top: 0.035rem"/></span>
              <span v-show="item.status == 1? true:false" class="div-spantwo">等待买家付款</span>
              <span v-show="item.status == 2? true:false" class="div-spantwo">买家已付款</span>
              <span v-show="item.status == 3? true:false" class="div-spantwo">卖家已发货</span>
              <span v-show="item.status == 4? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 5? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 6? true:false" class="div-spantwo">交易关闭</span>
            </div>
            <div class="concat-div" v-for="(ite,index) in item.goods" :key="index" @click="All(item)">
              <img :src="ite.headimg" alt="">
              <p>{{ite.gitle}}</p>
			  <p>{{ite.goods_attr}}</p>
              <p>￥<span>{{item.money}}</span></p>
              <p>x{{ite.num}}</p>
            </div>
            <div class="concat-two">
              <p>共{{ item.totalnum }}件商品 合计: ￥ <span style="font-size: 0.3rem;font-weight: bold">{{item.money}}</span></p>			  
              <p @click="fukuai(item.oid)" v-show="item.status == 1? true:false">去付款</p>
              <p @click="tixing()"         v-show="item.status == 2? true:false">提醒发货</p>
              <p @click="queren(item.oid)" v-show="item.status == 3? true:false">确认收货</p>
              <p                           v-show="item.status == 3? true:false">查看物流</p>
              <p @click="pingjia()"        v-show="false">评价</p>
              <p @click="Delete(item.oid)" v-show="item.status == 5? true:false">删除订单</p>
              <p                           v-show="item.status == 4? true:false">申请售后</p>
              <p @click="Delete(item.oid)" v-show="item.status == 6? true:false">删除订单</p>
			  <p class="mlo" v-show="item.send_type == 2? true:false">自取订单</p>
			  <p class="mlo" v-show="item.send_type == 1? true:false">配送订单</p>
            </div>
          </div>

        </van-tab>
        <van-tab title="待付款">
          <div class="concat-there" v-if="arrList.length == 0 ? true : false">
            <img src="../../../assets/daifukuan.png" alt="">
            <p>没有待付款订单</p>
          </div>
          <div class="concat" v-if="arrList.length ==0 ? false : true" v-for="(item ,index) in arrList" :key="index">
            <div>
              <img src="../../../assets/gouwuche_icon.png" alt="">
              <span class="div-span">{{item.name}} <van-icon name="arrow"
                                                             style="position:relative;top: 0.035rem"/></span>
              <span v-show="item.status == 1? true:false" class="div-spantwo">等待买家付款</span>
              <span v-show="item.status == 2? true:false" class="div-spantwo">买家已付款</span>
              <span v-show="item.status == 3? true:false" class="div-spantwo">卖家已发货</span>
              <span v-show="item.status == 4? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 5? true:false" class="div-spantwo">交易成功</span><!-- fukuai(item.oid) -->
            </div>
            <div class="concat-div" v-for="(ite,index) in item.goods" :key="index" @click="All(item)">
              <img :src="ite.headimg" alt="">
              <p>{{ite.gitle}}</p>
              <p>￥<span>{{item.money}}</span></p>
              <p>x{{ite.num}}</p>
            </div>

            <div class="concat-tw">
              <p>共{{ item.totalnum }}件商品 合计: ￥ <span
                style="font-size: 0.3rem;font-weight: bold">{{item.money}}</span></p>
              <p class="fir" @click="fukuai(item.oid)" v-show="item.status == 1? true:false">去付款</p>
			  <p class="mlo" v-show="item.send_type == 2? true:false">自取订单</p>
			  <p class="mlo" v-show="item.send_type == 1? true:false">配送订单</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="concat-there" v-if="arrList.length == 0 ? true : false">
            <img src="../../../assets/diafahuo.png" alt="">
            <p>没有待发货订单</p>
          </div>
          <div class="concat" v-if="arrList.length ==0 ? false : true" v-for="(item ,index) in arrList" :key="index">
            <div>
              <img src="../../../assets/gouwuche_icon.png" alt="">
              <span class="div-span">{{item.name}} <van-icon name="arrow"
                                                             style="position:relative;top: 0.035rem"/></span>
              <span v-show="item.status == 1? true:false" class="div-spantwo">等待买家付款</span>
              <span v-show="item.status == 2? true:false" class="div-spantwo">买家已付款</span>
              <span v-show="item.status == 3? true:false" class="div-spantwo">卖家已发货</span>
              <span v-show="item.status == 4? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 5? true:false" class="div-spantwo">交易成功</span>
            </div><!-- @click="fahuo(ite.oid)" -->
            <div class="concat-div" v-for="(ite,index) in item.goods" :key="index" @click="All(item)">
              <img :src="ite.headimg" alt="">
              <p>{{ite.gitle}}</p>
              <p>￥<span>{{item.money}}</span></p>
              <p>x{{ite.num}}</p>
            </div>
            <div class="concat-tw">
              <p>共{{ item.totalnum }}件商品 合计: ￥ <span
                style="font-size: 0.3rem;font-weight: bold">{{item.money}}</span></p>
              <p class="fir" @click="tixing(index)" v-show="item.status == 2? true:false">提醒发货</p>
			  <p class="mlo" v-show="item.send_type == 2? true:false">自取订单</p>
			  <p class="mlo" v-show="item.send_type == 1? true:false">配送订单</p>
            </div>
          </div>

        </van-tab>
        <van-tab title="待收货">
          <div class="concat-there" v-if="arrList.length == 0 ? true : false">
            <img src="../../../assets/daishouhuo.png" alt="">
            <p>没有待收货订单</p>
          </div>
          <div class="concat" v-if="arrList.length ==0 ? false : true" v-for="(item ,index) in arrList" :key="index">
            <div>
              <img src="../../../assets/gouwuche_icon.png" alt="">
              <span class="div-span">{{item.name}} <van-icon name="arrow"
                                                             style="position:relative;top: 0.035rem"/></span>
              <span v-show="item.status == 1? true:false" class="div-spantwo">等待买家付款</span>
              <span v-show="item.status == 2? true:false" class="div-spantwo">买家已付款</span>
              <span v-show="item.status == 3? true:false" class="div-spantwo">卖家已发货</span>
              <span v-show="item.status == 4? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 5? true:false" class="div-spantwo">交易成功</span>
            </div>@click="quern(item.oid)"
            <div class="concat-div" v-for="(ite,index) in item.goods" :key="index" @click="All(item)">
              <img :src="ite.headimg" alt="">
              <p>{{ite.gitle}}</p>
              <p>￥<span>{{item.money}}</span></p>
              <p>x{{ite.num}}</p>
            </div>
            <div class="concat-tw">
              <p>共{{ item.totalnum }}件商品 合计: ￥ <span
                style="font-size: 0.3rem;font-weight: bold">{{item.money}}</span></p>
              <p class="fir" @click="queren(item.oid)" v-show="item.status == 3? true:false">确认收货</p>
              <p class="qpo" @click="wuliu(item.oid)" v-show="item.status == 3? true:false">查看物流</p>
			  <p class="mlo" v-show="item.send_type == 2? true:false">自取订单</p>
			  <p class="mlo" v-show="item.send_type == 1? true:false">配送订单</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="待评价">
          <div class="concat-there" v-if="arrList.length == 0 ? true : false">
            <img src="../../../assets/daipingjia.png" alt="">
            <p>没有待评价订单</p>
          </div>
          <div class="concat" v-if="arrList.length ==0 ? false : true" v-for="(item ,index) in arrList" :key="index">
            <div>
              <img src="../../../assets/gouwuche_icon.png" alt="">
              <span class="div-span">{{item.name}} <van-icon name="arrow"
                                                             style="position:relative;top: 0.035rem"/></span>
              <span v-show="item.status == 1? true:false" class="div-spantwo">等待买家付款</span>
              <span v-show="item.status == 2? true:false" class="div-spantwo">买家已付款</span>
              <span v-show="item.status == 3? true:false" class="div-spantwo">卖家已发货</span>
              <span v-show="item.status == 4? true:false" class="div-spantwo">交易成功</span>
              <span v-show="item.status == 5? true:false" class="div-spantwo">交易成功</span>
            </div>
            <div class="concat-div" v-for="(ite,index) in item.goods" :key="index" @click="shouh(item.oid)">
              <img :src="ite.headimg" alt="">
              <p>{{ite.gitle}}</p>
              <p>￥<span>{{item.money}}</span></p>
              <p>x{{ite.num}}</p>
              <p @click="pingjia(ite)" class="pingjia">评价</p>
            </div>
            <div class="concat-tw">
              <p>共{{ item.totalnum }}件商品 合计: ￥ <span
                style="font-size: 0.3rem;font-weight: bold">{{item.money}}</span></p>
              <p class="qpo" @click="shouh(item.oid)" v-show="item.status == 4? true:false">申请售后</p>
			  <p class="mlo" v-show="item.send_type == 2? true:false">自取订单</p>
			  <p class="mlo" v-show="item.send_type == 1? true:false">配送订单</p>
            </div>
          </div>

        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
  import {Tab, Tabs} from 'vant';
  import request from "../../utils/request"
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "dingdan",
    data() {
      return {
        active: 0,
        dataList: [],
        arrList: [],
				essn:'',
				escom:'',
				iid:''
      }
    },
    components: {
      Tab,
      Tabs,
    },
    methods: {
      shouhuotwo(i) {
        this.$router.push({
          name: 'qrsh',
          query: {
            id: i
          }
        })
      },
      fh() {
        this.$router.push({
          name: 'My',
        })
      },
      beg() {
        request({
			//我的订单
          url: "api/users/order",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
          }
        }).then(res => {
          this.dataList = res.data.data
          console.log(res)
        })
      },
      onClickDisabled(index, title) {
		  console.log(index,title)
        if (index > 0) {
          request({
            url: "api/users/order",
            method: "post",
            data: {
              user_id: this.$store.state.username.id,
              status: index
            }
          }).then(res => {
            this.arrList = res.data.data
            console.log(this.arrList)
          })
        }
      },
      begg() {
        if (this.active > 0) {
          request({
            url: "api/users/order",
            method: "post",
            data: {
              user_id: this.$store.state.username.id,
              status: this.active
            }
          }).then(res => {
            this.arrList = res.data.data
            //console.log(res)
						 console.log(this.arrList)
          })
        }
      },
      fukuai(i) {
        this.$router.push({
          name: 'dd',
          query: {
            id: i,
            ative: this.active
          }
        })

      },
      fahuo(i) {
        this.$router.push({
          name: 'fh',
          query: {
            id: i,
            ative: this.active
          }
        })
      },
      queren(i) {
				this.request({
				  url: "api/users/orderdetail",
				  method: "post",
				  data: {
				    user_id: this.$store.state.username.id,
				    order_id: i,
				  },
				}).then(res => {
				  console.log(res)
				  this.iid=res.data.data.id
					this.request({
					  url: "api/order/orderok",
					  method: "post",
					  data: {
					    user_id: this.$store.state.username.id,
					    order_id: this.iid,
					  },
					}).then(res => {
					  // console.log(res)
					 if (res.data.code == 200){
					   this.$router.push({
					     name: 'shcg',
					   })
					 }
					})
				})
		},
			quern(i){
				 this.$router.push({
				  name: 'qrsh',
				  query: {
				    id: i,
				    ative: this.active
				  }
				})
			},
			wuliu(i){
				this.request({
				  url: "api/users/orderdetail",
				  method: "post",
				  data: {
				    user_id: this.$store.state.username.id,
				    order_id: i,
				  },
				}).then(res => {
				  // console.log(res)
					this.essn=res.data.data.expresssn
					this.escom=res.data.data.expresscom
					this.$router.push({
					  name: 'wl',
						query:{
						  dan:this.essn,
							expresscom:this.escom
						}
					})
				})
			},
      Delete(i) {
        this.$router.push({
          name: 'qrsht',
          query: {
            id: i,
            ative: 0
          }
        })
      },
      All(item) {
		  //1快递2配送3自取
		  console.log(item.send_type)
        if(item.send_type==0){//快递
			if (item.status == 1) {
			  this.$router.push({
			    name: 'dd',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			} else if (item.status == 2) {
			  this.$router.push({
			    name: 'fh',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			} else if (item.status == 3) {
			  this.$router.push({
			    name: 'qrsh',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			}else  if (item.status == 5){
			  this.$router.push({
			    name: 'qrsht',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			
			}else if (item.status ==6){
			  this.$router.push({
			    name: 'qrsht',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			}
		}else if(item.send_type==1){//配送
			if (item.status == 1) {
			  this.$router.push({
			    name: 'dd',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			}else {
				this.$router.push({
				  name: 'pssj',
				  query: {
					id: item.oid,
					ative: this.active,
					status:item.status
				  }
				})
			}
			
		}else if(item.send_type==2){//自取
			if (item.status == 1) {
			  this.$router.push({
			    name: 'zqfk',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			} else if (item.status == 2) {
			  this.$router.push({
			    name: 'zqdd',
			    query: {
			      id: item.oid,
			      ative: this.active,
				  status:item.status
			    }
			  })
			} else if (item.status == 3) {
			  this.$router.push({
			    name: 'zqdd',
			    query: {
			      id: item.oid,
			      ative: this.active,
			      status:item.status
			    }
			  })
			}else  if (item.status == 5){
			  this.$router.push({
			    name: 'zqsh',
			    query: {
			      id: item.oid,
			      ative: this.active
			    }
			  })
			}
		}
      },
      tixing(index) {
			this.request({
			  url: "api/users/sendremind",
			  method: "post",
			  data:{
			    u_id:this.$store.state.username.id,
			    o_id:this.arrList[index].order_sn,
				s_id:this.arrList[index].shop_id
			  },
			}).then(res => {
			  console.log(res)
			  if(res.data.code==100){
					  Toast("今天已经提醒过")
				  }else if(res.data.code==200){
					  Toast("已提醒商家尽快发货")
				  }
			})
      },
      pingjia(ite) {
		  // console.log(ite,this.arrList.goods)
        event.stopPropagation()
        this.$router.push({
          name: 'pj',
          query: {
            b: ite,
            active: this.active,
			c:ite.gitle
          }
        })
      },
      shouh(i) {
		  console.log(i)
        this.$router.push({
          name: 'sqsh',
          query: {
            id: i,
          }
        })
      }
    },
    mounted() {
      this.beg()
      this.active = this.$route.query.id
      this.begg()
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

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position:fixed;
    border-bottom: 1px solid #F7F7F7;
    top: 0rem;
    z-index: 8888;
  }
  /deep/ .van-tabs__wrap{
    position: fixed;
    top:0.78rem!important;
    z-index: 8888;
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

  .concat {
    width: 6.52rem;
    min-height: 3.35rem;
    padding: 0.2rem;
    background: #FFFFFF;
    margin: 0 auto;
    position: relative;
    top: 1rem;
    margin-bottom: 0.15rem;
  }

  .concat div:nth-child(1) {
    width: 6.52rem;
    height: 0.28rem;
    text-align: left;
  }

  .concat div:nth-child(1) img {
    width: 0.3rem;
    height: 0.28rem;
  }

  .div-span {
    font-size: 0.24rem;
    position: relative;
    top: -0.05rem;
    margin-left: 0.15rem;
  }

  .div-spantwo {
    font-size: 0.2rem;
    color: #F21D13;
    float: right;
  }

  .concat-div {
    width: 6.52rem;
    height: 1.6rem;
    margin: 0.15rem 0;
    text-align: left;
    position: relative;
  }

  .concat-div img {
    width: 1.6rem;
    height: 1.6rem;
  }

  .concat-div p:nth-child(2) {
    width: 3.3rem;
    font-size: 0.24rem;
    position: absolute;
    top: 0;
    left: 1.78rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
.concat-div p:nth-child(3) {
    position: absolute;
    top: 0.6rem;
    left: 1.78rem;
    font-size: 0.20rem;
  }
  .concat-div p:nth-child(4) {
    position: absolute;
    right: 0;
    top: 0.1rem;
    font-size: 0.20rem;
  }

  .concat-div p:nth-child(4) span {
    font-size: 0.3rem;

  }

  .concat-div p:nth-child(5) {
    position: absolute;
    right: 0;
    top: 0.65rem;
    font-size: 0.20rem;
  }

  .concat-two {
    width: 6.52rem;
    height: 1.1rem;
    padding-top: 0.15rem;
  }
.concat-tw {
    width: 6.52rem;
    height: 1.1rem;
    padding-top: 0.15rem;
  }
  .concat-two p:nth-child(1) {
    font-size: 0.20rem;
    text-align: right;
  }
.concat-tw p:nth-child(1) {
    font-size: 0.20rem;
    text-align: right;
  }
  .concat-two p:nth-child(2) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(242, 29, 19, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #F21D13;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }
.fir {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(242, 29, 19, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #F21D13;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }
  .concat-two p:nth-child(3) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(119, 119, 119, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #333333;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }
.qpo{
	width: 1.2rem;
	    height: 0.4rem;
	    border: 1px solid rgba(119, 119, 119, 1);
	    border-radius: 0.2rem;
	    font-size: 0.2rem;
	    color: #333333;
	    line-height: 0.42rem;
	    float: right;
	    margin-top: 0.3rem;
	    margin-right: 0.2rem;
}
  .concat-two p:nth-child(5) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(119, 119, 119, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #333333;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }

  .concat-two p:nth-child(4) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(242, 29, 19, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #F21D13;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }

  .concat-two p:nth-child(6) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(242, 29, 19, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #F21D13;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }

  .concat-two p:nth-child(7) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(119, 119, 119, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #333333;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
  }

  /deep/ .van-tab {
    flex: 0 0 20% !important;
  }

  .concat-two p:nth-child(8) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(119, 119, 119, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #333333;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }
  .concat-two p:nth-child(9) {
    width: 1.2rem;
    height: 0.4rem;
    border: 1px solid rgba(119, 119, 119, 1);
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #333333;
    line-height: 0.42rem;
    float: right;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }
  .mlo {
    width: 1.2rem;
    height: 0.4rem;
	background: red;
    border-radius: 0.2rem;
    font-size: 0.2rem;
    color: #fff;
    line-height: 0.42rem;
    float: left;
    margin-top: 0.3rem;
    margin-right: 0.2rem;
  }
  .concat-there {
    position: relative;
    top: 4.5rem;
    font-size: 0.28rem;
    color: #333333;
  }

  .concat-there img {
    width: 3.4rem;
    height: 2.2rem;
  }

  .pingjia {
    width: 0.8rem;
    height: 0.35rem;
    color: #ef0600;
    border: 1px solid rgba(242, 29, 19, 1);
    border-radius: 20px;
    text-align: center;
    line-height: 0.39rem;
    font-size: 0.22rem;
    position: absolute;
    right: 0;
    bottom: 0.05rem;
    z-index: 88888;
  }
</style>
