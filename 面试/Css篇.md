## 1. Css3 引入一些主要新特性？

- 其实并不存在真正意义上的 CSS3（W3C 文档）。
- CSS3 并不是⼀个单⼀的规范，⽽是⼀系列独⽴模块的集合，这些模块扩展了 CSS 的功能。
- 这种模块化的⽅法允许不同的特性以不同的速度发展，可以更快的标准化⼀些特性，⽽不必等待整个规范的完成。

  - 选择器（Selectors）：

    - 新的属性选择器，如 [attr^=value]（属性值以特定字符串开始）；
    - 结构性伪类，如 :nth-child、 :nth-last-child、 :first-of-type；

  - 背景和边框（Backgrounds and Borders）：

    - 边框圆⻆（ border-radius），简化了创建圆⻆效果的过程。
    - 边框图⽚（ border-image），允许使⽤图⽚来创建边框。
    - 多重背景，⽀持在单个元素上使⽤多个背景图⽚。

  - ⽂本效果（Text Effects）：

    - ⽂本阴影（ text-shadow），可以在⽂字后⾯添加阴影效果。
    - ⽂本溢出（ text-overflow），控制⽂本溢出容器时的显示⽅式。

  - 转换和动画（CSS Transforms Module, CSS Animations）：

    - 2D 和 3D 转换（ transform），包括旋转（ rotate）、缩放（ scale）、倾斜（ skew）和平移（ translate）。
    - CSS 动画（ animation），允许定义关键帧动画，控制动画序列。

## 2. 常见的伪类

- `:hover`：鼠标悬停时生效。
- `:active`：元素被激活（如点击时）生效。
- `:focus`：元素获得焦点（如表单输入）生效。
- `:nth-child(n)`：匹配父元素的第 `n` 个子元素。
- `:visited`：已访问的链接样式。

## 3. 伪元素、伪类区别

- **伪类**：以冒号(:)开头，用于选择处于特定状态的元素。
- **伪元素**：以双冒号(::)开头，用于在文档中插入虚构的元素。
  - `::before` 和 `::after`伪元素给某个元素添加前缀或后缀

```http
https://juejin.cn/post/7136087057542086693
```

## 4. 怎么引入 css

## 5. **物理像素**-**逻辑像素**-CSS**像素**-**像素密度**-DPR-PPI-DPI

- pixel：
  - pix 是英语单词 picture 的常⽤简写，加上英语单词“元素”element，就得到 pixel；
  - 像素是影响显示的基本单位
- 物理像素（Physical Pixel）也称为设备像素，是显示屏幕的最⼩ 物理 单位。

  - 每个物理像素可以发光并显示特定的颜⾊
  - 物理像素的⼤⼩是固定的，由设备的硬件决定。（手机分辨率）

- 物理像素的密度（像素每英⼨，即 PPI，英语：Pixels Per Inch，缩写：PPI）PPI 越⾼，屏幕显示的内容就越细腻

  - 1 英⼨=2.54 厘⽶，在⼯业领域被⼴泛应⽤；

- 逻辑像素（Logical Pixel），有时也被称为设备独⽴像素（Device Independent Pixel，简称 DIP）
  - 是⼀个抽象的单位，⽤于在编程中统⼀不同设备的显示标准。
  - 逻辑像素是⽤来衡量在不同设备上如何统⼀显示内容的尺⼨单位。
  - 在⾼分辨率设备上，可能有多个物理像素组成⼀个逻辑像素。
  - 论设备的物理像素密度如何，使⽤逻辑像素单位开发的界⾯都能保持相对⼀致的⼤⼩和视觉效果。
- DPR：device pixel ratio

  - 在 Retina 屏幕（苹果推出的屏幕）中，⼀个逻辑像素在⻓度上对应两个物理像素，这个⽐例称之为设备像素⽐（device pixelratio）；
  - 我们可以通过 window.devicePixelRatio 获取到当前屏幕上的 DPR 值；（正常值为 1，Retina 则是 2）

- CSS 像素（CSS Pixel），CSS 像素可以被看作是逻辑像素的⼀种形式，⽤在 Web 端的。

  - 平时使用的 px 就是逻辑像素

  - 它们被设计⽤来简化 Web 开发者的⼯作，使⽹⻚在不同显示设备上都能保持设计的⼀致性。
  - 随着设备屏幕密度的增加，浏览器会⾃动处理 CSS 像素与物理像素之间的⽐例关系，确保⽹⻚元素在视觉上的⼤⼩保持⼀致。

- DPI（Dots Per Inch）:每英⼨的打印点数

  - DPI 主要⽤于描述打印机输出的精细度。
  - 例如，⼀个⾼ DPI 值的打印机可以打印出更细致、更少⻅瑕疵的图像。

- PPI 和 DPI 的区别是什么？

  - DPI 主要⽤于打印领域，⽽ PPI 则主要⽤于屏幕显示领域。
  - DPI 衡量的是墨⽔点的数量，PPI 衡量的是像素的数量。

- 总结：
  - 可以把物理像素理解成实际的对象，逻辑像素理解成接口。逻辑像素是⼀个抽象的单位，⽤于在编程中统⼀不同设备的显示标准。
  - PPI：物理像素密度
  - DIP：设备独立像素
  - DPR：设备像素比
  - DPI：每英⼨的打印点数
  - **window.devicePixelRatio(设备像素比) = 设备的物理像素 / CSS 像素**

## 6. 为什么在移动端使⽤**@2x**、**@3x**的图⽚？

- 用来适配不同分辨率的设备
- 通过媒体查询 + resolution 进行适配
  - resolution 媒体特性是 CSS 标准中⽤于查询设备显示密度的推荐⽅式。
  - 它⽀持多种单位，包括 dpi（dots per inch，每英⼨点数）、 dpcm（dots per centimeter，每厘⽶点数）、和 dppx（dots per pixel unit，每像素点数单位，相当于设备像素⽐）。
  - 1dppx 相当于⼀个设备独⽴像素对应于⼀个屏幕物理像素。

```css
/* 默认1x */
.box {
  background-image: url(./img/zznh.png);
}

/* 方法一 dppx方案 */

/* 针对2x屏幕 */
@media only screen and (min-resolution: 2dppx) {
  .box {
    background-image: url("./img/zznh@2x.png");
  }
}

/* 针对3x屏幕 */
@media only screen and (min-resolution: 3dppx) {
  .box {
    background-image: url("./img/zznh@3x.png");
  }
}
/* 方法二 -webkit-min-device-pixel-ratio 可能存在兼容性问题 dpr方案 */
@media only screen and (-webkit-min-device-pixel-ratio： 2) {
  .box {
    background-image: url("./img/zznh@2x.png");
  }
}
```

## 7. **什么是**1px**问题，前端如何去解决它，如何画出**0.5px 边框？

- 1px 问题指的是：在一些 Retina 屏幕 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。
- 0.5 px 对于一些设备不支持小数点，导致显示 0 px
- ⽅案⼀：viewport + rem + div
  - 通过 js 脚本动态设置缩放比例，然后直接写 1px 进行兼容
  - 其他宽度通过设置 rem

```html
// viewport 下 设置 initial-scale 为 1。表示 1 dpr
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      id="WebViewport"
      content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <title>Document</title>
    <style type="text/css"></style>
  </head>
  <body>
    <script type="text/javascript">
      const dpr = window.devicePixelRatio || 1;
      const scale = 1 / dpr;
      const metaEl = document.getElementById("viewport");
      metaEl.setAttribute(
        "content",
        `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
      );

      // 屏幕宽度 ≤ 750px 时，根字体为 屏幕宽度 / 10
      // 大屏幕 为 75px
      function resize() {
        let width = screen.width > 750 ? "75px" : screen.width / 10 + "px";
        document.getElementsByTagName("html")[0].style.fontSize = width;
      }
      window.onresize = resize;
    </script>
  </body>
</html>
0
```

- ⽅案⼆：伪类 + transform（京东）
  - 本质上是对伪类宽高放大两倍，然后设置 boder 的时候为 1px。然后缩放 scale 0.5。得到 0.5px

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .border-test {
        position: relative;
        padding: 10px;
        margin: 20px;
        display: inline-block;
      }
      .border-test::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid red;
        transform-origin: 0 0;
        transform: scale(0.5);
      }
    </style>
  </head>
  <body>
    <div class="border-test">1px border</div>
  </body>
</html>
```

## 8. **你如何理解块级上下⽂（**BFC**），并且创建**BFC**的⽅法有哪些？**

- **FC 的全称是 Formatting Context（格式化上下文），元素在标准流⾥⾯都是属于⼀个 FC 的；**（）
  - 块级元素的布局属于 Block Formatting Context（BFC）
  - ⾏内级元素的布局属于 Inline Formatting Context（IFC）

## 9. 浏览器上的兼容性问题？

1. 用webpack之类的工程化工具下，很少单独处理兼容性问题
1. 配置 browserslist、autoprefixer、babel、postcss-preset-env。会根据目标环境，进行转换
1. 使用 BrowserStack  云平台做测试

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
