# BFC

```http
https://www.bilibili.com/video/BV13H4y1X7bu
```

- 研究 BFC 研究的是普通稳定流的块元素的排布规则。
- 常规的块元素，在布局的时候，是依次向下排列的。那么在开发中会发现，即使依次排列也会出现一些意料之外的结果：
  - 垂直方向上相邻元素，**margin 合并**（两个 margin 合并，使用最大那个）
  - 父子关系，**margin 塌陷**
  - 父子关系，父元素浮动元素会产生**高度坍塌**
  - 兄弟关系下，正常元素可能会被**浮动元素覆盖**（正常与安素在浮动元素之后）
    - 说白了这些都是浏览器定义的规则造成的。

## 什么是 BFC？

- 区块格式化上下文（Block Formatting Context）
- 开启 BFC 的区域，是一块独立的渲染区域，有单独的浏览器渲染规则：
  - 隔绝了内部与外部的联系，内部渲染不会影响到外部
  - 不同的 BFC 区域，渲染时也互不干扰。

## BFC 解决了什么问题？

- 开启 BFC，其子元素不会再产生 margin 塌陷问题。（也不会和他的子元素产生 margin 合并）
- 开启 BFC，就算子元素浮动，自身高度也不会塌陷。（高度计算不再无视浮动元素）
- 开启 BFC，自己不会被其他浮动元素所覆盖。（不会与浮动元素重叠，会避开浮动元素排布）

## 如何开启 BFC

- 根元素（html 标签）
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- ⾏内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值），表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 计算值(Computed)不为 visible 的块元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接⼦元素）
- ⽹格元素（display 为 grid 或 inline-grid 元素的直接⼦元素）
- display 值为 flow-root 的元素

## 一些疑惑？

### 什么是 margin 合并？

```http
https://www.bilibili.com/video/BV1gu4y1z7G1
```

块元素上下结构的时候，两个块相邻区域都写了 margin 属性，最终展示效果是两个块元素中值最大的一个，可以看成两个 margin 合并在一起，最终显示 margin 为最大的一个，这就是 margin 合并。

不必太在意为什么，这就是浏览器解析的机制。解决办法就是计算好，只设置一个就行。

## 什么是 margin 塌陷？

```http
https://www.bilibili.com/video/BV1S841197va
```

假如我们的容器
