// 获取应用实例
import HalfScreenDialogRouteBuilder from '../../utils/custom-route'
const app = getApp()
Page({
	data: {
		avatar: app.globalData.default_avatar,
		template: app.globalData.default_template,
		ver: ''
	},
	onLoad() {
		const accountInfo = wx.getAccountInfoSync();
		this.setData({
			ver: accountInfo.miniProgram.version
		})
	},
	onShow(){
		if(app.globalData?.template){
			this.setData({
				template: app.globalData.template
			})
		}
	},
	chooseMedia(){
		const t = this
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			success(res) {
				console.log(res)
				wx.cropImage({
					src: res.tempFiles[0].tempFilePath,
					cropScale: '1:1',
					success(res){
						console.log(res)
						t.setData({
							avatar: res.tempFilePath
						})
					}
				})
			}
		})
	},
	// chooseAvatar太模糊放弃使用
	onChooseAvatar(e){
		console.log(e)
		//this.data.avatar = e.detail.avatarUrl
		this.setData({
			avatar: e.detail.avatarUrl
		})
	},
	openTemplate(){
		// 在页面跳转前定义好 routeBuilder
		wx.router.addRouteBuilder('customRoute', HalfScreenDialogRouteBuilder)
		wx.navigateTo({
            url: `/pages/template/index?routeType=customRoute`,
            routeType: 'customRoute'
        });
	},
	tap(){
		this.createSelectorQuery().select("#view").node().exec(res => {
			const node = res[0].node
			node.takeSnapshot({
				type: 'arraybuffer',
          		format: 'png',
          		success: (res) => {
					const f = `${wx.env.USER_DATA_PATH}/avatar.png`
					const fs = wx.getFileSystemManager();
					fs.writeFileSync(f, res.data, 'binary')
					wx.showShareImageMenu({
						path: f
					})
				},
				fail(res) {
				  console.log("takeSnapshot fail:", res)
				}
			})
		})
	},
	/**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

	},
	/**
     * 用户分享朋友圈
     */
    onShareTimeline() {

    },
	/**
     * 用户收藏
     */
    onAddToFavorites() {

    }
})
