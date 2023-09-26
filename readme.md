

# 节日头像小程序

一个开源的国庆头像生成小程序

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

## 截图

<img src="screenshot/demo.gif" alt="Logo" width="320">

## 上手指南

该小程序使用了微信的Skyline渲染引擎，效率更高体验更好，可以实现类似于flutter Hero动画（见上图效果）。头像生成使用的是Snapshot进行合成，这个东西很方便，不用使用canvas进行繁琐的绘制处理，只要把布局写好就行，类似html2canvas。

官方`onChooseAvatar`接口获取头像的接口实在太模糊没法使用，因此换成了`wx.chooseMedia`

注意：由于使用了一些新特效所以项目无法在WebView下运行，需使用Skyline引擎，如果考虑到用户兼容性的慎用。


###### 开发前的配置要求

1. 微信版本库 3.0.0

###### **安装步骤**

1. 克隆或下载本项目到目录中使用微信开发者工具导入即可

```sh
git clone https://github.com/QQOQ/mp-avatar.git
```

2. 修改根目录下的`env.config.js`文件，里面配置你的接口地址

3. 在`app.js`处有一个请求素材的接口，可以修改此处为你的接口，返回格式如下：
```json
{
    "default_template": "https://51porn.oss-cn-hangzhou.aliyuncs.com/hat5.png",
    "default_avatar": "https://51porn.oss-cn-hangzhou.aliyuncs.com/demo.jpg",
    "template_list": [
        "https://51porn.oss-cn-hangzhou.aliyuncs.com/hat0.png",
        "https://51porn.oss-cn-hangzhou.aliyuncs.com/hat1.png"
    ]
}
```

```
default_template: 默认模板
default_avatar: 默认头像
template_list: 模板列表
```

### 特别说明

该项目素材均来自于互联网，如有侵权请联系本人删除。

<!-- links -->
[your-project-path]:QQOQ/mp-avatar
[contributors-shield]: https://img.shields.io/github/contributors/QQOQ/mp-avatar.svg?style=flat-square
[contributors-url]: https://github.com/QQOQ/mp-avatar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/QQOQ/mp-avatar.svg?style=flat-square
[forks-url]: https://github.com/QQOQ/mp-avatar/network/members
[stars-shield]: https://img.shields.io/github/stars/QQOQ/mp-avatar.svg?style=flat-square
[stars-url]: https://github.com/QQOQ/mp-avatar/stargazers
[issues-shield]: https://img.shields.io/github/issues/QQOQ/mp-avatar.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/QQOQ/mp-avatar.svg