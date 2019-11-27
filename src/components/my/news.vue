<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>消息</p>
      </div>
       
      <div class="hint" v-show="dataList.length == 0 ? true : false ">
        <img src="../../assets/xiaoxikong.png" alt="">
        <p>当前暂无消息</p>
      </div>
       <div style="height: 0.88rem"></div>
      <div class="concat" v-for="(item,index) in dataList">
         <p v-text="item.content"></p>
         <p v-text="item.title"></p>
         <p v-text="item.add_time"></p>
       </div>


    </div>
  </div>
</template>

<script>
  import  request from '../utils/request'
    export default {
        name: "news",
      data(){
          return{
           dataList:[],
            token:'',
            id:''
          }
      },
      methods:{
          fh(){
            if (this.token == 1){
              this.$router.push({
                name:"mar"
              })
            } else if (this.token == 2){
              this.$router.push({
                name:"wpxq",
                query:{
                  goods_id:this.id,
                  token:this.token
                }
              })
            } else {
              this.$router.push({
                name:"My"
              })
            }



          }
      },
      mounted() {

        request({
          url: "api/information/index",
          data:{
            user_id:this.$store.state.username.id
          },
          method: "post"
        }).then(res => {
          if (res.data.code == 200){
            this.dataList = res.data.data
            //console.log(res.data.data)
          }
        })

        this.token =this.$route.query.token
        this.id =this.$route.query.id
      }
    }
</script>

<style lang="less"  scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
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
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: fixed;
    border-bottom: 1px solid #F7F7F7;
    top: 0rem;
    z-index: 8888;
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
  .hint{
    margin-top: 4rem;
    font-size: 0.28rem;
    position: relative;
    top: 0.88rem;
  }
  .hint img{
    width: 3.4rem;
    height: 2rem;

  }
  .concat{
    width: 6.9rem;
    border-bottom: 1px solid #EEEEEE;
    margin:  0rem auto;
  }
  .concat p{
    font-size: 0.3rem;
    color: #333333;
    text-align: left;
    height: 0.7rem;
    line-height: 0.7rem;
  }
  .concat p:nth-child(2){
    font-size: 0.24rem;
    color:#777777;
    text-align: left;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .concat p:nth-child(3){
    font-size: 0.24rem;
    color:#333333;
    text-align: right;
    height: 0.4rem;
    line-height: 0.4rem;
  }
</style>
