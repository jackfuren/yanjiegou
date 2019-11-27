<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>设置</p>
        <span class="nav-qk">清空</span>

      </div>
      <div  class="footer">
        <div class="footer-div" v-for="(item,index) in list" :key="index">
          <div>
            <img src="../../../assets/image/a.jpg" alt="">
          </div>
          <p class="footer-p">{{item.name}}</p>
          <p class="footer-pp">￥{{item.money}}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {Checkbox, CheckboxGroup} from 'vant';
    export default {
        name: "liulan",
      data(){
          return{
            result: [],//删除商品id
            list:[
              {name:"休闲小清新女式dsdasdadsfsdfd",money:112,id:1},
              {name:"休闲小清新女式dsdasdadsfsdfd",money:114,id:2},
              {name:"休闲小清新女式dsdasdadsfsdfd",money:116,id:3},
              {name:"休闲小清新女式dsdasdadsfsdfd",money:119,id:4},
              {name:"休闲小清新女式dsdasdadsfsdfd",money:111,id:5},
              {name:"休闲小清新女式dsdasdadsfsdfd",money:113,id:6}
            ],
          }
      },
      methods:{
          fh(){
            this.$router.push({
              name:"My"
            })
          }
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
  .nav-qk{
    font-size: 0.24rem;
    color: #777777;
    position: absolute;
    top: 0;
    right: 0.3rem;
  }
  .footer {
    width: 6.9rem;
    padding: 0.25rem 0.3rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer-div {
    width: 2.26rem;
    height: 3.06rem;
    background: #EEEEEE;
    border-radius: 10px;
    margin-bottom: 0.2rem;
  }

  .footer-div div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    width: 2.26rem;
    height: 2.26rem;
    position: relative;
  }

  .footer-div img {
    max-width: 100%;
    max-height: 100%;
  }

  .footer-p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 0.24rem;
  }

  .footer-pp {
    font-size: 0.24rem;
    color: #EF0600;
    text-align: left;
    text-indent: 0.3rem;
    margin-top: 0.07rem;
  }
</style>
