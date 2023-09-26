// app.js
import Request from './utils/request'
App({
	onLaunch() {
		const systemInfo = wx.getSystemInfoSync()
		const a = Object.assign(this.globalData, systemInfo)
		this.template_list()
	},
	globalData: {
		// 默认模板
		default_template: 'https://51porn.oss-cn-hangzhou.aliyuncs.com/hat5.png',
		// 默认头像
		default_avatar: 'https://51porn.oss-cn-hangzhou.aliyuncs.com/demo.jpg',
		// 模板列表
		template_list: []
	},
	// 获取模板列表
	template_list(){
		const t = this
		const request = new Request()
		request.request('/template.json').then(res=>{
			console.log(res.data)
			t.globalData.default_avatar = res.data?.default_avatar??''
			t.globalData.default_template = res.data?.default_template??''
			t.globalData.template_list = res.data?.template_list??[]
		}).catch(err=>{
			console.log(err)
		})
	}
})
