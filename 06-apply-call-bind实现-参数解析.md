# 06. 函数的柯里化

## 1. ES6剩余参数

```js
// rest parameters剩余参数，ES6的新语法

// ...是展开运算符，剩余参数语法会将nums作为一个数组接受所有参数
function sum(...nums) {
    console.log(nums) // 打印一个数组
}

sum(10)
sum(10, 20)
sum(10, 20, 30)

// 展开运算符 spread
var names = ["abc", "cba", "nba"]
var newNames = [...nums]

function foo(arg1,arg2,arg3){}
function foo(...args){}

```

## 2. 实现apply、call、bind

+ 本质内部实现是C++，这里初步模拟一下
+ edge case 边界情况
+ 下面的实现不考虑太多的边界情况，不然写起来没完没了

### 1. call函数的实现

1. 给所有函数增加一个hycall的方法

```js
// 给所有的函数添加一个hycall的方法
Function.prototype.hycall = function(thisArg, ...args) {
  // 问题：如何获取到哪一个函数执行了hycall
  // 1. 获取需要执行的函数
  var fn = this
  
  // 2. thisArg可以是各种类型，所以需要Object方法转化成对象，如果本来就是对象，就保持
  // 细节null和undefined默认绑定window
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  
  // 执行函数
  thisArg.fn = fn
  var result = thisArg.fn(...args)
  // 调用完可以删除多余属性
  delete thisArg.fn
  
  // 4. 最终的结果返回出去
  return result
}

function foo() {
  console.log('foo')
} 

//自己实现的hycall
// 函数foo调用了hycall的时候相当于进行了隐式绑定，那么hycall就可以通过this拿到foo
foo.hycall()
```

### 2. apply

```js
// 自己实现hyapply
// 细节，需要给argArray默认值，避免undefined和null
Function.prototype.hyapply = function(thisArg, argArray = []) {
  // 1. 获取要执行的函数
  var fn = this
  
  // 2. 处理绑定的thisArg
  thisArg = thisArg ? Object(this.Arg) : window 
  
  // 3. 执行函数
  thisArg.fn = fn
  var result = thisArg.fn(...argArray)
  delete thisArg.fn
  
  return result
}

function sum(sum1, sum2) {
  coonsole.log("sum",,this, num1, num2)
  return num1 + num2
}

var result = sum.hyapply("abc",[20,30])
console.log(result)
```

### 3. bind

```js
Function.prototype.hybind = function(thisArg, ...argArray) {
  // 1.获取到真实需要调用的函数
  var fn = this

  // 2.绑定this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window

  function fu'n proxyFn(...args) {
    // 3.将函数放到thisArg中进行调用
    // 这里是一个闭包了
    thisArg.fn = fn
    // 特殊: 对两个传入的参数进行合并
    var finalArgs = [...argArray, ...args]
    var result = thisArg.fn(...finalArgs)
    delete thisArg.fn

    // 4.返回结果
    return result
  }

  return proxyFn
}

function foo() {
  console.log("foo被执行", this)
  return 20
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

// 系统的bind使用
var bar = foo.bind("abc")
bar()

// 1. 直接使用bind，并带参数
// var newSum = sum.bind("aaa", 10, 20, 30, 40)
// newSum()

// 2. 使用bind，可以不带参数
// var newSum = sum.bind("aaa")
// newSum(10, 20, 30, 40)

// 3. 利用bind的特性，返回一个函数，并个第一个参数赋值
// var newSum = sum.bind("aaa", 10)
// newSum(20, 30, 40)


// 使用自己定义的bind
// var bar = foo.hybind("abc")
// var result = bar()
// console.log(result)

var newSum = sum.hybind("abc", 10, 20)
var result = newSum(30, 40)

```

## 3.  认识arguments

- arguments是一个对应于传递给函数的参数 的 类数组（array-like）对象。
  + 可以理解成AO中默认携带的对象叫做arguments，拥有一些数组的特性
  + 所以我们在函数总可以直接使用arguments

```javascript
function foo (num1, num2, num3) {
    // 类数组对象中（长得像是一个数组，本质上一个对象）: arguments
    // 默认会绑定一个arguments，被放到AO中，活着说创建AO的时候，默认会有一个arguments
    console.log(arguments)
    
    // 常见的对arguments的操作是三个
    // 1. 获取参数的长度
    console.log(arguments.length) // 5
    
    // 2. 根据索引值获取某一个参数
    console.log(arguments[2])
    
    // 3. callee获取当前arguments所在的函数
    console.log(arguments.callee)
    
    console.log(num1, num2, num3)
    
}

foo(10, 20, 30, 40, 50)
```

- array-like意味着它不是一个数组类型，而是一个对象类型
  - 它拥有数组一些特性，，length，通过index索引来访问
  - 但是它却没有数组的一些方法，比如forEach，map等。

```js
// arguments转成array类型
function foo(num1, num2) {
    // 1. 自己遍历
    var newArr = []
    for (var i = 0; i < arguments.length; i++) {
        newArr.push(arguments[i] * 10)
    }
    console.log(newArr)
    
    // 2. slice会取出每一项，然后返回新数组
  	// arguments是没有数组高阶函数的方法，但是数组原型链上有，通过call修改this，变成arguments调用slice
    var newArr2 = Array.prototype.slice.call(arguments)
    // 由上面可以改写成
    var newArr3 = [].slice.call(arguments)
    console.log(newArr2)
  
  	// 3. ES6语法,传入一个可迭代的东西
  	var newArr4 = Array.from(arguments)
    console.log(newArr4)
  	var newArr5 = [...arguments]
    
}

foo(10, 20, 30, 40, 50)

```

+ 箭头函数中是没有arguments。
  + 因为箭头函数没有arguments，但是和其他变量一样，会去上层作用域找
  + **node里面全局作用域是有的，但是浏览器是没有的**
  + node每个文件会被当成一个模块，这个模块会被包裹在一个函数里，使用call执行这个函数

```js
var foo = () => {
  console.log(arguments)
}
foo()


function foo () {
  var bar = () => {
    console.log(arguments)
  }
  return bar
}

var fn = foo(123)
fn()// [Arguments] {'0': 123}

// 箭头函数多利用剩余参数取代arguments，算是es5过度使用的语法
var foo = (num1, num2, ...args) {}
```

































































