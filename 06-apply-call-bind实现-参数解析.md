# 06. 函数的柯里化

## 1. 实现apply、call、bind

+ 本质内部实现是C++，这里初步模拟一下
+ edge case 边界情况

### 01-call函数的实现

```js

```







## ES6剩余参数

```
// rest parameters
function sum(...nums) {
    console.log(...nums) // 打印一个数组
}

sum(10)
sum(10, 20)
sum(10, 20, 30)

// 展开运算符 spread
var names = ["abc", "cba", "nba"]

// 

```

## 认识argumenys

- arguments是一个对应于传递给函数的参数 的 类数组（array-like）对象。

```
function foo (num1, num2, num3) {
    // 类数组对象中（长得像是一个数组，本质上一个对象）: arguments
    // 默认会绑定一个arguments，被放到AO中
    console.log(arguments)
    
    // 常见的对arguments的操作是三个
    // 1. 获取参数的长度
    console.log(arguments.length)
    
    // 2. 根据索引值获取某一个参数
    console.log(arguments[2])
    
    // 3. callee获取当前arguments所在的函数
    console.log(argments.callee)
    
    console.log(num1, num2, num3)
    
}

foo(10, 20, 30, 40, 50)
```

- array-like意味着它不是一个数组类型，而是一个对象类型
  - 它拥有数组一些特性，，length，通过index索引来访问
  - 但是它却没有数组的一些方法，比如forEach，map等。

```
// arguments转成array类型
function foo(num1, num2) {
    // 1. 自己遍历
    var newArr = []
    for (var i = 0; i < arguments.length; i++) {
        newArr.push(arguments[i] * 10)
    }
    console.log(newArr)
    
    // 2.
    // slice会取出每一项，然后返回新数组
    var newArr2 = Array.prototype.slice.call(arguments)
    console.log(newArr2)
    
}

foo(10, 20, 30, 40, 50)
```

没看完重新看吧



没看了

































































