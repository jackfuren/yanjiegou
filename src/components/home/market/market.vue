<template>
  <div class="box">
    <div class="box-container">
      <!-- 头部-->
      <div class="nav">
        <div class="nav-top">
          <van-icon @click="fh()" color="#FFFFFF" name="arrow-left" size="0.55rem"
                    style="float: left;margin-top: 0.2rem"/>
          <van-icon @click="sou()" color="#FFFFFF" name="search" size="0.5rem"
                    style="margin-right: 0.1rem;margin-top: 0.2rem"/>

          <van-icon @click="rapid =! rapid" color="#FFFFFF" name="wap-nav" size="0.5rem" style=";margin-top: 0.2rem"/>
        </div>
        <div class="nav-bottom">
          <p>{{top.name}}</p>
          <p>主营：{{top.intro}}</p>
          <p>地址：{{top.province + top.city + top.area+ top.address}} <span><500m</span></p>
          <img alt="" :src="top.bigshoplogo">
        </div>
        <div v-show="rapid" class="nav-top-back">
          <p @click="xiaoxi"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem"
                                  src="../../../assets/shangjiaye_wuxiaoxi.png" alt=""><span>消息</span></p>
          <p @click="shop"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem"
                                src="../../../assets/shangjaiyetanchuang_gouwuche.png" alt=""><span
            style="position: relative;left: 0.14rem">购物车</span></p>
          <p @click="homm"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
                                src="../../../assets/shangjiayetanchuang_shouyee.png" alt=""><span>首页</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem"
                  src="../../../assets/shangjaiye_fenxiang.png" alt=""> <span style="position: relative;left: -0.02rem">分享</span>
          </p>
        </div>
      </div>
      <!-- 内容-->
      <div class="concat">
        <div class="concat-left">
          <ul>
            <li :key="index" :style=" back == index? backg :backgg " @click="qie(index,item.id)"
                v-for="(item ,index) in list">
              <img :src="phh == index ? pho : ph" alt=""> <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="concat-right">
          <p class="concat-right-p">{{text.slice(0,4)}}</p>
          <div @click="xian(item.sid)" class="concat-right-concat" v-for="(item,index) in bottom" :key="index">
            <div><img alt="" :src="item.shoplogo"></div>
            <div class="concat-right-concat-p">
              <p>{{item.sname}}</p>
              <p>主营：{{item.intro}} </p>
              <p>地址：{{item.province + item.city + item.area+ item.address}} </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request"

  export default {
    name: "market",
    data() {
      return {
        list: [],
        ph: require("../../../assets/louceng_hui.png"),
        pho: require("../../../assets/louceng.png"),
        phh: 0,
        back: 0,
        backg: {background: "#FFFFFF"},
        backgg: {background: ""},
        bshop_id: "",//商圈编号
        top: "", //头部详情
        bottom: "", //底部详情
        rapid: false,
        text: ""
      }
    },
    methods: {
      qie(e, item) {
        this.phh = e
        this.back = e
        request({
          url: "api/bigshop/index",
          method: "post",
          data: {
            bshop_id: this.bshop_id,
            floor_id: item,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng')
          }
        }).then(res => {
					//console.log(res);
          if (res.data.code == 200) {
            this.bottom = res.data.data.shops//对应的是几楼里的商家
            this.text = res.data.data.floors[e].hnum//对应的是几楼是什么
          }
        })

      },
      fh() {
        this.$router.push({
          name: 'home'
        })
      },
      sou() {
        this.$router.push({
          name: 'seek',
          query: {
            token: 1
          }

        })
      },
      xian(i) {
				//console.log(i)
        window.sessionStorage.setItem("DP", JSON.stringify(i))
        this.$router.push({name: 'dpxq'})
      },
      trading() {
        request({
          url: "api/bigshop/index",
          method: "post",
          data: {
            bshop_id: this.bshop_id,
            floor_id: 1,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng')
          }
        }).then(res => {
          //consoleog(res)
          if (res.data.code == 200) {
            this.top = res.data.data.bshop
            this.bottom = res.data.data.shops
            this.list = res.data.data.floors
						//console.log(this.list)
            this.text = res.data.data.floors[0].hnum
          }
        })

      },
      xiaoxi() {
        if (this.$store.state.username == null) {
          this.$router.push({
            name: 'regi',
          })
        } else {
          this.$router.push({
            name: 'news',
            query: {
              token: 1
            }
          })
        }
      },
      shop() {
        this.$router.push({
          name: 'Shop',
        })
      },
      homm() {
        this.$router.push({
          name: 'home',
        })
      },
      jubao() {
        if (this.$store.state.username == null) {
          this.$router.push({
            name: 'regi',
          })
        } else {
          this.$router.push({
            name: 'jb',
            query: {
              id: this.shop_id
            }
          })
        }
      },
    },
    mounted() {
      this.bshop_id = JSON.parse(window.sessionStorage.getItem('SQ'))
      this.trading()
    }

  }
</script>

<style lang="less" scoped>
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
  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  /* 头部*/
  .nav-top-back {
    background-image: url(../../../assets/shangjiaye_xialakuang.png);
    width: 2.9rem;
    height: 3.3rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0.35rem;
    top: 0.7rem;
    z-index: 999;
    padding-top: 0.4rem;
  }

  .nav-top-back p {
    width: 2.5rem;
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #FFFFFF;
  }


  .nav {
    background-image: url(../../../assets/shangchang_beijingg.png);
    width: 7.5rem;
    height: 2.6rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .nav-top {
    width: 6.8rem;
    margin: 0rem auto;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
  }

  .nav-bottom {
    width: 6.9rem;
    height: 2rem;
    background: white;
    margin: 0.8rem auto 0;
    text-align: left;
    position: relative;
    border-radius: 10px;
  }

  .nav-bottom p:nth-child(1) {
    padding: 0.15rem 0.2rem;
    font-size: 0.36rem;
    font-weight: bold;
  }

  .nav-bottom p:nth-child(2) {
    font-size: 0.24rem;
    color: #777777;
    padding: 0 0.24rem;
    line-height: 0.24rem;
  }

  .nav-bottom p:nth-child(3) {
    font-size: 0.24rem;
    color: #777777;
    padding: 0.15rem 0.24rem;
  }

  .nav-bottom p:nth-child(3) span {
    float: right;
  }

  .nav-bottom img {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: -0.5rem;
    right: 0.3rem;
  }

  .concat {
    width: 7.5rem;
    margin-top: 1.3rem;
    display: flex;
  }

  .concat-left {
    width: 1.6rem;
  }

  .concat-right {
    width: 5.9rem;
  }

  .concat-left ul li {
    width: 1.6rem;
    height: 0.8rem;
    font-size: 0.2rem;
    line-height: 0.8rem;
    position: relative;
  }

  .concat-left ul li img {
    width: 0.5rem;
    height: 0.35rem;
    position: absolute;
    top: 50%;
    margin-top: -0.175rem;
    left: 50%;
    margin-left: -0.25rem;
  }

  .concat-left ul li span {
    position: relative;
    z-index: 3;
    top: 0.05rem;
    right: 0.05rem;
    color: white;
  }

  .concat-right-p {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.36rem;
    color: #333333;
    font-weight: bold;
    text-align: left;
    text-indent: 0.2rem;
    width: 2rem;
    overflow: hidden;
    //text-overflow:ellipsis;
    white-space: nowrap;
  }

  .concat-right-concat {
    width: 5.4rem;
    height: 1.8rem;
    margin: 0.2rem auto;
    background: #FFFFFF;
    display: flex;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }

  .concat-right-concat img {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.2rem;

  }

  .concat-right-concat-p p:nth-child(1) {
    font-size: 0.32rem;
    text-align: left;
    text-indent: 0.2rem;
    font-weight: bold;
    margin-top: 0.15rem;

  }

  .concat-right-concat-p p:nth-child(2) {
    font-size: 0.2rem;
    text-align: left;
    text-indent: 0.2rem;
    margin: 0.2rem 0 0.13rem 0;
    line-height: 0.22rem;
    color: #777777;
  }

  .concat-right-concat-p p:nth-child(3) {
    font-size: 0.2rem;
    text-align: left;
    text-indent: 0.2rem;
    margin: 0.13rem 0;
    color: #777777;
  }
</style>
