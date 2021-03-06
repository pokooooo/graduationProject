## 仿花光比尔盖茨的钱前后端

[产品原型](https://v5.modao.cc/app/d20d00f612467de91016ed6a8df1236a9a1fb0c6?simulator_type=device&sticky)

### 前台

参照网站[花光比尔盖茨的钱](https://neal.fun/spend/)

#### 首页

首页列出后台添加的富豪，在首页进行富豪选择。

#### 购买页

列出所有后台添加的商品，添加|取消等操作完全参照原网址。

与原网址不同的是：右上角新增一个购物车的按钮，显示物品的数量。点击之后弹出购物车的内容。点击下单按钮，下单成功后弹出成功提示，并返回首页。

> 注意：商品不要一次性全部加载，通过下拉加载更多方式进行加载。

### 后台

后台共有四个模块，富豪榜、商品管理、订单管理、登录登出。

#### 登录登出

#### 富豪榜

在该板块，可以进行富豪的添加、修改、搜索以及删除

#### 物品管理

在该板块，可以对商品进行添加、修改、删除、搜索以及修改权重

#### 订单管理

在该板块，可以对商品进行订单的查看、搜索

### 客户端

在*主目录*中,以下是运行方法

- npm i

- npm run serve

前端入口http://localhost:8081/

后端入口http://localhost:8081/roles

### 服务端

在*mid-server*中，以下是运行方法

- npm i

- node index.js

#### 接口说明

所有的接口都以/api开头

例如后台的登录接口在`routes`文件夹下的`console`的`auth.js`文件中，那么该接口为

> /api/console/auth/login

参数为：`account、pwd`

#### 使用说明

请先安装好依赖包再启动，记得启动服务端，静态图片资源（原神人物和武器）在*src.assets.image*中，请使用，此项目没有连接数据库，所有数据都保存在本地文件中，可根据情况手动清理，购买页
已做移动端适配，请按住上拉滑动

