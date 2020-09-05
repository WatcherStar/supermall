<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="nav-bar">
			<div slot="conter">购物车({{length}})</div>
		</nav-bar>
		
		<!-- 购物车商品列表 -->
		<scroll class="cart-list" :pull-up-load="true" ref="scroll">
			<cart-list @cartListUp="cartListUp"></cart-list>
		</scroll>
		
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import CartList from "views/cart/childComps/CartList"
	import CartBottomBar from "views/cart/childComps/CartBottomBar"
	
	import NavBar from "components/common/navbar/NavBar"
	import Scroll from "components/common/scroll/Scroll"
	
	import {mapGetters} from "vuex"

	export default {
		name: "Cart",
		components: {
			NavBar,
			CartList,
			Scroll,
			CartBottomBar
		},
		computed: {
			// 两种方法
			
			// ...mapGetters(['cartLength'])
			
			...mapGetters({
				length : 'cartLength'
			})
			
		},
		methods:{
			cartListUp() {
				this.$refs.scroll.refresh()
			}
		}
	}
</script>

<style scoped>
	.nav-bar {
		background-color: var(--color-tint);
		color: #FFFFFF;
		font-weight: bold;
	}
	
	.cart {
		position: relative;
		background-color: #FFFFFF;
		height: 100vh;
	}
	.cart-list {
		height: calc(100% - 93px);
		overflow: hidden;
	}
</style>
