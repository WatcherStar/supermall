<template>
  <div class="wrapper">
		<ul>
			<button @click="btnClick">按钮</button>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li><li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
			<li>233</li>
		</ul>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	
	export default {
		name: "Category",
		data() {
			return {
				scroll: null
			}
		},
		// 组件创建后完成调用
		mounted() {
			this.scroll = new BScroll(document.querySelector(".wrapper"),{
				probeType: 3,
				pullUpLoad: true
			})
			
			this.scroll.on('scroll',(position)=>{
				// console.log(position);
			})
			
			this.scroll.on('pullingUp',()=>{
				console.log("上拉加载更多");
			})
		},
		methods:{
			btnClick() {
				console.log("BTN");
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		height: 100px;
		background-color: red;
	}
</style>
