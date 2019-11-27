<template>
  <div class="nav-tj">
    <div class="nav-tj-top"><span>为你推荐</span></div>
    <div class="nav-tj-bottom">
      <div class="nav-tj-bottom-div" v-for="(item , index ) in listData" :key="index" @click="xq(item.id)">
        <div class="nav-tj-bottom-div-div-img">
          <img alt="" class="nav-tj-bottom-div-img" :src="item.headimg">
        </div>
        <p class="nav-tj-bottom-div-p">{{item.title}}</p>
        <p class="nav-tj-bottom-div-pp">{{item.name}}</p>
        <p class="nav-tj-bottom-div-ppp"><span>￥</span><span>{{item.price}}</span> <span><500m</span></p>
      </div>
    </div>
    <div style="height: 2rem"></div>
  </div>
</template>

<script>
  export default {
    name: "tuijian",
    data() {
      return {
        listData: [],
		page: 1,//当前的页码，默认是1
      }
    },
    methods: {
      gian() {
		  console.log(window.localStorage.getItem('lat'),window.localStorage.getItem('lng'))
        this.request({
          url: "api/index/recommendGoods",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng'),
			p: this.page,
          }
        }).then(res => {
          console.log(res.data.data)
          this.listData = res.data.data
        })
      },
      xq(i){
        this.$router.push({
          name: 'wpxq',
          query:{
            goods_id:i,
            token:10
          }

        })
      }
    },
    mounted() {
      this.gian()
    }
  }
</script>

<style scoped>
  .nav-tj-top {
    background-image: url(../../assets/wode_weinituijian.png);
    background-repeat: no-repeat;
    width: 2.72rem;
    height: 0.4rem;
    margin: 0 auto;
    background-position: center;
    line-height: 0.4rem;
    font-size: 0.36rem;
    margin-top: 0.35rem;
  }

  .nav-tj-bottom {
    display: flex;
    width: 7.5rem;
    height: 100%;
    justify-content: left;
    flex-wrap: wrap;
  }

  .nav-tj-bottom-div {
    width: 3.5rem;
    height: 5.56rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
    border-radius: 10px;
    margin: 0.2rem 0.125rem;
    position: relative;
  }

  .nav-tj-bottom-div-div-img {
    width: 3.5rem;
    height: 3.5rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }

  .nav-tj-bottom-div-img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }

  .nav-tj-bottom-div-p {
    line-height: 0.35rem;
    text-align: left;

    width: 3rem;
    margin: 0 auto;
    font-size: 0.26rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .nav-tj-bottom-div-pp {
    width: 1.6rem;
    height: 0.32rem;
    background: #FFBCBA;
    color: #EF0600;
    font-size: 0.22rem;
    margin-top: 0.2rem;
    margin-left: 0.28rem;
    position: absolute;
    bottom: 0.95rem;
  }

  .nav-tj-bottom-div-ppp {
    margin-left: 0.28rem;
    height: 0.3rem;
    margin-top: 0.45rem;
    line-height: 0.3rem;
    position: absolute;
    bottom: 0.2rem;
  }

  .nav-tj-bottom-div-ppp span:nth-child(1) {
    font-size: 0.22rem;
    color: #EF0600;
    float: left;
    position: relative;
    bottom: -0.05rem;
  }

  .nav-tj-bottom-div-ppp span:nth-child(2) {
    font-size: 0.32rem;
    color: #EF0600;
    float: left;
  }

  .nav-tj-bottom-div-ppp span:nth-child(3) {
    font-size: 0.24rem;
    color: #777777;
    position: absolute;
    left: 2.2rem;
    top: 0.05rem;
  }

</style>
