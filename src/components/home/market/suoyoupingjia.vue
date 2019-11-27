<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>所有评价</p>
      </div>
      <div class="concat" v-for="(item ,index) in listDtaa">
        <div class="concat-div">
          <div class="concat-div-left">
            <img alt="" :src="item.avatar">
          </div>
          <div class="concat-div-right">
            <span>{{item.username}}</span>
            <p>{{item.add_time}} 尺码：M 颜色分类：无袖 长版</p>
            <p>{{item.content}}</p>
            <div class="concat-div-right-div"  >
              <div  class="concat-div-right-div-div" v-for="(ite ,index) in item.imgsrc" @click="fangda(item.imgsrc)">
                <img alt="" :src="ite">
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <van-image-preview
          v-model="show"
          :images="images"
        >
        </van-image-preview>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request"

  export default {
    name: "suoyoupingjia",
    data() {
      return {
        token:'',
        id:'',
        listDtaa:[],
        show:false,
        images: [],
        index:0,
				shu:1
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'wpxq',
          query:{
            goods_id:this.id,
            token:this.token
          }

        })
      },
			pin(){
				request({
				  url: "api/goods/getcommentlist",//所有评论
				  method: "post",
				  data: {
						goods_id:this.id,
						p:this.shu,
						rows:10
				  }
				}).then(res => {
					console.log(res)
					this.listDtaa =res.data.data
				})
			},
      //图片放大
      fangda(i) {
     this.images =i
     this.show=true
      },
    },
    mounted() {
      this.token = this.$route.query.token
      this.id = this.$route.query.id
      // this.listDtaa =this.$route.query.list
      console.log(this.listDtaa)
			this.pin()
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

  /*头部*/
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

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .concat {
    margin-top: 0.2rem;
    width: 7.5rem;
    background: white;
    padding-top: 0.2rem;
  }

  .concat-div {
    width: 6.9rem;
    margin: 0 auto;
    display: flex;
  }

  .concat-div-left {
    width: 0.6rem;
    height: 2rem;

  }

  .concat-div-left img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }

  .concat-div-right {
    width: 6.15rem;
    height: 100%;
    padding-left: 0.15rem;
    text-align: left;
    font-size: 0.24rem;
    color: #777777;
    clear: both;
  }

  .concat-div-right p:nth-child(1) {
    margin: 0.1rem 0;
  }

  .concat-div-right p:nth-child(2) {
    margin: 0.1rem 0;
  }

  .concat-div-right-div {
    width: 6.15rem;
    display: flex;
    margin: 0.2rem 0;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .concat-div-right-div-div {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
    margin-bottom: 0.15rem;
  }

  .concat-div-right-div-div img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
  /deep/ .van-image-preview__index{
    width: 0.5rem;
    height: 0.3rem;
    margin: 0 auto;
    background: #181818;
  }
</style>
