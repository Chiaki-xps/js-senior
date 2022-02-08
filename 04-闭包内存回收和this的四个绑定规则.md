# 1. 闭包内存泄漏

## 1. 闭包内存泄漏案例

+ 一个字表示两个字节（Byte）
+ 一个字节表示8位（bit）
+ 一个字表示16位
+ 内存里1kb表示1024
+ 1024* 1024 = 1M = 1kb * 1kb

```js
function createFnArray() {
    // Array类可以传入长度，fill()用于填充
    // 这里填充的1在内存中int类型，相当于4个字节
    var arr = new Array(1024 * 1024).fill(1) // 4M大小
    return function() {
        console.log(arr.length)
    }
}

// var arrayFn = createFnArray()
// arrayFn = null

var arrayFns = []
// 4M * 100 +  其他内存
for(var i =0; i < 100; i++) {
    arrayFns.push(createFnArray())
}

```

+ 浏览器点击`performance`和`Memory`，多刷新几次，因为刚执行的时候，浏览器还会做一些自己的JS操作，一些前期准备工作，占用一些内存，多刷新几次对比出正确的。

![image-20220208131420863](04-闭包内存回收和this的四个绑定规则.assets/image-20220208131420863.png)

+ `Idle`表示闲置的内存
+ 我们代码会占据差不多480M空间，

```js
function createFnArray() {
    // Array类可以传入长度，fill()用于填充
    // 这里填充的1在内存中int类型，相当于4个字节
    var arr = new Array(1024 * 1024).fill(1) // 4M大小
    return function() {
        console.log(arr.length)
    }
}

// var arrayFn = createFnArray()
// arrayFn = null

var arrayFns = []
// 4M * 100 +  其他内存
for(var i =0; i < 100; i++) {
    arrayFns.push(createFnArray())
}

setTimeout(() => {
    arrayFns = null
}, 2000);
// 这里设置两秒后清空闭包并不会马上就会王成，两秒后会将arrayFns = null放入执行栈等待执行执行，所以实际执行不一定是两秒，其次是我们的浏览器清除多余的没有指向的对象，需要等待浏览器的GC按照算法计算的时间进行每次的轮询。也并不意味着对象等于null就会马上完成清除。
```

```js
function createFnArray() {
    // Array类可以传入长度，fill()用于填充
    // 这里填充的1在内存中int类型，相当于4个字节
    var arr = new Array(1024 * 1024).fill(1) // 4M大小
    return function() {
        console.log(arr.length)
    }
}

// var arrayFn = createFnArray()
// arrayFn = null

var arrayFns = []
for(var i =0; i < 100; i++) {
    setTimeout(() => {
        arrayFns.push(creareFnArray())
    }, 1*100)
}

setTimeout(() => {
    for(var i = 0; i < 50; i++) {
        setTimeout(() => {
            arrayFns.poop()
        }, 100 * i)
    }
}, 10000)
// 这里设置10000ms = 100ms * 100次 = 10s
// 我们必须保证上面的赋值完成之后才会执行弹出栈
```

![image-20220208173211674](04-闭包内存回收和this的四个绑定规则.assets/image-20220208173211674.png)

## 2. JS闭包引用的自由变量销毁

```js
function foo() {
    var name = 'why'
    var age = 18
    
    function bar() {
        console.log(name)
        // console.log(age)
    }
    
    return bar
}

var fn = foo()
fn()
```

+ 由上面我么可以知道，我们的代码执行完成后，堆内存里会保存着`foo`的`AO`对象，理论上应该保存这`foo`里所有定义的变量，但是实际上我们的浏览器会把`AO`里不再用到的环境变量给销毁掉











































































































