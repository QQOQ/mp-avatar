const { derived, Easing } = wx.worklet

export const GestureState = {
	POSSIBLE: 0,
	BEGIN: 1,
	ACTIVE: 2,
	END: 3,
	CANCELLED: 4,
}

export const AnimationStatus = {
	dismissed: 0,
	forward: 1,
	reverse: 2,
	completed: 3,
}

export const Curves = {
	fastLinearToSlowEaseIn: Easing.cubicBezier(0.18, 1.0, 0.04, 1.0),
	linearToEaseOut: Easing.cubicBezier(0.35, 0.91, 0.33, 0.97),
	easeInToLinear: Easing.cubicBezier(0.67, 0.03, 0.65, 0.09),
	fastOutSlowIn: Easing.cubicBezier(0.4, 0.0, 0.2, 1.0),
}

export const lerp = function (begin, end, t) {
	'worklet'
	return begin + (end - begin) * t
}

export const clamp = function (cur, lowerBound, upperBound) {
	'worklet'
	if (cur > upperBound) return upperBound
	if (cur < lowerBound) return lowerBound
	return cur
}

export function CurveAnimation({
	animation,
	animationStatus,
	curve,
	reverseCurve
}) {
	return derived(() => {
		'worklet'
		const useForwardCurve = !reverseCurve || animationStatus.value !== AnimationStatus.reverse
		const activeCurve = useForwardCurve ? curve : reverseCurve
		const t = animation.value
		if (!activeCurve) return t
		if (t === 0 || t === 1) return t
		return activeCurve(t)
	})
}

function compareVersion(v1, v2) {
  	v1 = v1.split('.')
  	v2 = v2.split('.')
  	const len = Math.max(v1.length, v2.length)
  	while (v1.length < len) {
    	v1.push('0')
  	}
  	while (v2.length < len) {
    	v2.push('0')
  	}
  	for (let i = 0; i < len; i++) {
    	const num1 = parseInt(v1[i])
    	const num2 = parseInt(v2[i])
    	if (num1 > num2) {
      		return 1
    	} else if (num1 < num2) {
      		return -1
    	}
  	}
  	return 0
}

export function isOfficialSkyline() {
  	if (!wx.getSkylineInfoSync) return false
  	const {isSupported, version} = wx.getSkylineInfoSync()
  	if (!isSupported) return false
  	return compareVersion(version, '1.0.1') >= 0
}