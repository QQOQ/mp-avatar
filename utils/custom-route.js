import {
	CurveAnimation,
	Curves,
	isOfficialSkyline
} from './util'
  
const {
	screenHeight
} = getApp().globalData
  
const HalfScreenDialogRouteBuilder = (customRouteContext) => {
	console.info('skyline: half page route build')
	const isSupportOverflow = isOfficialSkyline()
	const {
	  	primaryAnimation,
	  	primaryAnimationStatus,
	  	userGestureInProgress,
	} = customRouteContext
	const _curvePrimaryAnimation = CurveAnimation({
	  	animation: primaryAnimation,
	  	animationStatus: primaryAnimationStatus,
	  	curve: Curves.linearToEaseOut,
	  	reverseCurve: Curves.easeInToLinear,
	})
	/**
	 * 1. 手势拖动时采用原始值
	 * 2. 页面进入时采用 curve 曲线生成的值
	 * 3. 页面返回时采用 reverseCurve 生成的值
	 */
	const handlePrimaryAnimation = () => {
	  	'worklet'
	  	let t = primaryAnimation.value
	  	if (!userGestureInProgress.value) {
			t = _curvePrimaryAnimation.value
	  	}
  
	  	// 距离顶部边距因子
	  	const topDistance = 0.12
	  	// 距离顶部边距
	  	const marginTop = topDistance * screenHeight
	  	// 半屏页面大小
	  	const pageHeight = (1 - topDistance) * screenHeight
	  	// 自底向上显示页面
	  	const transY = pageHeight * (1 - t)
  
	  	const style = {
			overflow: 'hidden',
			borderRadius: '10px',
			marginTop: `${marginTop}px`,
			height: `${pageHeight}px`,
			transform: `translateY(${transY}px)`,
	  	}
  
	  	if (!isSupportOverflow) delete style.overflow
	  	return style 
	}
  
	const _curvePrevAnimation = CurveAnimation({
	  	animation: primaryAnimation,
	  	animationStatus: primaryAnimationStatus,
	  	curve: Curves.fastOutSlowIn,
	})
  
	const handlePreviousPageAnimation = () => {
	  	'worklet'
	  	let t = primaryAnimation.value
	  	if (!userGestureInProgress.value) {
			t = _curvePrevAnimation.value
	  	}
  
	  	// 页面缩放大小
	  	const scale = 0.08
	  	// 距离顶部边距因子
	  	const topDistance = 0.1
	  	// 估算的偏移量
	  	const transY = screenHeight * (topDistance - 0.5 * scale) * t
	  	const radius = 12 * t
  
	  	// skyline 1.0.1 版本以下修改 overflow: hidden 有问题
	  	const style = {
			borderRadius: `${radius}px`,
			overflow: radius > 0 ? 'hidden' : 'visible',
			transform: `translateY(${transY}px) scale(${1 - scale * t})`,
	  	}
	  	if (!isSupportOverflow) delete style.overflow
	  	return style 
	}
  
	return {
		opaque: false,
		barrierColor: 'rgba(150,150,150,.5)', 
	  	transitionDuration: 300,
	  	reverseTransitionDuration: 300,
	  	canTransitionTo: true,
	  	canTransitionFrom: true,
	  	handlePrimaryAnimation,
	  	handlePreviousPageAnimation,
	}
}
  
export default HalfScreenDialogRouteBuilder