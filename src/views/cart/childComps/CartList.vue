<template>
	<div class="cart-list">
		<cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
	</div>
</template>

<script>
	import CartListItem from "./CartListItem"

	import {
		mapGetters
	} from "vuex"

	export default {
		name: "CartList",
		computed: {
			...mapGetters(['cartList'])
		},
		components: {
			CartListItem
		},
		activated() {
			this.$emit("cartListUp")
		}
	}
</script>

<style scoped>
	
</style>
