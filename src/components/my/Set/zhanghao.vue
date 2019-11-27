<template>
  <div class="box">
    <div class="box-container">
      <div class="nav" @click="fh()">
        <van-icon  class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>账号设置</p>
      </div>
      <div class="concat">
        <p @click="phone()">修改绑定手机号 <van-icon  size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow" /></p>
        <p @click="password()">修改密码 <van-icon  size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow" /></p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "zhanghao",
      data(){
          return{

          }
      },
      methods:{
          fh(){
            this.$router.push({
              name:"set"
            })
          },
        password(){
          this.$router.push({
            name:"wjmm"
          })
        },
        phone(){
          this.$router.push({
            name:"xgp"
          })
        }
      }
    }
</script>

<style  scoped>
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
    padding: 0 0.3rem;
  }
  .concat p{
    width: 6.9rem;
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    font-size: 0.3rem;
    border-bottom: 1px solid #F7F7F7;
  }
</style>
