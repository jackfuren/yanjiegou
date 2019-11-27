<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" name="arrow-left" size="0.45rem" style="margin-top: 0.2rem;margin-left: 0.15rem"/>
        <div class="nav-div">
          <div :style=" show == 1? backg :backgg " @click="show=1">商品</div>
          <div :style=" show == 2? backg :backgg " @click="show=2">店铺</div>
        </div>
        <span @click="guan()" v-show="guang"  style="font-size: 0.24rem;color: #777777;margin-right: 0.12rem">管理</span>
        <span @click="guan()"  v-show="wan"   style="font-size: 0.24rem;color: #777777;z-index: 9999999;margin-right: 0.12rem">完成</span>
      </div>

      <div v-show="show == 1 ? true : false" class="footer">
        <div class="footer-div" v-for="(item,index) in commodity" :key="index">
          <div>
            <van-checkbox-group v-show="checkbox" v-model="result">
              <van-checkbox
                :name="item.goods_id"
                checked-color="#EF0600"
              >
              </van-checkbox>
            </van-checkbox-group>

            <img :src="item.headimg" alt="">

          </div>
          <p class="footer-p">{{item.title}}</p>
          <p class="footer-pp">￥{{item.price}}</p>
        </div>

      </div>


      <div v-show="show == 2 ? true : false" class="footer">
        <div class="footer-right" v-for="(item ,index) in storee" :key="index">
          <van-checkbox-group class="a" v-show="checkboxx" v-model="store">
            <van-checkbox
              :name="item.shop_id"
              checked-color="#EF0600"
            >
            </van-checkbox>
          </van-checkbox-group>
          <img :src="item.shoplogo" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>


      <div v-show="dele" class="shanchu">
           <p @click="delet()">删除</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Checkbox, CheckboxGroup} from 'vant';
  import Vue from 'vue'
  import { Toast } from 'vant';
  Vue.use(Toast);
import request from "../../utils/request"
  export default {
    name: "shangpin",
    data() {
      return {
        show: 1,
        backg: {color: "#EF0600", 'border-bottom': '1px solid #EF0600'},
        backgg: {},
        lis:[
          {name:"墨染纪",id:1},
          {name:"老北京布鞋",id:2},
          {name:"丹尼斯",id:3},
          {name:"国美",id:4},
          {name:"苏泊尔",id:5},
          {name:"格力",id:6}
        ],
        result: [],//删除商品id
        store:[],//删除店铺id
        checkbox:false, //商品按留
        checkboxx:false,//店铺按留
        dele:false,
        guang:true,
        wan:false,
        commodity:[], //商品列表
        storee:[], //店铺列表
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: "My"
        })
      },
      guan(){
        this.checkbox = !this.checkbox
        this.dele = ! this.dele
        this.guang = !this.guang
        this.wan = ! this.wan
        this.checkboxx =!this.checkboxx
      },
      delet(){
        //console.log(this.show)
        if (this.show == 1){
          request({
            url: "api/users/delcgoods",
            method: "post",
            data:{
              user_id:this.$store.getters.userName.id,
              goods_id:this.result.join(",")
            }
          }).then(res => {
            if (res.data.code == 200){
              Toast('删除成功');
              //console.log(111111)
              this.shopping()
            }
            if (res.data.code == 0){
              Toast('删除失败');
            }
          })

        }
        if (this.show == 2){
          request({
            url: "api/users/delcshop",
            method: "post",
            data:{
              user_id:this.$store.getters.userName.id,
              shop_id:this.store.join(",")
            }
          }).then(res => {
            if (res.data.code == 200){
              Toast('删除成功');
             this.stor()
            }
            if (res.data.code == 0){
              Toast('删除失败');
            }
          })

        }

      },
      shopping(){
        request({
          url: "api/users/mycollectiongoods",
          method: "post",
          data:{
            user_id:this.$store.getters.userName.id,
          }
        }).then(res => {
          if (res.data.code == 200){
            this.commodity =res.data.data
            //console.log(this.commodity)
          }
        })
      },
      stor(){
        request({
          url: "api/users/mycollectionshop",
          method: "post",
          data:{
            user_id:this.$store.getters.userName.id,
          }
        }).then(res => {
          if (res.data.code == 200){
            this.storee =res.data.data
          }
        })
      }
    },
    components:{
      Checkbox,
      CheckboxGroup
    },
    mounted() {
       this.show = this.$route.query.id
      this.shopping()
      this.stor()

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
    width: 7.3rem;
    height: 0.88rem;
    padding-right: 0.2rem;
    line-height: 0.88rem;
    text-align: left;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 9999;
    background: white;
  }

  .nav-div {
    width: 3.5rem;
    height: 0.87rem;
    line-height: 0.87rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    z-index: 99999999999;
  }

  .nav-div div {
    // width: 0.6rem;
    height: 0.87rem;
    line-height: 0.87rem;
    font-size: 0.3rem;
  }

  .footer {
    width: 6.9rem;
    padding: 0.25rem 0.3rem;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 0.7rem;
  }

  .footer-div {
    width: 2.26rem;
    height: 3.06rem;
    background: white;
    border-radius: 10px;
    margin: 0.1rem 0.02rem;
  }

  .footer-div div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 2.26rem;
    height: 2.26rem;
    position: relative;
  }

  .footer-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
  /deep/ .van-checkbox__icon .van-icon{
   border: 1px solid #777777;
    width: 0.34rem;
    height: 0.34rem;
    line-height: 0.34rem;
    font-size: 0.24rem;
    position: relative;
    top: 0.09rem;
  }

  .footer-p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 0.24rem;
    text-align: left;
    width: 2.2rem;
    text-indent: 0.1rem;
  }

  .footer-pp {
    font-size: 0.24rem;
    color: #EF0600;
    text-align: left;
    text-indent: 0.1rem;
    margin-top: 0.07rem;
  }

  .footer-right {
    width: 6.9rem;
    height: 1.41rem;
    line-height: 1.41rem;
   // padding: 0 0.4rem;
    border-bottom: 1px solid #EEEEEE;
    text-align: left;
    position: relative;
  }

  .footer-right img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-top: 0.2rem;
  }

  .footer-right span {
    font-size: 0.36rem;
    position: relative;
    top: -0.29rem;
    left: 0.3rem;
  }
  /deep/ .van-checkbox-group {
    position: absolute!important;
    top: -0.85rem;
    right: -0.8rem;
  }

  .shanchu{
    width: 7.5rem;
    height: 1rem;
    background: white;
    position: fixed;
    bottom: 0;
  }
  .shanchu p{
    width:5.5rem;
    height:0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    margin:  0.1rem auto;
    background:rgba(239,6,0,1);
    border-radius:10px;
    color: white;
  }
  .a{
    position: absolute;
    top: 0;
    left: -0.15rem;
  }
</style>
