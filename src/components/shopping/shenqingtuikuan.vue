<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>申请退款</p>
      </div>
      <div class="concat-top">
        <div>
          <img :src="id.headimg" alt="">
        </div>
        <div>
          <p>{{id.gtitle}}</p>
          <span>{{id.specification}}</span>
        </div>
      </div>
      <div class="concat-bottom">
        <ul>
          <li><span>*</span>{{title}} <span @click="show =true" style="position: absolute;right: 0rem;color: #CCCCCC">请选择 <van-icon
            name="arrow" style="position: relative;bottom: -0.07rem;left: -0.3rem" size="0.3rem"/></span></li>
          <li>退款金额：<span>￥{{id.ogprice}}</span></li>
          <li>退款说明：<input type="text" placeholder="可选填" v-model="text"></li>
          <li>联系电话：<input type="number" placeholder="必填" v-model="phone"></li>
        </ul>
      </div>
       <div class="concat-footer">
           <p>上传凭证</p>
         <div class="posting-uploader">
           <div :key="nn" class="posting-uploader-item" v-for="(item,nn) in postData">
             <img :src="item.content" alt="图片" class="imgPreview">
             <van-icon @click="delImg(nn)" class="delte" name="close" size="0.36rem"/>
           </div>

           <van-uploader :accept="'image/*'" :after-read="onRead" class="up" v-show="postData.length<=3">
             <img alt="等待传图" class="imgPreview" src="../../assets/bangzhu_fankui_tupian.png">
           </van-uploader>
         </div>
       </div>
      <van-popup v-model="show" position="bottom">
        <van-picker
          show-toolbar
          title="标题"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="footer" @click="tui()">提交</div>
    </div>
  </div>
</template>

<script>
  import {Picker} from 'vant';
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "shenqingtuikuan",
    data() {
      return {
        id: "",
		iid:'',
        order_id: "",
        title: "退款原因",
        columns: [],
        show: false,
        postData: [],
        phDat:[],//图片地址
         num:'',
        text:"",
        phone:"",
        f:"",
        g:""
      }

    },
    methods: {
      onConfirm(value, index) {
        //this.$toast(`当前值：${value}, 当前索引：${index}`);
        this.title=value
        this.num = index + 1
        this.show =false
      },
      onCancel() {
        this.show=false
      },
      Gian() {
				console.log(this.iid)
        this.request({
          url: "api/order/reason",
          method: "get",
        }).then(res => {
          for (var i=0;i<res.data.data.length ;i++){
            this.columns.unshift(res.data.data[i].name)
          }
        })
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

        let tmpp =[]
        for (let i = 0, len = this.phDat.length; i < len; i++) {
          if (this.phDat[i] !== this.phDat[index]) {
            tmpp.push(this.phDat[i])
          }
        }
        this.phDat= tmpp
      },
      onRead(file) {
        this.postData.push(file) // postData是一个数组
        this.request({
          url: "api/base/base64imgupload",
          method: "post",
          data: {
            file: file.content
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.phDat.push(res.data.data['filepath'])
          }
        })
      },
      tui(){
        this.request({
          url: "api/order/refund",
          method: "post",
          data:{
            user_id:this.$store.state.username.id,
            goods_id:this.id.gid,
            og_id:this.id.og_id,
            order_id:this.order_id,
            otype:2,
            rid:this.num,
            mobile:this.phone,
            remarks:this.text,
            imgs:this.phDat.join(',')
          }
        }).then(res => {
             if (res.data.code == 200){
               Toast('提交成功')
							 this.$router.push({
							   name: 'tk',
							 })
             } else  if (res.data.code == 0){
               Toast('你已经申请过了，请勿重复提交')
							 this.$router.push({
							   name: 'tk',
							 })
             }
        })
      },
      fh(){
       if (this.g == 5){
         this.$router.push({
           name: 'sqsh',
           query:{
             id:this.f,
           }
         })

       }else if (this.g == 6){
		  this.$router.push({
		    name: 'pssj',
		    query:{
		      id:this.f,
		    }
		  })
		
		}else {
         this.$router.push({
           name: 'fh',
           query:{
             id:this.f,
             ative:this.g
           }
         })
       }
      }
    },
    mounted() {
      this.iid = this.$route.query.id
      this.order_id = this.$route.query.order_id
	  this.n=this.$route.query.n
	  if(this.n=235){
		  this.id=this.iid
	  }else{
		  this.id=this.iid[0]
	  }
	  
      this.f =this.$route.query.f
      this.g=this.$route.query.g
      this.Gian()
      console.log(this.id,this.order_id,this.f)

    },
    components: {
      Picker
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

  .concat-top {
    width: 6.5rem;
    height: 1rem;
    padding: 0.2rem;
    background: #FFFFFF;
    margin: 0.2rem auto;
    display: flex;
  }

  .concat-top div:nth-child(1) {
    width: 1rem;
    height: 1rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }

  .concat-top div:nth-child(1) img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;

  }

  .concat-top div:nth-child(2) {
    width: 5.3rem;
    text-align: left;
    position: relative;
    margin-left: 0.2rem;
  }

  .concat-top div:nth-child(2) p {
    width: 4.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.35rem;
  }

  .concat-top div:nth-child(2) span {
    font-size: 0.24rem;
    color: #777777;
  }

  .concat-bottom {
    width: 6.9rem;
    height: 3.6rem;
    background: white;
    border-radius: 0.1rem;
    margin: 0 auto;
  }

  .concat-bottom ul li {
    width: 6.9rem;
    height: 0.9rem;
    text-align: left;
    line-height: 0.9rem;
    border-bottom: 1px solid #F7F7F7;
    text-indent: 0.2rem;
    font-size: 0.24rem;
    position: relative;
  }

  .concat-bottom ul li span {
    color: #ef0600;

  }

  .concat-bottom ul li:nth-child(3) input {
    width: 5rem;
    height: 0.8rem;
    border: 0;
  }

  .concat-bottom ul li:nth-child(4) input {
    width: 5rem;
    height: 0.8rem;
    border: 0;
  }
  .concat-footer{
    width: 6.5rem;
    height: 2rem;
    margin: 0.2rem auto;
    background: white;
    padding: 0.2rem;
  }
  .concat-footer p{
    text-align: left;
    font-size: 0.24rem;
    color: #333333;
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
    margin: 0.15rem auto 0 ;
  }
  .up img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.11rem;
  }
  .footer{
    position: fixed;
    width: 5.5rem;
    height: 0.9rem;
    color: white;
    background: #ef0600;
    line-height: 0.9rem;
    font-size: 0.36rem;
    bottom: 0.38rem;
    left: 50%;
    margin-left: -2.75rem;
    border-radius: 0.1rem;
  }
</style>
