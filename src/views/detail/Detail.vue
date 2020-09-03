<template>
	<div class="detail">
		<detail-nav-bar class="detail-nav"></detail-nav-bar>
		<scroll class="content" :pull-up-load="true" ref="scroll">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"  @imageLoad="imageLoad"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info :param-info="paramInfo"></detail-param-info>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from "views/detail/childComps/DetailNavBar"
	import DetailSwiper from "views/detail/childComps/DetailSwiper"
	import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo"
	import DetailShopInfo from "views/detail/childComps/DetailShopInfo"
	import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo"
	import DetailParamInfo from "views/detail/childComps/DetailParamInfo"
	
	import Scroll from "components/common/scroll/Scroll"
	
	import {getDetail,GoodsInfo,GoodsParam,Shop} from "network/detail"
	
	export default {
		name:"Detail",
		data() {
			return {
				iid : null,
				topImages : [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {}
			}
		},
		created() {
			// 保存存入的iid
			this.iid = this.$route.params.id;
			
			// 根据iid从服务器获取数据
			getDetail(this.iid).then(res=>{
				const data = res.result;
				//  获取顶部轮播图片数据
				this.topImages = data.itemInfo.topImages;
				
				// 获取商品信息
				this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services);
				
				// 保存店铺信息
				this.shop = new Shop(data.shopInfo);
				
				// 保存商品详情信息
				this.detailInfo = data.detailInfo;
				
				// 获取商品参数信息
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
			})
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo
		},
		methods:{
			imageLoad() {
				this.$refs.scroll.refresh()
			}
		}
	}
</script>

<style scoped>
	.detail {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
		height: 100vh;
	}
	
	.content {
		height: calc(100% - 44px);
		overflow: hidden;
	}
	
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
	}
</style>
