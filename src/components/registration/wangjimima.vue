<template>
  <div class="box">
    <div class="concat">
      <img class="concat-img" src="../../assets/loog.png" alt="">
      <input class="input-top" type="tel" oninput="if(value.length>11) value=value.slice(0,11)" v-model="phone" placeholder="请输入手机号码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="number" id="input-bottom" v-model="code" placeholder="请输入验证码">
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="password" class="input-bottom" maxlength="20" id="input-botto" v-model="password" placeholder="请输入密码(6-12字母数字组合)">

      <div style="width: 5rem;height:1px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="password" class="input-bottom" maxlength="20" id="input-bott" v-model="password_confirm"  placeholder="请确认密码(6-12字母数字组合)">

      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <p v-show="show1" class="concat-p" @click="aff()">确认</p>
      <p v-show="show" class="concat-pp" >确认</p>
      <button type="button" :disabled="disabled"  @click="fasong()" id="concat-p">{{value}}</button>
      <img id="eye" v-show="eye" @click="zheng()" src="../../assets/mimakejain.png" alt="">
      <img id="eye-bottom" v-show="eyetwo" @click="bi()" src="../../assets/mimayingcang.png" alt="">
      <img id="eyee" v-show="eyee" @click="zhengg()" src="../../assets/mimakejain.png" alt="">
      <img id="eye-bottomm" v-show="eyetwoo" @click="bii()" src="../../assets/mimayingcang.png" alt="">
    </div>
    <div class="back"></div>
    <img @click="fh()" class="box-img" src="../../assets/left.png" alt="">

  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import  request from "../utils/request"
  export default {
    name: "wangjimima",
    data() {
      return {
        value:"发送",
        disabled:false,
        time:0,
        phone:"",
        code:"",
        password:"",
        password_confirm:"",
        eye: false,
        eyetwo: true,
        eyee: false,
        eyetwoo: true,
        show:true,
        show1:false,
      }
    },
    methods: {
      zheng() {
        this.eye =false
        this.eyetwo = true
        var pass=document.getElementById("input-botto")
        pass.type="password"

      },
      bi() {
        this.eye =true
        this.eyetwo = false
        var pass=document.getElementById("input-botto")
        pass.type="text"
      },
      zhengg() {
        this.eyee =false
        this.eyetwoo = true
        var pass=document.getElementById("input-bott")
        pass.type="password"

      },
      bii() {
        this.eyee =true
        this.eyetwoo = false
        var pass=document.getElementById("input-bott")
        pass.type="text"
      },
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
      fh(){
        this.$router.push({
          name:"regi"
        })
      },
      fasong(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
        if(this.phone==''){
          Toast('请输入手机号码');

        }else if(!reg.test(this.phone)){
          Toast('手机格式不正确');
        }else{
          this.time=60;
          this.disabled=true;
          this.timer();
          request({
            url: "api/users/sendsms",
            method: "post",
            data: {
              mobile: this.phone
            }
          }).then(res => {
           //console.log(res)
          })
        }
      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.value=this.time+"s"
          //+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.value="重发";
          this.disabled=false;
        }
      },
      aff(){
        if (this.password == this.password_confirm){
          request({
            url: "api/users/find",
            method: "post",
            data: {
              mobile: this.phone,
              password:this.password,
              password_confirm:this.password_confirm,
              code:this.code
            }
          }).then(res => {
            if (res.data.code == 200){
              this.$router.push({
                name:"regi"
              })
            }

          })
        } else {
          Toast('两次密码不一致')
        }


      }
    },
    updated() {
      if (this.phone  && this.code && this.password &&this.password_confirm){
        this.show =false
        this.show1=true
      } else if (!this.phone || !this.code || this.password || this.password_confirm) {
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
    height: 7.7rem;
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
    top: 6rem;
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


  .box-left img {
    width: 0.85rem;
    height: 0.85rem;
  }

  .box-left p {
    font-size: 0.24rem;
    color: #CCCCCC;
  }


  .box-right img {
    width: 0.85rem;
    height: 0.85rem;
  }

  .box-right p {
    font-size: 0.24rem;
    color: #CCCCCC;
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
  .input-bottom {
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
  #eye {
    width: 0.4rem;
    height: 0.28rem;
    position: absolute;
    top: 3.7rem;
    right: 0.5rem;
    z-index: 3;
  }

  #eye-bottom {
    width: 0.35rem;
    height: 0.17rem;
    position: absolute;
    top: 3.77rem;
    right: 0.53rem;
    z-index: 3;
  }
  #eyee {
    width: 0.4rem;
    height: 0.28rem;
    position: absolute;
    top: 4.7rem;
    right: 0.5rem;
    z-index: 3;
  }

  #eye-bottomm {
    width: 0.35rem;
    height: 0.17rem;
    position: absolute;
    top: 4.77rem;
    right: 0.53rem;
    z-index: 3;
  }
</style>
