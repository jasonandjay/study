---
title: 黑市商城接口
sidebar: auto
sidebarDepth: 2
---
# 黑市接口

## 首页

### 搜索接口
- url: get https://api.chaping.tv/api/shop/search-product?q=[搜索关键字]?

### 热门推荐
- url: get https://api.chaping.tv/api/multi-requests


### 顶部tab分类
- url: get https://api.chaping.tv/api/shop/categories


### tab内容详情
- url: get https://api.chaping.tv/api/shop/sub-category-products/[分类id]


### 商品详情
- url: post https://api.chaping.tv/api/multi-requests
- content-type: application/json
- body
```js
{
    "0": {
        "method": "GET",
        "uri": "shop/product/90/statistics",
        "data": {
            "__form_id": null
        }
    },
    "1": {
        "method": "GET",
        "uri": "shop/product/90",
        "data": {}
    },
    "2": {
        "method": "GET",
        "uri": "shop/comments/short/90"
    },
    "3": {
        "method": "GET",
        "uri": "shop/user/badges/cart"
    }
}
```

## 分类页面
### 分类数据
- url: get https://api.chaping.tv/api/shop/categories

## 购物车页面
### 获取token
- url: post https://api.chaping.tv/api/user/token
- content-type: application/json
- body
```js
{
    "wxapp": {
        "scenario": "heishi_wxapp",
        "code": "071msnsE0XUDel2LFxtE0Nm8sE0msnsX",
        "iv": "H1NdRdSLXPRXQ9IOEtjbKQ==",
        "encryptedData": "RKZUEZRoOYCay4Y9o6JOKURRzaMxXKzyC4PnLD5DbTQg2l3O/Qr1qKwxI3hcw12hBkqtK0sZ62LBe2rzYkyTH31wcZ2ImO/+NVzJ+N6m6/VyGgw6pCh12yrDFmVZFH1S7bYm9bbgwUTJyDwYAd3gi7aDNMBMG9sQ995FKSarpzJhx/zJK7d3Pc+SRstVXJP5lXYW46vuegjzIJHTcugWIiMvJSwBG66/Pbi8+IAb7t0RJZt3/8RW4d+mRlzo4eayaAvHWQ/d2dqiFIv0wP/hhMdQ3kWbvnm98dEZ5Mbhl7bXncOp0WDBlhs4nq9GO7ESX6+fYNe+S7s6KtnpNYbpHG6CJKcR/k0+0uQMY8HyjmFm5dCP8RR6bFzQPwYVB+fI1JEM8lVz9unkD3Ahaq+mhddlxS+7S/p943useBan5O7DbKNyjy2mRPEqJNz+zymAQM5RDgMay+1Dj8+CAQPJOJwwHldEPrdoOFBc6SUCJ9KGASGMtdkKNxfog+H8R9DqPqDWQscSVVX7jytAYKWVuw=="
    },
    "os_name": "ios",
    "os_version": "iOS 12.0",
    "device": "iPhone 8 Plus (GSM+CDMA)<iPhone10,2>"
}
```

### 获取用户信息
- url: get https://api.chaping.tv/api/user/profile
- header['authorization']: Bearer VhFViA9Jzg7un9rD0_yiDc4GHRwub2sMyK_D1NUabvkP45dZ

### 获取购物车的数据
- url: get https://api.chaping.tv/api/shop/cart/list
- header['authorization']: Bearer VhFViA9Jzg7un9rD0_yiDc4GHRwub2sMyK_D1NUabvkP45dZ

## 我的页面
### 获取用户订单
- url: get https://api.chaping.tv/api/shop/user/badges/order

### 获取订单列表
- url: get https://api.chaping.tv/api/shop/orders?state=[订单状态]&page=[页码：1]&limit=[每页数量: 5]
- 订单状态：['all', 'unpaid', 'unshipped', 'unreceive', 'unevaluated', 'evaluated']

### 获取地址列表
- url: get https://api.chaping.tv/api/shop/address

### 新增地址
- url: post https://api.chaping.tv/api/shop/address
- body
```js
{
    "name": "辰辰",
    "mobile": "17621526605",
    "province": "广东省",
    "city": "广州市",
    "county": "荔湾区",
    "address": "我要睡觉了",
    "is_default": 1
}
```

### 获取地址详情
- url: get https://api.chaping.tv/api/shop/address/[地址id]

### 修改地址
- url: put https://api.chaping.tv/api/shop/address/[地址id]
```js
{
    "id": 792,
    "name": "辰辰爸爸",
    "mobile": "17621526605",
    "country": "",
    "province_id": 440000,
    "province": "广东省",
    "city_id": 440100,
    "city": "广州市",
    "county_id": 440103,
    "county": "荔湾区",
    "address": "我要睡觉了",
    "is_default": 1
}
```
### 删除地址
- url: delete https://api.chaping.tv/api/shop/address/[地址id]

### 意见反馈(用微信的反馈功能)
### 在线客服(用微信自带的客服)