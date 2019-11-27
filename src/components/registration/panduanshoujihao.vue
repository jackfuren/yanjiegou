<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>注册</p>
    </div>
    <p class="box-p">手机号{{phone}}已经注册</p>
    <p class="box-pp" @click="register()">直接登录</p>
    <p id="box-ppp" @click="login()">使用其他手机号，继续注册</p>
  </div>
</template>

<script>
    export default {
        name: "panduanshoujihao",
      data(){
            return {
              phone:"",
              arr:[]
            }
      },
      methods:{
          fh(){
            this.$router.push({
              name:"regi"
            })
          },
        register(){
          this.$router.push({
            name:"regi"
          })
        },
        login(){
          this.$router.push({
            name:"zcyh"
          })
        }
      },
      mounted() {
          this.phone = this.$store.state.username.mobile

      }
    }
</script>

<style scoped>
  .box {
    width: 100%;
    min-height: 100vh;
    background: white;
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
  .box-p{
    font-size: 0.3rem;
    color: #333333;
    margin-top: 1.3rem;
  }
  .box-pp{
    width:6.9rem;
    height:0.98rem;
    background:linear-gradient(0deg,rgba(239,6,0,1) 0%,rgba(255,72,0,1) 100%);
    border-radius:0.49rem;
    color: white;
    font-size: 0.36rem;
   line-height: 0.98rem;
    margin: 1.2rem auto 0.4rem;
  }
  #box-ppp{
    width:6.9rem;
    height:0.95rem;
    border-radius:0.49rem;
    border: 1px solid #EF0600;
    color: #EF0600;
    line-height: 0.95rem;
    margin: 0.1rem auto;
    font-size: 0.36rem;
  }
</style>
