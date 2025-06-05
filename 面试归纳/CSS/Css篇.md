### 盒子模型

- 标准盒子：height、width 只包含了 content
- 怪异、IE 盒子：height、width 包含了 content、padding、border

*

### BFC

- BFC 你可以理解成独立的箱子，和外面互不影响。相当于独立的渲染区域。
- 创建 BFC 的方法
  - position: absolute/fixed
  - overflow: visible
  - display: flex/inline-block

## 回流重绘

- 回流可以理解布局要重新计算
- 重绘知识元素的一些不影响布局的外观改变了
