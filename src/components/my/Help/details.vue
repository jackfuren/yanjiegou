<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>帮助详情</p>
    </div>
    <div class="concat">
      <div class="concat-a">
        <p>沿街购相关介绍</p>
        <p>描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，
          请联系客服，谢谢！描述您遇到的相关问题（必填15-50)
          描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，
          请联系客服，谢谢！描述您遇到的相关问题（必填15-50)
          描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，
          请联系客服，谢谢！描述您遇到的相关问题（必填15-50)描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，
          请联系客服，谢谢！描述您遇到的相关问题（必填15-50)描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，
          请联系客服，谢谢！描述您遇到的相关问题（必填15-50)
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "details",
    data() {
      return {}
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'cus',

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

    margin-top: 0.4rem;
  }

  .concat-a {
    width: 6.9rem;
    height: 100%;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 10px;
  }

  .concat-a p:nth-child(1) {
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    font-size: 0.36rem;
    font-weight: 500;
    border-bottom: 1px solid #F7F7F7;
    text-indent: 15px;
  }

  .concat-a p:nth-child(2) {
    font-size: 0.24rem;
    font-weight: 500;
    text-align: left;
    text-indent: 20px;
    margin-top: 0.27rem;
  }

</style>
