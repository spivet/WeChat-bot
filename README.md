# WeChat-bot

偶尔会遇到图片无法发送的问题，程序既没有报错，也没有成功发送消息，具体原因不清楚，可以参考[发送图片没有任何反应](https://github.com/Chatie/wechaty/issues/1618)

### 项目简介

通过微信每日定时给指定的一位好友发送消息，去年就有一个类似的想法，不过一直没去执行，直到上周看见篇文章。

不过他的一些功能我根本不需要，而且定时提醒消息只能是文字，看上去多少没那么好看，于是就打算自己撸一个，加了点其它的小功能，然后就有了这篇文章，前后也花了两天多时间，还有一些优化留着空了来做。

### 灵感来源

[用Node+wechaty写一个爬虫脚本每天定时给女(男)朋友发微信暖心话](https://juejin.im/post/5c77c6bef265da2de6611cff)。

### 项目地址

[https://github.com/Mcbai/WeChat-bot](https://github.com/Mcbai/WeChat-bot)

### 使用库

* [express](https://github.com/expressjs/express) - node框架
* [pug](https://github.com/pugjs/pug) - html模板
* [puppeteer](https://github.com/GoogleChrome/puppeteer) - 抓取数据
* [node-schedule](https://github.com/node-schedule/node-schedule) - 定时任务
* [file-box](https://github.com/huan/file-box) - 打包图片用于wechaty发送
* [wechaty](https://github.com/chatie/wechaty) - 操作微信
* [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - 控制台展示二维码图片

### 基本思路

1. 抓取 墨迹天气 和 [one·一个] 的数据
2. 编写展示用的模板并自定义样式
3. 处理抓取到的数据渲染模板
4. 抓取模板页并截图
5. 操作微信发送消息
6. 定时处理任务

### 最终效果

![webwxgetmsgimg](https://user-images.githubusercontent.com/12459860/54200898-597d9200-4507-11e9-86b1-1f33f32eee4f.jpg)

点开图片

![template](https://user-images.githubusercontent.com/12459860/54200940-6ac69e80-4507-11e9-8b57-0fa4e8bbd393.png)


### 目录与配置

目录结构：

![image](https://user-images.githubusercontent.com/12459860/54199989-2c2fe480-4505-11e9-86a5-e09daff8d3a1.png)

配置代码：

![image](https://user-images.githubusercontent.com/12459860/54200072-67321800-4505-11e9-9d20-9713e0788935.png)

在配置里可以修改提醒发送的时间，想要说的话等。

### 需要注意的坑：

puppeteer 需要安装 chromium，所以要修改 puppeteer 的下载源：

```
npm config set puppeteer_download_host https://npm.taobao.org/mirrors
```

但比较坑的是，我在云服务器上修改了源也没下载下来，所以到现在还没能放到服务器上去，只能在自己的电脑上起 node server。

### 后续优化：

1. 代码结构
2. 生成的图片质量
3. 生成聊天记录日志，别人撤回的消息也能看见了
4. 保存每天生成的图片

### 最后

希望所有猿（媛）都能遇见自己喜欢，也喜欢自己的另一半~
