<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.45rem"/>
        <p>优惠券</p>
      </div>
      <van-tabs v-model="active">
        <van-tab title="商家优惠券">
          <div class="top">
<!--            <p v-show="useList.length ==0 ? false:true">待使用</p>-->
            <div class="top-concat">
              <div v-for="(item,index) in dataList" :key="index">
                <div class="top-concat-divv">
                  <img :src="item.shoplogo" alt="">
                  <span>{{item.sname}}</span>
                </div>
                <div class="top-concat-bottomm" v-show="ite.is_expire == 0 ? true:false" v-for="(ite ,index) in item.coupons" :key="index">
                   <div class="top-concat-bottom-div">
                        <span>￥</span> <span>{{ite.sub_price}}</span> <span>{{ite.name}}</span>
                  </div>
                   <span class="top-concat-bottom-p">{{ite.begin_time}}--{{ite.end_time}}</span>
                   <span class="top-concat-bottom-span">待使用</span>
                    <div v-show="ite.special == 0 ? false :true" class="top-concat-bottom-riqii">
                      <span >{{ite.special}}</span>
                    </div>
                </div>
                <div class="top-concat-bottom"  v-show="ite.is_expire == 1 ? true:false" v-for="(ite ,index) in item.coupons" :key="index">
                  <div class="top-concat-bottom-div">
                    <span>￥</span> <span>{{ite.sub_price}}</span> <span>{{ite.name}}</span>
                  </div>
                  <span class="top-concat-bottom-p">{{ite.begin_time}}--{{ite.end_time}}</span>
                  <span class="top-concat-bottom-span">已失效</span>
                  <div v-show="ite.special == 0 ? false :true" class="top-concat-bottom-riqi">
                    <span>{{ite.special}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="平台优惠券">
          <div style="padding-top: 0.2rem">
            <div class="top-concat-bottomm" v-for="(item,index) in terraceList" :key="index">
              <div class="top-concat-bottom-div">
                <span>￥</span> <span>{{item.sub_price}}</span> <span>{{item.name}}</span>
              </div>
              <span class="top-concat-bottom-p">{{item.begin_time}}-{{item.end_time}}</span>
              <span class="top-concat-bottom-span">待使用</span>
              <div class="top-concat-bottom-riqii">
                <span>5.16</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {Tab, Tabs} from 'vant';
  import request from  "../../utils/request"
  export default {
    name: "youhuijian",
    data() {
      return {
        active: 0,
        user_id:"",
        //unusedList:[], //未使用优惠券
        //useList:[],//已使用优惠券
        terraceList:[] ,//平台优惠券
        dataList:[]
      }
    },
    methods:{
      fh(){
        this.$router.push({
          name:"My"
        })
      }
    },
    components: {
      Tab,
      Tabs
    },
    mounted() {

      request({
        url: "api/coupon/mycoupon",
        method: "post",
          data:{
            user_id:this.$store.state.username.id,
            type_id:2//商家和平台卷的区分
          }
      }).then(res => {
        //console.log(res)
        this.dataList =res.data.data
        //console.log(this.dataList)
      })
      request({
        url: "api/coupon/mycoupon",
        method: "post",
        data:{
          user_id:this.$store.state.username.id,
          type_id:1
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == 200){
					console.log(res.data.data)
          this.terraceList = res.data.data

        }

      })



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

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: fixed;
    border-bottom: 1px solid #F7F7F7;
    top: 0rem;
    z-index: 8888;
  }

  .nav p {
    font-size: 0.36rem;

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
  }

  .van-tab__pane {
    position: relative;
    top: 0.9rem;
  }
 /deep/ .van-tabs__wrap{
   position: fixed;
    top:0.78rem!important;
   z-index: 8888;
  }
  .top {
    width: 7.5rem;

  }
  .top p{
    font-size: 0.3rem;
    width: 6.9rem;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: left;
    padding: 0 0.3rem;
  }
  .top p span{
    float: right;
    font-size: 0.2rem;
  }
  .top-concat {
    width: 7.5rem;
    min-height: 2.7rem;
    background: white;
    padding-bottom: 0.2rem;
  }
  .top-concat-div{
    width: 6.5rem;
    height: 0.8rem;
    padding: 0.2rem 0.5rem;
    text-align: left;
  }
  .top-concat-divv{
    width: 6.5rem;
    height: 0.8rem;
    padding: 0.2rem 0.5rem;
    text-align: left;
  }
  .top-concat-div img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 52%;
  }

  .top-concat-divv img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 52%;
  }
  .top-concat-div span{
    font-size: 0.3rem;
    position: relative;
    bottom: 0.3rem;
    left: 0.2rem;
  }
  .top-concat-divv span{
    font-size: 0.3rem;
    position: relative;
    bottom: 0.3rem;
    left: 0.2rem;
  }
  .top-concat-bottom{
    background-image: url(../../../assets/youhuiquanyilingquu.png);
    width: 6.9rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    color: #CCCCCC;
    text-align: left;
    position: relative;
    margin-bottom: 0.2rem;
  }
  .top-concat-bottomm{
    background-image: url(../../../assets/youhuioquan.png);
    width: 6.9rem;
    height: 1.5rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    color: #F6B37F;
    text-align: left;
    position: relative;
    margin-bottom: 0.2rem;
  }
  .top-concat-bottom-div{
    font-size: 0.24rem;
    height: 1.1rem;
    line-height: 1.1rem;
    margin-left: 0.3rem;
  }
 .top-concat-bottom-div span:nth-child(1){
    color: black;
   position: relative;
   bottom: 0.2rem;
 }
  .top-concat-bottom-div span:nth-child(2){
    font-size: 0.4rem;
    color: black;
    font-weight: 600;
  }
  .top-concat-bottom-div span:nth-child(3){
    margin-left: 0.15rem;
  }
  .top-concat-bottom-p{
   margin-left: 0.3rem;
    font-size: 0.24rem;
  }
  .top-concat-bottom-span{
    position: absolute;
    font-size: 0.3rem;
    right: 0.5rem;
    bottom: 0.59rem;
  }
  .top-concat-bottom-riqi{
    background-image: url(../../../assets/hui.png);
    width: 0.82rem;
    height: 0.82rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .top-concat-bottom-riqii{
    background-image: url(../../../assets/hong.png);
    width: 0.82rem;
    height: 0.82rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .top-concat-bottom-riqi span{
    font-size: 0.22rem;
    color:#FFFFFF ;
    position: absolute;
    top: 0.15rem;
    left: 0.4rem;
    -ms-transform:rotate(45deg); /* IE 9 */
    -moz-transform:rotate(45deg); /* Firefox */
    -webkit-transform:rotate(45deg); /* Safari and Chrome */
    -o-transform:rotate(45deg); /* Opera */
    transform:rotate(45deg);
  }
  .top-concat-bottom-riqii span{
    font-size: 0.22rem;
    color:#FFFFFF ;
    position: absolute;
    top: 0.15rem;
    left: 0.3rem;
    -ms-transform:rotate(45deg); /* IE 9 */
    -moz-transform:rotate(45deg); /* Firefox */
    -webkit-transform:rotate(45deg); /* Safari and Chrome */
    -o-transform:rotate(45deg); /* Opera */
    transform:rotate(45deg);
  }
</style>
