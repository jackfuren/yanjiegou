<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
          <div id="aa"></div>
        <van-icon @click="fh()" class="nav-left" color="#333333" name="arrow-left" size="0.5rem"/>
        <p>全部品牌</p>
      </div>
      <div class="all">
        <div :id="item.etitle" class="all-div" v-for="(item ,index) in dataLIst" :key="index">
          <p>{{item.etitle}}</p>
          <div class="all-one" v-for="(ite,index) in item.son " :key="index">
            <div>
              <img :src="ite.pic" alt="">
              <span>{{ite.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-for="(item,index) in list" :key="index">
          <p  :class="{rightp:index === num}"  @click="skip(item,index)">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "complete",
    data() {
      return {
        list: [],
        num:"",
        dataLIst:[]
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'reimai',
        })
      },
      skip(i ,ii) {
        this.num = ii
        if (ii ==  0){
          window.location.href = '#aa'
        }else {
          window.location.href = '#' + i
        }
      },
      brand(){
        this.request({
          url: "api/brand/lists",
          method: "post"
        }).then(res => {
           console.log(res)
          this.dataLIst = res.data.data
          //consoleog(res.data.data)
          for (var i =0 ;i< this.dataLIst.length;i++){
            this.list.push(this.dataLIst[i].etitle)
           //console.log(this.list)
          }

        })


      }
    },
    mounted() {
      this.brand()
    }
  }
</script>

<style scoped>
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
    background: white;
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
    z-index: 999999;
  }

  .all {
    width: 7.5rem;
  }

  .all-div p {
    font-size: 0.28rem;
    color: #333333;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: left;
    padding: 0 0.3rem;
  }

  .all-one {
    width: 6.9rem;
    background: white;
    padding: 0rem 0.3rem;
  }

  .all-one div {
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #EEEEEE;
    background: white;
    text-align: left;
  }

  .all-one img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    position: relative;
    top: 0.2rem;
  }

  .all-one span {
    font-size: 0.36rem;
    color: #333333;
    position: relative;
    bottom: 0.09rem;
    left: 0.4rem;
  }

  .right {
    width: 1rem;
    font-size: 0.28rem;
    color: #CCCCCC;
    position: fixed;
    top: 1rem;
    right: 0rem;
  }

  .right p {
    width: 1rem;
    height: 0.6rem;
    line-height: 0.6rem;

  }
  .rightp{
    color: #ef0600;
  }
</style>
