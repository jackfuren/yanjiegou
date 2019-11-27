<!--<template>-->
<!--&lt;!&ndash;  <div class="a">&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="b">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="c">&ndash;&gt;-->
<!--&lt;!&ndash;        <div id="allmap"></div>&ndash;&gt;-->
<!--&lt;!&ndash;        <button @click="locationbtn">点击按钮开始定位</button>&ndash;&gt;-->
<!--&lt;!&ndash;        <p>{{b}}</p>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;  <div>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="scan"></div>&ndash;&gt;-->
<!--&lt;!&ndash;  <div id="bcid"></div>&ndash;&gt;-->
<!--&lt;!&ndash;    <footer>&ndash;&gt;-->
<!--&lt;!&ndash;      <button @click="startRecognize">扫码开始</button>&ndash;&gt;-->
<!--&lt;!&ndash;      <button @click="startScan">开始扫码</button>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <button @click="cancelScan1">结束扫描</button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;      <button @click="closeScan1">关闭控件</button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    </footer>&ndash;&gt;-->

<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--     <div class="scan">-->
<!--      <div id="bcid">-->
<!--        <div style="height:40%"></div>-->
<!--        <p class="tip">...载入中...</p>-->
<!--      </div>-->
<!--      <footer>-->
<!--        <button @click="startRecognize">1.创建控件</button>-->
<!--        <button @click="startScan">2.开始扫描</button>-->
<!--        <button @click="cancelScan">3.结束扫描</button>-->

<!--        <button @click="closeScan">4.关闭控件</button>-->
<!--      </footer>-->
<!--       <div>-->
<!--         <p>{{this.codeUrl}}</p>-->
<!--       </div>-->
<!--    </div>-->


<!--</template>-->

<!--<script type='text/ecmascript-6'>-->
<!--  let scan = null;-->
<!--  export default {-->
<!--    name: "cheshi",-->
<!--    data() {-->
<!--      return {-->
<!--        center: {lng: '', lat: ''},-->
<!--        zoom: 15,-->
<!--        b: '',-->
<!--        startScan:'',-->
<!--        codeUrl: '',-->
<!--        data:""-->

<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      startRecognize() {-->
<!--        let that = this;-->
<!--        if (!window.plus) return;-->
<!--        scan = new plus.barcode.Barcode('bcid');-->
<!--        scan.onmarked = onmarked;-->

<!--        function onmarked(type, result, file) {-->
<!--          switch (type) {-->
<!--            case plus.barcode.QR:-->
<!--              type = 'QR';-->
<!--              break;-->
<!--            case plus.barcode.EAN13:-->
<!--              type = 'EAN13';-->
<!--              break;-->
<!--            case plus.barcode.EAN8:-->
<!--              type = 'EAN8';-->
<!--              break;-->
<!--            default:-->
<!--              type = '其它' + type;-->
<!--              break;-->
<!--          }-->
<!--          result = result.replace(/\n/g, '');-->
<!--          //this.codeUrl = result;-->
<!--          this.codeUrl =1-->
<!--          alert(result);-->
<!--          //that.closeScan();-->

<!--        }-->
<!--      },-->
<!--      //开始扫描-->
<!--      startScan() {-->
<!--        if (!window.plus) return;-->
<!--        scan.start();-->
<!--        this.data=scan.start()-->
<!--      },-->
<!--      //关闭扫描-->
<!--      cancelScan() {-->
<!--        if (!window.plus) return;-->
<!--        scan.cancel();-->
<!--      },-->
<!--      //关闭条码识别控件-->
<!--      closeScan() {-->
<!--        if (!window.plus) return;-->
<!--        scan.close();-->
<!--      },-->

      // locationbtn() {
      //   let map = new BMap.Map('allmap');
      //   let point = new BMap.Point(this.center.lng, this.center.lat);
      //   map.centerAndZoom(point, 15)
      //   var geolocation = new BMap.Geolocation();
      //   geolocation.getCurrentPosition((r) => {
      //     if (r.point) {
      //       this.center.lng = r.longitude;
      //       this.center.lat = r.latitude;
      //
      //       alert('您当前经纬度：' + this.center.lng + ',' + this.center.lat);
      //       var point = new BMap.Point(this.center.lng, this.center.lat);//用当前定位的经纬度查找省市区街道等信息
      //
      //       var gc = new BMap.Geocoder();
      //       var _this = this
      //       gc.getLocation(point, function (rs) {
      //         var addComp = rs.addressComponents;
      //         _this.b = rs.address
      //         //console.log(addComp)
      //         //console.log(rs.address);//地址信息
      //         //console.log(rs.address);//弹出当前所在地址
      //       });
      //       let markers = new BMap.Marker(r.point);
      //       map.addOverlay(markers);
      //       map.panTo(r.point);
      //       map.centerAndZoom(r.point, 16);
      //     }
      //   })
      // },



<!--//       startRecognize1() {-->
<!--//         document.getElementById('bcid').style.display = 'block';-->
<!--//         document.getElementsByClassName('scanCode')[0].style.display = 'none';-->
<!--//         let that = this;-->
<!--//         if (!window.plus) return;-->
<!--//         scan = new plus.barcode.Barcode('bcid');-->
<!--//         scan.onmarked = onmarked;-->
<!--//         setTimeout(function(){-->
<!--//           that.startScan1();-->
<!--//         },100)-->
<!--//-->
<!--//         function onmarked(type, result, file) {-->
<!--//           switch (type) {-->
<!--//             case plus.barcode.QR:-->
<!--//               type = 'QR';-->
<!--//               break;-->
<!--//             case plus.barcode.EAN13:-->
<!--//               type = 'EAN13';-->
<!--//               break;-->
<!--//             case plus.barcode.EAN8:-->
<!--//               type = 'EAN8';-->
<!--//               break;-->
<!--//             default:-->
<!--//               type = '其它' + type;-->
<!--//               break;-->
<!--//           }-->
<!--//           result = result.replace(/\n/g, '');-->
<!--//           that.codeUrl = result;-->
<!--//           alert(that.codeUrl);-->
<!--//           if(that.codeUrl){-->
<!--//             that.cancelScan1();-->
<!--//             that.closeScan1();-->
<!--//           }-->
<!--//         }-->
<!--//       },-->
<!--//开始扫描-->
<!--//       startScan1() {-->
<!--//         if (!window.plus) return;-->
<!--//         scan.start();-->
<!--//       },-->
<!--//          //关闭扫描-->
<!--//       cancelScan1() {-->
<!--//         if (!window.plus) return;-->
<!--//         scan.cancel();-->
<!--//       },-->
<!--//           //关闭条码识别控件-->
<!--//       closeScan1() {-->
<!--//         document.getElementById('bcid').style.display = 'none';-->
<!--//         document.getElementsByClassName('scanCode')[0].style.display = 'block';-->
<!--//         if (!window.plus) return;-->
<!--//         scan.close();-->
<!--//       },-->
<!--//       startRecognize() {-->
<!--//         scan = new plus.barcode.Barcode('bcid');-->
<!--//         scan.onmarked = onmarked;-->
<!--//         this.startScan-->
<!--//       },-->
<!--//       startScan () {-->
<!--//         scan.start();-->
<!--//       },-->
<!--//        onmarked( type, result ) {-->
<!--//     var text = '未知: ';-->
<!--//     switch(type){-->
<!--//       case plus.barcode.QR:-->
<!--//         text = 'QR: ';-->
<!--//         break;-->
<!--//       case plus.barcode.EAN13:-->
<!--//         text = 'EAN13: ';-->
<!--//         break;-->
<!--//       case plus.barcode.EAN8:-->
<!--//         text = 'EAN8: ';-->
<!--//         break;-->
<!--//     }-->
<!--//     alert( text+result );-->
<!--//   }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style  >-->
<!--  /*.a {*/-->
<!--  /*  width: 7.5rem;*/-->

<!--  /*  overflow: hidden;*/-->
<!--  /*  position: relative;*/-->
<!--  /*}*/-->

<!--  /*.b {*/-->
<!--  /*  width: 7.8rem;*/-->
<!--  /*  height: 20rem;*/-->
<!--  /*  background: antiquewhite;*/-->
<!--  /*  overflow-x: hidden;*/-->
<!--  /*  overflow-y: scroll;*/-->
<!--  /*}*/-->

<!--  /*.c {*/-->
<!--  /*  color: black;*/-->
<!--  /*}*/-->
<!--  /*#bcid{*/-->
<!--  /*  width: 200px;*/-->
<!--  /*  height: 200px;*/-->
<!--  /*  margin: 3rem auto;*/-->
<!--  /*  border: 1px solid black;*/-->
<!--  /*}*/-->
<!--  .scan {-->
<!--    height: 100%;-->
<!--  }-->
<!--  #bcid {-->
<!--    width: 100%;-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    right: 0;-->
<!--    top: 0;-->
<!--    bottom: 3rem;-->
<!--    text-align: center;-->
<!--    color: #fff;-->
<!--    background: #ccc;-->
<!--  }-->

<!--  footer {-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    bottom: 1rem;-->
<!--    height: 2rem;-->
<!--    line-height: 2rem;-->
<!--    z-index: 2;-->
<!--  }-->

<!--</style>-->
<!--<template>-->
<!--    <span :endTime="endTime" :callback="callback" :endText="endText">-->
<!--        <slot>-->
<!--            {{content}}-->
<!--        </slot>-->
<!--    </span>-->
<!--</template>-->
<!--<script>-->
<!--  export default {-->
<!--    data(){-->
<!--      return {-->
<!--        content: '',-->
<!--      }-->
<!--    },-->
<!--    props:{-->
<!--      endTime:{-->
<!--        type: String,-->
<!--        default :1490761620-->
<!--      },-->
<!--      endText:{-->
<!--        type : String,-->
<!--        default:'已结束'-->
<!--      },-->
<!--      callback : {-->
<!--        type : Function,-->
<!--        default :''-->
<!--      }-->
<!--    },-->
<!--    mounted () {-->
<!--      this.countdowm(this.endTime)-->
<!--    },-->
<!--    methods: {-->
<!--      countdowm(timestamp){-->
<!--        let self = this;-->
<!--        let timer = setInterval(function(){-->
<!--          let nowTime = new Date();-->
<!--          let endTime = new Date(timestamp * 1000);-->
<!--          let t = endTime.getTime() - nowTime.getTime();-->
<!--          if(t>0){-->
<!--            let day = Math.floor(t/86400000);-->
<!--            let hour=Math.floor((t/3600000)%24);-->
<!--            let min=Math.floor((t/60000)%60);-->
<!--            let sec=Math.floor((t/1000)%60);-->
<!--            hour = hour < 10 ? "0" + hour : hour;-->
<!--            min = min < 10 ? "0" + min : min;-->
<!--            sec = sec < 10 ? "0" + sec : sec;-->
<!--            let format = '';-->
<!--            if(day > 0){-->
<!--              format =  `${day}天${hour}小时${min}分${sec}秒`;-->
<!--            }-->
<!--            if(day <= 0 && hour > 0 ){-->
<!--              format = `${hour}小时${min}分${sec}秒`;-->
<!--            }-->
<!--            if(day <= 0 && hour <= 0){-->
<!--              format =`${min}分${sec}秒`;-->
<!--            }-->
<!--            self.content = format;-->
<!--          }else{-->
<!--            clearInterval(timer);-->
<!--            self.content = self.endText;-->
<!--            self._callback();-->
<!--          }-->
<!--        },1000);-->
<!--      },-->
<!--      _callback(){-->
<!--        if(this.callback && this.callback instanceof Function){-->
<!--          this.callback(...this);-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <div class="a">-->
<!--  <happy-scroll rgba(51,51,51,0.2)   size="1">-->
<!--      <div class="nav">-->

<!--      </div>-->
<!--  </happy-scroll>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  // import tui from '../components/gongyongzujian/tuijian'-->
<!--  import { HappyScroll } from 'vue-happy-scroll'-->
<!--  // 引入css，推荐将css放入main入口中引入一次即可。-->
<!--  import 'vue-happy-scroll/docs/happy-scroll.css'-->
<!--  export default {-->
<!--    name: "cheshi",-->
<!--    data() {-->
<!--      return {}-->
<!--    },-->
<!--    components: {-->

<!--      HappyScroll-->
<!--    }-->
<!--  }-->
<!--</script>-->
<!--<style scoped>-->
<!-- .nav{-->
<!--   width: 6rem;-->
<!--   height: 200vh;-->
<!--   background: #EF0600;-->
<!-- }-->
<!--  .a{-->
<!--    width: 7rem;-->
<!--    height: 120vh;-->
<!--  }-->
<!--</style>-->
<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="wrapper">-->
<!--      <div :key="index" :style="{'height':index==0?'1000px':'500px'}" class="section" style="height:500px;width:100%"-->
<!--           v-for="(item, index) in list">-->
<!--        <div :style="{'background':item.backgroundcolor}"-->
<!--             style="width:100%;height:100%;font-size:30px;text-align:center;font-weight:bold;color:#fff;">{{item.name}}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div id="nac" style="height:500px;"></div>-->
<!--    <nav style="position:fixed;right:30px;top:300px;">-->
<!--      <a :class="index==0?'current':''" :key="index" @click="jump(index)" class="nav1" v-for="(item, index) in navList">{{item}}</a>-->
<!--    </nav>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--  export default {-->
<!--    data() {-->
<!--      return {-->
<!--        scroll: '',-->
<!--        list: [{-->
<!--          name: "第一条",-->
<!--          backgroundcolor: "#90B2A3"-->
<!--        }, {-->
<!--          name: "第二条",-->
<!--          backgroundcolor: "#A593B2"-->
<!--        }, {-->
<!--          name: "第三条",-->
<!--          backgroundcolor: "#A7B293"-->
<!--        }, {-->
<!--          name: "第四条",-->
<!--          backgroundcolor: "#0F2798"-->
<!--        }, {-->
<!--          name: "第五条",-->
<!--          backgroundcolor: "#0A464D"-->
<!--        }],-->
<!--        navList: [1, 2, 3, 4, 5]-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      dataScroll: function () {-->
<!--        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;-->
<!--      },-->
<!--      jump(index) {-->
<!--        let jump = document.getElementsByClassName('section');-->
<!--        // 获取需要滚动的距离-->
<!--        let total = jump[index].offsetTop;-->
<!--        // Chrome-->
<!--        document.body.scrollTop = total;-->
<!--        // Firefox-->
<!--        document.documentElement.scrollTop = total;-->
<!--        // Safari-->
<!--        window.pageYOffset = total;-->
<!--        // $('html, body').animate({-->
<!--        // 'scrollTop': total-->
<!--        // }, 400);-->
<!--      },-->
<!--      loadSroll: function () {-->
<!--        var self = this;-->
<!--        var $navs = $(".nav1");-->
<!--        var sections = document.getElementsByClassName('section');-->
<!--        for (var i = sections.length - 1; i >= 0; i&#45;&#45;) {-->
<!--          if (self.scroll >= sections[i].offsetTop - 100) {-->
<!--            $navs.eq(i).addClass("current").siblings().removeClass("current")-->
<!--            break;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    watch: {-->
<!--      scroll: function () {-->
<!--        this.loadSroll()-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      window.addEventListener('scroll', this.dataScroll);-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style>-->
<!--  * {-->
<!--    padding: 0;-->
<!--    margin: 0;-->
<!--  }-->

<!--  .nav1 {-->
<!--    display: block;-->
<!--    width: 40px;-->
<!--    height: 40px;-->
<!--    text-align: center;-->
<!--    line-height: 40px;-->
<!--    background: #eee;-->
<!--    margin: 10px 0;-->
<!--  }-->

<!--  .current {-->
<!--    color: #fff;-->
<!--    background: red;-->
<!--  }-->
<!--</style>-->
<!--<template>-->
<!--  <div>-->
<!--    <div>-->
<!--      <form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do' method='post'>-->
<!--        <input type='hidden' name='app_id' value='2019060265440176'/>-->
<!--        <input type='hidden' name='method' value='alipay.trade.wap.pay'/>-->
<!--        <input type='hidden' name='format' value='JSON'/>-->
<!--        <input type='hidden' name='charset' value='utf-8'/>-->
<!--        <input type='hidden' name='sign_type' value='RSA2'/>-->
<!--        <input type='hidden' name='version' value='1.0'/>-->
<!--        <input type='hidden' name='return_url' value='http://svn.yanjiegou.com/api/alipay/returnurl'/>-->
<!--        <input type='hidden' name='notify_url' value='http://svn.yanjiegou.com/api/alipay/notify'/>-->
<!--        <input type='hidden' name='timestamp' value='2019-06-24 15:53:24'/>-->
<!--        <input type='hidden' name='sign' value='mQCR06kjtMU78yPFLGRCy/X/pM0eic8ZHrAa06X/7/rjt8YNPS+vqZrVOP+DeNGyhfg7eAyyD0bPbgZ0n08yuDob5zdY/B/wZtN8V+3abW6Iof+vZbhPwarTst0d2P/+5nO4rKvBTnpCjYgkp/70eE9RIn7F+oUXbGKY4Xizw4kLgEZFGWjNzZpPf3MpA37ddxaeq9qkzZXmuF3d5FEvGzZaVvr9r17m21Vra55HpTk3BUjotlH62WNn2NSxTXsHaaT+4LQOlO/yYsfr6m5sJgRxX6RgnmwHwbwiXOW0YEgFyyG+NuXj+qX8d2m93P/5OamerOkFYVso7/+lR3NauQ=='/>-->
<!--        <input type='hidden' name='biz_content' value='{"out_trade_no":"I624628038663666","total_amount":"10000.00","subject":"\u8d2d\u4e70","notify_url":"http:\/\/svn.yanjiegou.com\/api\/alipay\/returnurl","product_code":"QUICK_WAP_WAY"}'/>-->
<!--        <input type='submit' value='ok' style='display:none;'>-->
<!--      </form>-->
<!--      -->
<!--      <script>document.forms['alipaysubmit'].submit();</script>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  // import Vue from 'vue'-->
<!--  // import VueScroller from 'vue-scroller'-->
<!--  // Vue.use(VueScroller)-->

<!--  export default {-->
<!--    name: 'hello',-->
<!--    data () {-->
<!--      return {-->
<!--        // msg: 'Welcome to Your Vue.js App',-->
<!--        // items: [],-->
<!--        // allData: [],-->
<!--        // page: 1,-->
<!--        // total: '21'-->
<!--      }-->
<!--    },-->
<!--    mounted () {-->
<!--    },-->
<!--    methods: {-->
<!--      // refresh (done) {-->
<!--      //   //console.log('下拉刷新')-->
<!--      // },-->
<!--      // infinite (done) {-->
<!--      //   //console.log('上拉')-->
<!--      //   let vm = this-->
<!--      //   let page = vm.page-->
<!--      //   if (vm.allData.length < vm.total) {-->
<!--      //     vm.getData(page).then(function () {-->
<!--      //       setTimeout(() => {-->
<!--      //         done()-->
<!--      //       }, 1500)-->
<!--      //     })-->
<!--      //   }-->
<!--      // },-->
<!--      // getData (page) {-->
<!--      //   //console.log(page)-->
<!--      //   let vm = this-->
<!--      //   if (page === 1) {-->
<!--      //     vm.allData = []-->
<!--      //   }-->
<!--      //   return this.$axios.post('http://api.jcwz.shop:81/api/admin/rundata', {-->
<!--      //     params: {-->
<!--      //       per_page: 20,-->
<!--      //       page: page-->
<!--      //     }-->
<!--      //   })-->
<!--      //     .then((response) => {-->
<!--      //       vm.total = response.data.data.total-->
<!--      //       //console.log(vm.total)-->
<!--      //       let myData = []-->
<!--      //       myData = response.data.data.data-->
<!--      //       for (let i = 0; i < myData.length; i++) {-->
<!--      //         this.allData.push(myData[i])-->
<!--      //       }-->
<!--      //       if (myData.length < 20) { // 没有更多数据-->
<!--      //         setTimeout(() => {-->
<!--      //           vm.$refs.my_scroller.finishInfinite(2)-->
<!--      //         })-->
<!--      //       }-->
<!--      //       vm.page = vm.page + 1-->
<!--      //       //console.log('数据&#45;&#45;', this.allData)-->
<!--      //     }, (error) => {-->
<!--      //       //console.log(error)-->
<!--      //     })-->
<!--      // }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style>-->
<!--  /*html, body {*/-->
<!--  /*  margin: 0;*/-->
<!--  /*}*/-->
<!--  /** {*/-->
<!--  /*  box-sizing: border-box;*/-->
<!--  /*}*/-->
<!--  /*.row {*/-->
<!--  /*  width: 100%;*/-->
<!--  /*  height: 50px;*/-->
<!--  /*  padding: 10px 0;*/-->
<!--  /*  font-size: 16px;*/-->
<!--  /*  line-height: 30px;*/-->
<!--  /*  text-align: center;*/-->
<!--  /*  color: #444;*/-->
<!--  /*  background-color: #fff;*/-->
<!--  /*}*/-->
<!--  /*.grey-bg {*/-->
<!--  /*  background-color: #eee;*/-->
<!--  /*}*/-->
<!--  /*.header {*/-->
<!--  /*  position: fixed;*/-->
<!--  /*  top: 0;*/-->
<!--  /*  left: 0;*/-->
<!--  /*  height: 44px;*/-->
<!--  /*  width: 100%;*/-->
<!--  /*  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);*/-->
<!--  /*  background-color: #fff;*/-->
<!--  /*  z-index: 1000;*/-->
<!--  /*  color: #666;*/-->
<!--  /*}*/-->
<!--  /*.header > .title {*/-->
<!--  /*  font-size: 16px;*/-->
<!--  /*  line-height: 44px;*/-->
<!--  /*  text-align: center;*/-->
<!--  /*  margin: 0 auto;*/-->
<!--  /*}*/-->
<!--</style>-->
