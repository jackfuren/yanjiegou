<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>修改手机号</p>
      </div>
      <div class="concat">
        <input   v-model="phone" class="concat-one" type="number" placeholder="请输入常用手机号">
        <div class="input">
          <input  type="number" v-model="code"  placeholder="短信验证码">
          <p @click="fasong()">{{value}}</p>
        </div>
        <p  v-show="one"  class="footer">确认</p>
        <p  @click="next()"  v-show="two"  class="footerr">确认</p>
      </div>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import request from  "../../../utils/request"
    export default {
        name: "xiugaiphonetwo",
      data(){
          return{
           value:"发送",
            phone:"", //新手机号
            one:true,
            two:false,
           //value:"发送",
            time: 0,
            disabled: false,
            user_id:"", //用户编码
            code:"" //短信验证码

          }
      },
      methods:{
          fh(){
            this.$router.push({
              name: "zh"

            })
          },
        dataNumber(){


          if (this.code.length == 4  &&  this.phone.length == 11){
            this.one =false
            this.two =true
          } else {
            this.one =true
            this.two =false
          }
        },
        fasong() {
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


        next(){
          let phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          if (phone.test(this.phone)) {
            request({
              url: "api/users/upd_mobile1",
              method: "post",
              data: {
                id:this.user_id,
                mobile: this.phone,
                code:this.code
              }
            }).then(res => {
              if (res.data.code == 200){
                Toast("手机号修改成功")
              }
              if (res.data.code == 0){
                Toast("验证码错误")
              }
            })

          } else {
            Toast('请输入正确的手机号');
            this.phone = ''
          }



        }
      },
      updated() {
        this.dataNumber()
      },
      mounted() {
          this.user_id =this.$store.state.username.id
      }
    }
</script>

<style scoped>
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #CCCCCC;
    /* placeholder字体大小  */
    font-size:0.30rem;
  }


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
    background: white;
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
    position: relative;
    border-bottom: 1px solid #F7F7F7;
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
  .concat{
    width: 6.9rem;
    margin: 0.5rem auto;
  }
  .concat-one {
    width: 6.9rem;
    height: 0.9rem;
    font-size: 0.3rem;
    color: black;
   border: 0;
  }
  .input{
    width: 6.9rem;
    height: 1rem;
    border-top:1px solid #E7E7E7 ;
    border-bottom: 1px solid #E7E7E7;
    text-align: left;
    clear: both;
  }
  .input input{
    width: 3.85rem;
    height: 1rem;
    border: 0;
    font-size: 0.3rem;
    color: black;
  }
  .input p{
    float: right;
    width: 1.3rem;

    display: inline-block;
    text-align: center;
    font-size: 0.28rem;
    color: #EF0600;
    border-left: 1px solid #E7E7E7;
    margin-top: 0.3rem;
    z-index: 9999999;
  }
  .footer{
    width: 6.9rem;
    height: 1rem;
    border-radius: 50px;
    margin:  0.9rem auto;
    background: #DDDDDD;
    color: white;
    font-size: 0.36rem;
    line-height: 1rem;
  }
  .footerr{
    width: 6.9rem;
    height: 1rem;
    border-radius: 50px;
    margin:  0.9rem auto;
    background: #EF0600;
    color: white;
    font-size: 0.36rem;
    line-height: 1rem;
  }
</style>
