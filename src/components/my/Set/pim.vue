<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>个人信息</p>
      <span @click="save()">保存</span>
    </div>
    <div class="top">
      <span>头像</span>

      <van-uploader :accept="'image/*'" :after-read="onRead" class="up">

        <img class="imgPreview" :src="postData[this.postData.length - 1]">

      </van-uploader>

      <!--      <img src="../../../assets/image/b.jpg" alt="">-->
      <van-icon size="0.25rem" style="float: right;position: relative;top: 0.53rem" color="#CCCCCC" name="arrow"/>
    </div>
    <div @click="pimo()" class="center">
      <span>昵称</span>
      <span>{{name}}</span>
      <van-icon size="0.25rem" style="float: right;position: relative;top: 0.39rem" color="#CCCCCC" name="arrow"/>
    </div>
    <div @click="show = true" class="bottom">
      <span>性别</span>
      <span>{{sex}}</span>
      <van-icon size="0.25rem"  color="#CCCCCC" name="arrow"/>
    </div>
    <!--性别弹出框-->
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="showw">
      <div class="sex">
        <div class="nav">
          <van-icon @click="fhh()" class="nav-leftt" name="arrow-left" size="0.5rem"/>
          <p>修改昵称</p>
        </div>
        <div class="concat">
          <input type="text" v-model="name" placeholder="请输入昵称" maxlength="8">
          <van-icon @click="delet()"  class="icon" color="#EEEEEE" name="clear"  size="0.35rem" />
        </div>

        <p class="box-p">4-8个字符，可有中英文、数字组成</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {Popup, Picker} from 'vant';
  import request from "../../utils/request"
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "pim",
    data() {
      return {
        show: false,
        showw:false,
        columns: ['男', '女', '保密'],
        sex: "未填写",
        name: "",
        postData: ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1690699292,1481547313&fm=27&gp=0.jpg"],
        phDat:'',//图片地址
        user_id:this.$store.getters.userName.id, //用户编码
        sexx: "", // 性别下标

      }
    },
    methods: {
      fh() {
        var b =window.sessionStorage.getItem('pim')
        if (b == 3) {
          this.$router.push({
            name: "My"
          })
        }else {
          this.$router.push({
            name: "set"
          })
        }

      },
      fhh(){
        this.showw=false
      },
      onConfirm(value, index) {
        this.sex = value
        this.show = false
        this.sexx = index

      },
      onCancel() {
        this.show = false
      },
      pimo() {
      this.showw= true
      },
      save() {
        request({
          url: "api/users/modify",
          method: "post",
          data: {
            id: this.user_id,
            sex:this.sexx,
            username: this.name,
            avatar: this.phDat,
            timer:null
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$store.dispatch('UserName',res.data.data)

            Toast('保存成功')

            this.timer = setTimeout(()=>{   //设置延迟执行
              this.$router.go(-1)
            },2000);


          }


        })
      },
      onRead(file) {
        // 上传图片到图片服务器
        // this.$refs.clothImg.src = file.content
        //this.postData.push(file.content)  // postData是一个数组
        //consoleog(this.postData[this.postData.length - 1])
        this.$store.dispatch('Ph', file.content)
        this.postData.push(this.$store.state.phData)
        request({
          url: "api/base/base64imgupload",//api/base/base64imgupload
          method: "post",
          data: {
            file: file.content
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            this.phDat = res.data.data['filepath']
             //console.log(this.phDat)

          }

        })


      },
      delet(){
        this.name =""
      },
      redraw(){
        if (this.$store.getters.userName == null) {

        } else {
          this.postData.push(this.$store.getters.userName.avatar)
          this.sex = this.$store.getters.userName.sex
          this.name = this.$store.getters.userName.username
        }
      }
    },
    components: {
      Popup,
      Picker
    },
    mounted() {
      //this.user_id = this.$store.getters.userName.id
       this.redraw()
    }

  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
    background: #FFFFFF;
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
  .nav-leftt {
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
  }
  .nav span {
    position: absolute;
    right: 0.5rem;
    top: 0rem;
    font-size: 0.3rem;
  }

  .top {
    width: 6.9rem;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    text-align: left;
    position: relative;
  }


  .up {
    width: 1rem;
    height: 0.8rem;
    position: absolute;
    z-index: 2;

    top: 0.2rem;
    right: 0.75rem;
  }

  .up img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    position: absolute;
    top: 0rem;
    right: 0rem;
    z-index: -1;

  }


  .center {
    width: 6.9rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    text-align: left;
    position: relative;
  }

  .center span:nth-child(2) {
    font-size: 0.24rem;
    color: #777777;
    text-align: right;
    position: absolute;
    right: 0.7rem;
  }

  .bottom {
    width: 6.9rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
    text-align: left;
    position: relative;
  }

  .bottom span:nth-child(2) {
    font-size: 0.24rem;
    color: #777777;
    margin-left: 4rem;
    display: inline-block;
    width: 1.8rem;
    text-align: right;
  }
 .sex{
   width: 7.6rem;
   height: 100vh;

 }
  .concat {
    width: 7.5rem;
    height: 0.9rem;
    background: white;
    position: relative;
  }

  .concat input {
    width: 7.5rem;
    height: 0.9rem;
    border: 0;
    line-height: 0.9rem;
    text-align: left;
    font-size: 0.3rem;
    text-indent: 0.3rem;
  }
  .box-p{
    font-size:0.24rem;
    font-weight:500;
    color:rgba(204,204,204,1);
    text-align: left;
    margin-top: 0.2rem;
    margin-left: 0.3rem;
  }
  .icon{
    position: absolute;
    right: 0.29rem;
    top: 0.3rem;
  }
</style>
