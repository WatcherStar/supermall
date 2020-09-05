<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="conter">购物街</div></nav-bar>
		<tab-control
		@tabClick="tabClick" 
		ref="tabControl1" 
		:titles="home_titles" 
		class="tab-control"
		v-show="isTabFixed"></tab-control>
		
		<scroll 
		class="content" 
		ref="scroll" 
		:probe-type="3" 
		@scroll="contentScroll" 
		:pull-up-load="true" 
		@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control 
			@tabClick="tabClick" 
			ref="tabControl2" 
			:titles="home_titles" ></tab-control>
			<goods-list :goods = "showGoods"></goods-list>
		</scroll>
		
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from "views/home/childComps/HomeSwiper"
	import RecommendView from "views/home/childComps/RecommendView"
	import FeatureView from "views/home/childComps/FeatureView"
	
	import NavBar from "components/common/navbar/NavBar"
	import TabControl from "components/content/tabControl/TabControl"
	import GoodsList from "components/content/goods/GoodsList"
	import Scroll from "components/common/scroll/Scroll"
	
	
	import {
		getHomeMultidata,
		getHomeGoods
		} from "network/home"
	import {debounce} from "common/utils"
	import {itemListenerMixin,backTopMixin} from "common/mixin"
	
	
	export default {
		name: "Home",
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			Scroll,
		},
		data(){
			return {
				banners : [],
				recommends : [],
				home_titles : ['流行','新款','精选'],
				goods : {
					'pop' : {page: 0, list: []},
					'new' : {page: 0, list: []},
					'sell' : {page: 0, list: []}
				},
				currentType: 'pop',
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		
		created() {
			// 请求多个数据(banners)
			this.getHomeMultidata();
			// 请求商品数据
			this.getHomeGoods('pop');
			this.getHomeGoods('new');
			this.getHomeGoods('sell');
			
		},
		mixins:[itemListenerMixin,backTopMixin],
		
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
		},
		
		methods:{
			/**
			 * 事件监听相关
			 */
			
			tabClick(index) {
				switch (index){
					case 0:
						this.currentType = 'pop';
						break
					case 1:
						this.currentType = 'new';
						break
					case 2:
						this.currentType = 'sell';
						break
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			
			
			contentScroll(position) {
				// 判断backtop是否显示
				this.isShowBackTop = (-position.y) > 1000;
				
				// 决定tabcontrol是否吸顶
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			
			loadMore() {
				this.getHomeGoods(this.currentType);
			},
			
			swiperLoaded() {
				// 获取tabControl的offsettop
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
			},
			
			/**
			 * 网络请求相关
			 */
			
			// 请求多个数据(banners)
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					// console.log(res);
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			
			// 请求商品数据
			getHomeGoods(type){
				const page = this.goods[type].page + 1;
				
				getHomeGoods(type,page).then(res => {
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page += 1;
					
					this.$refs.scroll.scroll.finishPullUp()
				})
			}
			
		}
	}
</script>

<style scoped>
	#home {
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	
	.content {
		/* height: 300px; */
		overflow: hidden;
		position: absolute;
		
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	
	.tab-control {
		position: relative;
		z-index: 9;
	}
</style>
