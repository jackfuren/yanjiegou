<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
	provide(){
		return{
			reload:this.reload
		}
	},
	data(){
		return{
			style:'',
			isRouterAlive:true
		}
	},
	methods:{
		reload(){
			this.isRouterAlive=false
			this.$nextTick(function(){
				this.isRouterAlive=true
			})
		}
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.swiper-pagination-bullet-active {
  opacity: 0.5;
  background: #EF0600;
}

.van-stepper__minus{
  background-color: white;
}
.van-stepper__plus{
  background-color: white;
}
 .van-stepper__minus--disabled:active{
  background-color: white;
}
.van-stepper__minus--disabled:active{
  background-color: white;
}
.van-stepper__minus--disabled:active{
  background-color: white;
}
.van-stepper__input{

   height: 14px;
}
</style>
