<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>设置</p>
    </div>
    <div class="concat">
      <p @click="pim()">个人信息
        <van-icon size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow"/>
      </p>
      <p @click="shouhuo()">收货地址与信息
        <van-icon size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow"/>
      </p>
      <p @click="zhanghao()">账号设置
        <van-icon @click="zhanghao()" size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow"/>
      </p>
      <p @click="about()">关于我们
        <van-icon size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow"/>
      </p>
    </div>
    <p @click="tuichu()" class="box-p">退出登录</p>
  </div>
</template>

<script>
  export default {
    name: "set",
    data() {
      return {}
    },
    methods: {
      fh() {
        this.$router.push({
          name: "My"
        })
      },
			about(){
				this.$router.push({
				  name: "our"
				})
			},
      pim() {
        this.$router.push({
          name: "pim"
        })
      },
      shouhuo() {
        window.sessionStorage.setItem("lijitoken" ,JSON.stringify(2))
        this.$router.push({
          name: "sho"
        })
      },
      zhanghao() {
        this.$router.push({
          name: "zh"
        })
      },
      tuichu() {
        this.$store.dispatch('Quit',)
        this.$router.push({
          name: "home"
        })

      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
    background: #FFFFFF;
    position: relative;
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
    width: 6.9rem;
    padding: 0 0.3rem;
  }

  .concat p {
    width: 6.9rem;
    height: 1rem;
    line-height: 1rem;
    text-align: left;
    font-size: 0.3rem;
    border-bottom: 1px solid #F7F7F7;
  }

  .box-p {
    width: 6.9rem;
    height: 0.98rem;
    background: linear-gradient(0deg, rgba(239, 6, 0, 1) 0%, rgba(255, 72, 0, 1) 100%);
    border-radius: 0.5rem;
    position: fixed;
    bottom: 0.8rem;
    left: 50%;
    margin-left: -3.45rem;
    font-size: 0.36rem;
    color: white;
    line-height: 0.98rem;
  }
</style>
