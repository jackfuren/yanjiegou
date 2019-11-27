<template>
  <div class="box">
    <div class="concat">
      <img class="concat-img" src="../../assets/loog.png" alt="">
      <input class="input-top" type="number" oninput="if(value.length>11) value=value.slice(0,11)"  v-model="phone" @blur.prevent="changeCount()" placeholder="请输入手机号码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="password" id="input-bottom" maxlength="20"  v-model="password" placeholder="请输入密码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <p class="concat-p" v-show="show">登录</p>
      <p  v-show="show1" @click="deng()">登录</p>

      <img id="eye" v-show="eye" @click="zheng()" src="../../assets/mimakejain.png" alt="">
      <img id="eye-bottom" v-show="eyetwo" @click="bi()" src="../../assets/mimayingcang.png" alt="">
    </div>
    <div class="back"></div>
    <p @click="zhuche()" class="box-p">注册</p>
    <div @click="yan()" class="box-left">
      <img src="../../assets/yanzhengma.png" alt="">
      <p>验证码登录</p>
    </div>
    <div @click="wangji()"  class="box-right">
      <img src="../../assets/wangjimima.png" alt="">
      <p>忘记密码</p>
    </div>
    <img @click="fh()"  v-bind:class="{'nav-hide' :  hideClass}"  class="box-img" src="../../assets/left.png" alt="">
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import  request from "../utils/request"
  export default {
    name: "register",
    data() {
      return {
        eye: false,
        eyetwo: true,
        phone:"",
        password:"",
        show:true,
        show1:false,
        hideClass: false
      }
    },
    methods: {
      changeCount:function(){
        if(this.phone.length == 0){

        }else {
					const reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;

					if (reg.test(this.phone)){
                //ajax...
            request({
              url: "api/users/reg",
              method: "post",
              data: {
                mobile: this.phone,
              }
            }).then(res => {
              //consoleog(res)
              if (res.data.msg == '请传过来密码') {
                Toast('该手机号暂未注册')
              }
              // if (res.data.msg == '手机号已经存在'){
              //   this.$toast('该手机号已经注册过')
              //   this.zhen = false
              //   this.jia =true
              // }else if (res.data.msg == '请传过来密码') {
              //   this.zhen = true
              //   this.jia =false
              // }
            })
                // 添加号码失败
            }  else if (this.phone === '') {//验证输入的是否为空
                Toast('请输入手机号');
            }
            else 
               Toast('请输入正确的手机号');
        }
      },
      zheng() {
        this.eye =false
        this.eyetwo = true
        var pass=document.getElementById("input-bottom")
        pass.type="password"

      },
      bi() {
        this.eye =true
        this.eyetwo = false
        var pass=document.getElementById("input-bottom")
        pass.type="text"
      },
      yan(){
        this.$router.push({
          name:"yzm"
        })
      },
      zhuche(){
        this.$router.push({
          name:"zcyh"
        })
      },
      wangji(){
        this.$router.push({
          name:"wjmmm"
        })
      },
      fh(){
        var a =window.sessionStorage.getItem('reg')

        if (a == 4){
          this.$router.push({
            name: "My"
          })
        } else {
          this.$router.push({
            name: "home"
          })
        }

      },
      deng(){
        request({
          url: "api/users/login",
          method: "post",
          data: {
            mobile: this.phone,
            password:this.password,

          }
        }).then(res => {
         console.log(res)
          if (res.data.code == 200){
            this.$store.dispatch('UserName',res.data.data)
            // console.log(this.$store.state.username)
            this.$router.push({
              name:"My"
            })
          }
          if (res.data.code == 0){
            Toast('账号/密码不正确以及不能为空');
            //consoleog(this.$store.getters.userName)
          }

        }).catch(err=>{

        })


      }

    },
    mounted() {
    },
    updated() {
      if (this.phone  && this.password ){
         this.show =false
        this.show1=true
      } else if (!this.phone || !this.password) {
           this.show =true
        this.show1=false
      }
    }
  }
</script>

<style scoped>
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #CCCCCC;
    /* placeholder字体大小  */
    font-size:0.26rem;
  }
  .box {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
  }

  .concat {
    width: 6rem;
    height: 5.43rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 15px 32px 0px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    position: absolute;
    top: 2.44rem;
    left: 50%;
    margin-left: -3rem;
    z-index: 2;
  }

  .concat-img {
    width: 2.26rem;
    height: 2.26rem;
    position: absolute;
    top: -1.13rem;
    left: 50%;
    margin-left: -1.13rem;
  }

  .back {
    width: 5.4rem;
    height: 4.25rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 15px 32px 0px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    position: absolute;
    top: 3.7rem;
    left: 50%;
    margin-left: -2.7rem;
    z-index: 1;
  }

  .concat p {
    width: 3rem;
    height: 0.9rem;
    background: linear-gradient(0deg, rgba(239, 6, 0, 1) 0%, rgba(253, 101, 86, 1) 100%);
    box-shadow: 0px 5px 13px 0px rgba(242, 20, 0, 0.24);
    border-radius: 0.45rem;
    line-height: 0.9rem;
    font-size: 0.36rem;
    color: white;
    position: absolute;
    bottom: -0.45rem;
    left: 50%;
    margin-left: -1.5rem;
  }
 .concat-p{
   width: 3rem;
   height: 0.9rem;
   background:#CCCCCC!important;
   box-shadow: 0px 5px 13px 0px rgba(51, 51, 51, 0.24)!important;
   border-radius: 0.45rem;
   line-height: 0.9rem;
   font-size: 0.36rem;
   color: white;
   position: absolute;
   bottom: -0.45rem;
   left: 50%;
   margin-left: -1.5rem;
 }
  .box-p {
    width: 2rem;
    font-size: 0.36rem;
    color: #F00B00;
    position: absolute;
    top: 8.8rem;
    left: 50%;
    margin-left: -1rem;
  }

  .box-left img {
    width: 0.85rem;
    height: 0.85rem;
  }

  .box-left p {
    font-size: 0.24rem;
    color: #CCCCCC;
  }

  .box-left {
    position: absolute;
    top: 10.1rem;
    left: 2rem;
  }

  .box-right img {
    width: 0.85rem;
    height: 0.85rem;
  }

  .box-right p {
    font-size: 0.24rem;
    color: #CCCCCC;
  }

  .box-right {
    position: absolute;
    top: 10.1rem;
    right: 2rem;
  }

  .input-top {
    width: 5rem;
    height: 1rem;
    border: 0rem;
    text-align: center;
    font-size: 0.28rem;
    margin: 1.3rem auto 0;
  }

  #input-bottom {
    width: 5rem;
    height: 1rem;
    border: 0rem;
    text-align: center;
    font-size: 0.28rem;
    margin: 0 auto;

  }

  #eye {
    width: 0.4rem;
    height: 0.28rem;
    position: absolute;
    top: 2.65rem;
    right: 0.5rem;
    z-index: 3;
  }

  #eye-bottom {
    width: 0.35rem;
    height: 0.17rem;
    position: absolute;
    top: 2.75rem;
    right: 0.53rem;
    z-index: 3;
  }
  .box-img{
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    right: 3.2rem;
    top: 2vh;
  }
  .nav-hide {
    position: static!important;
  }
</style>
