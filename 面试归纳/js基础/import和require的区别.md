# import 和 require 区别

**文件类型：**

- import 只能导入 ES6 模块代码，否则需要使用 babel 转化
- require 支持 CJS、AMD、UMD 等

**变量提升：**

- import 是静态执行，只能模块顶层执行。并且模块内部创建模块作用域。
  - 静态执行是指在编译阶段（**异步加载**）就能够确定其执行结果的代码执行方式。会在编译阶段对`import`语句进行静态分析，确定所导入的模块，并在运行时加载这些模块。
- require 动态执行（运行时执行）（**同步加载**），不会在模块内部创建一个局部作用域。所以存在变量提升

**this：**

- import 中模块 this 为 undefined
- require 中 this 指向的是 exports。而因为`exports =module.exports`，也可以所指向`module.exports`。require 相当于 node 的 module 读写当前文件

**输出：**

- `commonjs` 输出的，是一个值的拷贝，而`es6`输出的是值的引用；
  - require 引入的时候相当于拷贝值，import 命令引入的时候，直接拿到值的引用。
  - `const 变量 = require(模块)`。得到模块导出赋值给变量
  - `import 变量 form 模块`。模块中导出放入到变量中
- `commonjs`是运行时加载，`es6`是编译时输出接口；

require 是一个 cjs 导入语法。import 是 ES6 提供得一个接口命令用来导入。

推荐使用 import，因为有静态分析，webpack 依赖静态分析进行变量提升，以及更好的 tree shaking。
