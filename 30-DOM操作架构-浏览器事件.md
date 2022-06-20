# 30. DOM操作架构-浏览器事件

## 0. 面试题-参数作用域

```js
var x = 0

// 当函数的参数有默认值时, 会形成一个新的作用域, 这个作用域用于保存参数的值
function foo(x, y = function() { x = 3; console.log(x) }) {
  console.log(x)
  var x = 2
  console.log(x)
  y()
  console.log(x)
}

foo()
console.log(x)

undefined
2
3
2
0
```

+ 分析：

  1. 这里主要第一点就是当参数中有一个存在默认值的时候，就会与其他参数构成一个参数作用域。这个作用域里会包裹函数作用域，如果没有都没有默认参数，就会与函数作用域合并在一起。

  + 多以`y=function(){...}`中，y中的x与外部的x在同一个作用域，所以会修改参数x。

  2. 关于x的变量提升，在函数中，执行到了x才会进行创建赋值。所以：

  ```js
  function foo(x=1) {
    console.log(x)
    var x = 2
  }
  
  foo() // 1
  
  // ---------
  function foo(x=1) {
    var x = 2
    console.log(x)
  }
  
  foo() // 2
  
  // 可以记忆成就近原则吧
  function foo(x) {
    console.log(x)
    x = 2
  }
  
  foo() // undefined
  
  // -----------
  function foo(x=1) {
    console.log(x)
    x = 2 // 这个x被限定在函数作用域中
  }
  
  foo()
  
  console.log(x) // 未定义
  
  ```

+ 拓展

```js
console.log(x);
var x=1
// var定义的变量会先提升
```

```js
console.log(x);
x=1
// x未定义先

console.log(x);
let x=1
// x未定义先

```

```js
console.log(x);
var x=1
function x() {
  
}
// 函数作用域提升大于变量提升

[Function: x]
```

```js
console.log(x)
x=1
// 会报错，因为执行到x=1的时候才会定义变量，然后赋值

```

```js
console.log(x)
var x=1
// 有var的时候定义变量提升，然后执行到才赋值。所以结果为undefined

```

```js
// 1.
function foo( x =2 ) {
  var x = 1
  console.log(x);
}
foo() // 1

// 2.
function foo(  ) {
  console.log(x);
  var x = 1
}
foo()  // undefied

// 3.
function foo( x=2 ) {
  console.log(x);
  var x = 1
}
foo() //3

4. 
function foo( x ) {
  console.log(x);
  var x = 1
}

foo() // undefined


// 能够从上面分析出来,我们的变量查找，优先就近，就近没有定义的，就找参数，之后查找变量提升。

```









## 1. 认识DOM和架构

+ 浏览器是用来展示网页的，而网页中最重要的就是里面各种的标签元素，JavaScript很多时候是需要操作这些元素的。
  + JavaScript如何操作元素呢？通过Document Object Model（DOM，文档对象模型）。
  + DOM给我们提供了一系列的模型和对象，让我们可以方便的来操作Web页面。

![image-20220620110542334](30-DOM操作架构-浏览器事件.assets/image-20220620110542334.png)



## 2. EventTarget

+ 因为继承自`EventTarget`，所以也可以使用EventTarget的方法：





## 3. Node节点

+ 所有的DOM节点类型都继承自Node接口。
  + https://developer.mozilla.org/zh-CN/docs/Web/API/Node
+ Node有几个非常重要的属性：
  + `nodeName`：node节点的名称。
  + `nodeType`：可以区分节点的类型。
  + `nodeValue`：node节点的值；
  + `childNodes`：所有的子节点；



## 4. Document

+ Document节点表示的整个载入的网页，我们来看一下常见的属性和方法：



## 5. Element

+ 我们平时创建的div、p、span等元素在DOM中表示为Element元素，我们来看一下常见的属性和方法：







