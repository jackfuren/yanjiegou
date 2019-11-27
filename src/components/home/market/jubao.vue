<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>举报</p>
    </div>
    <div class="jubao" @click="select = true">
      <span>{{jubao}}</span>
      <span>请选择</span>
      <van-icon size="0.3rem" style="position: relative;top: 0.05rem;left:4rem" color="#CCCCCC" name="arrow"/>
    </div>
    <p class="miaoshu">举报描述</p>
    <div class="concat">
      <textarea class="textarea-inherit" v-model="text"
                placeholder="描述您遇到的相关问题（必填15-500字内），如有问题需要 咨询或解决，请联系客服，谢谢！"></textarea>
      <div class="posting-uploader">
        <div :key="nn" class="posting-uploader-item" v-for="(item,nn) in postData">
          <img :src="item.content" alt="图片" class="imgPreview">
          <van-icon @click="delImg(nn)" class="delte" name="close" size="0.36rem"/>
        </div>
        <van-uploader :accept="'image/*'" :after-read="onRead" class="up" v-show="postData.length<=3">
          <img alt="等待传图" class="imgPreview" src="../../../assets/bangzhu_fankui_tupian.png">
        </van-uploader>
      </div>
      <p>{{postData.length}}/4张</p>
    </div>
    <p class="ts">最多可上传4张图片，支持：JPG、JPEG、PNG格式</p>
    <!--    <div @click="show1 = true" class="footer">-->
    <div @click="pan()" class="footer">
      <p>提交</p>
    </div>
    <van-popup style="border-radius: 10px" v-model="show1">
      <div class="dc">
        <img alt="" src="../../../assets/fankuichenggong.png">
        <p>提交成功</p>
      </div>
    </van-popup>
    <van-popup v-model="select" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import request from "../../utils/request"
  import {Picker} from 'vant';

  export default {
    name: "jubao",
    data() {
      return {
        show1: false,
        postData: [], //图片
        phDat: [], //图片返回参数
        shi: 86400,
        jubao: "举报原因",
        text: "",// 举报描述
        select: false,
        columns: ['不喜欢', '与描述不符', '质量太差', '码号太大', '就是想举报'],
        shop_id:"" ,// 商家编号
        token:''

      }
    },
    methods: {
      fh() {
        if (this.token == 2){
          this.$router.push({
            name:"wpxq",
            query:{
              goods_id:this.shop_id,
              token:this.token
            }
          })
        } else {
          this.$router.push({
            name: 'dpxq',
          })
        }

      },
      delImg(index) {
        // 删除指定下标的图片对象
        if (isNaN(index) || index >= this.postData.length) {
          return false
        }
        let tmp = []
        for (let i = 0, len = this.postData.length; i < len; i++) {
          if (this.postData[i] !== this.postData[index]) {
            tmp.push(this.postData[i])
          }
        }
        this.postData = tmp
      },
      onRead(file) {
        // 上传图片到图片服务器
        this.postData.push(file)  // postData是一个数组
        request({
          url: "api/base/base64imgupload",
          method: "post",
          data: {
            file: file.content
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.phDat.push(res.data.data['filepath'])
            //console.log(this.phDat)
          }
        })

      },
      pan() {

        request({
          url: "api/shop/report",
          method: "post",
          data: {
            shop_id:this.shop_id,
            reason:this.jubao,
            describe:this.text,
            imgsrc:this.phDat.join(",")
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res.data)
          }
        })



      },
      onConfirm(value, index) {
        this.jubao =value
        this.select =false

      },
      onCancel() {
       this.select =false
      }
    },
    updated() {

    },
    mounted() {
     this.shop_id =this.$route.query.id
      this.token =this.$route.query.token
    },
    components: {
      Picker
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

  .jubao {
    width: 6.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: white;
    border-radius: 10px;
    margin: 0.15rem auto;
    font-size: 0.3rem;
    text-align: left;
    text-indent: 0.3rem;
  }

  .jubao span:nth-child(2) {
    float: right;
    margin-right: 0.8rem;
    color: rgba(204, 204, 204, 1);
    font-size: 0.24rem;
  }

  .miaoshu {
    width: 6.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px 10px 0px 0px;
    margin: 0 auto 0;
    text-align: left;
    font-size: 0.3rem;
    text-indent: 0.3rem;
  }

  .concat {
    width: 6.9rem;
    height: 5.1rem;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 0px 0px 10px 10px;
  }

  .textarea-inherit {
    width: 90%;
    height: 2rem;
    overflow: auto;
    margin-top: 0.2rem;
    outline: none;
    font-size: 0.24rem;
    border: 0;
  }

  .up img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.11rem;
  }

  .posting-uploader-item {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    margin-left: 0.11rem;
  }

  .posting-uploader-item img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 10px;

  }

  .delte {
    position: absolute;
    z-index: 9999;
    color: black;
    top: -5px;
    right: -5px;
    size: 0.36rem;
  }

  .posting-uploader {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 6.5rem;
    margin: 0.7rem auto 0;
  }

  .concat p {
    font-size: 0.2rem;
    color: #CCCCCC;
    text-align: right;
    width: 6.5rem;
    margin-top: 0.22rem;
  }

  .ts {
    width: 6.9rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #777777;
    font-size: 0.2rem;
    text-indent: 10px;
    text-align: left;
    margin: 0 auto;
  }

  .footer {
    position: fixed;
    width: 5.5rem;
    bottom: 0.38rem;
    left: 50%;
    margin-left: -2.75rem;

  }

  .footer p {
    width: 5.5rem;
    height: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    font-size: 0.36rem;
    background: #EF0600;
    line-height: 0.9rem;
    border-radius: 10px;
  }

  .lx {
    width: 6.9rem;
    height: 0.8rem;
    border-radius: 10px;
    background: #FFFFFF;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #333333;
    text-align: left;
    margin: 0 auto;
    text-indent: 15px;
  }

  .lx input {
    height: 0.8rem;
    font-size: 0.2rem;
    text-indent: 5px;
    border: 0;
  }

  .dc {
    width: 5.6rem;
    height: 3.1rem;
    border-radius: 10px;


  }

  .dc img {
    width: 3.4rem;
    height: 2rem;
    margin-top: 0.35rem;
  }

  .dc p {
    font-size: 0.28rem;
    margin-top: 0.1rem;

  }

</style>
