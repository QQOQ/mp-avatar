// half-page/index.js
import {
    GestureState,
    lerp,
    clamp,
    Curves,
} from '../../utils/util'

const {
    timing,
    shared
} = wx.worklet

const app = getApp();
const windowHeight = app.globalData.windowHeight;

Page({
    data: {
        list: app.globalData.template_list
    },

    onLoad(query) {
        const { routeType } = query
        this.useCustomRoute = !!routeType
        this.initSharedValue()
    },

    onUnload() {
        
	},
	
	ck(event){
		//console.log(event.currentTarget.dataset)
		app.globalData.template = event.currentTarget.dataset.src
		wx.navigateBack({
			delta: 1
		})
	},

    initSharedValue() {
        this.scrollTop = shared(0);
        this.startPan = shared(false);
        this.customRouteContext = wx.router.getRouteContext(this) || {};
    },

    shouldPanResponse() {
        'worklet';
        return this.startPan.value;
    },
    shouldScrollViewResponse(pointerEvent) {
        'worklet';
        if (!this.useCustomRoute) return
        
        const {
            primaryAnimation
        } = this.customRouteContext;
        if (primaryAnimation.value < 1) return false;
        const scrollTop = this.scrollTop.value;
        const {
            deltaY
        } = pointerEvent;
        const result = !(scrollTop <= 0 && deltaY > 0);
        this.startPan.value = !result;
        return result;
    },
    adjustDecelerationVelocity(velocity) {
        'worklet';
        const scrollTop = this.scrollTop.value;
        return scrollTop <= 0 ? 0 : velocity;
    },
    handleScroll(evt) {
        'worklet';
        this.scrollTop.value = evt.detail.scrollTop;
    },
    handleDragStart() {
        'worklet';
        this.startPan.value = true;
        const {
            startUserGesture
        } = this.customRouteContext;
        startUserGesture();
    },

    handleDragUpdate(delta) {
        'worklet';
        const {
            primaryAnimation
        } = this.customRouteContext;
        const newVal = primaryAnimation.value - delta;
        primaryAnimation.value = clamp(newVal, 0.0, 1.0);
    },

    handleDragEnd(velocity) {
        'worklet';
        this.startPan.value = false;
        const {
            primaryAnimation,
            stopUserGesture,
            userGestureInProgress,
            didPop
        } = this.customRouteContext;

        if (!userGestureInProgress.value) return

        let animateForward = false;
        if (Math.abs(velocity) >= 1) {
            animateForward = velocity <= 0;
        } else {
            animateForward = primaryAnimation.value > 0.7;
        }
        const t = primaryAnimation.value;
        const animationCurve = Curves.fastLinearToSlowEaseIn;
        if (animateForward) {
            const duration = Math.min(
                Math.floor(lerp(300, 0, t)),
                300,
            );
            primaryAnimation.value = timing(
                1.0, {
                    duration,
                    easing: animationCurve,
                },
                () => {
                    'worklet'
                    stopUserGesture();
                },
            );
        } else {
            const duration = Math.floor(lerp(0, 300, t));
            primaryAnimation.value = timing(
                0.0, {
                    duration,
                    easing: animationCurve,
                },
                () => {
                    'worklet'
                    stopUserGesture();
                    didPop();
                },
            );
        }
    },

    handleVerticalDrag(evt) {
        'worklet';
        if (!this.useCustomRoute) return
        if (evt.state === GestureState.BEGIN) {
            this.handleDragStart();
        } else if (evt.state === GestureState.ACTIVE) {
            const delta = evt.deltaY / windowHeight;
            this.handleDragUpdate(delta);
        } else if (evt.state === GestureState.END) {
            const velocity = evt.velocityY / windowHeight;
            this.handleDragEnd(velocity);
        } else if (evt.state === GestureState.CANCELLED) {
            this.handleDragEnd(0.0);
        }
    },

    back() {
        wx.navigateBack({
            delta: 1,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

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