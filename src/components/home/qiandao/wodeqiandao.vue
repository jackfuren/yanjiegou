<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" color="#333333" name="arrow-left" size="0.5rem"/>
        <p>我的签到</p>
      </div>
      <van-tabs title-active-color="#EF0A05" v-model="active">
        <van-tab title="签到记录">
          <p class="tab-p" v-for="(item ,index) in dataList">{{item.code}} <span>{{item.add_time}}</span></p>


        </van-tab>
        <van-tab title="邀请记录">
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>
          <p class="footer-p"><span><img alt="" src="../../../assets/img/qiandaoye_beijing.png">沿街购</span>
            AXBERT361<span>2019-5-7 16:25</span></p>

        </van-tab>

      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {Tab, Tabs} from 'vant';
 import request from "../../utils/request"
  export default {
    name: "wodeqiandao",
    data() {
      return {
        active: 0,
        list: [1, 2, 3, 4, 5],
        dataList:[],
        user_id:""
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'qd',
        })
      },
      Sex(){
        //console.log(this.user_id)
        request({
          url: "api/users/mysign",
          method: "post",
          data:{
            user_id:this.$store.state.username.id
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.dataList = res.data.data
            //console.log(res)
          }

        })
      }
    },
    mounted(){
      this.Sex()

    },
    components: {
      Tab,
      Tabs
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
    line-height: 0.88rem;
    text-align: center;
    position: relative;
  }

  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: black;
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
    clear: both;
  }

  .van-tab__pane {
    position: relative;
    top: 1rem;
  }

  .tab-p {
    width: 6.9rem;
    height: 1rem;
    margin: 0 auto;
    text-align: left;
    line-height: 1rem;
    font-size: 0.24rem;
    color: #333333;
    clear: both;
  }

  .tab-p span {
    float: right;
  }

  .footer-p {
    width: 6.8rem;
    height: 1rem;
    border-radius: 45px;
    font-size: 0.24rem;
    color: black;
    line-height: 1rem;
    margin: 0 auto;
    clear: both;
  }

  .footer-p img {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: relative;
    top: 0.1rem;
    margin-right: 0.15rem;
  }

  .footer-p span:nth-child(1) {
    float: left;
  }

  .footer-p span:nth-child(2) {
    float: right;
  }
</style>
