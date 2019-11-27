<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>客户服务</p>
    </div>
    <div class="concat">
      <p @click="xq()">订单查询相关问题 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
      <p @click="xq()">订单查询相关问题 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
      <p @click="xq()">订单查询相关问题 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
      <p @click="xq()">订单查询相关问题 <img alt="" class="concat-right" src="../../../assets/banzhu_xiangqing.png"></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "customer",
    data() {
      return {}
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'Help',

        })
      },
      xq() {
        this.$router.push({
          name: 'det',

        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    background: #F7F7F7;
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

  .concat {
    width: 100%;
  }

  .concat p {
    width: 6.9rem;
    height: 0.9rem;
    border-bottom: 1px solid #F7F7F7;
    margin: 0 auto;
    font-size: 0.3rem;
    font-weight: 500;
    color: #333333;
    line-height: 0.9rem;
    text-align: left;
  }

  .concat-right {
    float: right;
    position: relative;
    top: 0.35rem;
    width: 0.1rem;
    height: 0.18rem;
  }
</style>
