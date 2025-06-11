# flex

flex-container：弹性容器

flex-item：弹性子元素

- 容器属性
  - flex-direction：设置主轴
  - flex-warp：是否换行（不包裹就是换行）
  - flex-flow：语法糖（上面两个的属性的合并）
  - justify-content：主轴（main-axis）对其方式
  - align-item：交叉轴（Cross axis）对其方式
  - align-content：所有交叉轴对其方式(设置了`flex-wrap: wrap`)，可以理解换行后，交叉轴所有 item 的对齐方式

* item 属性（元素属性）

  - order：决定了 item 的排列顺序，数值越小，排列越靠前，默认为 0

  * flex-grow：放大比例去占据剩余空间几分，单独设置每一个占的比例。
    - 0：保持默认初始化大小
    - 1：全部设置 1，平分剩余空间
    - 可以单独每个设置，代表总的占比多少
  * flex-shrink：空间不够，缩小比例，同上
  * flex-basis：**属性定义了在分配多余空间之前的大小**，每个 item 占据主轴空间的大小，auto 就是原来大小，也可以是具体值，原来设置高度失效，改用 flex-basis 设置值（flex-basis 的优先级比 width 高）。
    - auto：表示取里面内容的大小或 width 值
    - 0:表示放弃内容尺寸，所有空间视为剩余空间，按比例分配

* flex：initial（默认的）

  - item 默认值`flex-grow: 0; flex-shrink: 1; flex-basis: auto`，不放大、等比例缩小，默认保持原本大小

* flex：auto

  - `flex：1 1 auto` 等比例放大缩小，默认使用原本内容大小

* flex：none

  - `flex：0 0 auto` 没有缩放，就是原本大小

* flex:1 表示 `flex-grow: 1, flex: shrink: 1, flex-basis: 0`

## 单词

direction：方向

justify：对齐

align：对齐

row：横向、行

column：纵行（列）

reverse：颠倒

wrap：包裹

order：顺序

grow：生长

shrink：缩小

initial：最初的

## 参考链接

```http
https://juejin.cn/post/7507253852111994920
```

