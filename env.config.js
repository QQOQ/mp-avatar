const envConf = {
    // 开发版-本地环境
    develop: {
        mode: 'dev',
        APP_BASE_URL: 'https://51porn.oss-cn-hangzhou.aliyuncs.com',
    },
    // 体验版-测试环境
    trial: {
        mode: 'test',
        APP_BASE_URL: 'https://51porn.oss-cn-hangzhou.aliyuncs.com',
    },
    // 正式版-正式环境
    release: {
        mode: 'prod',
        APP_BASE_URL: 'https://51porn.oss-cn-hangzhou.aliyuncs.com',
    }
}
module.exports = {
    env: envConf[wx.getAccountInfoSync().miniProgram.envVersion]
}