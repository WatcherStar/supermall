<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name:"RecommendView",
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		},
		
	}
</script>

<style>
	.recommend {
		display: flex;
		font-size: 12px;
		padding: 10px 0 20px 0;
		border-bottom: 10px solid #eee;
	}
	
	.recommend-item {
		flex: 1;
		text-align: center;
	}
	.recommend-item img {
		width: 70px;
		height: 70px;
		margin: 0 auto;
		margin-bottom: 5px;
	}
</style>
