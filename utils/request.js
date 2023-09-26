import env from '../env.config'
class Request {
	// 构造函数
	constructor() {
	  	this._baseUrl = env.env.APP_BASE_URL; //请求地址
	  	this._header = {}; //请求头
	  	this._method = 'GET'; //请求方法
	  	this._dataType = 'json'; //返回数据类型
	  	this._response = undefined; //响应结果
	}
  
	// 设置请求地址
	set baseUrl(url) {
	  	this._baseUrl = url;
	}
  
	// 设置请求头
	set header(header) {
	  	this._header = header;
	}
  
	// 设置请求方法
	set method(method) {
	  	this._method = method;
	}
  
	// 设置返回数据类型
	set dataType(type) {
	  	this._dataType = type;
	}
  
	// 封装请求
	async request(url, data = {}) {
	  	return await new Promise((resolve, reject) => {
			wx.request({
		  		url: this._baseUrl + url,
		  		header: this._header,
		  		method: this._method,
		  		dataType: this._dataType,
		  		data: data,
		  		success: res => {
					this._response = res;
					resolve(res);
		  		},
		  		fail: err => {
					this._response = err;
					reject(err);
		  		}
			})
	  	})
	}
}
  
export default Request;