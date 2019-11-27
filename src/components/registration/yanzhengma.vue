<template>
  <div class="box">
    <div class="concat">
      <img class="concat-img" src="../../assets/loog.png" alt="">
      <input class="input-top" v-model="phone" oninput="if(value.length>11) value=value.slice(0,11)" type="number" placeholder="请输入手机号码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="number" id="input-bottom" v-model="code" placeholder="请输入验证码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <p v-show="show1" class="concat-p" @click="denglu()">登录</p>
      <p v-show="show" class="concat-pp" >登录</p>
      <button type="button" :disabled="disabled" @click="fasong()" id="concat-p">{{value}}</button>
    </div>
    <div class="back"></div>
    <p @click="zhuche()"  class="box-p">注册</p>
    <div @click="yan()" class="box-left">
      <img src="../../assets/yanzhengma.png" alt="">
      <p>密码登录</p>
    </div>
    <div></div>
    <div @click="wangji()" class="box-right">
      <img src="../../assets/wangjimima.png" alt="">
      <p>忘记密码</p>
    </div>
    <img @click="fh()" class="box-img" src="../../assets/left.png" alt="">
  </div>

</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import  request from "../utils/request"
  export default {
    name: "yanzhengma",
    data() {
      return {
        value:"发送",
        disabled: false,
        phone:"",
        code:"",
        show:true,
        show1:false,
      }
    },
    methods: {

      yan(){
        this.$router.push({
          name:"regi"
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
    fasong() {

    var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
    if (this.phone == '') {
      Toast('请输入手机号码');

    } else if (!reg.test(this.phone)) {
      Toast('手机格式不正确');
    } else {
      this.time = 60;
      this.disabled = true;
      this.timer();
      request({
        url: "api/users/sendsms",
        method: "post",
        data: {
          mobile: this.phone,
        }
      }).then(res => {
        //console.log(res)
      })

    }
  },
  timer() {
    if (this.time > 0) {
      this.time--;
      this.value = this.time + "s"
      //+"s后重新获取";
      setTimeout(this.timer, 1000);
    } else {
      this.time = 0;
      this.value = "重发";
      this.disabled = false;
    }
  },
  denglu(){
    request({
      url: "api/users/yzmlogin",
      method: "post",
      data: {
        mobile: this.phone,
        code:this.code
      }
    }).then(res => {

      if (res.data.code == 200){
        this.$store.dispatch('UserName',res.data.data)
        this.$router.push({
          name:"My"
        })

      }
      if (res.data.code == 0){
        Toast('账号/验证码不正确以及不能为空');
        //consoleog(this.$store.getters.userName)
      }
    })
  }
    },
    updated() {
      if (this.phone  && this.code ){
        this.show =false
        this.show1=true
      } else if (!this.phone || !this.code) {
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

  .concat-p {
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
 .concat-pp{
   width: 3rem;
   height: 0.9rem;
   background: #CCCCCC!important;
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

  #concat-p{
    width: 0.98rem;
    height: 0.4rem;
    background: white;
    border:1px solid rgba(240,16,11,1);
    border-radius:20px;
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #F72500;
    position: absolute;
    top: 2.6rem;
    right: 0.5rem;
  }
  .box-img{
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    right: 3.2rem;
    top: 2vh;
  }
</style>
