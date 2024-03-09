# 17. Proxy-Reflect-响应式原理（一）

## 1. 监听对象的操作

+ 需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程？
  + 可以通过属性描述符实现。

+ **`Object.defineProperty()`**给传入的对象修改或新增属性，返回该对象。

```js
const obj = {};

// Object.defineProperty(obj, prop, descriptor)
// 传入三个参数
// 参数一：修改的对象
// 参数二：修改或新增的属性名称
// 参数三：对属性的相关配置(属性描述符),value属性的值，writable是否可以写
// 返回值：传入的obj
Object.defineProperty(object, 'prop', {
  value: 42,
  writable: false
});

obj.prop = 77;

console.log(obj.prop); // 42

```

+ descriptor 属性描述符主要两种形式：
  + 数据描述符合存取描述符，数据描述符是一个具有值的属性，该值可以是可写/不可写的。例如上面就是.
  + *存取描述符*是由 getter 函数和 setter 函数所描述的属性

+ **`object,defineProperties()`**就是定义多个属性。

```js
// 01_监听对象的操作方式一.js

const obj = {
  name: "why",
  age: 18
}

// 这种方式针对的是一个对象。
Object.defineProperty(obj, 'name', {
  get: function () {
    console.log("监听到obj对象的name属性被访问了")
    // 如果没有设置返回值，默认就是
    // return undefined
  },
  set: function () {
    console.log("监听到obj对象的name属性被设置值")
  }

})

console.log(obj.name)
obj.name = "Kobe"

```

```js
const obj = {
  name: "why",
  age: 18
}

// Object.defineProperty(obj, 'name', {
//   get: function () {
//     console.log("监听到obj对象的name属性被访问了")
//     // 如果没有设置返回值，默认就是
//     // return undefined
//   },
//   set: function () {
//     console.log("监听到obj对象的name属性被设置值")
//   }
// })

Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`监听到obj对象的${key}属性被访问了`)
      return value
    },
    set: function(newValue) {
      console.log(`监听到obj对象的${key}属性被设置值`)
      // 产生了闭包，value与当前的Object.defineProperty绑定。所以get会拿到newValue的值，不用担心let value = obj[key]。在这个代码中，只会执行一次。
      value = newValue
    }
  })
});

obj.name = "kobe"
obj.age = 30

// 新增属性，但是Object.defineProperty监听不到
obj.height = '1.88'

console.log(obj.name)
console.log(obj.age)
console.log(obj.height)

```

+ **这样做有什么缺点？**
+ 首先，`Object.defineProperty`设计的初衷，不是为了去监听一个对象中的所有属性的。
  + 我们在定义某些属性的时候，初衷其实就是定义普通的属性，但是后面强行将它变成存取描述符。
  + 其次，我们想监听更加丰富的操作，比如删除属性，新增属性等，`Object.defineProperty`是无能为力的。
  + 所以存取数据描述符设计的初衷并不是为了监听一个完整的对象。

## 2. Proxy基本使用

+ ES6，新增一个`Proxy`类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的：
  + 即，如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy对象）
  + 之后对该对象的所有操作，都是通过代理对象来完成，代理对象可以监听我们想要对原对象就那些哪些操作；
+ Proxy本身就是创建一个新的代理对象，然后我们访问代理对象，就可以重写它的捕获器，从而对捕获到对代理对象的操作。

```js
const obj = {
    name: "why",
    age: 18
}

// 两个参数：
// 参数一：目标对象（对象，数组，函数，甚至是另一个代理）
// 参数二：handler捕获器，也可以叫处理器对象。里面以函数作为属性，每个函数属性分别定义了操作。
const objProxy = new Proxy(obj, {
    // 获取值时的捕获器
    // get被调用的时候会传入一些参数：
    // target：代理的对象
    // key：操作的属性名
    // receiver: 
    get: function(target, key, receiver) {
        console.log(`监听到对象的${key}属性被访问了`, target)
        return target[key]
    },

    // 设置值时的捕获器
    set: function(target, key, newValue, receiver) {
        console.log(`监听到对象的${key}属性被设置值`, target)
        target[key] = newValue
    }
})

console.log(objProxy.name);
console.log(objProxy.age);

objProxy.name = "kobe"
objProxy.age = 30

// console.log(objProxy.name);
// console.log(objProxy.age);

```

## 3. Proxy的set和get捕获器

+ 如果我们想要侦听某些具体的操作，那么就可以在handler中添加对应的捕捉器（Trap）
+ set和get分别对应的是函数类型；
  + set函数会自动传入四个参数：
    + target：目标对象（侦听对象）
    + property：将被设置的属性key
    + value：新属性值
    + receiver：调用的代理对象
  + get函数三个参数：
    + target：目标对象（侦听对象）
    + property：被获取的属性key
    + receiver：调用的代理对象

## 4. Proxy所有捕获器

+ Proxy设计的目的主要就是为了给我们的对象创建一个代理，对这个对象所有操作都转成对这个代理对象进行操作，这样我们就不需要直接去修改原来的对象。
+ 一共有13种捕获器:
+ **`handler.getPrototypeOf()`**是一个代理（Proxy）方法，当读取代理对象的原型时，该方法就会被调用。
  + `Object.getPrototypeOf`方法的捕捉器。
  + `obj.__proto__`存在浏览器兼容性问题，所以使用`Object.getPrototypeOf`更合理。

+ **`handler.setPrototypeOf()`** 方法主要用来拦截 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).
  + 设置对象的原型的时候会被调用。
+ **`handler.isExtensible()`** 方法用于拦截对对象的 `Object.isExtensible()`。
  + 判断对象能否扩展（即添加新的属性）。
+ **`handler.preventExtensions()`** 方法用于设置对[`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)的拦截
  + 阻止它扩展新的对象的时候拦截。

+ **`handler.getOwnPropertyDescriptor()`** 方法是 [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 的钩子。
  + 获取对象的属性描述符的时候拦截。

+ **`handler.defineProperty()`** 用于拦截对对象的 [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 操作。

  + 定义新属性的时候捕获。

+ **`handler.ownKeys()`** 方法用于拦截 [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys).

  + 还可以拦截：

    + [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

    + [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)

    + [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

    + [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

  + 获取返回一个由指定对象的所有自身属性的属性名的时候捕获

+ **`handler.has()`** 方法是针对 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符的代理方法。

  + 属性查询：属性 in Proxy 的时候调用

+ **`handler.set()`** 方法是设置属性值操作的捕获器。

+ **`handler.get()`** 方法用于拦截对象的读取属性操作。

+ **`handler.apply()`** 方法用于拦截函数的调用。
  + 用于函数对象（函数本身是一个对象）
+ **`handler.construct()`** 方法用于拦截 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符。
  + 用于函数对象（函数本身是一个对象）

+ 上面的捕获器有一些可以拦截的内容实际更多，参考MDN文档下面的拦截。上面的捕获器其实就是调用Object的方法前进行捕获之后操作而已。

```js
const obj = {
  name: "why", // 数据属性描述符
  age: 18
}

// 直接定义obj的属性是一个数据属性描述符，但是使用Object.defineProperty对该属性操作则最终会变成一个访问属性描述符

// 变成一个访问属性描述符
// Object.defineProperty(obj, "name", {

// })

const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get: function(target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器
  set: function(target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  },

  // 监听in的捕获器 -> 判断属性是否在代理对象里面
  has: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    return key in target // 在里面则返回true反之false
  },
  // 利用语法糖可以写成
  // has() {...}

  // 监听delete的捕获器
  deleteProperty: function(target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    delete target[key]
  }
})


// in操作符
// console.log("name" in objProxy)

// delete操作
delete objProxy.name

// 对objProxy的操作会影响到obj
// console.log(objProxy);
// console.log(obj);

```

## 5. Proxy的construct和apply

```js
function foo() {

}

// 对函数常用的调用方式,这些方式监听不到对函数进行了什么调用
// foo()
// foo.apply({}, ['abc', 'cba'])
// new foo()

const fooProxy = new Proxy(foo, {
  // target：函数对象，即foo
  // thisArg：绑定的this
  // argArray：额外参数
  apply: function(target, thisArg, argArray) {
    // 捕获到apply之后进行一系列的操作
    console.log("对foo函数进行了apply调用")
    // 调用实际的apply
    return target.apply(thisArg, argArray)
  },

  // newTarget用的少，一般new会创建一个新的对象，之后返回，但是也会存在我们自己return一个新对象的可能性。（该表达是否正确我忘了，复习new先）
  // 大部分时候target和newTarget应该是同一个
  construct: function(target, argArray, newTarget) {
    console.log("对foo函数进行了new调用")
    return new target(...argArray)
  }
})

fooProxy.apply({}, ["abc", "cba"])
new fooProxy("abc", "cba")

```

## 6. Reflect的作用

+ Reflect也是ES6新增的一个API，它是一个**对象**，字面的意思是反射。

  + 这是一个对象，不是一个类。所以`new Reflect` 是不行的

+ **那么Reflect有什么用？**

  + 它主要提供了很多**拦截（操作） JavaScript 操作的方法**，有点像Object中操作对象的方法；这些方法与`Proxy`中的`handler`的方法相同。
  + `Reflect`不是一个函数对象，因此它是不可构造的（不能new）。`Object`是一个构造函数。

  + 静态方法 **`Reflect.getPrototypeOf()`** 与 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf) 方法几乎是一样的。都是返回指定对象的原型（即内部的 `[[Prototype]]` 属性的值）。
  + 静态方法 **`Reflect.defineProperty()`** 基本等同于 [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，唯一不同是返回 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 值。

+ **如果Object可以实现，为什么还需要Reflect?**
  +  这是因为在早期的ECMA规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些API放到了Object上面；
  + 但是Object作为一个构造函数，这些操作实际上放到它身上并不合适；
  + 另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的；
  + 所以在ES6中新增了Reflect，让我们这些看起来奇怪的操作符in delete操作都集中到了Reflect对象上；
  + 可以理解成对`Object`的一些功能的替代。
  + Proxy具有那些捕获器，我们的Reflect就具有那些方法。
+ 那么Object和Reflect对象之间的API关系，可以参考MDN文档：

```http
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods
```

```js
```


