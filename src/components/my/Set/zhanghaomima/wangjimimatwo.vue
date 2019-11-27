<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>忘记密码</p>
      </div>
      <div class="concat">
        <input   v-model="value" class="concat-one" type="text" placeholder="设置新密码">
           <p  class="concat-p">6-20位字母、数字两种组合</p>
        <p  v-show="one"  class="footer">确认</p>
        <p  @click="next()"  v-show="two"  class="footerr">确认</p>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../../utils/request"
  export default {
    name: "wangjimimatwo",
    data(){
      return{
        value:[],
        one:true,
        two:false
      }
    },
    methods:{
      fh(){
        this.$router.push({
          name: "zh"

        })
      },
      dataNumber(){
        if (this.value.length  >5   &&  this.value.length  < 21){
          this.one =false
          this.two =true
        } else {
          this.one =true
          this.two =false
        }
      },
      next(){
           var a = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        if (a.test(this.value)) {
             //console.log(1111)
        }else {
          //console.log(222222)
        }
      }
    },
    updated() {
      this.dataNumber()
    },
    mounted() {
      this.phone = this.$store.state.username.mobile
      this.user_id =this.$store.state.username.id
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #CCCCCC;
    /* placeholder字体大小  */
    font-size:0.26rem;
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
    color: #DDDDDD;
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
    font-size: 0.28rem;
    color: #EF0600;
    border-left: 1px solid #E7E7E7;
    text-indent: 0.2rem;
    margin-top: 0.3rem;
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
  .concat-p{
    font-size: 0.24rem;
    color: #999999;
    text-align: left;
  }
</style>
