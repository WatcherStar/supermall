<template>
	<div class="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="content" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"  @imageLoad="imageLoad"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommends" :goods="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		<detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
		<!-- <toast :message="message" :show="show"></toast> -->
	</div>
</template>

<script>
	import DetailNavBar from "views/detail/childComps/DetailNavBar"
	import DetailSwiper from "views/detail/childComps/DetailSwiper"
	import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo"
	import DetailShopInfo from "views/detail/childComps/DetailShopInfo"
	import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo"
	import DetailParamInfo from "views/detail/childComps/DetailParamInfo"
	import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo"
	import DetailBottomBar from "views/detail/childComps/DetailBottomBar"
	
	import Scroll from "components/common/scroll/Scroll"
	import GoodsList from "components/content/goods/GoodsList"
	// import Toast from "components/common/toast/Toast"
	
	import {
		getDetail,
		GoodsInfo,
		GoodsParam,
		Shop,
		getRecommend
		} from "network/detail"
		
	import {debounce} from "common/utils"
	import {itemListenerMixin,backTopMixin} from "common/mixin"
	
	import {mapActions} from 'vuex'
	
	export default {
		name:"Detail",
		data() {
			return {
				iid : null,
				topImages : [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				themeTopYs: [],
				currentIndex: 0,
				// message: "",
				// show: false
			}
		},
		created() {
			// 保存存入的iid
			this.iid = this.$route.params.id;
			
			// 根据iid从服务器获取数据
			getDetail(this.iid).then(res=>{
				// 取出数据
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
				
				// 获取评论信息
				this.commentInfo = data.rate.cRate !== 0 ? data.rate.list[0] : {};
				
				// 等待渲染完毕
				this.$nextTick(()=>{
					
				})
				
			})
			
			// 获取详情页数据
			getRecommend().then(res=>{
				this.recommends = res.data.list;
			})
			
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			// Toast
		},
		methods:{
			...mapActions({
				addCart : "addCart"
			}),
			
			imageLoad() {
				this.$refs.scroll.refresh()
				
				// 图片加载完毕更新坐标
				this.themeTopYs = []
				
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
				this.themeTopYs.push(Number.MAX_VALUE);
				
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
			},
			contentScroll(position) {
				// 获取Y值
				const positionY = -position.y
				
				// positionY和主题中的值进行对比
				// [0,7983,9120,9456]
				// positionY在0和7983之间,index=0
				// positionY在7983和9120之间,index=1
				// positionY在9120和9456之间,index=2
				// positionY大于9456,index=3
				let lenght = this.themeTopYs.length;
				for(let i = 0; i < this.themeTopYs.length-1; i++) {
					
					if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex
					}
					
					// if (this.currentIndex !== i && ((i < lenght-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i == lenght - 1 && positionY >= this.themeTopYs[i]))){
					// 	this.currentIndex = i;
					// 	this.$refs.nav.currentIndex = this.currentIndex
					// }
				}
				
				// 判断backtop是否显示
				this.isShowBackTop = (-position.y) > 1000;
			},
			addToCart() {
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;
				
				// 将商品添加到购物车
				// this.$store.cartList.push(product)
				// this.$store.commit('addCart',product)
				// this.$store.dispatch('addCart',product).then(res => {
				// 	console.log(res)
				// })
				
				this.addCart(product).then(() => {
					// this.show = true
					// this.message = "商品添加成功"
					
					// setTimeout(()=>{
					// 	this.show = false
					// 	this.message = ""
					// },1500)
					this.$toast.show("商品添加成功",1500)
				})
				
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		mounted() {
			
		},
		updated() {
			
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
		height: calc(100% - 102px);
		overflow: hidden;
	}
	
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #FFFFFF;
	}
</style>
