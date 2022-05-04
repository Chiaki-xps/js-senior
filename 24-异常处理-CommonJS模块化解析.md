# 24. 异常处理-CommonJS模块化解析

## 1. 错误处理方案

+ 开发中我们会封装一些工具函数，封装之后给别人使用：
  + 在其他人使用的过程中，可能会传递一些参数；
  + 对于函数来说，需要对这些参数进行验证，否则可能得到的是我们不想要的结果；
+ 很多时候我们可能验证到不是希望得到的参数时，就会直接return：
  + 但是return存在很大的弊端：调用者不知道是因为函数内部没有正常执行，还是执行结果就是一个undefined；
  + 事实上，正确的做法应该是如果没有通过某些验证，那么应该让外界知道函数内部报错了；
+ 如何可以让一个函数告知外界自己内部出现了错误呢？
  + 通过throw关键字，抛出一个异常；
+ throw语句：
  + throw语句用于抛出一个用户自定义的异常；
  + 当遇到throw语句时，当前的函数执行会被停止（throw后面的语句不会执行）；
+ 如果我们执行代码，就会报错，拿到错误信息的时候我们可以及时的去修正代码。

```js
/**
 * 如果我们有一个函数, 在调用这个函数时, 如果出现了错误, 那么我们应该是去修复这个错误.
 */

function sum(num1, num2) {
  // 当传入的参数的类型不正确时, 应该告知调用者一个错误
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    // return undefined
    throw "parameters is error type~"
  }

  return num1 + num2
}

// 调用者(如果没有对错误进行处理, 那么程序会直接终止)
// console.log(sum({ name: "why" }, true))
console.log(sum(20, 30))

console.log("后续的代码会继续运行~")

// throw会中断代码运行

```

## 2. throw关键字

+ throw表达式就是在throw后面可以跟上一个表达式来表示具体的异常信息：

![image-20220428172929822](24-异常处理-CommonJS模块化解析.assets/image-20220428172929822.png)

+ throw关键字可以跟上哪些类型呢？
  + 基本数据类型：比如number、string、Boolean
  + 对象类型：对象类型可以包含更多的信息
+ 但是每次写这么长的对象又有点麻烦，所以我们可以创建一个类：

![image-20220428172957658](24-异常处理-CommonJS模块化解析.assets/image-20220428172957658-16511381984831.png)

```js
// class HYError {
//   constructor(errorCode, errorMessage) {
//     this.errorCode = errorCode
//     this.errorMessage = errorMessage
//   }
// }

function foo(type) {
  console.log("foo函数开始执行")

  if (type === 0) {
    // 1.抛出一个字符串类型(基本的数据类型)
    // throw "error"

    // 2.比较常见的是抛出一个对象类型,对象可以包含更多信息
    // throw { errorCode: -1001, errorMessage: "type不能为0~" }

    // 3.创建类, 并且创建这个类对应的对象
    // throw new HYError(-1001, "type不能为0~")

    // 4.js提供了一个Error
    // const err = new Error("type不能为0")
    // err.name = "why" // 默认Err
    // err.stack = "aaaa" // stack报错出现出现错误的函数的调用栈

    // 5.Error的子类
    const err = new TypeError("当前type类型是错误的~")

    throw err

    // 强调: 如果函数中已经抛出了异常, 那么后续的代码都不会继续执行了
    console.log("foo函数后续的代码")
  }

  console.log("foo函数结束执行")
}

foo(0)

console.log("后续的代码继续执行~")


// 这里就是就会出现函数调用栈
// test出现错误的，就会打印调用它的demo，demo会找到调用它的bar，最终找到bar() 的一整个栈就是函数调用栈
// function test() {
//   console.log("test")
// }

// function demo() {
//   test()
// }

// function bar() {
//   demo()
// }

// bar()

```

## 3. Error类型

+ 事实上，JavaScript已经给我们提供了一个Error类，我们可以直接创建这个类的对象：

![image-20220428173033410](24-异常处理-CommonJS模块化解析.assets/image-20220428173033410.png)

+ Error包含三个属性：
  + messsage：创建Error对象时传入的message；
  + `name：Error`的名称，通常和类的名称一致；
  + stack：整个Error的错误信息，包括函数的调用栈，当我们直接打印Error对象时，打印的就是stack；
+ Error有一些自己的子类：
  + RangeError：下标值越界时使用的错误类型；
  + SyntaxError：解析语法错误时使用的错误类型；
  + TypeError：出现类型错误时，使用的错误类型；

![image-20220504232315755](24-异常处理-CommonJS模块化解析.assets/image-20220504232315755.png)

## 4. 异常的处理

+ 我们会发现在之前的代码中，一个函数抛出了异常，调用它的时候程序会被强制终止：
  + 这是因为如果我们在调用一个函数时，这个函数抛出了异常，但是我们并没有对这个异常进行处理，那么这个异常会继续传递到上一个函数调用中；
  + 而如果到了最顶层（全局）的代码中依然没有对这个异常的处理代码，这个时候就会报错并且终止程序的运行；
+ 我们先来看一下这段代码的异常传递过程：
  + foo函数在被执行时会抛出异常，也就是我们的bar函数会拿到这个异常
  + 但是bar函数并没有对这个异常进行处理，那么这个异常就会被继续传递到调用bar函数的函数，也就是test函数；
  + 但是test函数依然没有处理，就会继续传递到我们的全局代码逻辑中；
  + 依然没有被处理，这个时候程序会终止执行，后续代码都不会再执行了；

```js
```



## 5. 异常捕获

+ 但是很多情况下当出现异常时，我们并不希望程序直接推出，而是希望可以正确的处理异常：
  + 这个时候我们就可以使用try catch
+ 在ES10（ES2019）中，catch后面绑定的error可以省略。
+ 当然，如果有一些必须要执行的代码，我们可以使用finally来执行：
  + finally表示最终一定会被执行的代码结构；
  + 注意：如果try和finally中都有返回值，那么会使用finally当中的返回值；































