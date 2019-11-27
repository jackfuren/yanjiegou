<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>选择定位地址</p>
        <div class="nav-div">

          <div class="location">
            <img src="../../assets/dddd.png" alt="">
            <p>{{dz}}</p>
          </div>
          <van-search placeholder="搜索" shape="round" v-model="value" @search="onSearch"/>
        </div>
				<div id='container1' style="display:none"></div>
      </div>
      <!--当前定位-->
      <div class="gps">
        <p @click="dw()">
          <img src="../../assets/cxdw.png" alt="">
          {{a}}
        </p>
        <p @click="show=true">选择更多
          <van-icon class="icon-arrow" style="position: relative;top:0.02rem" name="arrow"/>
        </p>
      </div>
      <!--热门商圈-->
      <div class="hot">
        <p class="hot-p">热门商圈</p>
        <div :key="item.id" class="index_city" v-for="(item) in list">
          <div class="city_images">
            <img :src="item.headimg" alt="">
            <div class="bg">
              <span><b>-</b> &nbsp;{{item.name}}&nbsp; <b>-</b></span>
              <p>{{item.intro}}</p>
            </div>
          </div>

        </div>
      </div>
      <!--省市区连动-->
      <van-popup :overlay="true" position="bottom" v-model="show">
        <van-area :area-list="areaList" @cancel="quxiao()" @change="OnChange" @confirm="que"/>
      </van-popup>
      <div class="city" v-if="ss">
        <div class="city-div" v-for="(item,index) in dataList">
          <p @click="dian(item)">{{item.area_name}}</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<!-- <script src="https://webapi.amap.com/maps?v=1.4.15&key=e785b2d68f5c945dd0b7f293c6db3d3b&callback=init"></script> -->
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=e785b2d68f5c945dd0b7f293c6db3d3b&plugin=AMap.Geocoder&callback=init"></script>
<script>
  import areaList from '../../../config/area';

  export default {
    name: "GPS",
    data() {
      return {
        areaList,
        list: [],
        show: false,
        place: '',
        value: "",
        dz: window.localStorage.getItem('site') || "正在获取",
        a: "重新定位",
        dataList: [],
		jingwei:'',
        ss:false,
		aqw:''	
      }
    },
    methods: {
      que:function (picker) {
		this.aqw=picker[1].name//运城市
        this.place =picker[2].name//闻喜县
        this.show = false
		console.log(this.place)
        window.localStorage.setItem('site',this.place)
        let b= window.localStorage.getItem('site')
        window.sessionStorage.setItem('site', b)
        const that = this
        window.init=function(){
        	var map = new AMap.Map("container", {
        		resizeEnable: true
        	});
        }
        var geocoder
        AMap.plugin("AMap.Geocoder",function(){
        			  geocoder = new AMap.Geocoder({
        				city: "", //城市设为北京，默认：“全国”
        			  });
        })
        var marker = new AMap.Marker();
        var val=this.place
        window.localStorage.setItem('site',this.value)
        function geoCode() {
            geocoder.getLocation(val, function(status, result) {
        				  console.log(status,result)
                if (status === 'complete'&&result.geocodes.length) {
                    var lng = result.geocodes[0].location.lng
        					  var lat = result.geocodes[0].location.lat
        					  console.log(lng,lat)
        					  window.sessionStorage.setItem('lat', lat)
        					  window.sessionStorage.setItem('lng', lng)
                }else{
                    log.error('根据地址查询位置失败');
                }
            });
        }
		geoCode();
		this.$router.push({
		  name: 'home',
		})
      },
      quxiao() {
        this.show = false
      },
      OnChange: function (picker) {
        // this.place = ""
        // for (var i = 0; i < 3; i++) {
        //   this.place += picker.getValues()[i].name
        // }
        //
      },
      fh() {
        this.$router.push({
          name: 'home',
        })
      },
      dw() {
        this.a = "正在定位"
        this.getLocation()
      },
      getLocation() { 
				// 从高德地图api获取浏览器定位
        const that = this
				var map1 = new AMap.Map('container1', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
						enableHighAccuracy: true,//是否使用高精度定位，默认:true
						timeout: 10000,          //超过10秒后停止定位，默认：5s
						buttonPosition: 'RB',    //定位按钮的停靠位置
						buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点	
          })
					map1.addControl(geolocation);
					// AMap.addControl(geolocation);
          geolocation.getCurrentPosition()
					 AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)
          function onComplete(data) {
            // data是具体的定位信息
            console.log(data)
						
						// let aaa=data.formattedAddress
						// let ccc="路"
						// let eee=data.addressComponent.streetNumber
						//  for(var l=0;l<aaa.length;l++){
						// 	 if(ccc==aaa[l]){
						// 		 var b=aaa.substring(l+1,aaa.length).split(eee).join("")
						// 		 
						// 	 }
						//  }
						 var b=data.addressComponent.neighborhood
            that.a = "定位成功"
						console.log(b)
              window.localStorage.setItem('site', b)
              that.$router.push({
                name: 'home',
              })
          }
          function onError(data) {
            // 定位出错
            //that.a = "定位失败"
           that.getLatLngLocation()
          }
        })
      },
	  onSearch(){
		  const that = this
		  window.init=function(){
			  var map = new AMap.Map("container", {
			      resizeEnable: true
			  });
		  }
		  var geocoder
		  AMap.plugin("AMap.Geocoder",function(){
			  geocoder = new AMap.Geocoder({
				city: "", //城市设为北京，默认：“全国”
			  });
		  })
		  var marker = new AMap.Marker();
		  var val=this.value
		  window.sessionStorage.setItem('site',this.value)
		  function geoCode() {
		      geocoder.getLocation(val, function(status, result) {
				  console.log(status,result)
		          if (status === 'complete'&&result.geocodes.length) {
		              var lng = result.geocodes[0].location.lng
					  var lat = result.geocodes[0].location.lat
					  console.log(lng,lat)
					  window.sessionStorage.setItem('lat', lat)
					  window.sessionStorage.setItem('lng', lng)
		          }else{
		              log.error('根据地址查询位置失败');
		          }
		      });
		  }
		     geoCode();
			 this.$router.push({
			   name: 'home',
			 })
		  	 
	  },
      getLatLngLocation() {
        const that = this
				//AMap.CitySearch( )构造函数，提供IP定位返回所在城市信息功能
        AMap.plugin('AMap.CitySearch', function () {
          let citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              AMap.plugin('AMap.Geocoder', function () {
                let geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: result.citycode
                })
                let lnglat = result.rectangle.split(";")[0].split(",")
                geocoder.getAddress(lnglat, function (status, data) {
                  if (status === 'complete' && data.info === 'OK') {
                    // data为对应的地理位置详细信息
					console.log(data.regeocode.addressComponent)
                    let b = data.regeocode.addressComponent.district
                    window.localStorage.setItem('site', b)
                    that.a = "定位成功"
                    that.$router.push({
                      name: 'home',
                    })
                  }
                })
              })
            }
          })
        })
      },
      dian(i){
				console.log(i)
        window.localStorage.setItem('site',i.area_name)
        let b= window.localStorage.getItem('site')
        window.sessionStorage.setItem('site',b)
        this.$router.push({
          name: 'home',
        })
      }
    },
    mounted() {
			//热门商圈
      this.request({
        url: "api/index/bigshop",
        method: "post",

      }).then(res => {
        // console.log(res.data.data)
        this.list = res.data.data
      })
    },
   //  watch: {
   //    value: function (i) {
			// 	// console.log(i)
   //      if (i.length == 0) {
   //        this.ss = false
   //      } else {
   //       geoCode();
		 // console.log(this.jingwei)
   //      }

   //    }
   //  },
    filters: {
      getCaption(obj) {
				// console.log(obj)
        // var obj = "河南省郑州市管城回族区商都路街道榆林北路升龙广场"
        var index = obj.lastIndexOf("路");
        obj = obj.substring(index + 1, obj.length);

        var index = obj.lastIndexOf("道")
        obj = obj.substring(index + 1, obj.length);

        return obj;
      }

    }

  }
</script>

<style lang="less" scoped>
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

  .location {
    display: inline-block;
    font-size: 0.28rem;
    min-width: 2rem;
    height: 0.88rem;
    line-height: 0.88rem;
    position: relative;
    text-align: left;
    float: left;
  }

  .location img {
    width: 0.23rem;
    height: 0.3rem;
    margin-left: 0.3rem;
    position: relative;
    top: 0.01rem;
  }

  .location p {
    line-height: 1rem;
    position: relative;
    top: -0.02rem;
    display: inline-block;
    font-size: 0.28rem !important;
  }


  /*搜索*/
  .nav {
    width: 100%;
    height: 1.76rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #F7F7F7;
  }

  .nav p {
    font-size: 0.34rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
    color: #BBBBBB;
  }

  .nav-div {
    width: 100%;
    height: 0.88rem;
    position: relative;
  }

  .van-search {
    width: 3.25rem;
    height: 0.66rem;
    display: inline-block;
    padding: 0;
    margin-left: 0.3rem;
    position: absolute;
    top: 0.1rem;
    right: 0.3rem;
  }

  /*当前定位*/
  .gps {
    width: 6.9rem;
    margin: 0 auto;
    text-align: left;
    font-size: 0.27rem;
    margin-top: 0.4rem;
  }

  .gps img {
    width: 0.24rem;
    height: 0.24rem;
    position: relative;
    top: 0.01rem;
  }


  .gps p:nth-child(1) {
    width: 1.8rem;
    height: 0.5rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    line-height: 0.55rem;
    display: inline-block;
    text-align: center;
    color: #EF0600;
  }

  .icon-locat {
    position: relative;
    top: 0.05rem;
    left: -0.1rem;
  }

  .gps p:nth-child(2) {
    width: 1.8rem;
    height: 0.5rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    line-height: 0.55rem;
    display: inline-block;
    text-align: center;
    margin-left: 0.2rem;
  }

  .icon-arrow {
    position: relative;
    top: 0.06rem;
  }

  /*热门商圈*/
  .hto {
    width: 6.9rem;
    margin: 0 auto;
  }

  .index_city {
    width: 6.9rem;
    height: 2.27rem;
    margin-top: 0.2rem;

  }

  .index_city img {
    width: 6.9rem;
    height: 2.26rem;
    position: absolute;
    left: 50%;
    margin-left: -3.45rem;
    border-radius: 10px;
  }

  .bg {
    position: absolute;
    color: #FFFFFF;
    margin-top: 0.5rem;
    left: 50%;
    margin-left: -2.5rem;
  }

  .bg span {
    font-size: 0.36rem;

  }

  .bg p {
    font-size: 0.24rem;
    width: 5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 0.4rem;
  }

  .hot-p {
    text-align: left;
    font-size: 0.28rem;
    color: #777777;
    height: 0.8rem;
    line-height: 1rem;
    margin-left: 0.3rem;
  }

  /deep/ .van-search__content--round {
    height: 0.66rem;


  }

  /deep/ .van-field__control::-webkit-input-placeholder { /* WebKit browsers */
    color: #CCCCCC;
    font-size: 0.28rem;
    position: relative;
    bottom: -0.01rem;
  }

  /deep/ .van-icon {
    bottom: -0.01rem;
  }

  //城市选择
  .city {
    width: 100%;
    background: white;
    position: absolute;
    top: 1.76rem;
    z-index: 99999;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .city-div {
    width: 6.7rem;
    padding: 0.2rem 0.4rem;
    margin: 0 auto;
    text-align: left;
    font-size: 0.28rem;
  }
  .city-div p {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #E3E3E3;
  }
  .city::-webkit-scrollbar {
    display: none;
  }
</style>
