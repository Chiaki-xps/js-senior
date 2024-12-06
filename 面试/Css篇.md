### 盒子模型

- 标准盒子：height、width 只包含了 content
- 怪异、IE 盒子：height、width 包含了 content、padding、border

### flex 面试题

- 容器设置
  - flex-direction 主轴的方向
  - flex-warp 换行
  - flex-flow 上面两个的语法糖
  - justify-content 主轴对其方式
  - align-item 交叉轴对其方式
  - align-content 所有交叉轴对其方式

* item 设置
  - flex-grow 放大比例，占据剩余空间几分，每一个占几分
  - flex-shrink 空间不够，缩小比例
  - flex-basis 每个 item 占据主轴空间的大小，auto 就是原来大小，也可以是具体值，原来设置高度失效，改用 flex-basis 设置值。设置为 0 表示取里面内容的大小
* item 默认值`flex-grow: 0; flex-shrink: 1; flex-basis: auto`

* flex:1 表示 `flex-grow: 1, flex: shrink: 1, flex: 0%`

### BFC

- BFC 你可以理解成独立的箱子，和外面互不影响。相当于独立的渲染区域。
- 创建 BFC 的方法
  - position: absolute/fixed
  - overflow: visible
  - display: flex/inline-block
