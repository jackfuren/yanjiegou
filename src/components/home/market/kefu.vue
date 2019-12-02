<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p class="name">{{name}}</p>
      <p class="pu">店铺</p>
    </div>
    <div style="text-align: left;padding-top: 0.9rem;background: #F7F7F7;" id="chattingWord">
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
          <div v-if="item.uid == uid" class="">
            <van-row>
              <van-col span="4">
                &nbsp;
              </van-col>
              <van-col span="16">
                <div v-if="item.type === 0" class="masgContent masgContentMy">
                  {{item.content}}
                </div>
                <div v-if="item.type === 1" class="masgContent masgContentMy">
                  <img :src="item.content" alt="">
                </div>
              </van-col>
              <van-col span="4">
                <img class="touXiang" :src="tou" alt />
              </van-col>
            </van-row>
          </div>
          <div v-else class="">
            <van-row>
              <van-col span="4">
                <img class="touXiang" src="../../../assets/gggggg.png" alt />
              </van-col>
              <van-col span="16">
                <div v-if="item.type===0" class="masgContent masgContentYou">
                  {{item.content}}
                </div>
                <div v-if="item.type===1" class="masgContent masgContentYou">
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
          <img style="margin-top: 5%;" src="../../../assets/iiii.png" alt />
        </van-uploader>
      </van-col>
      <van-col v-else span="5" class="flexBox">
        <div>
          <van-button plain type="info" @click="send()" size="mini">发送</van-button>
        </div>
      </van-col>
    </van-row>
    
    <!-- 小表情弹出层 -->
    <van-popup class="browBox" v-model="show" position="bottom" :style="{ height: '30%' }">
      <ul>
        <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
const appData = require("../../utils/emojis.json");
import request from "../../utils/request";
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
      faceList: [] // json返回数据，即为表情区域展示小表情
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    fh() {
      this.$router.go(-1);
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
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      var data = eval("(" + msg.data + ")");
      if (data.type == "init") {
        request({
          url: "api/char/bind", //绑定成功
          method: "post",
          data: {
            client_id: data.data.client_id,
            uid: "user" + this.$store.state.username.id
          }
        }).then(res => {});
        this.msglog()
      }
      if (data.type == "message") {
        var qq = {
          ct: "",
          ud: ""
        };
        qq.ct = data.msg;
        (qq.ud = "shop" + this.infoUid), this.mag.push(qq);
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
        for (var i in res.data.data){
          res.data.data[i].content = this.uncodeUtf16(res.data.data[i].content)
          if (res.data.data[i].type === 1) {
            res.data.data[i].content = 'http://svn.yanjiegou.com' + res.data.data[i].content
          }
        }
        this.msag = res.data.data;
        console.log(this.msag)
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
        // 测试在此处让屏幕滚动
        // var chattingWord = document.getElementById("chattingWord")
        // setTimeout(function(){
        // 	window.screenTop = chattingWord.offsetHeight
        // 	chattingWord.scrollTop = chattingWord.offsetHeight
        // 	console.log(chattingWord.scrollTop)
        // 	console.log(element.scrollTop)
        // },1000)
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
        console.log("发送信息暂时注释")
        // this.sendmsg(this.utf16toEntities(this.text), 0)
      }
      this.text = "";
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
      });
    },
    // 上传图片之前检测图片格式
    beforeRead(file) {
      if (file.type !== 'jpeg/jpg/png/gif') {
        Toast('请上传 jpeg/jpg/png/gif 格式图片');
        return false
      }
      return true
    },
    // 上传图片到图片服务器
    onRead (file) {
      request({
        url: "api/base/base64imgupload",
        method: "post",
        data: {
          file: file.content
        }
      }).then(res => {
        if (res.data.code == 200) {
          // console.log(res)
          // 拿到图片路径，将图片路径当成消息发送出去，添加类型
          this.sendmsg(res.data.data.filepath, 1)
        }
      });
    },
    // 表情
    faceContent() {
      this.show = true;
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
      this.show = false;
      this.faceList = [];
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
};
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
  font-size: 0.08rem;
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
  width: 1.3rem;
  text-align: center;
  margin: 0 auto;
  padding: 0.05rem 0 0.05rem 0;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 0.2rem;
}
.commodity {
  position: relative;
  margin: 0.2rem;
  height: 2.4rem;
  display: flex;
  text-align: left;
  font-size: 15px;
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
  font-size: 12px;
  margin: 0.1rem 0 0.1rem 0;
}
.send {
  background: #fd433f;
  color: #ffffff;
  width: auto;
  font-size: 12px;
  padding: 0.15rem;
  border-radius: 0.3rem;
  position: absolute;
  right: 0.5rem;
}
/* 小表情部分样式 */
.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  position: absolute;
  bottom: 0px;
  overflow: scroll;
}
.browBox > ul {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.browBox > ul li {
  width: 14%;
  font-size: 26px;
  list-style: none;
  text-align: center;
}
/* 发送消息部分样式 */
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
  float: left;
  margin: 2% 0 0 2%;
  outline: none;
  border: none;
}
.inputTxt img {
  float: left;
  display: block;
  margin: 1% 0 0 4%;
  height: 80%;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 聊天框部分样式 */
#chattingWord {
  width: 100%;
  margin-bottom: 0.7rem;
}
.masg{
  overflow: auto;
}
.masgDiv{
  width: 94%;
  margin: 3% auto;
}
.masg img{
  display: block;
  width: 100%;
}
.touXiang{
  border-radius: 50%;
}
.masgContent{
  margin: 0 auto;
  width: 92%;
  height: 100%;
  padding: 0.1rem;
  margin-top: 0.04rem;
}
.masgContentMy{
  background-color: #fc6957;
  border-radius: 0.4rem 0 0.4rem 0.4rem;
  color: #FEE7E5;
  text-align: right;
}
.masgContentYou{
  background-color: #fff;
  border-radius: 0 0.4rem 0.4rem 0.4rem;
  color: #000;
  text-align: left;
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
