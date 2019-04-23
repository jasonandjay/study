---
title: 悦读系统接口
sidebar: auto
sidebarDepth: 2
---
## 接口域名
- 线上：http://123.206.55.50:15000
- 本地：http://localhost(或本机的ip): 15000

## 接口定义
```js
  code： 1表示请求成功, !1表示请求失败
  msg:   表示请求信息，无论请求成功与失败都应该返回
  data:  返回请求的数据
  
  token: 统一放在请求头里的X-Token字段
```
## 用户相关
### 用户名登陆接口
```js
@param username
@param password
@url post  /users/login
@return {
	code :1,
	data: {
    token: 132131321,
    auths: ['admin', 'staff']
	},
	msg： '登陆成功'
}
```
### 手机号登陆接口
```js
@param phone
@param code
@url post /users/smsLogin
@return {
	code :1,
	data: {
    token: 132131321,
	},
	msg： '登陆成功'
}
```
### 获取用户信息接口（自己）
```js
@url get  /users/info
@return {
	code: 1
  data:{
    address: "轨顶风道111"
    avatar: "http://123.206.55.50:11000/static/UT5B4pk0uNPqsPZkEKI4Epna.jpg"
    city: "太原市"
    create_time: "1540189715161"
    email: "503032527@qq.com"
    id: 26
    name: "chenmanjie"
    phone: "15712892269"
    profile: "打算放假肯定发酒店客房酒店客房11111"
    province: "山西省"
    status: 1
    type: 1
    userid: 26
    username: "chenmanjie"
  },
  msg: "获取用户信息成功"
}
```

### 注册接口
```js
@param username 
@param password
@param phone
@url   post	/users/reigster
@return {
	code :1,
	data: {
		token: 132131321,
	},
	msg： '注册成功'
}
```

### 获取用户权限
```js
@param token
@url   get /users/authority
@return {
	code :1,
	data: {
		auths: ['admin', 'staff']
	},
	msg： '用户权限获取成功'
}
```

### 获取用户列表
```js
@param  type //1表示普通用户 2表示员工
@param  search  可选  用户名
@param  phone   可选  手机号
@param  page 可选 第几页数据，默认为第一页，每页十条数据
@url  get /users/list
@return {
	code :1,
	data: {
		list: [{
      id: 1,
      username: 'chenmanjie',
      phone: '17621526605',
      avtar: '',
      status: 0,
      create_time: '',
      rolers: ['developer', 'designer'],
      rolersId: [2,4],
      access: ['admin', 'staff'],
      accessId: [3,4]
    }]
	},
	msg： '用户列表获取成功'
}
```
### 注销账号的接口
```js
@param  type //1表示普通用户 2表示员工
@param  uid  用户id
@url    delete /users/action
@return {
  code: 1,
  data: {},
  msg: '注销用户成功'
}
```
### 分配角色接口
```js
@param  type = 2
@param  uid 用户id
@param  rolersId = [2, 4]
@url    put /users/action
@return {
  code: 1,
  data: {},
  msg: '分配用户角色成功'
}
```
### 更新信息接口
```js
@param object 自己的信息
{
  id: '', // 更新别人信息的时候需要传递
  name: '',
  avatar: '',
  email: '',
  profile: '',
  province: '',
  city: '',
  address: '',
  phone: '',
  status: ''
}
@url    post /users/update
@return {
  code: 1,
  data: {},
  msg: '更新用户信息成功'
}
```
## 门店相关
### 获取门店列表
```js
@param token
@param city	可选参数
@param page 可选 第几页数据，默认为第一页，每页十条数据
@url   get /shop/list
@return {
	code: 1,
	data: {
		list: [{
			id: 1,
			name: '北京八维门店',
			img: '',
			address: '北京市海淀区唐家岭57号',
			info: '北京总部',
			count: 100,
			city: '北京',
			status: 1,	// 1表示门店正常营业，2表示已关闭，3表示审核中
			inconme: 10000
		}]
	},
	msg: '门店列表获取成功'
}
```

### 关闭门店接口
```js
@param token
@param sid	门店id
@url   get /shop/close
@return {
	code: 1,
	data: {},
	msg: '门店关闭成功'
}
```

### 更新门店信息接口
```js
@param shopInfo	门店信息的对象
{
	img: '',
	name: '',
	address: '',
	info: '',
	city: ''
}
@url   post /shop/update
@return {
	code: 1,
	data: {},
	msg: '门店信息更新成功'
}
```
### 新增门店功能
```js
@param shopInfo 门店信息的对象
{
	img: '',
	name: '',
	address: '',
	info: '',
	city: ''
}
@url   post /shop/insert
@return {
	code: 1,
	data: {},
	msg: '新增门店成功'
}
```

### 门店搜索功能
```js
@param search	要搜索的门店关键字
@param page 可选 第几页数据，默认为第一页，每页十条数据
@url   get /shop/search
@return {
	code: 1,
	data: {
		list: [{
			id: 1,
			name: '北京八维门店',
			img: '',
			address: '北京市海淀区唐家岭57号',
			info: '北京总部',
			count: 100,
			city: '北京',
			status: 1,	// 1表示门店正常营业，2表示已关闭，3表示审核中
			inconme: 10000
		}
	},
	msg: '搜索结果'
}
```

## 物品接口
### 物品列表功能
```js
@param sid  门店的id
@param page 可选 第几页数据，默认为第一页，每页十条数据
@url   get /goods/ist
@return {
	code: 1,
	data: {
		list: [{
			id: 1,
			name: '活着',
			img: '',
      num: 100,
      rent: 50,
      return: 30,
      remain: 20,
      shop: '北京八维门店',
			info: '讲诉一个地主的悲惨生活，从一个地主到破产，到身边的亲人一个个离他而去，留下他自己和一头老黄牛的故事',
			city: '北京',
			status: 1,	// 1表示上架中，2表示下架中
      price: 3
    }
	},
	msg: '物品列表'
}
```
### 新增物品功能
```js
@param object 物品信息
{
  sid: 1, // 店铺的id
  img: '',
  name: "活着",
  num: 100,
  info: '讲诉一个地主的悲惨生活，从一个地主到破产，到身边的亲人一个个离他而去，留下他自己和一头老黄牛的故事',
  price: 3
}
@url  post /goods/add
@return {
  code: 1,
  data: {},
  msg: '新增物品成功'
}
```

### 更新物品功能
```js
@param object 物品信息
{
  img： '',
  num： 100,
  info： '讲诉一个地主的悲惨生活，从一个地主到破产，到身边的亲人一个个离他而去，留下他自己和一头老黄牛的故事',
  price： 3
}
@url  post /goods/update?gid=100
@return {
  code: 1,
  data: {},
  msg: '更改物品成功'
}
```
#### 上架/下架物品功能
```js
@param gid  物品的id
@param status 可选  物品状态，1为上架2为下架 
@url  get /goods/close
@return {
  code: 1,
  data: {},
  msg: '上架/下架物品成功'
}
```

## 订单接口
### 订单列表
```js
@param phone  可选，通过手机号筛选
@param name   可选，通过用户名筛选
@param date   可选，通过日期筛选
@param order  可选，1表示升序，0表示降序，默认0
@param status 可选，筛选订单状态
@param page 可选 第几页数据，默认为第一页，每页十条数据
@url   get  /order/list
@return {
  code: 1,
  data: {
    list: [{
      id: 1,
      username: '',
      phone: '',
      orderNu: 'abbcsadjsadjajdakdjkakdajsd',
      price: 100,
      goods: [{
        name: '拿铁咖啡小杯',
        num: 1,
        price: 10
      },{
        name: '拿铁咖啡大杯',
        num: 1,
        price: 90
      }],
      status: 1,  // 1未发货，2已发货，3完成
      shipName: '', // 快递公司名字
      logisticCode: '',   //快递单号
      create_time: '132131231',
      Traces: []
    }]，
    total: 100
  },
  msg: '获取订单列表成功'
}
```
### 更新订单
```js
@param  status,
@param  shipName
@param  logisticCode
@url  post /order/update
@return {
  code: 1,
  data: {},
  msg: '更新订单成功'
}
```
