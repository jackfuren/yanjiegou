<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>编辑收货地址</p>
      <span @click="show2 = true;" class="nav-sc">删除</span>
    </div>
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :search-result="searchResult"
      @save="onSave"
      show-search-result
      show-set-default
    />
    <van-popup
      class="popup"
      v-model="show2"
    >
      <p>是否确定删除此收货地址</p>
      <p @click="que()">确认</p>
      <p @click="show2 = false;">取消</p>
    </van-popup>
    <div class="cg" v-show="show3">
      <img alt="" src="../../../assets/dizhi_shanchuchenggong.png">
      <p>删除成功</p>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import areaList from '../../../../config/area';
  import  request from "../../utils/request"
  export default {
    name: "bainji",
    data() {
      return {
        areaList,
        addressInfo: {},
        searchResult: [],
        show2: false,
        show3: false,
        dataList:"",
        is_default:"",
        isDefault:"",
        user_id:"",//用户编号
        addrid:"" //收货地址编码
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'sho',
        })
      },
      bj() {
        let addressInfo = new Object;
        //this.areaList = areaList;
        // Toast('编辑收货地址:' + index);
        // 进入编辑模式
        addressInfo = {
          //address: "北京市北京市东城区",
          province:"河南省",
          city:"信阳市",
          county:"潢川县",
          addressDetail: this.dataList.address,
          isDefault:this.is_default,
          name: this.dataList.consignee,
          tel: this.dataList.phone,


        }
        this.addressInfo = addressInfo;
      },
      onSave(e) {
        this.name = e.name;
        this.tel = e.tel;
        this.province=e.province
        this.city =e.city
        this.county=e.county
        //data.address = e.province + e.city + e.county + e.addressDetail + "";
        this.addressDetail = e.addressDetail;
        //data.areaCodeL = e.areaCode;
        //this.isDefault = e.isDefault;
        if(e.isDefault == true){
          this.isDefault =1
        }else {
          this.isDefault =0
        }
        request({
          url: "api/users/updaddr",
          method: "post",
          data: {
            user_id:this.user_id,
            addrid:this.addrid,
            consignee:this.name,
            phone:this.tel,
            province:this.province,
            city:this.city,
            area:this.county,
            address:this.addressDetail,
            is_default:this.isDefault
          }
        }).then(res => {
          //console.log(res)
           if (res.data.code == 200){
             Toast('修改地址成功');
           } else {
             Toast('修改地址失败');
           }
        }).catch(err=>{
          Toast('网络连接中断');
        })
      },
      que() {

        request({
          url: "api/users/deladdr",
          method: "post",
          data: {
            user_id:this.user_id,
            addrid:this.addrid,
          }
        }).then(res => {
          //console.log(res)
          if (res.data.code == 200){
            this.show3 = true;
            this.show2 = false;
            setTimeout(() => {
              this.fh()
            }, 1000);

          } else {
            Toast('删除地址失败');
          }
        }).catch(err=>{
          Toast('网络连接中断');
        })




      },

    },
    mounted() {
       this.dataList =  this.$route.params.arrList
       this.addrid = this.$route.params.id
       if (this.dataList.is_default == 1){
         this.is_default =true
       } else {
         this.is_default =false
       }
      this.bj()
      this.user_id = this.$store.state.username.id
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
    position: relative;
  }

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

  .nav-sc {
    float: right;
    position: absolute;
    top: 0;
    right: 4%;
    font-size: 0.3rem;
    color: #777777;
  }

  .popup {
    width: 7.1rem;
    height: 2.4rem;
    border-radius: 10px;
    margin: 0 auto;
  }

  .popup p:nth-child(1) {
    height: 0.8rem;
    font-size: 0.24rem;
    line-height: 0.8rem;
    text-align: center;
  }

  .popup p:nth-child(2) {
    height: 0.8rem;
    font-size: 0.3rem;
    line-height: 0.8rem;
    text-align: center;
    color: #EF0600;
  }

  .popup p:nth-child(3) {
    height: 0.8rem;
    font-size: 0.3rem;
    line-height: 0.8rem;
    text-align: center;
    color: #00A0E9;
  }

  .cg {
    width: 2.74rem;
    height: 2.02rem;
    background: rgba(0, 0, 0, 1);
    opacity: 0.6;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    margin-top: -1.01rem;
    left: 50%;
    margin-left: -1.37rem;
  }

  .cg img {
    width: 0.7rem;
    height: 0.7rem;
    margin-top: 0.4rem;
  }

  .cg p {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: 0.1rem;
  }
</style>
