import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

//使用reqiure.ensure路由懒加载
const  home = resolve=>{
  require.ensure(['@/components/home/home'],()=>{
    resolve(require('@/components/home/home'));
  })
}
const  gps = resolve=>{
  require.ensure(['@/components/home/GPS'],()=>{
    resolve(require('@/components/home/GPS'));
  })
}
const  seek = resolve=>{
  require.ensure(['@/components/home/seek'],()=>{
    resolve(require('@/components/home/seek'));
  })
}
const  qd = resolve=>{
  require.ensure(['@/components/home/qiandao/qiandao'],()=>{
    resolve(require('@/components/home/qiandao/qiandao'));
  })
}
const wdqd = resolve=>{
  require.ensure(['@/components/home/qiandao/wodeqiandao'],()=>{
    resolve(require('@/components/home/qiandao/wodeqiandao'));
  })
}
const  mar = resolve=>{
  require.ensure(['@/components/home/market/market'],()=>{
    resolve(require('@/components/home/market/market'));
  })
}
const dpxq = resolve=>{
  require.ensure(['@/components/home/market/dianpuxianqing'],()=>{
    resolve(require('@/components/home/market/dianpuxianqing'));
  })
}
const wpxq = resolve=>{
  require.ensure(['@/components/home/market/wupinxiangqing'],()=>{
    resolve(require('@/components/home/market/wupinxiangqing'));
  })
}
const sypj = resolve=>{
  require.ensure(['@/components/home/market/suoyoupingjia'],()=>{
    resolve(require('@/components/home/market/suoyoupingjia'));
  })
}
const jb = resolve=>{
  require.ensure(['@/components/home/market/jubao'],()=>{
    resolve(require('@/components/home/market/jubao'));
  })
}


const shops = resolve=>{
  require.ensure(['@/components/home/market/shops'],()=>{ //商家信息
    resolve(require('@/components/home/market/shops'));
  })
}
const ssxqy = resolve=>{
  require.ensure(['@/components/home/market/sousuoxianqingye'],()=>{
    resolve(require('@/components/home/market/sousuoxianqingye'));
  })
}
const kf = resolve=>{
  require.ensure(['@/components/home/market/kefu'],()=>{
    resolve(require('@/components/home/market/kefu'));
  })
}

const reimai = resolve=>{
  require.ensure(['@/components/home/reima/reimai'],()=>{
    resolve(require('@/components/home/reima/reimai'));
  })
}
const com = resolve=>{
  require.ensure(['@/components/home/reima/complete'],()=>{
    resolve(require('@/components/home/reima/complete'));
  })
}
const dm = resolve=>{
  require.ensure(['@/components/home/duanma'],()=>{
    resolve(require('@/components/home/duanma'));
  })
}
const tj = resolve=>{
  require.ensure(['@/components/home/tejia'],()=>{
    resolve(require('@/components/home/tejia'));
  })
}
const ph = resolve=>{
  require.ensure(['@/components/home/paihang'],()=>{
    resolve(require('@/components/home/paihang'));
  })
}

// 活动
const hd = resolve=>{
  require.ensure(['@/components/huodong/huodong'],()=>{
    resolve(require('@/components/huodong/huodong'));
  })
}

//购物车

const Shop = resolve=>{
  require.ensure(['@/components/shopping/cart'],()=>{
    resolve(require('@/components/shopping/cart'));
  })
}
const js = resolve=>{
  require.ensure(['@/components/shopping/jiesuan'],()=>{
    resolve(require('@/components/shopping/jiesuan'));
  })
}
// const tp = resolve=>{
//   require.ensure(['@/components/shopping/timePicker'],()=>{
//     resolve(require('@/components/shopping/timePicker'));
//   })
// }
const dd = resolve=>{
  require.ensure(['@/components/shopping/dingdan'],()=>{
    resolve(require('@/components/shopping/dingdan'));
  })
}

const qx = resolve=>{
  require.ensure(['@/components/shopping/quxiaodiangdan'],()=>{
    resolve(require('@/components/shopping/quxiaodiangdan'));
  })
}
const fh = resolve=>{
  require.ensure(['@/components/shopping/fahuo'],()=>{
    resolve(require('@/components/shopping/fahuo'));
  })
}
const zqfk = resolve=>{
  require.ensure(['@/components/shopping/ziqufukuan'],()=>{
    resolve(require('@/components/shopping/ziqufukuan'));
  })
}
const sh = resolve=>{
  require.ensure(['@/components/shopping/shouhuo'],()=>{
    resolve(require('@/components/shopping/shouhuo'));
  })
}
const pssj = resolve=>{
  require.ensure(['@/components/shopping/peisongshangjia'],()=>{
    resolve(require('@/components/shopping/peisongshangjia'));
  })
}
const psw = resolve=>{
  require.ensure(['@/components/shopping/peisongwan'],()=>{
    resolve(require('@/components/shopping/peisongwan'));
  })
}
const wl = resolve=>{
  require.ensure(['@/components/shopping/wuliu'],()=>{
    resolve(require('@/components/shopping/wuliu'));
  })
}

//我的
const My = resolve=>{
  require.ensure(['@/components/my/myCenter'],()=>{
    resolve(require('@/components/my/myCenter'));
  })
}
const cs = resolve=>{
  require.ensure(['@/components/cheshi'],()=>{
    resolve(require('@/components/cheshi'));
  })
}
const Help = resolve=>{
  require.ensure(['@/components/my/Help/help'],()=>{
    resolve(require('@/components/my/Help/help'));
  })
}
const  cus = resolve=>{
  require.ensure(['@/components/my/Help/customer'],()=>{
    resolve(require('@/components/my/Help/customer'));
  })
}
const  det = resolve=>{
  require.ensure(['@/components/my/Help/details'],()=>{
    resolve(require('@/components/my/Help/details'));
  })
}

const   iss = resolve=>{
  require.ensure(['@/components/my/Help/issue'],()=>{
    resolve(require('@/components/my/Help/issue'));
  })
}
const  sho = resolve=>{
  require.ensure(['@/components/my/Site/shouhuo'],()=>{
    resolve(require('@/components/my/Site/shouhuo'));
  })
}
const xj = resolve=>{
  require.ensure(['@/components/my/Site/xinjian'],()=>{
    resolve(require('@/components/my/Site/xinjian'));
  })
}
const bj = resolve=>{
  require.ensure(['@/components/my/Site/bainji'],()=>{
    resolve(require('@/components/my/Site/bainji'));
  })
}

const set = resolve=>{
  require.ensure(['@/components/my/set'],()=>{
    resolve(require('@/components/my/set'));
  })
}
const pim  = resolve=>{
  require.ensure(['@/components/my/Set/pim'],()=>{
    resolve(require('@/components/my/Set/pim'));
  })
}
const our  = resolve=>{
  require.ensure(['@/components/my/Set/our'],()=>{
    resolve(require('@/components/my/Set/our'));
  })
}
const zh = resolve=>{
  require.ensure(['@/components/my/Set/zhanghao'],()=>{
    resolve(require('@/components/my/Set/zhanghao'));
  })
}
const xgp = resolve=>{
  require.ensure(['@/components/my/Set/zhanghaomima/xiugaiphone'],()=>{
    resolve(require('@/components/my/Set/zhanghaomima/xiugaiphone'));
  })
}
const xgpt = resolve=>{
  require.ensure(['@/components/my/Set/zhanghaomima/xiugaiphonetwo'],()=>{
    resolve(require('@/components/my/Set/zhanghaomima/xiugaiphonetwo'));
  })
}
const  wjmm = resolve=>{
  require.ensure(['@/components/my/Set/zhanghaomima/wangjimima'],()=>{
    resolve(require('@/components/my/Set/zhanghaomima/wangjimima'));
  })
}
const wjmmt = resolve=>{
  require.ensure(['@/components/my/Set/zhanghaomima/wangjimimatwo'],()=>{
    resolve(require('@/components/my/Set/zhanghaomima/wangjimimatwo'));
  })
}
const news = resolve=>{
  require.ensure(['@/components/my/news'],()=>{
    resolve(require('@/components/my/news'));
  })
}
const shangpin= resolve=>{
  require.ensure(['@/components/my/wodegongju/shangpin'],()=>{
    resolve(require('@/components/my/wodegongju/shangpin'));
  })
}
const ll = resolve=>{
  require.ensure(['@/components/my/wodegongju/liulan'],()=>{
    resolve(require('@/components/my/wodegongju/liulan'));
  })
}
const  yhj= resolve=>{
  require.ensure(['@/components/my/wodegongju/youhuijian'],()=>{
    resolve(require('@/components/my/wodegongju/youhuijian'));
  })
}

//登录注册
const  regi= resolve=>{
  require.ensure(['@/components/registration/register'],()=>{
    resolve(require('@/components/registration/register'));
  })
}
const yzm= resolve=>{
  require.ensure(['@/components/registration/yanzhengma'],()=>{
    resolve(require('@/components/registration/yanzhengma'));
  })
}
const   zcyh= resolve=>{
  require.ensure(['@/components/registration/zhucheyonghu'],()=>{
    resolve(require('@/components/registration/zhucheyonghu'));
  })
}
const  wjmmm= resolve=>{
  require.ensure(['@/components/registration/wangjimima'],()=>{
    resolve(require('@/components/registration/wangjimima'));
  })
}
const pdsjh= resolve=>{
  require.ensure(['@/components/registration/panduanshoujihao'],()=>{
    resolve(require('@/components/registration/panduanshoujihao'));
  })
}
const ddd= resolve=>{
  require.ensure(['@/components/my/dingdan/dingdan'],()=>{
    resolve(require('@/components/my/dingdan/dingdan'));
  })
}
const tk= resolve=>{
  require.ensure(['@/components/shopping/tuikuan'],()=>{
    resolve(require('@/components/shopping/tuikuan'));
  })
}
const qrsh= resolve=>{
  require.ensure(['@/components/shopping/querengshouhuo'],()=>{
    resolve(require('@/components/shopping/querengshouhuo'));
  })
}
const pj= resolve=>{
  require.ensure(['@/components/shopping/pingjia'],()=>{
    resolve(require('@/components/shopping/pingjia'));
  })
}
const shcg= resolve=>{
  require.ensure(['@/components/shopping/shouhuochenggong'],()=>{
    resolve(require('@/components/shopping/shouhuochenggong'));
  })
}
const qrsht= resolve=>{
  require.ensure(['@/components/shopping/querengshouhuotwo'],()=>{
    resolve(require('@/components/shopping/querengshouhuotwo'));
  })
}
const zqsh= resolve=>{
  require.ensure(['@/components/shopping/ziququrenshouhuo'],()=>{
    resolve(require('@/components/shopping/ziququrenshouhuo'));
  })
}
const zqdd= resolve=>{
  require.ensure(['@/components/shopping/ziqudengdai'],()=>{
    resolve(require('@/components/shopping/ziqudengdai'));
  })
}
const sqtk= resolve=>{
  require.ensure(['@/components/shopping/shenqingtuikuan'],()=>{
    resolve(require('@/components/shopping/shenqingtuikuan'));
  })
}
const sqsh= resolve=>{
  require.ensure(['@/components/shopping/shenqingshouho'],()=>{
    resolve(require('@/components/shopping/shenqingshouho'));
  })
}
Vue.use(Router)

const router =new Router({
  //去掉访问时候的/#这个动态参数
  mode:'history',
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/gps',
      name: 'gps',
      component: gps
    }, {
      path: '/seek',
      name: 'seek',
      component: seek
    },
    {
      path: '/qd',
      name: 'qd',
      component: qd,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/wdqd',
      name: 'wdqd',
      component: wdqd
    },
    {
      path: '/mar',
      name: 'mar',
      component: mar
    },
    {
      path: '/dpxq',
      name: 'dpxq',
      component: dpxq
    },
    {
      path: '/wpxq',
      name: 'wpxq',
      component: wpxq
    },
    {
      path: '/sypj',
      name: 'sypj',
      component: sypj
    },
    {
      path: '/jb',
      name: 'jb',
      component: jb
    },
    {
      path: '/shops',
      name: 'shops',
      component: shops
    },
    {
      path: '/ssxqy',
      name: 'ssxqy',
      component: ssxqy
    },
		{
		  path: '/kf',
		  name: 'kf',
		  component: kf
		},
    {
      path: '/rmi',
      name: 'reimai',
      component: reimai
    },
    {
      path: '/com',
      name: 'com',
      component: com
    },
    {
      path: '/dm',
      name: 'dm',
      component: dm
    },
    {
      path: '/tj',
      name: 'tj',
      component: tj
    },
    {
      path: '/ph',
      name: 'ph',
      component: ph
    },

    //活动
    {
      path: '/hd',
      name: 'hd',
      component: hd
    },
    //购物车
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/js',
      name: 'js',
      component: js
    },
		{
		  path: '/pssj',
		  name: 'pssj',
		  component: pssj
		},
		{
		  path: '/psw',
		  name: 'psw',
		  component: psw
		},
    {
      path: '/dd',
      name: 'dd',
      component: dd
    },
    {
      path: '/qx',
      name: 'qx',
      component: qx
    },
    {
      path: '/fh',
      name: 'fh',
      component: fh
    },
		{
		  path: '/zqfk',
		  name: 'zqfk',
		  component: zqfk
		},
    {
      path: '/sh',
      name: 'sh',
      component: sh
    },
    {
      path: '/wl',
      name: 'wl',
      component: wl
    },
    {
      path: '/tk',
      name: 'tk',
      component: tk
    },
    {
      path: '/qrsh',
      name: 'qrsh',
      component: qrsh
    },
    {
      path: '/pj',
      name: 'pj',
      component: pj
    },
    {
      path: '/shcg',
      name: 'shcg',
      component: shcg
    },
    {
      path: '/qrsht',
      name: 'qrsht',
      component: qrsht
    },
	{
	  path: '/zqsh',
	  name: 'zqsh',
	  component: zqsh
	},
	{
	  path: '/zqdd',
	  name: 'zqdd',
	  component: zqdd
	},
    {
      path: '/sqtk',
      name: 'sqtk',
      component: sqtk
    },
    {
      path: '/sqsh',
      name: 'sqsh',
      component: sqsh
    },
    //我的
    {
      path: '/My',
      name: 'My',
      component:My,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/cs',
      name: 'cs',
      component: cs
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    }, {
      path: '/cus',
      name: 'cus',
      component: cus
    }, {
      path: '/det',
      name: 'det',
      component: det
    }, {
      path: '/iss',
      name: 'iss',
      component: iss
    }, {
      path: '/sho',
      name: 'sho',
      component: sho
    }, {
      path: '/xj',
      name: 'xj',
      component: xj
    }, {
      path: '/bj',
      name: 'bj',
      component: bj
    }
    , {
      path: '/set',
      name: 'set',
      component: set
    }
    , {
      path: '/pim',
      name: 'pim',
      component: pim
    } ,
		 {
		  path: '/our',
		  name: 'our',
		  component: our
		} ,
    {
      path: '/zh',
      name: 'zh',
      component: zh
    } ,
    {
      path: '/xgp',
      name: 'xgp',
      component: xgp
    } ,
    {
      path: '/xgpt',
      name: 'xgpt',
      component: xgpt
    } ,
    {
      path: '/wjmm',
      name: 'wjmm',
      component: wjmm
    } ,
    {
      path: '/wjmmt',
      name: 'wjmmt',
      component: wjmmt
    } ,
    {
      path: '/news',
      name: 'news',
      component: news
    }, {
      path: '/shangpin',
      name: 'shangpin',
      component: shangpin,

    },
    {
      path: '/ll',
      name: 'll',
      component: ll
    },
    {
      path: '/yhj',
      name: 'yhj',
      component: yhj
    },
    {
      path: '/ddd',
      name: 'ddd',
      component: ddd
    },
    //登录注册
    {
      path: '/regi',
      name: 'regi',
      component: regi
    },
    {
      path: '/yzm',
      name: 'yzm',
      component: yzm
    },
    {
      path: '/zcyh',
      name: 'zcyh',
      component: zcyh
    },
    {
      path: '/wjmmm',
      name: 'wjmmm',
      component: wjmmm
    },
    {
      path: '/pdsjh',
      name: 'pdshj',
      component: pdsjh
    },
  ]
})
router.beforeEach((to,from,next)=>{
  //获取下token
  let token = store.state.username;
  if(to.meta.requiresAuth){
    //是否是需要权限的页面
    if(token){
      next()  //token存在，则让它通过
    }else{
      //token不存在，不然它通过，让他跳转到登录页面
      next({
        path:'/regi'
      })
    }
  }else{
    //不需要权限的页面
    next() //往下走路由就行了
  }
})
export default router
