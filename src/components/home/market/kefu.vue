<template>
  <div class="box">

    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p class="name">{{name}}</p>
      <p class="pu">店铺</p>
    </div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 下拉刷新 -->
    <div id="chattingWord" style="text-align: left;padding-top: 0.9rem;background: #F7F7F7;">

        <p class="time">今天 10:59</p>
        <div class="commodity">
          <dt>
            <img :src="img" alt />
          </dt>
          <dd>
            <p class="ti">{{title}}</p>
            <p class="money">￥{{money}}</p>
            <p class="send" @click="song()">发给商家</p>
          </dd>
        </div>
      
      <div class="masg" style="width:100%;">
        <div class="masgDiv" v-for="(item, index) in msag" :key="index">
          <!-- 自己 -->
          <div v-if="item.uid == uid" class="">
            <van-row>
              <van-col span="4">
                &nbsp;
              </van-col>
              <van-col span="16">
                <div v-if="item.type === 0" class="masgContent masgContentMy">
                  {{item.content}}
                </div>
                <div v-if="item.type === 1" class="masgContent masgContentMyImg">
                  <img :src="item.content" alt="">
                </div>
              </van-col>
              <van-col span="4">
                <div class="touXiang">
                  <img :src="tou" alt />
                </div>
              </van-col>
            </van-row>
          </div>
          <!-- 对方 -->
          <div v-else class="">
            <van-row>
              <van-col span="4">
                <div class="touXiang">
                  <img src="../../../assets/gggggg.png" alt />
                </div>
              </van-col>
              <van-col span="16">
                <div v-if="item.type===0" class="masgContent masgContentYou">
                  {{item.content}}
                </div>
                <div v-if="item.type===1" class="masgContent masgContentYouImg">
                  <img :src="item.content" alt="">
                </div>
              </van-col>
              <van-col span="4">
                &nbsp;
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    </van-pull-refresh>

    <div class="tabBar">
      <van-row class="shu" type="flex" justify="center">
        <!-- 此处如果需要左侧语音输入按钮，将此处注释解开，把输入框中18改为15，换掉中间图标 -->
        <van-col span="1" class="flexBox">
          &nbsp;
        </van-col>
        <!-- <van-col span="3" class="flexBox">
          <img src="../../../assets/biaoq.png" alt="">
        </van-col> -->
        <van-col v-if="text === ''" span="20" class="inputTxt">
          <input type="text" v-model="text" />
          <img src="../../../assets/biaoq.png" @click="faceContent()" alt />
        </van-col>
        <van-col v-else span="18" class="inputTxt">
          <input type="text" v-model="text" />
          <img src="../../../assets/biaoq.png" @click="faceContent()" alt />
        </van-col>
        <van-col v-if="text === ''" span="3" class="flexBox">
          <van-uploader :after-read="onRead" :before-read="beforeRead">
            <img class="flexBoxImg" src="../../../assets/iiii.png" alt />
          </van-uploader>
        </van-col>
        <van-col v-else span="5" class="flexBox">
          <div>
            <van-button plain type="info" @click="send()" size="mini">发送</van-button>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 小表情弹出层 -->
    <van-popup class="browBox" v-model="show" @click-overlay="overLay" position="bottom" :style="{ height: '30%' }">
      <ul>
        <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue"
import { Toast } from "vant"
const appData = require("../../utils/emojis.json")
import request from "../../utils/request"
export default {
  data() {
    return {
      user_id: this.$store.state.username.id,
      name: this.$route.query.name,
      path: "ws://121.199.17.119:8282",
      socket: "",
      text: "",
      tou: this.$store.state.username.avatar,
      mag: [], //用户发的消息
      title: this.$route.query.title,
      money: this.$route.query.money,
      img: this.$route.query.img,
      msag: "",
      maag: [], //商家会的消息
      uid: "user" + this.$store.state.username.id,
      infoUid: this.$route.query.sid,
      infooUid: "shop" + this.$route.query.sid,
      show: false, // 小表情显示区域显示与隐藏
      faceList: [], // json返回数据，即为表情区域展示小表情
      count: 10, // 页面初次展示聊天条数
      isLoading: false // 下拉刷新
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    fh() {
      this.$router.go(-1)
    },
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function() {
      console.log("socket连接成功")
    },
    error: function() {
      console.log("连接错误")
    },
    getMessage: function(msg) {
      var data = eval("(" + msg.data + ")")
      if (data.type == "init") {
        request({
          url: "api/char/bind", //绑定成功
          method: "post",
          data: {
            client_id: data.data.client_id,
            uid: "user" + this.$store.state.username.id
          }
        }).then(res => {
          if (res.status === 200) {
            // console.log(res.status)
          } else {
            // Toast('连接失败，请联系管理员')
          }
        })
        this.msglog()
      }
      if (data.type == "message") {
        var qq = {
          ct: "",
          ud: ""
        };
        qq.ct = data.msg
        (qq.ud = "shop" + this.infoUid), this.mag.push(qq)
      }
    },
    // 获取历史就聊天记录
    msglog () {
      request({
        url: "api/char/msglog", //历史记录
        method: "post",
        data: {
          infouid: "shop" + this.infoUid,
          uid: "user" + this.$store.state.username.id
        }
      }).then(res => {
        // uid  我得id infouid  对方id
        if (res.status === 200) {
          for (var i in res.data.data){
            // 聊天小表情解码
            res.data.data[i].content = this.uncodeUtf16(res.data.data[i].content)
            // 聊天图片拼接地址
            if (res.data.data[i].type === 1) {
              res.data.data[i].content = 'http://svn.yanjiegou.com' + res.data.data[i].content
            }
          }
          // 聊天记录截取最后十次，后续会有下拉刷新加载多次记录，等待后台修改代码
          this.msag = res.data.data.slice(-10)
          // 屏幕滚动
          var chattingWord = document.getElementById("chattingWord")
          document.documentElement.scrollTop = chattingWord.scrollHeight
          // console.log(this.msag)
        }
        // for (var i in this.msag) {
        //   var qq = {
        //     ct: "",
        //     ud: ""
        //   };
        //   if (this.msag[i].uid == "user" + this.$store.state.username.id) {
        //     qq.ct = this.uncodeUtf16(this.msag[i].content);
        //     qq.ud = "user" + this.$store.state.username.id;
        //     this.mag.push(qq);
        //   }
        //   if (this.msag[i].uid == "shop" + this.infoUid) {
        //     qq.ct = this.uncodeUtf16(this.msag[i].content);
        //     (qq.ud = "shop" + this.infoUid), this.mag.push(qq);
        //   }
        //   console.log(this.mag)
        // }
      })
    },
    send: function() {
      // var qq = {
      //   ct: "",
      //   ud: ""
      // };
      // qq.ct = this.text;
      // qq.ud = "user" + this.$store.state.username.id;
      if (this.text === "") {
        Toast({
          message: "输入内容不能为空",
          duration: 800 // 显示毫秒值
        });
      } else {
        // this.mag.push(qq)
        // console.log("发送信息暂时注释")
        this.sendmsg(this.utf16toEntities(this.text), 0)
      }
      this.text = ""
    },
    // 发送消息
    sendmsg(msg, type) {
      request({
        url: "api/char/sendmsg",
        method: "post",
        data: {
          type: type,
          msg: msg,
          infouid: "shop" + this.infoUid,
          uid: "user" + this.$store.state.username.id
        }
      }).then(res => {
        this.socket.send(this.text)
        this.msglog()
      })
    },
    // 下拉刷新，数据待修改
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 上传图片之前检测图片格式,大小及类型
    beforeRead(file) {
      // console.log(file)
      if (file.size/1024 >= 5000) {
        Toast('上传图片应小于3M')
      } else {
        var image = ['image/jpeg','image/jpg','image/png','image/gif']
        var flag = false
        for(var i = 0; i<image.length; i++){
          if(file.type == image[i]){
            flag = true
          }
        }
        if(flag){
          return flag
        }else{
          Toast('请上传 jpeg/jpg/png/gif 格式图片')
          return flag
        }
      }
    },
    // 上传图片到图片服务器
    onRead (file) {
      // console.log(file)
      request({
        url: "api/base/base64imgupload",
        method: "post",
        data: {
          file: file.content
        }
      }).then(res => {
        if (res.data.code == 200) {
          // 拿到图片路径，将图片路径当成消息发送出去，添加类型
          this.sendmsg(res.data.data.filepath, 1)
        } else {
          Toast('图片上传失败')
        }
      })
    },
    // 表情
    faceContent() {
      this.show = true
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击图标之后 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.text += this.faceList[i];
        }
      }
      this.show = false
      this.faceList = []
    },
    // 点击遮罩层关闭弹窗
    overLay(){
      this.faceList = []
    },
    // 转码
    utf16toEntities(str) {
      var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
      str = str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
          H = char.charCodeAt(0); // 取出高位
          L = char.charCodeAt(1); // 取出低位
          code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
          return "&#" + code + ";";
        } else {
          return char;
        }
      });
      return str;
    },
    // 解码
    uncodeUtf16(str) {
      var reg = /\&#.*?;/g;
      var result = str.replace(reg, function(char) {
        var H, L, code;
        if (char.length == 9) {
          code = parseInt(char.match(/[0-9]+/g));
          H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
          L = ((code - 0x10000) % 0x400) + 0xdc00;
          return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
        } else {
          return char
        }
      })
      return result
    },
    song() {
      // console.log(window.location.href)
      this.mag.push()
    },
    close: function() {
      console.log("socket已经关闭");
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 99vh;
  background: #f7f7f7;
}
.nav {
  z-index: 100;
  width: 100%;
  height: 0.88rem;
  background: #ffffff;
  position: fixed;
  top: 0;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
}
.name {
  line-height: 0.88rem;
  font-size: 0.36rem;
  font-weight: 500;
  display: inline-block;
  color: rgba(51, 51, 51, 1);
}
.nav-left {
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}
.pu {
  display: inline-block;
  font-size: 0.2rem;
  background: #fc6b58;
  color: #ffffff;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  border-radius: 0.3rem;
  padding: 0.15rem 0.2rem 0.15rem 0.2rem;
}
.time {
  background: #cccccc;
  color: #ffffff;
  width: 1.5rem;
  font-size: 0.19rem;
  text-align: center;
  margin: 0.3rem auto 0.3rem auto;
  padding: 0.05rem 0 0.05rem 0;
  border-radius: 0.2rem;
}
.commodity {
  position: relative;
  margin: 0.2rem;
  height: 2.4rem;
  display: flex;
  text-align: left;
  font-size: 0.3rem;
  background: #fff;
}
.commodity dt {
  flex: 1;
  margin: 0.2rem;
}
.commodity dt img {
  width: 100%;
}
.commodity dd {
  flex: 3;
  margin: 0.2rem;
}
.commodity dd .ti {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.money {
  color: #ef0600;
  margin: 0.1rem 0 0.1rem 0;
}
.send {
  background: #fd433f;
  color: #ffffff;
  width: auto;
  padding: 0.15rem;
  border-radius: 0.3rem;
  position: absolute;
  right: 0.5rem;
}
/* 小表情部分样式 */
.browBox {
  width: 100%;
  height: auto;
  background: #e6e6e6;
  overflow: scroll;
}
.browBox ul{
  display: flex;
  flex-wrap: wrap;
  padding: 0.1rem;
}
.browBox > ul li{
  width: 14%;
  font-size: 26px;
  list-style: none;
  text-align: center;
}
/* 发送消息部分样式 */
.tabBar{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.9rem;
  margin-top: 0.9rem;
}
.shu {
  position: absolute;
  bottom: 0rem;
  width: 100%;
  height: 0.9rem;
  background: #eeeeee;
}
.inputTxt {
  background-color: #fff;
  width: 100%;
  height: 0.6rem;
  margin: auto 0;
  border-radius: 0.5rem;
}
.inputTxt input {
  width: 85%;
  font-size: 0.3rem;
  float: left;
  height: 0.5rem;
  margin: 0.05rem 0 0 0.1rem;
  outline: none;
  border: none;
}
.inputTxt img {
  float: left;
  display: block;
  margin: 0.05rem 0.1rem 0 0.1rem;
  height: 0.5rem;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexBoxImg{
  width: auto;
  height: 0.5rem;
  margin: 0.05rem 0.1rem 0 0.1rem;
}
/* 聊天框部分样式 */
#chattingWord {
  width: 100%;
  margin-bottom: 0.7rem;
  overflow: auto;
}
/* .masg{
  
} */
.masgDiv{
  width: 94%;
  font-size: 0.3rem;
  margin: 0.12rem auto 0.53rem auto;
}
.masg img{
  display: block;
  width: 100%;
}
.touXiang{
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem;
}
.masgContent{
  margin: 0 auto;
  width: auto;
  height: 100%;
  text-align: left;
  margin-top: 0.04rem;
  display: inline-block;
}
.masgContentMy{
  background-color: #fc6957;
  padding: 0.2rem;
  border-radius: 0.4rem 0 0.4rem 0.4rem;
  color: #FEE7E5;
  float: right;
  margin-right: 0.1rem;
}
.masgContentMyImg{
  float: right;
  margin-right: 0.1rem;
}
.masgContentYou{
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0 0.4rem 0.4rem 0.4rem;
  color: #000;
  margin-left: 0.1rem;
}
.masgContentYouImg{
  margin-left: 0.1rem;
}
/* .oo {
  display: flex;
  margin-top: 0.35rem;
  margin-bottom: 0.2rem;
  width: 98%;
  padding-left: 3%;
}
.oo dt {
  flex: 5;
  width: auto;
}
.oo dt div {
  width: auto;
  height: auto;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
  background-color: #fc6957;
  border-radius: 0.4rem 0 0.4rem 0.4rem;
  color: #ffffff;
}
.oo dd {
  flex: 1;
  width: 20%;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
}
.oo dd img {
  width: 100%;
} */
</style>
