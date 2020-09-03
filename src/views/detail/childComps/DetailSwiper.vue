<template>
	<swiper  class="detail-swiper" v-if="topImages.length">
		<swiper-item v-for="(item,index) in topImages" :key="index">
			<img :src="item" alt="" @load="imgLoad">
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from "components/common/swiper"
	
	export default {
		name:"DetailSwiper",
		props:{
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			imgLoad() {
			  if (++this.counter === this.imagesLength) {
			    this.$emit('imageLoad')
			  }
			}
		}
	}
</script>

<style scoped>
	.detail-swiper {
		height: 300px;
		overflow: hidden;
	}
</style>
