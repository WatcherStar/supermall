import {debounce} from "common/utils"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
	data() {
		return {
			
		}
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,100)
		
		// 监听事件
		this.$bus.$on('itemImageLoad',()=>{
			refresh()
		})
		
	}
}


export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0,0,300)
		}
	}
}
