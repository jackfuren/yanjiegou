<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>收货地址</p>
      <p v-show="show2" class="nav-p" @click="onClick">设置默认</p>
      <p v-show="show3" class="nav-p" @click="onClickk">保存</p>
    </div>
    <div v-show="show">
      <div class="concat" v-for="(item,index) in dataList" :key="index">
        <p>{{item.consignee}}<span class="concat-s">{{item.phone}}</span> <span class="concat-ss"
                                                                                v-show="item.is_default == 1 ? true : false">&nbsp;默认&nbsp;</span>
        </p>
        <p>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</p>
        <img @click="bj(index)" alt="" src="../../../assets/dizhiliebiao_bianji.png">
      </div>
    </div>
    <div v-show="show1">
      <div class="concat" v-for="(item,index) in dataList" :key="index">
        <p>{{item.consignee}}<span class="concat-s">{{item.phone}}</span></p>
        <p>{{item.province}}{{item.city}}{{item.area}}{{item.address}}</p>
        <van-checkbox-group class="a" v-model="store">
          <van-checkbox
            :name="item.id"
            checked-color="#EF0600"
          >
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>

    <div v-show="show" @click="xj()" class="footer">
      <p>+ 新建收货地址</p>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request"
  import {Checkbox, CheckboxGroup} from 'vant';
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "shouhuo",
    data() {
      return {
        user_id: "",//用户编号
        dataList: "", //地址列表
        show: true,
        show1: false,
        show2: true,
        show3: false,
        store: [],
        cart_id:[],
        total_amount:"",
        selected_products:'',
        token:""

      }
    },
    methods: {
      fh() {
         var tokrnn = window.sessionStorage.getItem("lijitoken")
        var list = JSON.parse(window.sessionStorage.getItem("llll"))

        if ( tokrnn  == 1) {
          this.$router.push({
            name: 'js',
            query:{
              cart_id:list.A,
              total_amount:list.B,
              selected_products:list.C,
              token:list.D,
              id:list.E,
              idd:list.F
            }
          })
        } else if (tokrnn == 2) {
          this.$router.push({
            name: 'set',
          })
        }




      },
      xj() {
        this.$router.push({
          name: 'xj',
        })
      },
      bj(i) {
        this.$router.push({
          name: 'bj',
          params: {
            arrList: this.dataList[i],
            id: this.dataList[i].id
          }
        })
      },
      onClick() {
        this.show = !this.show
        this.show1 = !this.show1
        this.show2 = !this.show2
        this.show3 = !this.show3
        this.store=[]

      },
      onClickk() {

        if (this.store.length > 1) {
          Toast("默认地址最多一个")
        } else {
          request({
            url: "api/users/setdefaultaddr",
            method: "post",
            data: {
              user_id: this.$store.state.username.id,
              addrid: this.store.join(',')
            }
          }).then(res => {
            this.Next()
          })

          this.show = !this.show
          this.show1 = !this.show1
          this.show2 = !this.show2
          this.show3 = !this.show3

        }

      },
      Next() {
        request({
          url: "api/users/addrlist",
          method: "post",
          data: {
            user_id: this.user_id
          }
        }).then(res => {
          this.dataList = res.data.data
        })
      }
    },
    mounted() {
      this.user_id = this.$store.state.username.id
      this.Next()
      this.cart_id =this.$route.query.cart_id
      this.total_amount =this.$route.query.total_amount
      this.selected_products =this.$route.query.selected_products
      this.token =this.$route.query.token

    },
    components: {
      Checkbox,
      CheckboxGroup
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
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

  .nav-p {
    position: absolute;
    color: #777777 !important;
    font-size: 0.24rem !important;
    top: 0rem;
    right: 0.3rem;
  }

  .concat {
    width: 6.9rem;
    height: 1.59rem;
    margin: 0 auto;
    position: relative;
    border-bottom: 1px solid #F7F7F7;
  }

  .concat p:nth-child(1) {
    width: 100%;
    height: 0.79rem;
    line-height: 0.79rem;
    font-size: 0.3rem;
    text-align: left;
  }

  .concat-s {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    opacity: 0.68;
    margin-left: 0.2rem;
  }

  .concat-ss {
    display: inline;
    width: 0.8rem;
    height: 0.3rem;
    border-radius: 10px;
    background: #EF0600;
    color: white;
    font-size: 12px;
  }

  .concat p:nth-child(2) {
    width: 5.78rem;
    font-size: 0.24rem;
    text-align: left;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    opacity: 0.68;
  }

  .concat img {
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -0.22rem;
  }

  .a {
    position: absolute;
    top: 0.5rem;
    right: 0.2rem;
  }

  .footer {
    position: fixed;
    width: 5.5rem;
    bottom: 0.38rem;
    left: 50%;
    margin-left: -2.75rem;

  }

  .footer p {
    width: 5.5rem;
    height: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 0.36rem;
    background: #EF0600;
    line-height: 0.9rem;
    border-radius: 10px;
  }
</style>
