<template>

  <div class="box">

    <div class="box-container" id="1">
      <van-icon @click="fh()" class="top-left" color="#777777" name="arrow-left" size="0.5rem"/>
      <van-icon @click="rapid =! rapid" class="top-right" color="#777777" name="wap-nav" size="0.5rem"/>
      <div v-show="rapid"  class="nav-top-back">
        <p @click="xiaoxi"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem" src="../../../assets/shangjiaye_wuxiaoxi.png" alt=""><span>消息</span></p>
        <p @click="shop"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem" src="../../../assets/shangjaiyetanchuang_gouwuche.png" alt=""><span style="position: relative;left: 0.14rem">购物车</span></p>
        <p @click="homm"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem" src="../../../assets/shangjiayetanchuang_shouyee.png" alt=""><span>首页</span></p>
        <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem" src="../../../assets/shangjaiye_fenxiang.png" alt=""> <span style="position: relative;left: -0.02rem;bottom: 0.04rem">分享</span></p>
        <p @click="jubao()"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem" src="../../../assets/shangjiaye_jubao.png" alt=""><span style="position: relative;left: 0.04rem;bottom:0.06rem">举报</span></p>
      </div>
      <!--轮播图-->
      <swiper :options="swiperOption">
        <swiper-slide :key="index" v-for="(item ,index) in dataList.headimg">
          <div class="nav">
            <img :src="item" alt="">
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!--内容-->
      <div class="concat">
        <p>￥<span style="font-size: 0.48rem">{{dataList.price}}</span></p>
        <!-- <p>518特惠</p> -->
        <p>价格
          <del>￥{{dataList.original_price}}</del>
        </p>
        <p>{{dataList.title}}</p>
      </div>
      <div class="concat-top">
        <p>发货 <span>浙江杭州  |  快递：免运费</span> <span>销量{{dataList.sold}}</span></p>
       <div v-show="qq == 1 ? true :false">
		     <p>优惠
		       <van-icon color="#F88E89" name="checked" size="0.3rem" style="position: relative;top: 0.06rem;right: 0.1rem"/>
		       领券后，下单至少可减<span>{{jiann}}元</span> <span @click="onClickk">领券
		    	 <van-icon  name="arrow" style="width: 0.2rem;position: relative;right: 0.48rem;top: 0.04rem"/> </span></p>
		     <p>店铺优惠券</p>
		     <p>{{fist}}</p>
		</div>
		<div v-show="qq == 0 ? true :false">
			<p>优惠<span>当前暂无优惠</span></p>
		</div>
		<div style="position: relative;margin-top: 0.26rem" v-if="dataList.tag.length !=0 ? true:false">
			服务
			<p class="zxc" style="position: relative;top: -0.5rem;left:0.5rem;">
				<span :key="index" v-for="(item,index) in dataList.tag" style="">
					<van-icon color="#F88E89" name="passed" size="0.3rem" style="position: relative;top: 0.06rem;right: 0.11rem"/>{{item}}
				</span>	
			</p>
		</div>
      </div>
      <div class="concat-zhong" id="2">
        <p @click="xuanze()">选择 颜色分类 尺码 <span>完善尺码    <van-icon color="#777777" name="arrow"
                                                                       style="position: relative;top: 0.03rem"/></span>
        </p>
        <p>尺码表&参数
          <van-icon color="#777777" name="arrow" style="position: relative;top: 0.25rem;float: right"/>
        </p>
      </div>
      <div class="concat-bottom" v-if="chang == 0 ? false :true">
        <p @click="sypj()">宝贝评价 <span>查看全部    <van-icon color="#F21D13" name="arrow"
                                                        style="position: relative;top: 0.04rem"/></span>
        </p>
        <div class="concat-bottom-div">
          <img alt="" :src="dataList.comment[0].avatar">
          <span>{{dataList.comment[0].username}}</span>
        </div>
        <p>{{dataList.comment[0].content}}</p>
      </div>
      <div class="concat-bottom" style="height: 1.5rem" v-if="chang == 0 ? true :false">
        <p @click="sypj()">宝贝评价 <span >查看全部    <van-icon color="#F21D13" name="arrow" style="position: relative;top: 0.04rem"/></span>
        </p>
        <p style="font-size: 0.3rem;margin-top: 0.1rem ">暂无评价</p>
      </div>
      <div class="concat-footer">
        <div class="concat-footer-div" @click="dianpu()">
          <img alt="" :src="dataList.shoplogo">
          <div class="concat-footer-div-div" >
            <p>{{dataList.name}}</p>
            <van-rate :size="15" allow-half color="#EF0600" readonly
                      style="position: relative;top: 0.1rem;left: 0.05rem" v-model="dataList.star"
                      void-color="#FFFFFF"/>
            <p class="concat-footer-div-div-p">进店
              <van-icon color="#F21D13" name="arrow" style="position: relative;top: 0.05rem;right: 0.4rem"/>
            </p>
          </div>

        </div>
        <div class="concat-footer-two">
          <div>描述相符 <span>{{dataList.description}}</span></div>
          <div>质量满意<span>{{dataList.quality}}</span></div>
          <div>服务周到<span>{{dataList.service}}</span></div>
        </div>
      </div>
       <div id="3"></div>
      <div  class="concat-tuijian concat-sv" v-if="dataList.content == null ? false : true">
        <p>商品详情</p>

        <div v-html="dataList.content" id="concat-tuijian-div"></div>
      </div>
      <div   class="concat-tuijian  concat-sv" v-if="dataList.content == null ? true : false">
        <p>商品详情</p>
        <p>暂无详情</p>
      </div>
      <!--为你推介-->
      <div class="nav-tj" id="4">
        <div class="nav-tj-top"><span>为你推荐</span></div>
        <div class="nav-tj-bottom">
          <div class="nav-tj-bottom-div" v-for="(item,index) in dataList.tjgoods" :key="index" @click="xq(item.id)">
            <div class="nav-tj-bottom-div-img">
            <img alt=""  :src="item.headimg">
            </div>
            <p class="nav-tj-bottom-div-p">{{item.title}}</p>
            <p class="nav-tj-bottom-div-pp">{{item.name}}</p>
            <p class="nav-tj-bottom-div-ppp"><span>￥</span><span>{{item.price}}</span> <span><500m</span></p>
          </div>

        </div>
      </div>


      <!-- 商品导航-->
      <div class="base">
        <div class="base-left" @click="dianpu()">
          <van-icon color="#F21D13" name="shop-o" size="0.4rem"/>
          <p>店铺</p>
        </div>
        <div class="base-left" @click="kefu()">
          <van-icon color="#F21D13" name="chat-o" size="0.4rem"/>
          <p>客服</p>
        </div>
        <div @click="collect()" class="base-left">
          <van-icon v-show="shou == 0 ? true :false" color="#F21D13" name="star-o" size="0.4rem"/>
          <van-icon v-show="shou == 1 ? true :false" color="#FBA39A" name="star" size="0.4rem"/>
          <p>收藏</p>
        </div>
        <div class="base-right" style="background: #FC725B" @click="Join()">加入购物车</div>
        <div class="base-right" @click="Joinn()">立即购买</div>
      </div>
      <!--商品详情-->
      <div class="sku-container">
        <van-sku
		   v-model="showBase"
	      :goods="goods"
	      :goods-id="goodsId"
	      :quota="quota"
	      :quota-used="quotaUsed"
	      :hide-stock="sku.hide_stock"
	      :sku="sku"
          :close-on-click-overlay="closeOnClickOverlay"
          :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
          :reset-stepper-on-hide="resetStepperOnHide"
          @add-cart="onAddCartClicked"
          @buy-clicked="onBuyClicked"
        />
      </div>
      <!-- 屏幕监听-->
      <div class="navbar" v-show="bar">
        <div>
          <van-icon @click="fh()" class="top-leftt" color="#777777" name="arrow-left" size="0.5rem"/>
        </div>
        <div class="navbar-div">
          <div>
            <div @click="bao()"><a href="#1">宝贝</a></div>
          </div>
          <div>
            <div :style="styleObj1" @click="ping()"><a :style="styleObj2" href="#2">评价</a></div>
          </div>
          <div>
            <div :style="styleObj3" @click="xian()"><a :style="styleObj4" href="#3">详情</a></div>
          </div>
          <div>
            <div :style="styleObj5"><a :style="styleObj6" @click="jian()" href="#4">推荐</a></div>
          </div>

        </div>
        <div>
          <van-icon class="top-rightt" color="#777777" name="wap-nav" size="0.5rem"/>
        </div>

      </div>
      <!-- 优惠券-->
      <van-popup v-model="show" position="bottom">
        <div class="pop">
          <div class="pop-div">
            <p>店铺优惠券</p>
            <div class="pop-div-div" v-for="(item,index) in youu" :key="index">
              <img v-show="item.is_expire == 0 ? true:false" src="../../../assets/youhuioquan.png" alt="">
              <img v-show="item.is_expire == 1 ? true:false" src="../../../assets/youhuiquanyilingquu.png" alt="">
              <p><span>￥</span>{{item.sub_price}} <span
                v-show="item.is_expire == 0 ? true:false">满{{item.min_price}}立减</span><span
                v-show="item.is_expire == 1 ? true:false">满{{item.min_price}}立减</span></p>
              <p v-show="item.is_expire == 0 ? true:false">{{item.begin_time}}-{{item.end_time}}</p>
              <p v-show="item.is_expire == 1 ? true:false">{{item.begin_time}}-{{item.end_time}}</p>
              <p v-show="item.is_lingqu == 0 ? true:false" @click="lingqu(item.id)">立即领取</p>
              <p v-show="item.is_lingqu == 1 ? true:false">已领取</p>
              <div v-show="item.special == 0 ? false :true">
                <img src="../../../assets/juxing.png" alt="">
                <span>{{item.special}}</span>
              </div>
            </div>
          </div>
        </div>

      </van-popup>

    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  import {
    Rate,
    Sku,
    Popup
  } from 'vant';
  import {Tab, Tabs} from 'vant';
  import request from "../../utils/request"

  export default {
    name: "wupinxiangqing",
	inject:['reload'],
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        },
		colorid:'',
		color:'',
		sizeid:'',
		size:'',
		nmm:'',
  //       //value: 5,
        showBase: false,
        goods: {
          // 商品标题
          title: '你好漂亮',
          // 默认商品 sku 缩略图
          picture: []
        },
				sku: {
				  tree: [],
				  list: [],
				  price:"",
				  stock_num: 227, // 商品总库存
				  none_sku: false,  // 是否无规格商品
				  hide_stock: false  // 是否隐藏剩余库存
				},
        customStepperConfig: {
          // 自定义限购文案
          quotaText: '每次限购xxx件',
          // 自定义步进器超过限制时的回调
          handleOverLimit: (data) => {
            const {action, limitType, quota, quotaUsed} = data;
            if (action === 'minus') {
              Toast('至少选择一件商品');
            } else if (action === 'plus') {
              // const { LIMIT_TYPE } = Sku.skuConstants;
              if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                let msg = `单次限购${quota}件`;
								
                if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
                Toast(msg);
              } else {
                Toast('库存不够了');
              }
            }
          }
        },
        closeOnClickOverlay: true, //遮罩层
        resetSelectedSkuOnHide: false,//隐藏时重置已选择的商品
        resetStepperOnHide: false,//隐藏时重置选择的商品数量
        quotaUsed: 0,//已经购买过的数量
        quota: 15,//限购数，0 表示不限购
        goodsId: 2239,//商品 id
        bar: false, //屏幕监听
        styleObj1: {},
        styleObj2: {},
        styleObj3: {},
        styleObj4: {},
        styleObj5: {},
        styleObj6: {},
        styleObj7: {'color': '#F21D13'},
        styleObj8: {'border-bottom': '2px solid #F21D13'},
        styleObj9: {},
        dataList: "",
        shou: "", //收藏
        user_id: "",//用户编码
        goods_id: "",//商品编号
        chang: "",
        token: "",
        a: [],
        b: [],
        show: false,
        youu: [],
        id:1,
        goodsid:'',
        rapid:false,
        mo:'',
		iidi:'',
		skku:[],
		no:"",
		pr:[],
		prce:"",
		fist:"",
		senne:"",
		qq:1,
		jiian:[],
		jiann:''
      }
    },
    methods: {
      onBuyClicked(data) {
				console.log(this.youu)
				this.nmm=document.getElementsByClassName("van-stepper__input")[0].value
					this.colorid=this.sku.tree[0].v
					
					for (var j=0;j<this.colorid.length;j++) {
						if(data.selectedSkuComb.s1==this.colorid[j].id){
							this.color=this.colorid[j].name
						}
					}
					this.sizeid=this.sku.tree[1].v
					for (var i=0;i<this.sizeid.length;i++) {
						if(data.selectedSkuComb.s2==this.sizeid[i].id){
							this.size=this.sizeid[i].name
						}
					}
					for(var k in this.sku.list){
						if(data.selectedSkuComb.s1==this.sku.list[k].s1&&data.selectedSkuComb.s2==this.sku.list[k].s2){	
							this.iidi=this.sku.list[k].id
						}
					}
					console.log(data)
				this.Joinn()
				
      },
      onAddCartClicked(data) {
				console.log(this.youu)
				this.nmm=document.getElementsByClassName("van-stepper__input")[0].value
				this.colorid=this.sku.tree[0].v
				for (var j=0;j<this.colorid.length;j++) {
					if(data.selectedSkuComb.s1==this.colorid[j].id){
						this.color=this.colorid[j].name
					}
				}
				this.sizeid=this.sku.tree[1].v
				for (var i=0;i<this.sizeid.length;i++) {
					if(data.selectedSkuComb.s2==this.sizeid[i].id){
						this.size=this.sizeid[i].name
					}
				}
				for(var k in this.sku.list){
					console.log(data.selectedSkuComb.s1,data.selectedSkuComb.s2)
					if(data.selectedSkuComb.s1==this.sku.list[k].s1&&data.selectedSkuComb.s2==this.sku.list[k].s2){	
						this.iidi=this.sku.list[k].id
						console.log(this.pr)
						for(var i=0;i<this.pr.length;i++){
							if(this.iidi==this.pr[i].id){
								this.sku.price=this.pr[i].price
							}
							console.log(this.pr[i])
						}
					}
				}
				this.Join()
				this.showBase = false
				this.reload()
      },
			xuanze(){
				this.showBase = true
				this.idd()
			},
      fh() {
        if (this.token == 2) {
          this.$router.push({
            name: 'home',
          })
        } else if (this.token == 1) {
          this.$router.push({
            name: 'hd',
          })
        } else if (this.token == 3) {
          this.$router.push({
            name: 'ssxqy',
            query: {
              List: this.a,
              LIst: this.b
            }
          })
        } else if (this.token == 10){
          this.$router.push({
            name: 'My',
          })
        }
          else if (this.token == 7){
          this.$router.push({
            name: 'Shop',
          })
        } else  if (this.token == 33){
          this.$router.push({
            name: 'reimai',
          })
        } else  if (this.token == 34){
          this.$router.push({
            name: 'dm',
            query:{
              mo:this.mo
            }
          })
        } else  if (this.token == 35){
          this.$router.push({
            name: 'tj',
            query:{
              mo:this.mo
            }
          })
        }else  if (this.token == 36){
          this.$router.push({
            name: 'ph',
            query:{
              mo:this.mo
            }
          })
        }
          else {
          this.$router.push({
            name: 'dpxq',

          })
        }
      },
	kefu(){
		console.log(this.dataList)
		this.$router.push({
			name:'kf',
			query:{
				title:this.dataList.title,
				name:this.dataList.name,
				sid:this.dataList.sid,
				money:this.dataList.price,
				img:this.dataList.headimg[0]
			}
		})
	},
      sypj() {
				console.log(this.dataList)
        this.$router.push({
          name: 'sypj',
          query:{
            token:this.token,
             id:this.goods_id,
            list:this.dataList.comment
          }
        })
      },
			idd(){
				request({
				  url: "api/goods/getgoodsttr",//规格
				  method: "post",
						data: {
						  goods_id:this.goods_id
						},
				}).then(res => {
					this.no=res.data.msg
					if(this.no=="成功"){
						this.sku.tree=res.data.data.info
						this.sku.list=res.data.data.list
					}
				})
			},
      btn_pos: function () {
        var mTop = document.getElementsByClassName('concat-bottom')[0].offsetTop;
        var cTop = document.getElementsByClassName('concat-tuijian')[0].offsetTop;
        var vTop = document.getElementsByClassName('nav-tj')[0].offsetTop;
        //滚动条的高度
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scroll
        //consoleog(scrollTop)
        //滚动条的高度>可视区的高度
        if (550 < scrollTop) {
          this.bar = true
        } else {
          this.bar = false
        }
        if (mTop-80 < scrollTop && scrollTop < cTop-70) {
          this.styleObj1 = this.styleObj8
          this.styleObj2 = this.styleObj7
          //consoleog(5)

        } else {
          this.styleObj1 = this.styleObj9
          this.styleObj2 = this.styleObj9
          //consoleog(6)

        }

        if (cTop-110 < scrollTop && scrollTop < vTop) {
          this.styleObj3 = this.styleObj8
          this.styleObj4 = this.styleObj7

        } else {
          this.styleObj3 = this.styleObj9
          this.styleObj4 = this.styleObj9

        }

        if (vTop-60 < scrollTop) {
          this.styleObj5 = this.styleObj8
          this.styleObj6 = this.styleObj7

        } else {
          this.styleObj5 = this.styleObj9
          this.styleObj6 = this.styleObj9

        }
      },
      ping() {
        this.styleObj1 = this.styleObj8
        this.styleObj2 = this.styleObj7
        this.styleObj3 = this.styleObj9
        this.styleObj4 = this.styleObj9
        this.styleObj5 = this.styleObj9
        this.styleObj6 = this.styleObj9
      },
      xian() {
        this.styleObj1 = this.styleObj9
        this.styleObj2 = this.styleObj9
        this.styleObj3 = this.styleObj8
        this.styleObj4 = this.styleObj7
        this.styleObj5 = this.styleObj9
        this.styleObj6 = this.styleObj9
      },
      jian() {
        this.styleObj1 = this.styleObj9
        this.styleObj2 = this.styleObj9
        this.styleObj3 = this.styleObj9
        this.styleObj4 = this.styleObj9
        this.styleObj5 = this.styleObj8
        this.styleObj6 = this.styleObj7
      },
      bao() {
        this.styleObj1 = this.styleObj9
        this.styleObj2 = this.styleObj9
        this.styleObj3 = this.styleObj9
        this.styleObj4 = this.styleObj9
        this.styleObj5 = this.styleObj9
        this.styleObj6 = this.styleObj9
        this.bar = false
      },
      //收藏
      collect() {
         if (this.$store.state.username == null) {
           this.$router.push({
             name: 'regi',
           })
         }else {
           this.shou = !this.shou
           if (this.shou == 1) {
             request({
               url: "api/users/collectiongoods",
               method: "post",
               data: {
                 user_id: this.$store.state.username.id,
                 goods_id: this.goods_id,
               }
             }).then(res => {
               //consoleog(res)
               if (res.data.code == 200) {
				// debugger;  
				Toast('收藏成功');
                 this.shuaxin()
               } else {
                 Toast('收藏失败');
               }
             }).catch(err => {
               Toast('网络连接中断');
             })

           }
           if (this.shou == 0) {
             request({
               url: "api/users/delcgoods",
               method: "post",
               data: {
                 user_id: this.$store.state.username.id,
                 goods_id: this.goods_id,

               }
             }).then(res => {
               //console.log(res)
               if (res.data.code == 200) {
				   Toast('取消收藏')
                 // this.$toast('取消收藏');
                 this.shuaxin()
               } else {
                 Toast('取消收藏失败');
               }
             }).catch(err => {
               Toast('网络连接中断');
             })
           }
         }
      },
      shuaxin() {
        if (this.$store.state.username == null) {
          request({
            url: "api/goods/show",
            method: "post",
            data: {
              goods_id: this.goods_id,
				lat:window.sessionStorage.getItem('lat'),
				lng:window.sessionStorage.getItem('lng')
            }
          }).then(res => {
            this.dataList = res.data.data
						this.pr=res.data.data.goods_sttr
            console.log(res.data.data)
						this.goods.picture=res.data.data.headimg
						this.sku.price=res.data.data.price
          })
        }else {
          request({
            url: "api/goods/show",//商品的详情
            method: "post",
            data: {
              goods_id: this.goods_id,
              user_id: this.$store.state.username.id,
				lat:window.sessionStorage.getItem('lat'),
				lng:window.sessionStorage.getItem('lng')
            }
          }).then(res => {
						console.log(res)
            this.dataList = res.data.data
			console.log(this.dataList.tag.length)
			this.pr=res.data.data.goods_sttr
            this.shou = res.data.data.is_collectiongoods
            this.chang = res.data.data.comment.length
			this.goods.picture=res.data.data.shoplogo//规格里的图
			this.sku.price=res.data.data.price
            this.you()
          })
        }
      },
      dianpu() {
        window.sessionStorage.setItem("DP", JSON.stringify(this.dataList.sid))
        this.$router.push({
          name: 'dpxq',
          query: {
            token: this.token,
            goods_id: this.goods_id,
            a: this.a,
            b: this.b
          }
        })
      },
      you() {
        request({
          url: "api/coupon/shop",//优惠券
          method: "post",
          data: {
            shop_id: this.dataList.sid,
            user_id:this.$store.state.username.id
          }
        }).then(res => {
          this.youu = res.data.data
		  console.log(this.youu)
			for(var i in this.youu){
				this.jiian.push(this.youu[i].sub_price)
				function compare(val1,val2){
				    return val1-val2;
				};
				this.jiian.sort(compare);
				this.jiann=this.jiian[0]
			}
			if(this.youu==''){
				this.qq=0
				this.fist=''
				this.senne=''
			}else{
				this.qq=1
				this.fist=this.youu[0].name
				this.senne=this.youu[1].name
			}		
        })
      },
      //领取优惠券
      lingqu(i) {
        this.request({
          url: "api/coupon/receive",
          method: "post",
          data: {
            coupon_id: i,
            user_id: this.$store.state.username.id
          }
        }).then(res => {
					console.log(res)
          if (res.data.code == 200) {
            this.you()
          }
        })
      },
      onClickk() {
        if (this.$store.state.username == null){
          Toast('请登录')
        } else {
          this.show = !this.show
        }
      },
      //加入购物车
      Join() {
		  console.log(this.no)
        if (this.$store.state.username == null ){
          this.$router.push({
            name: 'regi',
          })
        } else if(this.no=="没有属性"){
					request({
					  url: "api/goods/addcart",
					  method: "post",
					  data: {
					    user_id: this.$store.state.username.id,
					    goods_id: this.goods_id,
					    num: 1,
						sku_id:0,
					  },
					}).then(res => {
						console.log(res)
					  if (res.data.code== 200) {
					    Toast("加入购物车成功")
					  }
					  if (res.data.code ==0){
					    Toast("库存不足")
					  }
					})
				}else if(this.no=="成功"){
					this.showBase = true
					if(!this.color||!this.size) {
								this.showBase = true
					}else {
						request({
							url: "api/goods/addcart",
							method: "post",
							data: {
								user_id: this.$store.state.username.id,
								goods_id: this.goods_id,
								num: this.nmm,
								sku_id:this.iidi,
							},
						}).then(res => {
							// console.log(res)
							if (res.data.code== 200) {
								Toast("加入购物车成功")
								
							}
							if (res.data.code ==0){
								Toast("库存不足")
							}
						})
					}
				}
				
      },
      //立即购买
      Joinn(){
        if (this.$store.state.username == null ){
          this.$router.push({
            name: 'regi',
          })
        } else if(this.no=="没有属性"){
			console.log("000");
					request({
					  url: "api/goods/addcart",
					  method: "post",
					  data: {
					    user_id: this.$store.state.username.id,
					    goods_id: this.goods_id,
					    num: 1,
					    sku_id:0,
					    is_new:1
					  },
					}).then(res => {
						
					if (res.data.code == 200) {
					  this.$router.push({
					    name: 'js',
					    query: {
					      token: 55,
					      cart_id: res.data.data.cart_id,
					      id: this.goods_id,
					      idd: this.token,
					      total_amount: this.dataList.price,
					    }
					  })
					}
					if (res.data.code ==0){
					  Toast("库存不足")
					}
					})
				}else if(this.no=="成功"){
				 if(!this.color||!this.size) {
					this.showBase = true
				}else {
					console.log(this.color,this.size)
					this.skku.push("尺码:"+this.size)
					this.skku.push("颜色:"+this.color)
					console.log(this.skku)
          request({
            url: "api/goods/addcart",
            method: "post",
            data: {
              user_id: this.$store.state.username.id,
              goods_id: this.goods_id,
              num: this.nmm,
              sku_id:this.iidi,
			is_new:1
            },
          }).then(res => {
						console.log(res)
            if (res.data.code == 200) {
              this.$router.push({
                name: 'js',
                query: {
                  token: 55,
                  cart_id: res.data.data.cart_id,
                  id: this.goods_id,
                  idd: this.token,
                  total_amount: this.dataList.price,
                }
              })
            }
            if (res.data.code ==0){
              Toast("库存不足")
            }
          })
        }
				}
      },
      //推荐详情
      xq(i){
        this.$router.push({
          name: 'wpxq',
          query:{
            goods_id:i,
            token:this.token,
            id:this.goods_id
          }
        })
      },
      xiaoxi(){
        if (this.$store.state.username == null ){
          this.$router.push({
            name: 'regi',
          })
        } else {
          this.$router.push({
            name: 'news',
            query: {
              token: this.token,
              id: this.goods_id
            }
          })
        }
      },
      shop(){
        this.$router.push({
          name: 'Shop',
        })
      },
      homm(){
        this.$router.push({
          name: 'home',
        })
      },
      jubao() {
        if (this.$store.state.username == null ){
          this.$router.push({
            name: 'regi',
          })
        } else {

          this.$router.push({
            name: 'jb',
            query: {
              id: this.goods_id,
              token: this.token,
            }
          })
        }
      },
    },
    mounted() {
      window.addEventListener('scroll', this.btn_pos);
      this.goods_id = this.$route.query.goods_id
      this.a = this.$route.query.dataList
      this.b = this.$route.query.arrayList
      this.shuaxin()
			this.price=this.$route.query.price
      this.token = this.$route.query.token
      this.goodsid = this.$route.query.id
      this.mo =this.$route.query.mo
			this.idd()
    },
    components: {
      Rate,
      Sku,
      Tab,
      Tabs,
      Popup
    },
    watch:{
      '$route':function (to ,from) {

        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        this.token =to.query.token

        request({
          url: "api/goods/show",
          method: "post",
          data: {
            goods_id: to.query.goods_id,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng'),
            user_id: this.$store.state.username.id
          }
        }).then(res => {
          this.dataList = res.data.data
          this.shou = res.data.data.is_collectiongoods
          this.chang = res.data.data.comment.length
          this.you()

        })
      }
    },
    updated() {

    }
  }
</script>

<style lang="less" scoped>
	.zxc{
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
	}
.zxc span:nth-child(2){
	position: relative;
	right: 0.4rem;
}
.zxc span:nth-child(3){
	position: relative;
	right: 0.6rem;
}
.zxc span:first-child{
	position: relative;
	left: 0rem;
}
  .nav-top-back {
    background-image: url(../../../assets/shangjiaye_xialakuang.png);
    width: 2.9rem;
    height: 4.11rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0.5rem;
    z-index: 999;
    top: 0.8rem;
    padding-top: 0.4rem;
  }

  .nav-top-back p {
    width: 2.5rem;
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #FFFFFF;
  }
  .box {
    background: #F7F7F7;

  }

  .pop {
    background: #F7F7F7;
  }

  .pop-div {
    position: relative;
    height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .pop .pop-div::-webkit-scrollbar {
    display: none;
  }

  .pop-div p {
    font-size: 0.36rem;
    color: black;
    margin: 0.34rem;
  }

  .pop-div-div {
    width: 6.9rem;
    height: 1.5rem;
    margin: 0.1rem auto;
    position: relative;
  }

  .pop-div-div img {
    width: 100%;
    height: 100%;
  }

  .pop-div-div p:nth-child(3) {
    margin: 0;
    position: absolute;
    top: 0.2rem;
    left: 0.36rem;
    font-size: 0.36rem;
    font-weight: bold;
  }

  .pop-div-div p:nth-child(3) span:nth-child(1) {
    position: relative;
    top: -0.1rem;
    font-size: 0.2rem;
  }

  .pop-div-div p:nth-child(3) span:nth-child(2) {
    font-size: 0.24rem;
    color: #F6B37F;
    margin-left: 0.1rem;
  }

  .pop-div-div p:nth-child(3) span:nth-child(3) {
    font-size: 0.24rem;
    color: #CCCCCC;
    margin-left: 0.1rem;
  }

  .pop-div-div p:nth-child(4) {
    font-size: 0.24rem;
    color: #F6B37F;
    position: absolute;
    bottom: 0.2rem;
    left: 0.3rem;
    margin: 0;

  }

  .pop-div-div p:nth-child(5) {
    font-size: 0.24rem;
    color: #CCCCCC;
    position: absolute;
    bottom: 0.2rem;
    left: 0.3rem;
    margin: 0;
  }

  .pop-div-div p:nth-child(6) {
    position: absolute;
    font-size: 0.3rem;
    color: #E08A47;
    margin: 0;
    top: 0.6rem;
    right: 0.3rem;
  }

  .pop-div-div p:nth-child(7) {
    position: absolute;
    font-size: 0.3rem;
    color: #CCCCCC;
    margin: 0;
    top: 0.6rem;
    right: 0.3rem;
  }

  .pop-div-div div:nth-child(8) {
    width: 0.82rem;
    height: 0.82rem;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
  }

  .pop-div-div div:nth-child(8) img {
    width: 0.82rem;
    height: 0.82rem;
  }

  .pop-div-div div:nth-child(8) span {
    position: absolute;
    top: 0.15rem;
    right: 0.04rem;
    transform: rotate(45deg);
    color: #FFFFFF;
    font-size: 0.24rem;

  }

  /*.box .box-container {*/
  /*  position: relative;*/
  /*  height: 100vh;*/
  /*  overflow-x: hidden;*/
  /*  overflow-y: scroll;*/
  /*}*/

  /*.box .box-container::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/
  .nav {
    width: 100%;
    min-height: 100vh;
    background: #F7F7F7;
  }

  .top-left {
    position: absolute;
    left: 0.5rem;
    z-index: 999;
    top: 0.3rem;
  }

  .top-right {
    position: absolute;
    right: 0.5rem;
    z-index: 999;
    top: 0.3rem;
  }

  /*轮播图*/
  .nav {
    width: 7.5rem !important;
    height: 7.5rem !important;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    background: #FFFFFF;
  }

  .nav img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  /deep/ .swiper-container {
    height: 7.5rem;
  }

  /*内容*/
  .concat {
    width: 7.5rem;
    min-height: 2.36rem;
    background: #FFFFFF;
    text-align: left;
    padding: 0.3rem;
  }

  .concat p:nth-child(1) {
    display: inline-block;
    font-size: 0.28rem;
    color: #EF0600;
  }

  .concat p:nth-child(2) {
    color: #777777;
    font-size: 0.24rem;
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
  }

  .concat p:nth-child(3) {
    font-size: 0.3rem;
    width: 6.9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }


  .concat-top {
    width: 7.5rem;
    background: white;
    margin-top: 0.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    text-align: left;
    text-indent: 0.3rem;
    color: #777777;
    font-size: 0.24rem;
    clear: both;
  }

  .concat-top>p:nth-child(1)>span:nth-child(1) {
    color: black;
    margin-left: 0.5rem;
  }

  .concat-top>p:nth-child(1)>span:nth-child(2) {
    float: right;
    margin-right: 0.3rem;
  }

  .concat-top>div>p:nth-child(1){
    margin-top: 0.15rem;
  }

  .concat-top>div:nth-child(2)>p:nth-child(1)>span:last-child {
    float: right;
    margin-right: 0.4rem;
  }
.concat-top>div:nth-child(3)>p>span{
    margin-left: 0.5rem;
  }
  .concat-top>div:nth-child(2)>p:nth-child(2) {
    display: inline-block;
    height: 0.33rem;
    padding: 0 0.1rem 0 0.1rem;
    background: rgba(252, 114, 91, 1);
    border-radius: 15px;
    text-indent: 0;
    color: white;
    margin-left: 1.3rem;
    margin-top: 0.2rem;
    line-height: 0.33rem;
  }

  .concat-top>div:nth-child(2)>p:nth-child(3) {
    display: inline-block;
	padding: 0 0.2rem 0 0.2rem;
    height: 0.4rem;
    text-indent: 0;
    text-align: center;
    line-height: 0.4rem;
    border: 1px solid #EF0600;
    margin-left: 0.1rem;
  }
  .concat-top>p:last-child {
    margin-left: 0.55rem;
  }

  .concat-zhong {
    width: 6.9rem;
    height: 1.6rem;
    background: white;
    margin: 0.2rem 0 0.2rem 0;
    padding: 0 0.3rem 0 0.3rem;
    font-size: 0.24rem;
    text-align: left;
  }

  .concat-zhong p:nth-child(1) {
    height: 0.79rem;
    line-height: 0.79rem;
    border-bottom: 1px solid #FFEEEEEE;
  }

  .concat-zhong p:nth-child(1) span {
    float: right;
    color: #777777;
  }

  .concat-zhong p:nth-child(2) {
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .concat-bottom {
    width: 6.9rem;
    height: 2.45rem;
    padding: 0 0.3rem 0 0.3rem;
    background: white;
  }

  .concat-bottom p:nth-child(1) {
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid #FFEEEEEE;
    text-align: left;
  }

  .concat-bottom p:nth-child(1) span {
    float: right;
    font-size: 0.24rem;
    color: #F21D13;
  }

  .concat-bottom-div {
    text-align: left;
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
  }

  .concat-bottom-div img {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
  }

  .concat-bottom-div span {
    font-size: 0.24rem;
    color: #777777;
    position: relative;
    bottom: 0.12rem;
    left: 0.2rem;
  }

  .concat-bottom p:nth-child(3) {
    font-size: 0.24rem;
    text-align: left;

  }

  .concat-footer {
    width: 6.9rem;
    min-height: 1.4rem;
    padding: 0.3rem;
    background: white;
    margin: 0.2rem 0 0.1rem 0;

  }

  .concat-footer-div {
    display: flex;
    height: 0.75rem;
    position: relative;

  }

  .concat-footer-div img {
    width: 0.75rem;
    height: 0.75rem;
  }

  .concat-footer-div-div p {
    font-size: 0.3rem;
    color: #333333;
    text-indent: 0.18rem;
  }

  .concat-footer-two {
    display: flex;
    height: 0.65rem;
    line-height: 0.85rem;
    font-size: 0.24rem;
    justify-content: space-between;
  }

  .concat-footer-two span {
    color: #EF0600;
  }

  .concat-footer-div-div-p {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: -0.4rem;
    color: #EF0600 !important;
    font-size: 0.24rem !important;
  }

  .concat-tuijian {
    width: 7.5rem;
    font-size: 0.3rem;
    margin-top: 0.2rem;
    background: white;
  }


  .concat-tuijian p {
    height: 0.8rem;
    line-height: 0.8rem;
    margin-bottom: 0.1rem;
  }


  .concat-tuijian img {
    width: 7.1rem;
    height: 100%;
  }

  .concat-weini {
    width: 7.5rem;
    margin: 0 auto;

  }

  .base {
    width: 7.5rem;
    height: 1rem;
    display: flex;
    position: fixed;
    bottom: 0;
    background: white;
    text-align: center;
  }

  .base-left {
    width: 13.33%;
    height: 0.9rem;
    font-size: 0.2rem;
    padding-top: 0.1rem;
    color: #777777;
  }

  .base-right {
    width: 30%;
    height: 1rem;
    font-size: 0.3rem;
    line-height: 1rem;
    background: #F21D13;
    color: white;
  }

  .demo-sku {
    .sku-container {
      padding: 0 15px;
    }
  }

  /deep/ .van-sku-row {
    text-align: left !important;
  }

  /deep/ .van-sku__stock {
    float: left;

  }

  /deep/ .van-sku__quota {
    float: left;
  }

  /deep/ .van-sku-stepper-stock {
    padding: 12px 0;
    margin-left: 15px;
    margin-bottom: 1rem;
  }

  /deep/ .van-sku-messages {
    padding-bottom: 10px;
    background: #f8f8f8;
    display: none;
  }

  .navbar {
    width: 7.5rem;
    height: 0.88rem;
    background: white;
    position: fixed;
    top: 0;
    z-index: 9999;
  }

  .navbar-div {
    width: 5.5rem;
    height: 0.88rem;
    display: flex;
    margin: 0 auto;
  }

  .navbar-div div {
    width: 25%;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.3rem;
    text-align: center;
  }

  .navbar-div div div {
    width: 60%;
    margin: 0 auto;
  }

  .navbar-div a {
    height: 0.87rem;
    width: 25%;
  }

  .top-leftt {
    position: absolute;
    left: 0.3rem;
    z-index: 999;
    top: 0.2rem;
  }

  .top-rightt {
    position: absolute;
    right: 0.3rem;
    z-index: 999;
    top: 0.2rem;
  }

  .nav-tj-top {
    background-image: url(../../../assets/wode_weinituijian.png);
    background-repeat: no-repeat;
    width: 2.72rem;
    height: 0.4rem;
    margin: 0 auto;
    background-position: center;
    line-height: 0.4rem;
    font-size: 0.36rem;
    margin-top: 0.35rem;
  }

  .nav-tj-bottom {
    display: flex;
    width: 7.5rem;
    height: 100%;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 0.3rem;
    margin-bottom: 1rem;
  }

  .nav-tj-bottom-div {
    width: 3.5rem;
    height: 5.56rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
    border-radius: 10px;
   margin: 0.15rem 0.12rem;
    position: relative;
  }

  .nav-tj-bottom-div-img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 10px;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }
 .nav-tj-bottom-div-img img{
   max-width: 100%;
   max-height: 100%;
   display: block;
   margin: auto;
 }

  .nav-tj-bottom-div-p {

    line-height: 0.35rem;
    text-align: left;
    width: 3rem;
    margin: 0 auto;
    font-size: 0.26rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .nav-tj-bottom-div-pp {
    position:absolute;
    left: 0;
    bottom: 0.85rem;
   display: inline-block;
    height: 0.32rem;
    background: #FFBCBA;
    color: #EF0600;
    font-size: 0.22rem;
    margin-top: 0.2rem;
    margin-left: 0.28rem;
  }

  .nav-tj-bottom-div-ppp {
    padding: 0 0.28rem;
    height: 0.3rem;
    line-height: 0.3rem;
    position: absolute;
    bottom: 0.2rem;
  width: 3.5rem;
  }

  .nav-tj-bottom-div-ppp span:nth-child(1) {
    font-size: 0.22rem;
    color: #EF0600;
    float: left;
    position: relative;
    bottom: -0.02rem;
  }

  .nav-tj-bottom-div-ppp span:nth-child(2) {
    font-size: 0.32rem;
    color: #EF0600;
    float: left;
    font-weight: bold;
  }

  .nav-tj-bottom-div-ppp span:nth-child(3) {
    font-size: 0.24rem;
    color: #777777;
    position: absolute;
    right: 0.8rem;
  }
  /deep/ .swiper-pagination-bullet {
    width: 0.098rem !important;
    height: 0.098rem !important;
    margin: 0 0.1rem;
  }

  /deep/ .swiper-pagination-bullet-active {
    background: #EF0600;
  }
</style>
<style>
  #concat-tuijian-div img{
    width: 7.5rem!important;
  }
  #concat-tuijian-div table{
    width: 100%!important;
  }
  #concat-tuijian-div p{
    width: 100%!important;
  }

</style>
