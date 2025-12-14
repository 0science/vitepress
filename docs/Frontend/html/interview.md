# 面试题
## 浏览器和协议
### 输入url到页面加载的过程
+ DNS域名解析
+ 建立TCP连接
+ 发送HTTP请求
+ 服务器返回相应
+ 浏览器渲染

### 三次握手与四次挥手
TCP协议是面向连接、可靠的数据传输协议（按顺序、不丢失、不重复）

三次握手（建立连接）

+ 客户端发送报文SYN（听得到吗？）
+ 服务器接收报文并向客户端发送报文SYN+ACK（听得到，你说）
+ 客户端接收报文ACK（好，我开始说了）

为什么不是两次

+ 防止失效的连接又传递过来

四次挥手（断开连接）

+ 客户端发送报文FIN，停止发送数据（我要走了）
+ 服务器接收报文，发送确认报文ACK（好的，我知道了）
+ 服务器发送结束报文FIN（我也要走了）
+ 客户端接收结束报文，发送确认报文ACK，等待2MSL后关闭连接（好的，你走吧）

为什么不是三次

+ 二三次之间会有未发送完的数据

为什么等待2MSL

+ 确保最后一个ACK到达服务器
+ 防止之前的报文干扰

### HTTP与HTTPS
| 特性 | HTTP | HTTPS |
| --- | --- | --- |
| 协议 | TCP | SSL/TLS |
| 端口 | 80 | 443 |
| 安全性 | 明文传输 | 密文传输 |
| 身份认证 | 无 | CA数字证书 |
| SEO | 不占优 | 排名优先 |
| 性能 | 不安全 | 安全 |
| 开销 | 连接更快 | 连接更慢 |


### 跨域问题
同源：协议、域名、端口相同

跨域：脚本请求非同源的资源

为何跨域

+ 浏览器防止跨站脚本XSS恶意请求

解决跨域

+ 跨域资源共享CORS，响应头中添加特定字段

```plain
// 请求头
Origin: https://www.taobao.com

// 响应头 (服务器设置)
Access-Control-Allow-Origin: https://www.taobao.com // 或使用 * 允许任何源（但不能带凭证）
```

```plain
app.use((req, res, next) => {
  // 允许来自所有域的请求（生产环境应指定具体域名，如：https://www.taobao.com）
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求方法
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // 允许的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

+ 反向代理，服务器转发（不会被拦截）

```plain
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': { // 以 /api 开头的请求
        target: 'https://api.target.com', // 目标服务器
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径（可选）
      }
    }
  }
}
```

```plain
// nginx
server {
  listen 80;
  server_name www.taobao.com;

  location /api/ { # 匹配 /api 路径的请求
    proxy_pass https://api.target.com/; # 转发到目标服务器
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

### 服务器返回码
4xx找前端，5xx找后端

| 状态码 | 简义 | 含义 |
| --- | --- | --- |
| 100 | 继续请求 | 服务器已接收到部分请求，等待剩下的部分继续请求 |
| 101 | 切换协议 | 客户端请求切换协议，服务器已准备切换协议 |
| 200 | 请求成功 | 客户端请求的数据服务器已成功返回 |
| 201 | 创建成功 | 客户端请求成功且服务器已创建新的资源 |
| 202 | 接受请求 | 服务器已接受请求，但尚未处理 |
| 203 | 非授权信息 | 服务器处理成功，但返回内容源于其他 |
| 204 | 没有内容 | 服务器处理成功，但是没有任何返回 |
| 205 | 内容重置 | 服务器处理成功，内容无返回，请求重置文档内容 |
| 206 | 部分内容 | 服务器成功处理了部分get请求 |
| 300 | 多种选择 | 服务器可以执行多个操作，或者根据返回列表客户端选择进行操作 |
| 301 | 永久移动 | 请求的资源已永久移动到其他位置，服务器自动修改请求资源的位置 |
| 302 | 临时移动 | 服务器响应的资源非在客户端请求的位置，但是可以响应该请求 |
| 303 | 访问其他位置 | 服务器自动（除 HEAD 之外）请求的其他位置 |
| 304 | 未修改 | 上次访问服务器的资源没有改变 |
| 305 | 使用代理 | 客户端使用代理访问服务器 |
| 307 | 临时重定向 | 客户端的要求服务器临时修改当前访问资源位置 |
| 400 | 请求错误 | 服务器无法解析该请求 |
| 401 | 未授权 | 客户端请求的资源没有进行身份验证，或未请求权限 |
| 403 | 拒绝请求 | 客户端发起的请求被服务器拒绝 |
| 404 | 未找到 | 没有找到请求的网页地址或请求的地址不存在 |
| 405 | 方法禁用 | 客户端请求的方法被禁用 |
| 406 | 无法请求 | 无法使用请求的内容特性响应请求的网页 |
| 407 | 缺少代理授权 | 客户端请求应使用代理或需要代理的授权 |
| 408 | 请求超时 | 服务器等候请求超时 |
| 409 | 存在冲突 | 服务器返回字段存在冲突，或返回的列表差异过大 |
| 410 | 已删除 | 请求资源已删除，请求资源以前有而现在没有 |
| 411 | 标头字段无效 | 服务器不接受不含有效内容长度标头字段的请求 |
| 412 | 条件未满足 | 服务器未满足请求者在请求中设置的其中一个前提条件 |
| 413 | 请求体超标 | 服务器无法处理超标（占用内存太大）的请求，超出了服务器的处理范围 |
| 414 | URI超标 | 请求的 URI超标，服务器无法解析 |
| 415 | 不支持请求 | 请求的格式不受请求页面的支持 |
| 416 | 不在请求范围 | 页面无法提供请求的范围 |
| 417 | 请求头未满足条件 | 服务器没有按要求请求标头字段 |
| 500 | 服务器内部错误 | 服务器无法完成请求 |
| 501 | 未完成请求 | 服务器问题，没有完成请求，并非请求问题 |
| 502 | 网关错误 | 服务器配置的网关可能存在问题，无法接收信息 |
| 503 | 服务器不可使用 | 服务器正处于维护阶段或暂停服务 |
| 504 | 网关超时 | 网关没有及时未回应，上游没有接收到信息 |
| 505 | HTTP协议不支持 | 当前请求的HTML版本与服务器不一致或服务器不支持当前请求的HTML版本 |


## HTML
### HTML语义化标签有哪些
+ header 头部
+ nav 导航栏
+ section 区块
+ main 主要区域
+ article 文章
+ aside 侧边栏
+ footer 底部

### 拖拽过程
```plain
dragstart  // 开始拖动
drag       // 持续拖动
draend     // 拖动结束
dragenter  // 拖动进入目标
dragover   // 拖动到目标上方
dragleave  // 拖动离开目标
drop       // 松开鼠标
```

### iframe的优缺点
## CSS
### 盒模型
### 选择器
### 伪类和伪元素
### 如何水平居中
### css特性
### flex布局
### grid布局
### 绘制三角形
### 清除浮动
### css优化
### css动画
## JavaScript
### 数据类型
### 数据类型转换
### 数据类型判断
### 原型和原型链
### 作用域和作用域链
### 深拷贝和浅拷贝
### 闭包
### 设计模式
### 继承的实现方式
### dom操作
### ajax
### 宏任务和微任务
### var与let的区别
### 普通函数与箭头函数

## 前言
我希望写一篇博客记录一下学习之路上看过的数据和视频，如果后续有人需要入门学习计算机，可以直接将这篇文章推荐给他，无论后期是走哪条路线，计算机基础都是要牢牢掌握的。

![](https://cdn.nlark.com/yuque/0/2025/png/26841888/1762083743228-db1f6ede-4915-4a06-9137-8c05c43550cb.png)

![](https://cdn.nlark.com/yuque/0/2025/png/26841888/1762083720805-0d308bd1-a9b6-45c2-83d0-e4a227dc452f.png)

## 前端基础
### HTML
+ 元素
+ DOM
+ 语义化
+ html标签
+ seo优化

### CSS
+ 选择器
+ 布局
+ 动画
+ 响应式
+ 框架

### JavaScript
+ 类型
+ 原型链
+ 作用域
+ 闭包
+ 异步
+ 事件
+ 正则

## 开发软件
### IDE
+ Sublime
+ VS code
+ WebStorm

### 测试
+ Dev Tools
+ Postman
+ Firebug

### 切图
+ Sketch
+ ps
+ PxCook

### 交互
+ Axure

## 进阶
### 网络通信
+ HTTP和HTTPS
+ UDP
+ WebSOCKET

### 性能工具
+ Page Speed

### 安全
+ XSS
+ CSP
+ CSRF

### 浏览器
### 架构模式
+ Script
+ Code Blocks
+ Code Behind
+ MVC
+ MVP
+ MVVM
+ Flux

## 通用
### 编译原理
### 计算机网络
### 操作系统
### 数据结构
### 算法
### 设计模式
## 领域
### 可视化
+ SVG
+ WebGL
+ Canvas

### 移动web
+ WebView
+ 小程序
+ 响应式

### 游戏开发
+ Cocos
+ Egret

### 便携设备
+ 手环
+ 眼镜

## 后端基础
### web服务器
+ Nginx
+ Apache
+ Tomcat

### 数据库
+ SQL
+ NoSQL

### 缓存
+ Redis
+ Memcached

## 工程开发
### 模块化
+ ES6
+ Common JS
+ SeaJs
+ RequireJS

### 版本管理
+ Git
+ SVG

### 依赖
+ npm
+ cnpm
+ yarn

### node
+ express
+ koa
+ egg

### CSS预处理
+ less
+ postcss
+ sass
+ sylus

### JavaScript增强
+ Typescript
+ CoffeeScript
+ flow

### 构建打包
+ Webpack
+ Glp
+ Grunt
+ Rollup

### 转换器
+ Bable

### CI/CD
+ Git web hook
+ Jenkins

### 代码质量
+ StyleLint
+ ESlint
+ expect
+ jest
+ NightWatch

## 入门学习阶段
先全方面的了解一下计算机有哪些知识很有必要

《计算机速成课》

先是很多博主推荐的《计算机速成课》，虽然是英文版但是可以很好的概括一下计算机发展和要学的东西



《计算机科学导论》

作为先导课的完善和补充，还有练习题加强记忆



学习第一门编程语言

《啊哈！C语言》

语言诙谐幽默吗，通俗易懂，作为入门书很不错，实现完书上的案例后就可以深入学习了



《C Prime Plus》

最好不要一上来就看这本书，会有很多不理解的部分，最好先看完上面这本，再来看这本



《C语言程序设计》

这本书算是上难度了



项目实践

检测一下c语言的学习成果



学生成绩管理系统

通讯录管理系统

简单计算器

五子棋

贪吃蛇


## 前端路线

- 语义化标签
- Flex/Grid布局
- CSS变量
- 盒模型（标准 vs IE）
- 选择器优先级计算
- 居中方案：水平/垂直居中（含不定宽高场景）
- 伪类（`:hover`）
- 伪元素（`::before`）
- 响应式设计
- 无障碍访问（ARIA）
- 实现响应式电商首页（PC/移动端适配）
- 模块化（ES Module）
- 闭包
- 原型链
- 函数式编程
- 事件原理（冒泡、捕获、委托）
- 调用栈
- 内存管理 
- 异步编程：`Promise`、`async/await`
- 事件循环（Event Loop）与宏任务/微任务。
- 数据类型
- 作用域（`var`/`let`/`const`）
- 类型转换
- 高阶函数
- `let`/`const`
- 箭头函数
- 解构赋值
- 模板字符串
- 展开运算符
- 可选链（`?.`）
- 空值合并（`??`）
- 新数据结构：`Set`、`Map`、`Symbol`、`WeakMap`/`WeakSet`
- React：  
  - Hooks体系（useState/useEffect）  
  - 状态管理（Redux Toolkit/Zustand）  
  - 服务端渲染（Next.js）及AI集成（如Vercel AI SDK）
  - 核心语法：Hooks（useState、useEffect）、Redux Toolkit 状态管理、函数式编程。  
  - 实战场景：B站评论、美团外卖等业务功能开发，结合 TypeScript 实现类型约束。  
- Vue：  
  - Composition API、Pinia状态管理  
  - Nuxt.js服务端渲染
  - 核心语法：响应式原理、组件化开发、生命周期、Vue Router 路由管理、Vuex/Pinia 状态管理。
- 原生小程序开发：微信登录/支付、地理位置服务、云函数集成。  
- 跨端框架：Uni-App 多端开发、Taro、React Native。  
- 鸿蒙开发：ArkTS 语法、ArkUI 组件、端云一体化、分布式应用。  
- 实战能力：表单校验、文件上传、富文本编辑器、ECharts 数据可视化、Vant/ElementUI 组件库。  
- 高级应用：微前端（qiankun）、3D 可视化（three.js）、移动端适配（postcss-px-to-viewport）。
- 构建工具：Vite（ESM+Rollup）快速冷启动  
- 工具链：Webpack/Vite 配置优化、Babel 转译、代码分割、CDN 加速。  
- 工程规范：ESLint + Prettier + Husky 代码规范、Git 分支管理与协作。  
- 部署与监控：CI/CD（GitHub Actions）、Lighthouse 性能分析、Sentry 错误监控。
- 组件开发：Storybook文档驱动开发   
- 后台管理系统（RBAC权限设计）  
- 实时应用（WebSocket消息通知）   
- 测试：单元测试（Jest）、E2E测试（Cypress AI插件）  
- 性能优化：Lighthouse CI审计、代码分割、图片懒加载
- 关键指标：首屏加载优化（CRP 优化）、内存泄漏排查、长任务拆分。  
- 安全防护：XSS/CSRF 防御、CSP 策略、输入转义。  
- CI/CD：GitHub Actions自动化部署  
- 错误追踪：Sentry实时监控  
- 代码风格：ESLint + Prettier  
- 提交规范：Conventional Commits  
- Node.js基础  
- Express/Koa框架
- RESTful API设计
- MongoDB（NoSQL）
- Supabase（PostgreSQL）
- Serverless：AWS Lambda/Vercel云函数
- GraphQL：Apollo Client数据管理
- 边缘计算：Vercel边缘网络部署
- TypeScript：类型系统与框架集成  
- 可视化：Three.js 3D渲染、D3.js数据图表    
- 开源贡献（文档翻译/修复Issue）  
- 技术博客输出（搭建Vitepress静态站点）  
- OpenAI API实现智能聊天机器人  
- TensorFlow.js浏览器端机器学习  
- 跨端开发：React Native/鸿蒙ArkUI（一次开发多端部署）
- 阶段目标：博客（SSG）→ 后台系统 → 实时协作应用  
- 作品集：Github仓库+Vercel在线预览  
- 开发：VS Code + AI插件（Codeium）  
- 协作：Figma AI生成UI设计稿   
- 技术演讲（本地Meetup）、代码审查实践  
- 典型场景实现  
    - 电商系统：商品列表、订单管理、权限控制（Vue + ElementUI）。  
    - 数据可视化：ECharts 图表（折线图、地图）、Three.js 3D 大屏。  
    - 即时通讯：WebSocket/Socket.IO、JWT 鉴权、消息实时推送。
- 全栈能力  
    - 后端协作：RESTful API 设计（Express + MongoDB）、Axios 封装与拦截器。  
    - 全栈项目：博客系统（前端 + Node.js 后端）、低代码平台搭建。
- 框架原理  
    - 深入 React/Vue 源码：虚拟 DOM、Diff 算法、Fiber 架构、依赖收集。  
    - 手写核心库：Promise、状态管理工具、简易 Virtual DOM。
- 架构设计  
    - 技术选型：CSR/SSR/SSG、微前端（模块联邦）、状态管理方案对比。  
    - 系统设计：领域驱动设计（DDD）、设计模式（观察者、策略模式）。
- 算法与基础: LeetCode 常见题型（数组、字符串、链表），掌握基础算法思想。
- 职业素养:技术分享与开源贡献、团队协作与 Code Review、产品思维与需求分析。

## 能力掌握
- [ ] 能够使用 axios 实现 Ajax 操作，为后续项目课做好技术铺垫
- [x] 能够运用 Git 管理前端项目，并且使用 Git 分支进行多人协同开发
- [ ] 能够使用 Promise 与 async/await 高效的实现异步操作
- [ ] 掌握Echarts 各类型数据可视化图表的应用
- [ ] 能够根据需要求创建折线图、K线图、地图等图表
- [ ] 掌握前后端分离技术的实现方式并了解其意义
- [ ] 掌握使用token进行访问鉴权功能实现
- [ ] 通过 Vue2 和 Vue3 的核心知识学习，掌握企业开发中常见业务功能实现
- [ ] 通过深入 Vue 技术栈学习 vue-router vuex vant element-ui 等主流技术，掌握企业级项目开发方式，如移动端H5项目与PC端管理项目
- [ ] 掌握 qiankun 微前端技术，具备重构巨石应用的能力，实现技术栈无关开发方式
- [ ] 掌握 three.js web 3D技术，具备大屏3D可视化开发能力
- [ ] 掌握 element-ui 组件库的运用
- [ ] 掌握 axios 以及拦截器的应用
- [ ] 掌握 Vuex 管理全局状态的技术解决方案
- [ ] 熟练使用 vue-router 管理组件的切换展示
- [ ] 掌握 element-ui 中如何自定义表单的校验规则
- [ ] 掌握文件上传和富文本编辑器在 Vue 项目中的应用
- [ ] 掌握 Vant 组件库的运用
- [ ] 掌握使用 postcss-px-to-viewport 实现移动端适配
- [ ] 能够独立运用 vue2 + vant 搭建H5应用能力，能够实现文章列表、频道管理、评论与回复、用户权限控制等特色业务。
- [ ] 掌握原生小程序开发，能够独立完成原生小程序项目开发
- [ ] 掌握 uni-app 多端框架，能够独立开发小程序和其他端的开发。
- [ ] 使用vue-cli创建vue单页应用解决方案
- [ ] 使用vue-router实现前端路由解决方案
- [ ] 使用vue-vuex实现状态管理解决方案
- [ ] 使用vant快速搭建移动界面解决方案
- [ ] 使用json-bigint处理最大安全整数解决方案
- [ ] 使用iconfont实现前端多色字体图标解决方案
- [ ] 使用dayjs处理相对时间计算解决方案
- [ ] 使用soket.io实现即时通讯解决方案使用postcss-px-to-viewport 实现移动端适配解决方案
- [ ] 掌握Vue + Element技术栈在开发管理型后台项目的技术开发能力
- [ ] 具备角色、人员、权限类系统的设计整体设计及应用能力
- [ ] 拥有Vue.js相关的技术要点及配套的插件，解决方案深度使用能力
- [ ] 具备使用 qiankun 搭建微前端项目的能力
- [ ] 具备使用 echarts、three.js 等图形工具，开发 2D、3D数据可视化平台能力
- [ ] 掌握开发原生小程序项目能力
- [ ] 掌握微信请求工具封装和使用
- [ ] 掌握微信用户登录和登录状态检测解决方案
- [ ] 掌握基于腾讯位置服务实现地理定位检索
- [ ] 掌握基于微信二维码服务实现访客通行证
- [ ] 能够开发跨平台的小程序
- [ ] 能够独立开发小程序项目
- [ ] 掌握微信登录的实现方式
- [ ] 掌握微信支付的实现方式
- [ ] 掌握鸿蒙ArkTS范式语⾔开发基础， 使⽤ArkUI进⾏鸿蒙原⽣应⽤界⾯设计开发
- [ ] 掌握鸿蒙ArkTS组件开发，组件封装，组件复⽤，组件传值，组件更新，State模型，事件处理，⽹络请求，原⽣能⼒应⽤能项⽬基础开发能⼒，掌握鸿蒙任务管理、线程管理、万能卡⽚、数据管理、分布式应⽤等，实现代码⼀次开发多端部署的能⼒
- [ ] 能够掌握鸿蒙低代码开发，能够掌握云服务提供的独⽴⼊⼝、免安装等便捷服务
- [ ] 掌握端云一体化工程概览、工程创建及配置、端云一体化组件集成、云函数开发及使用、云数据库开发和使用、一键式部署云工程的能力
- [ ] 掌握 ArkTS 与 ArkUI 核心语法，搭建鸿蒙应用界面
- [ ] 基于 http 模块封装 request 工具函数，实现网络管理
- [ ] 基于 router 模块实现路由封装，实现访问权限控制
- [ ] 掌握自定义组件封装，实现LoadingDialog、Skeleton、MiniCalendar等组件
- [ ] 基于 ArkTS 接口查询设备，实现手机和平板适配
- [ ] 通过 React + Hooks + Redux Toolkit 的学习，实现多种业务场景下的功能开发，如 B站评论、知乎频道管理、美团外卖、记账本等业务功能
- [ ] 进军大厂必备，结合 TypeScript+Hooks 和函数式编程思想完成项目开发。
- [ ] 高级前端工程师必备技能，真正实现一套代码多端运行，减少开发成本，提高开发效率。
- [ ] 高级前端工程师必备技能，在项目开发中实现自动化、规范化、组件化、模块化。

## 理论
1. 熟悉计算机组成原理，计算机网络以及操作系统的一系列知识。
2. 熟悉常见的数据结构和算法，能够使用算法解决常见问题
3. 熟悉 HTML，CSS，理解并掌握盒子模型，响应式布局，移动端兼容等问题
4. 熟练使用JavaScript，理解原型，闭包，异步等概念
5. 熟练使用 ES6+ 语法，熟悉常用设计模式
6. 熟悉函数式编程，熟悉 TypeScript
7. 熟练使用 vue 和 React 进行项目开发
8. 了解 webpack 打包配置，减小打包后的体积，提高响应速度
9. 熟悉 node.js + mongodb 搭建后台系统，能够高效和后端进行联调

## 实践
1. 全栈网站: 基于 Next.js 平台开发的博客网站，实现了从前端到后端的全栈功能，通过使用 github API 实现了完整的功能。   
2. 自动化部署: 利用 Vercel 平台的自动化部署功能，确保代码的持续交付和网站的实时更新，提升用户体验和开发效率。   
3. 通用请求封装: 使用 Axios 对请求进行通用封装，统一管理数据获取，提高代码复用性，同时遵循最佳实践，确保数据请求的可维护性和稳定性。  
4. 遵循规范的代码规范和配置: 保证项目代码风格一致，易于维护。利用 GitHub Actions 实现文章的自动更新，将自动化集成到开发流程中，提升团队协作效率。   
5. SEO 优化和服务端渲染: 利用 Next.js 的服务端渲染能力，提升网站的性能和搜索引擎优化。通过服务端渲染，网站能够更快地加载和展示内容，提升用户体验，同时有利于搜索引擎索引。

## 项目介绍
|介绍 |项目1 |项目2 | 项目3 |
|--|--|--|--|
|工作经历 | 杭州鱼互联网有限公司<br/>2023-02 ~ 2023-04<br/>移动端开发|2023-07 ~ 2023-07 <br/>前端开发||
|项目名称 |小程序+网页+后台管理系统 |  中后台管理系统|导购店长小程序|
|项目描述 | |  一个为零售行业提供技术支持的平台，本项目两套代码，Vue2框架和重构后的React框架的 |为了提高导购和店长的工作效率，搭建一套工作流程小程序|
|个人职责|1.小程序功能优化，历史 bug 修复，封装公共业务组件，提高代码可维护性，使用图片压缩，对静态资源进行体积优化，提高响应速度 <br/> 2.H5 网页开发，使用rem 兼容不同机型，使用 window API 修复 IOS 滑动问题，独立负责需求评审，开发联调，测试和发布上线  <br/>3.toB 中后台系统开发，熟练使用第三方库快速交付需求，封装公共逻辑和交互，使用注释和复杂逻辑解构提高代码的可维护性，独立负责多个复杂需求上线，并维护在线文档|1.参与了老项目功能的维护和扩展，使用了vue.directive来提取通用逻辑到自定义指令，熟悉了完整的开发流程规范 <br/>2.参与新项目的开发，在开发周期短的情况下，对老项目进行重构，独立负责了多个模块上线，跨团队沟通，协作；，熟练使用组件和框架的能力快速开发，封装通用业务组件，重构后的代码行数相比较旧项目减少了40%，提高了用户体验|1.优化历史功能，修改页面交互体验，修改历史数据显示异常现象，提高使用体验 <br/>2.新增自动化任务体系功能，使用状态管理库实现一套数据驱动多个层级组件视图更新 <br/>3.使用多种第三方库实现功能 - lodash.js（数据处理），qrcode.js （二维码生成），html2canvas（截图）等等|

## 模板
|||
|--|--|
|![](https://cdn.nlark.com/yuque/0/2025/jpeg/26841888/1747235595276-defd972c-3803-4b2b-bc95-08894411b010.jpeg)|![](https://cdn.nlark.com/yuque/0/2025/jpeg/26841888/1747235595415-f5d1b960-cd03-4652-9bd7-c7abf85049d8.jpeg)|
![](https://cdn.nlark.com/yuque/0/2025/jpeg/26841888/1747235595400-bed89af9-feca-41b9-b01c-55a7549e2b4b.jpeg)|![](https://cdn.nlark.com/yuque/0/2025/jpeg/26841888/1747235595380-472fc019-5fae-4c0b-bf65-c5502d7af6a4.jpeg)|

## 相关资料
1. [前端八股文整理（掘金）](https://juejin.cn/post/7023285223508934663)  
2. [前端面试题解析（CSDN）](https://blog.csdn.net/weixin_45712370/article/details/134951791)  
3. [前端学习笔记（语雀）](https://www.yuque.com/xiumubai/doc)
+ [手把手带你实现完整的前后端 token实践前端登录，后端返回一个 token，前端将该 token 保存在本地，之后的请 - 掘金](https://juejin.cn/post/7072771035312947207#heading-4)
+ [前端面经（Js手撕题部分）_牛客网](https://www.nowcoder.com/discuss/594907891715379200)
+ [ JavaScript 阵列去除重复 removeDuplicates｜ExplainThis](https://www.explainthis.io/zh-hans/swe/remove-duplicate-set)
+ [js手写题汇总（面试前必刷）-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2156211)
+ [前端一面手写面试题总结_2023-03-13-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2239170?policyId=1004)
+ [【中高级前端】必备，30+高频手写题及详细答案(万字长文)，看“你”怎么难倒我-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2055342?policyId=1004)
+ [【前端】夯实基础 css/html/js 50个练手项目（持续更新）_50个前端项目-CSDN博客](https://blog.csdn.net/chenghan_yang/article/details/136214036)
+ [送你21道精选高频JavaScript手写面试题（建议收藏）](https://mp.weixin.qq.com/s/xy0aeBt5yDbivvnPqIAnsg)
+ [javascript - 腾讯前端一面经典手写面试题合集 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000043445256)
+ [javascript - 【中高级前端】必备，30+高频手写题及详细答案(万字长文)，看“你”怎么难倒我 - 谦龙的学习笔记 - SegmentFault 思否](https://segmentfault.com/a/1190000040803264)
+ [死磕 36 个 JS 手写题（搞懂后，提升真的大）作为一个程序员，代码能力毋庸置疑是非常非常重要的，就像现在为什么大厂面 - 掘金](https://juejin.cn/post/6946022649768181774)
+ [博客搭建系列 - 冴羽的专栏 - 掘金](https://juejin.cn/column/7041871760995647502)

