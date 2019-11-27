<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>帮助与反馈</p>
    </div>
    <div class="concat">
      <div class="concat-a">
        <div class="concat-b">
          <div @click="kf()" class="concat-c">
            <img alt="" class="concat-top" src="../../../assets/bangzhu_kehufuwu@2x.png">
            <p>客户服务 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
          </div>
          <div class="concat-d">
            <div>订单查询</div>
            <div>配送服务</div>
            <div>发货时间</div>
            <div>账户申诉</div>
          </div>
        </div>
      </div>
      <div class="concat-a">
        <div class="concat-b">
          <div class="concat-c">
            <img alt="" class="concat-top" src="../../../assets/bangzu_dingdan.png">
            <p>问题订单 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
          </div>
          <div class="concat-d">
            <div style="height: 1.2rem;line-height: 1.2rem">问题商品</div>
            <div style="height: 1.2rem;line-height: 1.2rem">商品漏发/错发</div>

          </div>
        </div>
      </div>
      <div class="concat-a">
        <div class="concat-b">
          <div class="concat-c">
            <img alt="" class="concat-top" src="../../../assets/bangzhu_wenda.png">
            <p>我的问答 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
          </div>
          <div class="concat-d">
            <div>如何退货</div>
            <div>无订单</div>
            <div>假货投诉</div>
          </div>
        </div>
      </div>

    </div>
    <div class="footer">
      <div @click="wt()" style="margin-right: 0.3rem">
        <p><img alt="" src="../../../assets/bangzhu_fankui.png">问题反馈</p>
      </div>
      <div>
        <p @click="lianxi()"><img alt="" src="../../../assets/bangzhu_dianhua.png">联系客服</p>
      </div>
    </div>
    <meta name="format-detection" content="telephone=yes" />
  </div>
</template>

<script>
  export default {
    name: "help",
    data() {
      return {
      phone:15139020714
      }
    },
    methods: {
      kf() {
        this.$router.push({
          name: 'cus',

        })
      },
      fh() {
        this.$router.push({
          name: 'My',
        
        })
      },
      wt() {
        this.$router.push({
          name: 'iss',

        })
      },
       lianxi(){
         this.$dialog.alert({
           title: "客服电话", //加上标题
           message: this.phone, //改变弹出框的内容
           showCancelButton: true //展示取水按钮
         })
           .then(() => { //点击确认按钮后的调用
             window.location.href = 'tel://' + this.phone

           })
           .catch(() => { //点击取消按钮后的调用


           })
       }
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
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .concat {
    width: 100%;
  }

  .concat-a {
    width: 6.9rem;
    height: 1.5rem;
    background: #FFFFFF;
    border-radius: 10px;
    margin: 0 auto;
    padding-top: 0.3rem;
    margin-top: 0.4rem;
  }

  .concat-b {
    width: 6.9rem;
    height: 1.2rem;
    /*background: #777777;*/
  }

  .concat-c {
    float: left;
    box-sizing: border-box;
    width: 1.8rem;
    height: 1.2rem;
    /*//background: #EF0600;*/
  }

  .concat-d {
    float: left;
    box-sizing: border-box;
    width: 5.1rem;
    height: 1.2rem;
    /*//background: #FAB69A;*/
    border-left: 1px solid #CCCCCC;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }

  .concat-d div {
    height: 0.6rem;
    width: 33.333%;
    line-height: 0.6rem;
    font-size: 0.24rem;
    font-weight: 500;
  }

  .concat-c p {
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.15rem;
  }

  .concat-top {
    width: 0.44rem;
    height: 0.44rem;
    margin-top: 0.14rem;
  }

  .concat-right {
    width: 0.1rem;
    height: 0.18rem;
  }

  .footer {
    width: 6.9rem;

    position: fixed;
    padding-bottom: 0.4rem;
    bottom: 0;
    left: 50%;
    margin-left: -3.45rem;

  }

  .footer div {
    width: 3.3rem;
    height: 1rem;
    background: rgba(239, 6, 0, 1);
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    line-height: 1rem;
    font-size: 0.36rem;
    font-weight: 500;
    color: #FFFFFF;
  }

  .footer img {
    width: 0.44rem;
    height: 0.44rem;
    position: relative;
    top: 0.1rem;
    left: -0.2rem;
  }
</style>
