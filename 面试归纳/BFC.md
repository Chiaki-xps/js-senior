# BFC

## 什么是BFC？

+ 区块格式化上下文（Block Formatting Context）
+ 开启BFC的区域，是一块独立的渲染区域
+ 隔绝了内部与外部的联系，内部渲染不会影响到外部
+ 不同的BFC区域，渲染时也互不干扰。

## BFC解决了什么问题？

+ 开启BFC，其子元素不会再产生margin塌陷问题。（也不会和他的子元素产生margin合并）
+ 开启BFC，就算子元素浮动，自身高度也不会塌陷。（高度计算不再无视浮动元素）
+ 开启BFC，自己不会被其他浮动元素所覆盖。（不会与浮动元素重叠，会避开浮动元素排布）







## 一些疑惑？

### 什么是margin合并？

```http
https://www.bilibili.com/video/BV1gu4y1z7G1
```

块元素上下结构的时候，两个块相邻区域都写了margin属性，最终展示效果是两个块元素中值最大的一个，可以看成两个margin合并在一起，最终显示margin为最大的一个，这就是margin合并。

不必太在意为什么，这就是浏览器解析的机制。解决办法就是计算好，只设置一个就行。

## 什么是margin塌陷？

```http
https://www.bilibili.com/video/BV1S841197va
```

假如我们的容器