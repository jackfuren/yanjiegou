<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
      <p>新建收货地址</p>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      @save="onSave"
      show-search-result

    />
  </div>
</template>

<script>
  import areaList from '../../../../config/area';
  import  request from "../../utils/request";
  import Vue from 'vue'
  import { Toast } from 'vant';
  Vue.use(Toast);
  export default {
    name: "xinjian",
    data() {
      return {
        areaList,
        searchResult: [],
        user_id:"",//用户编号
        name:"",//姓名
        tel:"",//手机号
        province:"",//省
        city:"",//市
        county:"",//区
        addressDetail:"", //详细地址
        isDefault:"",//默认地址
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'sho',
        })
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
          url: "api/users/addaddr",
          method: "post",
          data: {
            user_id:this.user_id,
            consignee:this.name,
            phone:this.tel,
            province:this.province,
            city:this.city,
            area:this.county,
            address:this.addressDetail,
            is_default:this.isDefault
          }
        }).then(res => {
          if (res.data.code == 200){
            Toast('保存成功')
            this.timer = setTimeout(()=>{   //设置延迟执行
              this.$router.push({
                name: "sho"
              })
            },2000);
          }
        })

      }
    },
    mounted() {
      this.user_id = this.$store.getters.userName.id
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

  .van-cell span {
    text-align: left;
  }
</style>
