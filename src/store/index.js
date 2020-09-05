import vue from "vue"
import vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 安装插件
vue.use(vuex)

// 创建Store实例
const store = new vuex.Store({
	state:{
		cartList: []
	},
	mutations,
	actions,
	getters
})

// 挂载vue实例上
export default store
