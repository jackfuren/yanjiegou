<template>
    <div class="loading">
		<van-loading style="position: absolute;top: 45%;left: 48%;" type="spinner" color="#fff" />
	</div>
</template>
<script>
	import Vue from 'vue';
	import { Loading } from 'vant';
	
	Vue.use(Loading);
    export default {
        name: 'Loading' // 定义的组件名称 使用时写法：loading
    }
</script>
<style scoped>
    .loading {
        position: fixed;
        left: 0;
        top: 0;
        background:  rgb(96, 96, 96, 0.8);
        width: 100vw;
        height: 100vh;
        z-index: 1000;
    }
/* //布局方式position必须设置为fixed，下载好对应的Loading图标，放置于相应的路径位置，配置好背景颜色以及透明度 */
</style>
