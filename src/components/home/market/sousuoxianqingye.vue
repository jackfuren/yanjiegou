<template>
  <div class="box">
    <div class="box-container">
      <!-- 头部-->
      <div class="nav">
        <div class="nav-top">
          <van-icon @click="fh()" color="#333333" name="arrow-left" size="0.6rem"
                    style="position: relative;top: -0.01rem"/>
          <div @click="seek()" class="search">
            <van-icon color="#333333" name="search" size="0.4rem"
                      style="position: absolute;top: 0.15rem;left: 0.18rem"/>
            <span style="margin-left: 0.5rem">搜索</span>
          </div>

          <van-icon @click="back =!back" color="#333333" name="wap-nav"
                    style="float: right;margin-right: 0.55rem;margin-top: 0.1rem"
                    size="0.6rem"/>

        </div>
        <div v-show="back" class="nav-top-back">
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem"
                  src="../../../assets/shangjiaye_wuxiaoxi.png" alt=""><span>消息</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem"
                  src="../../../assets/shangjaiyetanchuang_gouwuche.png" alt=""><span>购物车</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
                  src="../../../assets/shangjiayetanchuang_shouyee.png" alt=""><span>首页</span></p>
          <p><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem"
                  src="../../../assets/shangjaiye_fenxiang.png" alt=""> <span>分享</span></p>
          <p @click="jubao()"><img style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
                                   src="../../../assets/shangjiaye_jubao.png" alt=""><span>举报</span></p>
        </div>
      </div>
      <van-tabs v-model="active" title-active-color="#EF0600">

        <van-tab title="商品">
          <van-tabs v-model="act" title-active-color="#EF0600" background="#EEEEEE" color="#EEEEEE" @click="onClick">
            <van-tab title="全部">
              <div class="concat">
                <div :key="index" v-for="(item ,index) in dataList">
                  <div @click="wuping(item.id)" class="ph">
                    <img :src="item.sheadimg" alt="">
                    <div class="ph-rei" v-show="item.ishot ==0 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                    <div class="ph-rei" v-show="item.ishot == 1 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                  </div>
                  <p class="concat-title">{{item.title}}</p>
                  <p class="concat-name">{{item.name}}</p>
                  <p class="concat-money">￥ <span>{{item.price}}</span>
                    <span>销量  {{item.sold}}</span>
                  </p>

                </div>
              </div>
            </van-tab>
            <van-tab title="销量">
              <div class="concat">
                <div :key="index" v-for="(ite ,index) in arList">
                  <div @click="wuping(ite.id)" class="ph">
                    <img :src="ite.sheadimg" alt="">
                    <div class="ph-rei" v-show="ite.ishot ==0 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                    <div class="ph-rei" v-show="ite.ishot == 1 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                  </div>
                  <p class="concat-title">{{ite.title}}</p>
                  <p class="concat-name">{{ite.name}}</p>
                  <p class="concat-money">￥ <span>{{ite.price}}</span>
                    <span>销量  {{ite.sold}}</span>
                  </p>

                </div>
              </div>

            </van-tab>
            <van-tab title="价格">
              <div class="concat">
                <div :key="index" v-for="(ite ,index) in arrList">
                  <div @click="wuping(ite.id)" class="ph">
                    <img :src="ite.sheadimg" alt="">
                    <div class="ph-rei" v-show="ite.ishot ==0 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                    <div class="ph-rei" v-show="ite.ishot == 1 ? true : false">
                      <img alt="" src="../../../assets/jiaobiao.png">
                      <span>热</span>
                    </div>
                  </div>
                  <p class="concat-title">{{ite.title}}</p>
                  <p class="concat-name">{{ite.name}}</p>
                  <p class="concat-money">￥ <span>{{ite.price}}</span>
                    <span>销量  {{ite.sold}}</span>
                  </p>

                </div>
              </div>
            </van-tab>
            <div v-show="a" class="sanjiao"><img src="../../../assets/shangjiaye_jiage.png" alt=""></div>
            <div v-show="b" class="sanjiao"><img src="../../../assets/gao.png" alt=""></div>
            <div v-show="c" class="sanjiao"><img src="../../../assets/shangjiaye_jiagedi.png" alt=""></div>
            <div v-show="aa" class="sanjiaoo"><img src="../../../assets/shangjiaye_jiage.png" alt=""></div>
            <div v-show="bb" class="sanjiaoo"><img src="../../../assets/gao.png" alt=""></div>
            <div v-show="cc" class="sanjiaoo"><img src="../../../assets/shangjiaye_jiagedi.png" alt=""></div>


          </van-tabs>
        </van-tab>

        <van-tab title="店铺">
          <van-tabs v-model="act" title-active-color="#EF0600" background="#EEEEEE" color="#EEEEEE" @click="onClick">
            <van-tab title="全部">

             <div class="dianpu" v-for="(item,index) in dataList">
               <img :src="item.shoplogo" alt="">
               <span>{{item.name}}</span>
               <p @click="jindian(item.sid)">进店</p>
               <div class="dianpu-div">
                 <img :src="item.headimg" alt="">
                 <img :src="item.sheadimg" alt="">
               </div>
             </div>

            </van-tab>
            <van-tab title="销量">

              <div class="dianpu" v-for="(item,index) in arList">
                <img :src="item.shoplogo" alt="">
                <span>{{item.name}}</span>
                <p @click="jindian(item.sid)">进店</p>
                <div class="dianpu-div">
                  <img :src="item.headimg" alt="">
                  <img :src="item.sheadimg" alt="">
                </div>
              </div>

            </van-tab>
            <van-tab title="信用">内容 3</van-tab>
            <div v-show="a" class="sanjiao"><img src="../../../assets/shangjiaye_jiage.png" alt=""></div>
            <div v-show="b" class="sanjiao"><img src="../../../assets/gao.png" alt=""></div>
            <div v-show="c" class="sanjiao"><img src="../../../assets/shangjiaye_jiagedi.png" alt=""></div>
            <div v-show="aa" class="sanjiaoo"><img src="../../../assets/shangjiaye_jiage.png" alt=""></div>
            <div v-show="bb" class="sanjiaoo"><img src="../../../assets/gao.png" alt=""></div>
            <div v-show="cc" class="sanjiaoo"><img src="../../../assets/shangjiaye_jiagedi.png" alt=""></div>

          </van-tabs>
        </van-tab>


      </van-tabs>


    </div>
  </div>
</template>

<script>
  import {Tab, Tabs} from 'vant';

  export default {
    name: "sousuoxianqingye",
    data() {
      return {
        back: false,
        active: 0,
        act: 0,
        dataList: [],
        arrayList:[],
        a: true,
        b: false,
        c: false,
        aa: true,
        bb: false,
        cc: false,
        xiao:1,
        jia:1,
        arrList:[],
        arList:[],

      }
    },
    methods: {
      seek() {
        this.$router.push({
          name: "seek"
        })
      },
      fh() {
        this.$router.push({
          name: "seek"
        })
      },
      onClick(index, title) {
        var that = this
        if (index == 0) {
          that.a = true
          that.b = false
          that.c = false
          that.aa = true
          that.bb = false
          that.cc = false
          that.xiao=1
          that.jia=1
        } else if (index == 1) {
          if (that.xiao ==1){
            this.xiaoj()
            that.a = false
            that.b = false
            that.c = true
            that.xiao=2
          } else  if (that.xiao ==2){
            this.xiaos()
            that.a = false
            that.b = true
            that.c = false
            this.xiao=1

          }


        }else if (index ==2){

          if (that.jia ==1){
            this.jiagej()
            that.aa = false
            that.bb = false
            that.cc = true
            that.jia=2
          } else  if (that.jia ==2){
            this.jiages()
            that.aa = false
            that.bb = true
            that.cc = false
            this.jia=1

          }
        }
      },
      wuping(i){
        this.$router.push({
          name: "wpxq",
          query:{
            goods_id:i,
            token:3,
            dataList:this.dataList,
            arrayList:this.arrayList
          }
        })
      },
      jindian(i){
        this.$router.push({
          name: "dpxq",
        })
        window.sessionStorage.setItem("DP" ,JSON.stringify(i))
      },
      jiagej(){
        this.arrList =this.arrayList.sort((a,b)=>a.price - b.price)
      },
      jiages(){
        this.arrList =this.arrayList.sort((a,b)=>b.price - a.price)

      },
      xiaoj(){
        this.arList =this.arrayList.sort((a,b)=>a.sold - b.sold)
      },
      xiaos(){
        this.arList =this.arrayList.sort((a,b)=>b.sold - a.sold)
      },


    },
    components: {
      Tabs,
      Tab
    },
    mounted() {
      this.dataList = this.$route.query.List
      this.arrayList =this.$route.query.LIst
      this.jiagej()
      this.xiaoj()
    },
   // computed:{
   //   sortByS () {
   //     return this.arrayList.sort((a,b)=>a.price - b.price)
   //   },
   //   sortBJ () {
   //     return this.arrayList.sort((a,b)=>b.price - a.price)
   //   },
   // }
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

  .nav-top {
    width: 100%;
    height: 0.8rem;
    line-height: 1rem;
    text-align: left;
    padding: 0.2rem 0.2rem 0 0.2rem;
    background: white;
  }

  .nav-top div {
    display: inline-block;
    width: 5rem;
    height: 0.66rem;
    background: white;
    border-radius: 30px;
    margin-left: 0.2rem;
    position: relative;
    bottom: 0.05rem;
    margin-right: 0.4rem;
  }

  .nav-top div span {
    color: #777777;
    position: relative;
    font-size: 0.28rem;
    bottom: 0.15rem;
    left: 0.2rem;
  }

  .nav-top-back {
    background-image: url(../../../assets/shangjiaye_xialakuang.png);
    width: 2.9rem;
    height: 4.11rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0.4rem;
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

  .search {
    width: 5.2rem;
    height: 0.66rem;
    background: #EEEEEE !important;
    border-radius: 33px;
    position: relative;
    margin-top: 0.1rem;
  }

  .van-tab__pane {
    position: relative;
    top: 0.9rem;
  }

  .van-tab {
    height: 0.8rem !important;
  }

  .all {
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .concat {
    width: 7.5rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .concat div {
    width: 3.46rem;
    height: 5.2rem;
    border-radius: 10px;
    background: #FFFFFF;
    margin: 0.15rem 0;
    text-align: left;
  }

  .ph {
    width: 3.46rem !important;
    height: 3.46rem !important;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }

  .ph img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .concat-title {
    margin-top: 0.15rem;
    padding: 0 0.15rem;
    font-size: 0.26rem;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left;
  }

  .concat-name {
    display: inline-block;
    padding: 0 0.15rem;
    background: rgba(255, 188, 186, 1);
    font-size: 0.22rem;
    color: #EF0600;
    margin-left: 0.15rem;
    margin-top: 0.2rem;
  }

  .concat-money {
    height: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.2rem;
    color: #EF0600;
    margin-top: 0.15rem;
  }

  .concat-money span:nth-child(1) {
    line-height: 0.5rem;
    font-size: 0.36rem;
    color: #EF0600;
  }

  .concat-money span:nth-child(2) {
    color: #777777;
    font-size: 0.24rem;
    float: right;
  }

  .concat-browes {
    padding: 0 0.2rem;
    font-size: 0.2rem;
    color: #777777;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .concat-browes span {
    float: right;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .ph-rei {
    width: 0.5rem !important;
    height: 0.5rem !important;
    position: absolute;
    top: -0.15rem;
    left: 0;
    background: rgba(0, 0, 0, 0) !important;
  }

  .ph-rei span {
    position: absolute;
    top: 0;
    left: 0.05rem;
    color: white;
  }
  .sanjiao {
    position: absolute;
    top: 0.33rem;
    right: 3.3rem;
    z-index: 9999;
  }

  .sanjiao img {
    width: 0.13rem;
    height: 0.2rem;
  }

  .sanjiaoo {
    position: absolute;
    top: 0.33rem;
    right: 0.8rem;
    z-index: 9999;
  }

  .sanjiaoo img {
    width: 0.13rem;
    height: 0.2rem;
  }
  .dianpu{
    width: 6.5rem;
    height: 2.8rem;
    background: #FFFFFF;
    padding: 0.2rem;
    margin: 0 auto 0.15rem;
    position: relative;
    top: 0.15rem;
    text-align: left;
  }
  .dianpu img{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.1rem;
  }
  .dianpu span{
    font-size: 0.28rem;
    color: #333333;
    position: relative;
    bottom: 0.18rem;
    left: 0.2rem;
  }
  .dianpu p{
    font-size: 0.24rem;
    color:#EF0600 ;
    width: 0.9rem;
    height: 0.4rem;
    border: 1px solid #ef0600;
    border-radius: 0.2rem;
    float: right;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.1rem;
  }
  .dianpu div{
    margin-top: 0.1rem;
    width: 6.5rem;
    height: 2rem;
    display: flex;
    justify-content: left;
  }
  .dianpu-div img{
    width: 2rem;
    height: 2rem;
    margin: 0 0.081rem;
  }
</style>
