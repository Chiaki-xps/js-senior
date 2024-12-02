# Webpack Tree-Shaking

- tree-shaking 可以类比 js 的垃圾回收：分析-> 标记->清除

- Tree-Shaking 是一种基于 **ES Module** 规范的 Dead Code Elimination 技术

## 1. Webpack 使用 Tree-Shaking

- 模块要保证是 ESM 模块

- 开启条件

  1. `optimization.usedExports = true`

  2. `mode = production`

  3. `optimization.minimize = true` 开启代码压缩

  4. `optimization.minimizer` 配置压缩插件

## 2. 为什么 ESM 就可以 Tree-Shaking

- CommonJs、AMD、CMD 等旧版本的 JavaScript 模块化方案中，导入导出行为是高度动态，难以预测的

  - 因为可以在判断条件中动态导入，所以不可以预测

```js
// 例子
if() {
    require('模块')
}
```

- 事实上 webpack 还是会把 ESModule 转成 webpack_require 的模式
- ESM 能实现 tree-shaking 是因为强制要求导入导出语句必须在顶层。避开了动态导入的清空。所以不需要运行，静态分析就能解析哪些模块被导入过。

## 3. 实现原理

1. Make（构建） 阶段，收集模块导出变量并记录到模块依赖关系图 ModuleGraph 变量中
2. Seal（编译） 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用
3. 生成产物时，若变量没有被其它模块使用则删除对应的导出语句
