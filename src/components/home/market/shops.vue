<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>商家信息</p>
      </div>
      <div class="top">
        <img alt="" src="../../../assets/logo3.png">
        <p>独角兽小馆</p>
        <p>创建时间：2019年4月14号 | 河南省郑州市</p>
        <div class="top-div">
              <div>
                <p>66.万</p>
                <span>粉丝数</span>
              </div>
          <div>
            <p>66.万</p>
            <span>累计销量</span>
          </div>
          <div>
            <p>66.万</p>
            <span>商品数量</span>
          </div>
        </div>

      </div>
      <div class="centre">
        <span>官方推荐指数：</span>
        <van-rate
          v-model="value"
          allow-half
          void-icon="star"
          void-color="#FFFFFF"
        />
             <div style="height: 0.55rem">
             </div>
        <p>根据购物体验综合评定，含品质、物流、售后等多项内容，星星 越多用户满意度越高。</p>
      </div>
      <div class="serve">
          <p>店主服务</p>
        <div class="serve-div">
          <div><van-icon style="position: relative;top: 0.08rem;margin-right: 0.06rem" name="passed" color="#EF0600" size="0.356rem"/>全国包邮</div>
          <div><van-icon style="position: relative;top: 0.08rem;margin-right: 0.06rem" name="passed" color="#EF0600" size="0.356rem"/>七天无理由退货</div>
          <div style="text-align: right"><van-icon style="position: relative;top: 0.08rem;margin-right: 0.06rem" name="passed" color="#EF0600" size="0.356rem"/>72小时发货</div>
          <div><van-icon style="position: relative;top: 0.08rem;margin-right: 0.06rem" name="passed" color="#EF0600" size="0.356rem"/>延误必赔</div>
          <div><van-icon style="position: relative;top: 0.08rem;margin-right: 0.06rem" name="passed" color="#EF0600" size="0.356rem"/>退货补运费</div>
        </div>
        <p class="serve-bottom">•若卖家未履行上述承诺，沿街购将使用保证金进行先行赔付</p>
      </div>
      <div class="grade">
        <p style="font-size: 0.3rem;margin-bottom: 0.13rem">动态评分</p>
        <p>描述相符 &nbsp;&nbsp;&nbsp;  <span>4.84高于同行2.55%</span></p>
        <p>质量满意 &nbsp;&nbsp;&nbsp; <span>4.84高于同行2.55%</span></p>
        <p>服务周到 &nbsp;&nbsp;&nbsp; <span>4.84高于同行2.55%</span></p>
      </div>
      <div class="grade">
        <p style="font-size: 0.3rem;margin-bottom: 0.13rem">店铺服务情况</p>
        <p>平均发货 &nbsp;&nbsp;&nbsp;  <span>0.99天</span> 同行1.23天</p>
        <p>退货率 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>17%</span>同行8.04%</p>
        <p>投诉率 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>0.00%</span>同行0.02%</p>
      </div>
       <div class="footer">
           <span>工商执照 <van-icon size="0.4rem" style="float: right;position: relative;top: 0.23rem" name="arrow" /> </span>
       </div>
    </div>
  </div>
</template>

<script>
  import { Rate } from 'vant';
    export default {
        name: "shops",
      data(){
          return{
            value: 5
          }
      },
      components:{
          Rate
      },
      methods:{
          fh(){
            this.$router.push({
              name:"dpxq"
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
  .top{
    width: 7.5rem;
    height: 3.95rem;
    background: white;
    margin-top: 0.2rem;
    text-align: center;

  }
  .top img{
    width: 1.5rem;
    height: 1.5rem;
    box-shadow:0px 2px 13px 0px rgba(0, 0, 0, 0.08);
    border-radius:10px;
    margin-top: 0.2rem;
  }
  .top p:nth-child(2){
    font-size: 0.36rem;
    color: #333333;
    margin-top: 0.15rem;
  }
  .top p:nth-child(3){
    font-size: 0.2rem;
    margin-top: 0.15rem;
    color:rgba(51,51,51,1);
  }
  .top-div{
    display: flex;
    width: 5.9rem;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 0.2rem;
  }
  .top-div p{
    font-size:0.3rem;
    color: #333333;
    margin-bottom: 0.05rem;
  }
  .top-div span{
    font-size: 0.2rem;
    color: #777777;
  }
  .centre{
    width: 7.1rem;
    padding: 0.3rem 0.2rem;
    height: 1.12rem;
    background: white;
    text-align: left;
    clear: both;
    margin-top: 0.2rem;
  }
  .centre span{
    font-size: 0.3rem;
    color: black;
    float: left;
    margin-top: 0.02rem;

  }
  .centre p{
    font-size:0.24rem;
    font-weight:500;
    color:rgba(119,119,119,1);
  }
  /deep/ .van-rate{
    float: left;
  }
  .serve{
    width: 6.9rem;
    height: 2rem;
    padding: 0.2rem 0.3rem;
    background: white;
    margin-top: 0.2rem;
    color: black;
    text-align: left;
  }
  .serve p{
    font-size: 0.24rem;

  }
  .serve-div{
    display: flex;
    flex-wrap: wrap;
  }
  .serve-div div{
    font-size: 0.24rem;
    width: 2.3rem;
    text-align: left;
    margin-top: 0.18rem;
  }
  .serve-bottom{
    font-size:0.24rem;
    font-weight:500;
    color:rgba(204,204,204,1);
    margin-top: 0.15rem;
  }
  .grade{
    width: 6.9rem;
    height: 1.6rem;
    padding: 0.2rem 0.3rem;
    background: white;
    margin-top: 0.2rem;
    font-size: 0.24rem;
    text-align: left;
    color: #333333;
  }
  .grade p{
    margin-bottom: 0.09rem;
  }
  .grade span{
    color: #F21D13;
  }
  .footer{
    width: 6.9rem;
    height: 0.88rem;
    padding: 0 0.3rem;
    line-height: 0.88rem;
    font-size: 0.3rem;
    background: white;
    text-align: left;
    margin-top: 0.2rem;
  }
</style>
