# 1. Promise

```js
function requestData(url) {
  // 模拟网络请求
  setTimeout(() => {
    // 拿到请求的结果
    // url传入的是coderwhy，请求成功
    if(url === 'coderwhy'){
      // 成功
      let names = ["abc", "cba", "nba"]
      return names
    } else { // 否则请求失败
      // 失败
      let errMessage = "请求失败，url错误"
      return errMessage
    }
    
    
  }， 3000)
}

const result = requestData("coderwhy")

// 上面的代码不难发现，我们的异步请求，即使有返回值也不会传递到我们的result，它只是网络请求或者setTimeout的返回值，并不是requestData的返回值。

// 解决的办法就是传入回调函数，这个回调函数会将结果返回出去，这样子我们就能拿到。
```

```js
/**
 * 这种回调的方式有很多的弊端:
 *  1> 如果是我们自己封装的requestData,那么我们在封装的时候必须要自己设计好callback名称, 并且使用好
 *  2> 如果我们使用的是别人封装的requestData或者一些第三方库, 那么我们必须去看别人的源码或者文档, 才知道它这个函数需要怎么去获取到结果
 */

// request.js
function requestData(url, successCallback, failtureCallback) {
  // 模拟网络请求
  setTimeout(() => {
    // 拿到请求的结果
    // url传入的是coderwhy, 请求成功
    if (url === "coderwhy") {
      // 成功
      let names = ["abc", "cba", "nba"]
      successCallback(names)
    } else { // 否则请求失败
      // 失败
      let errMessage = "请求失败, url错误"
      failtureCallback(errMessage)
    }
  }, 3000);
}

// main.js
requestData("kobe", (res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})

// 更规范/更好的方案 Promise承诺(规范好了所有的代码编写逻辑)
function requestData2() {
  return "承诺"
}

const chengnuo = requestData2()
```

+ 以前的网络异步请求，用的是callback来获取请求数据：
  + 这就需要我们自己来设计回调函数、回调函数的名称、回调函数的使用等；
  + 对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以便可以理解它这个函数到底怎么用；对于使用callback的成本比较高。
+ Promise是用于解决回调地狱，同时也形成了一个代码规范，就想承诺一样，规范好了所有代码别写逻辑，按照预设的方法去获取就行，而不需要增加增本去阅读一些请求函数的文档查看具体的回调。

## 1. 什么是Promise呢？

+ Promise是一个类，可以翻译成 承诺、许诺 、期约；所以我们可以直接使用类名调用静态方法
+ 当我们需要给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个Promise的对象（new Promise）；
  + 意思就是说，我们设计返回的数据的时候，给到调用者一个Promise对象就行了
+ 在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor
  + 这个回调函数会被立即执行，并且给传入另外两个回调函数resolve、reject；
  + 当我们调用resolve回调函数时，会执行Promise对象的then方法传入的回调函数；
  + 当我们调用reject回调函数时，会执行Promise对象的catch方法传入的回调函数；

```js
// new的过程会执行类里面的构造方法.
// Promise传入回调函数，这个回调函数会被执行
// 传入的这个函数，被称之为executor
const promise = new Promise((resolve，reject) => {
  console.log("promise传入的函数被执行")
})

// 等价于
class Person {
  constructor(callback) {
    let foo = function() {}
    let bar = function() {}
    // 相当于传入的回调函数，默认会帮助我们把resolve和reject两个函数传入进去
    callback(foo, bar)
  }
}

const p = new Person(() => {
  foo()
  bar()
})
```

```js
function foo() {
  // Promise
  return new Promise((resolve, reject) => {
    resolve("success message")
    // reject("failture message")
  })
}

// main.js

// 这里获得一个promise
const fooPromise = foo()

// then方法会在我们Promise执行resolve函数的时候被回调
// then方法传入的回调函数两个回调函数:
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.then((res) => {
  // res会获取到Promise.resolve传入的数据（一般就是网络请求的数据）
  console.log(res)
}, (err) => {
  // res会获取到Promise.reject传入的错误信息
  console.log(err)
})

// // catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.catch(() => {

})


// 传入的这个函数, 被称之为 executor
// > resolve: 回调函数, 在成功时, 回调resolve函数
// >reject: 回调函数, 在失败时, 回调reject函数
// const promise = new Promise((resolve, reject) => {
//   // console.log("promise传入的函数被执行了")
//   // resolve()
//   reject()
// })

// promise.then(() => {

// })

// promise.catch(() => {

// })


// 钩子函数: hook
function foo(fn) {
  fn()
}

foo(() => {

})


```

现在我们利用Promise重构一下我们一开始利用网络请求回调的代码

```js
// request.js
function requestData(url,) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // new的过程中执行请求代码，
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      // url传入的是coderwhy, 请求成功
      if (url === "coderwhy") {
        // 成功
        let names = ["abc", "cba", "nba"]
        // resolve扮演回调函数，然后把网络请求的数据通过某种方式返回出去。
        resolve(names)
      } else { // 否则请求失败
        // 失败
        let errMessage = "请求失败, url错误"
        reject(errMessage)
      }
    }, 3000);
  })
}

// main.js
const promise = requestData("coderwhy")
promise.then((res) => {
  console.log("请求成功:", res)
}, (err) => {
   console.log("请求失败:", err)
})

```

## 2. Promise的代码结构

+ 以将它划分成三个状态：
  + 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝；
    + 当执行executor中的代码时，处于该状态；
  + 已兑现（fulfilled）: 意味着操作成功完成；
    + 执行了resolve时，处于该状态；
  + 已拒绝（rejected）: 意味着操作失败；
    + 执行了reject时，处于该状态；

```js
function foo(fn) {
    fn()
}
// 传进去的函数回头在里面被调用，就是回调函数
foo(() => {})

// 钩子函数虽然和回调函数差不多
// 但是钩子函数是指windows的消息机制下，捕获消息的时候立即执行
// 回调函数并不能参与消息处理的过程，只是消息捕获结束后才执行的函数
```

## 3. Promise重构请求

![image-20220413102009477](18-响应式原理实现和Promise.assets/image-20220413102009477.png)

## 4. Executor

+ Executor,遗嘱执行人的意思

+ Executor是在创建Promise时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数：

```js
new Promise(() => {
    console.log("Executor代码")
})
```

+ 通常我们会在Executor中确定我们的Promise状态：
  + 通过resolve，可以兑现（fulfilled）Promise的状态，我们也可以称之为已决议（resolved）；
  + 通过reject，可以拒绝（reject）Promise的状态；
+ 这里需要注意：一旦状态被确定下来，Promise的状态会被锁死，该Promise的状态是不可更改的
  + 在我们调用resolve的时候，如果resolve传入的值本身不是一个Promise，那么会将该Promise的状态变成兑现（fulfilled）；
  + 在之后我们去调用reject时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变Promise状态）；

## 5. resolve不同值的区别

+ 情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数；
+ 情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态：
+ 情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果来决定Promise的状态：

```js
const promise = new Promise((resolve, reject) => {
    
})


promise.then((res) => {
    
}, (err) => {
    
})

// 等价于
new Promise((resolve, reject) => {
    console.log("------")
    // resolve()
    reject()
}).then(res => {
    console.log('res', res)
}, err => {
    console.log('err', err)
})

```

```js
new Promise(() => {
    // penging状态
    console.log("-----")
    resolve()
    console.log("+++++")
    reject()
}).then(res => {
    console.log('res', res)
}, err => {
    console.log("err", err)
})
// 打印结果:
-----
+++++
res: undefined  // resolve最后执行，

// 一旦执行的resolve进入成功状态，调用reject()也不会改变当前状态，反之相同
new Promise(() => {
    // penging状态
    console.log("-----")
    reject()
    resolve()
    console.log("+++++")
}).then(res => {
    console.log('res', res)
}, err => {
    console.log("err", err)
})
// 结果：
-----
+++++
err： 
```

```js
/** 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
*/
const newPromise = new Promise((resolve, reject) => {
    
})

new Promise((resolve, reject) => {
    resolve(newPromise)
}).then(res => {
    console.log("res", res)
}, err => {
    console.log("err", err)
})

// 此时newPromise回调函数里没有任务，所以一直pending状态
// 加入增加修改状态
const newPromise = new Promise((resolve, reject) => {
    reject("err message")
})
// 结果就是err: err message
```

```js
//传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
// 那么也会执行该then方法, 并且又该then方法决定后续状态

// 传入一个对象，这个对象有是实现then方法
new Promise((resolve, reject) => {
    const obj = {
        // resolve会自动执行then方法，会自动传入resolve，reject，然后由这个对象决定状态
        then: function(resolve, reject) {
            
        }
    }
    resolve(obj)
}).then(res => {
    console.log("res", res)
}, err => {
    console.log("err", err)
})
```

```js
/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled, then中res获取该值
 *  2> 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
 *  3> 传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
 *    那么也会执行该then方法, 并且又该then方法决定后续状态
 */

// 1.传入Promise的特殊情况
// const newPromise = new Promise((resolve, reject) => {
//   // resolve("aaaaaa")
//   reject("err message")
// })

// new Promise((resolve, reject) => {
//   // pending -> fulfilled
//   resolve(newPromise)
// }).then(res => {
//   console.log("res:", res)
// }, err => {
//   console.log("err:", err)
// })

// 2.传入一个对象, 这个兑现有then方法
new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    then: function(resolve, reject) {
      // resolve("resolve message")
      reject("reject message")
    }
  }
  resolve(obj)
}).then(res => {
  console.log("res:", res)
}, err => {
  console.log("err:", err)
})

// eatable/runable
const obj = {
  // 实现eat接口 eatable
  eat: function() {

  },
  // 实现run接口 runable
  run: function() {

  }
}

```

## 6. then方法-接受两个参数

+ then方法是Promise对象上的一个方法：它其实是放在Promise的原型上的`Promise.prototype.then`
+ then方法接受两个参数：
  + fulfilled的回调函数：当状态变成fulfilled时会回调的函数；
  + reject的回调函数：当状态变成reject时会回调的函数；

![image-20220413163006276](18-响应式原理实现和Promise.assets/image-20220413163006276.png)

```js
class Person {
    constructor(executor) {
        const resolve = () => {
            // resolve被执行就会执行then中的回调函数
            this.callback()
        }
        
        const reject = () => {
            
        }
        
        executor(resolve, reject)
        
    }
    
    then(callback) {
        this.callback = callback
    }
}
```

## 7. then方法-多次调用

+ 一个Promise的then方法是可以被多次调用的：
  + 每次调用我们都可以传入对应的fulfilled回调；
  + 当Promise的状态变成fulfilled的时候，这些回调函数都会被执行；

```js
// 1.同一个Promise可以被多次调用then方法
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
promise.then(res => {
  console.log("res1:", res)
})

promise.then(res => {
  console.log("res2:", res)
})

promise.then(res => {
  console.log("res3:", res)
})

// 注意和这个是有区别的
promise.then(res => {}).then(res => {})
// 假如第一个then有返回一个prosmise并触发resolve才会执行第二个，两个then处理的还是不是同一个promise
```

## 8. then方法-返回值

+ then方法本身是有返回值的，它的返回值是一个Promise，所以我们可以进行如下的链式调用：
  + 但是then方法返回的Promise到底处于什么样的状态呢？
+ Promise有三种状态，那么这个Promise处于什么状态呢？
  + 当then方法中的回调函数本身在执行的时候，那么它处于pending状态；
  + 当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会将结果作为resolve的参数；
    ü 情况一：返回一个普通的值；
    ü 情况二：返回一个Promise；
    ü 情况三：返回一个thenable值；
    p当then方法抛出一个异常时，那么它处于reject状态；

```js
// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve("hahaha")
})
```

```js
// 2.then方法传入的 "回调函数: 可以有返回值
// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
promise.then(res => {
  return "aaaaaa" // 如果不屑返回值，默认是一个undefined
}).then(res => {
    console.log("res", res)
    return "bbbbb"
})

// 等价于
promise.then(res => {
    // 这个证明了then方法本身也是由返回值的，返回值是一个Promise
    return new Promise((resolve) => {
        resolve("aaaaa")
    })
})
```

```js
// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve("hahaha")
})

// 1.同一个Promise可以被多次调用then方法
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
promise.then(res => {
  console.log("res1:", res)
})

promise.then(res => {
  console.log("res2:", res)
})

promise.then(res => {
  console.log("res3:", res)
})

// 2.then方法传入的 "回调函数: 可以有返回值
// then方法本身也是有返回值的, 它的返回值是Promise

// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
promise.then(res => {
  return "aaaaaa"
}).then(res => {
  console.log("res:", res)
  return "bbbbbb"
})

// 2> 如果我们返回的是一个Promise
promise.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111111)
    }, 3000)
  })
}).then(res => {
  console.log("res:", res)
})

// 3> 如果返回的是一个对象, 并且该对象实现了thenable
promise.then(res => {
  return {
    then: function(resolve, reject) {
      resolve(222222)
    }
  }
}).then(res => {
  console.log("res:", res)
})

```

## 9. catch方法- 多次调用

+ catch方法也是Promise对象上的一个方法：它也是放在Promise的原型上的`Promise.prototype.catch`
+ 一个Promise的catch方法是可以被多次调用的：
  + 每次调用我们都可以传入对应的reject回调；
  + 当Promise的状态变成reject的时候，这些回调函数都会被执行；

```js
const promise = new Promise((resolve, reject) => {
    reject("rejected status")
    // 1. 当我们抛出异常时，也是会调用错误捕获的回调函数的
    throw new Error("rejected status")
})


promise.then(undefined, (err) => {
    console.log("err", err)
})

// 等价于
promise.then(res => {
    
}).catch(err => {
    // 如果第一个promise报出异常就捕获，如果没有等下一个。如果下一个promise抛出异常也会被捕获
})

// 等价于
promise.catch((err) => {
    
} )
```

```js
const promise = new Promise((resolve, reject) => {
    reject("11111")
})

promise.then(res => {
    
}, err => {
    console.log("err", err)
})

// 改成这种写法，假如promise抛出异常，代码会报错
// 因为下面两个是独立的调用，相互之间不会影响，所以第一个then执行完成后，没有捕获异常就会报出错误
// 一般完成一个进程正常退出是0
promise.then (res => {
    
})

promise.catch(err => {
    
})

```

## 10. catch方法-返回值

+ 事实上catch方法也是会返回一个Promise对象的，所以catch方法后面我们可以继续调用then方法或者catch方法：
  + 下面的代码，后续是catch中的err2打印，还是then中的res打印呢？
  + 答案是res打印，这是因为catch传入的回调在执行完后，默认状态依然会是fulfilled的；
+ 那么如果我们希望后续继续执行catch，那么需要抛出一个异常：

```js
// const promise = new Promise((resolve, reject) => {
//   resolve()
//   // reject("rejected status")
//   // throw new Error("rejected status")
// })

// 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(undefined, err => {
//   console.log("err:", err)
//   console.log("----------")
// })

// 2.通过catch方法来传入错误(拒绝)捕获的回调函数
// promise/a+规范
// promise.catch(err => {
//   console.log("err:", err)
// })
// promise.then(res => {
//   // return new Promise((resolve, reject) => {
//   //   reject("then rejected status")
//   // })
//   throw new Error("error message")
// }).catch(err => {
//   console.log("err:", err)
// })


// 3.拒绝捕获的问题(前面课程)
// promise.then(res => {

// }, err => {
//   console.log("err:", err)
// })
// const promise = new Promise((resolve, reject) => {
//   reject("111111")
//   // resolve()
// })

// promise.then(res => {
// }).then(res => {
//   throw new Error("then error message")
// }).catch(err => {
//   console.log("err:", err)
// })

// promise.catch(err => {

// })

// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject("111111")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
  return "catch return value"
}).then(res => {
  console.log("res result:", res)
}).catch(err => {
  console.log("err result:", err)
})

```

```js
const promise = new Promise((resolve, reject) => {
  reject("111111")
  console.log('------------');
  throw new Error("22222")
})
// -----
// 11111

const promise = new Promise((resolve, reject) => {
  reject("111111")
  throw new Error("22222")
  console.log('------------');
})
// throw 后面的不会再执行，但是抛出异常的优先级，哪个先抛出，哪个优先

const promise = new Promise((resolve, reject) => {
  throw new Error("22222")
  reject("111111")
  console.log('------------');
})
// 22222 直接抛出就不执行了


promise.catch(err => {
  console.log(err);   
})
```

```JS
// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject("111111")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
  return "catch return value" // 这里等价于 return newPromise(resolve => resoleve(x)), 所以会被then使用，然后由then接着抛出异常再由下一个catch调用
}).then(res => {
  console.log("res result:", res)
}).catch(err => {
  console.log("err result:", err)
})
```

## 11. finally方法

+ finally是在ES9（ES2018）中新增的一个特性：表示无论Promise对象无论变成fulfilled还是reject状态，最终都会被执行的代码。

+ finally方法是不接收参数的，因为无论前面是fulfilled状态，还是reject状态，它都会执行。

```js
const promise = new Promise((resolve, reject) => {
  // resolve("resolve message")
  reject("reject message")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
}).finally(() => {
  console.log("finally code execute")
})
// 不需要参数，最终会被执行
```

## 12. resolve方法

+ **前面我们学习的then、catch、finally方法都属于Promise的实例方法，都是存放在Promise的prototype上的。**

  + 下面我们再来学习一下**Promise的类方法。**

+ 有时候我们已经有一个现成的内容了，希望将其转成Promise来使用，这个时候我们可以使用`Promise.resolve` 方法来完成。

  + `Promise.resolve`的用法相当于new Promise，并且执行resolve操作：

  ![image-20220413204041128](18-响应式原理实现和Promise.assets/image-20220413204041128.png)

+ resolve参数的形态：

  + 情况一：参数是一个普通的值或者对象
  + 情况二：参数本身是Promise
  + 情况三：参数是一个thenable







## 13. reject方法

+ reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject状态。
+ `Promise.reject`的用法相当于new Promise，只是会调用reject：

![image-20220413204916010](18-响应式原理实现和Promise.assets/image-20220413204916010.png)

+ `Promise.reject`传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的。





## 14. all方法

+ 另外一个类方法是Promise.all：
  + 它的作用是将多个Promise包裹在一起形成一个新的Promise；
  + 新的Promise状态由包裹的所有Promise共同决定：
    + 当所有的Promise状态变成fulfilled状态时，新的Promise状态为fulfilled，并且会将所有Promise的返回值组成一个数组；
    + 当有一个Promise状态为reject时，新的Promise状态为reject，并且会将第一个reject的返回值作为参数；





## 15. allSettled方法





## 16.race方法

+ 如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法：
  + race是竞技、竞赛的意思，表示多个Promise相互竞争，谁先有结果，那么就使用谁的结果；



## 17. any方法

+ any方法是ES12中新增的方法，和race方法是类似的：
  + any方法会等到一个fulfilled状态，才会决定新Promise的状态；
  + 如果所有的Promise都是reject的，那么也会等到所有的Promise都变成rejected状态；
+ 如果所有的Promise都是reject的，那么会报一个AggregateError的错误。







# Iterator-Generator

## 1. 什么是迭代器？

+ 迭代器（iterator），是确使用户可在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。
  + 其行为像数据库中的光标，迭代器最早出现在1974年设计的CLU编程语言中；
  + 在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如Java、Python等；
+ 从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。
+ 在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：
  + 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；
  + 那么在js中这个标准就是一个特定的next方法；

+ next方法有如下的要求：
  + 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
  + done（boolean）
    + 如果迭代器可以产生序列中的下一个值，则为false。（这等价于没有指定done 这个属性。）
    + 如果迭代器已将序列迭代完毕，则为true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
  + value
    + 迭代器返回的任何JavaScript 值。done 为true 时可省略。



## 2. 可迭代对象

+  但是上面的代码整体来说看起来是有点奇怪的：
  + 我们获取一个数组的时候，需要自己创建一个index变量，再创建一个所谓的迭代器对象；
  + 事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；
+  什么又是可迭代对象呢？
  + 它和迭代器是不同的概念；
  + 当一个对象实现了iterable protocol协议时，它就是一个可迭代对象；
  + 这个对象的要求是必须实现@@iterator 方法，在代码中我们使用Symbol.iterator 访问该属性；
+  当我们要问一个问题，我们转成这样的一个东西有什么好处呢？
  + 当一个对象变成一个可迭代对象的时候，进行某些迭代操作，比如`for...of`操作时，其实就会调用它的`@@iterator` 方法；



# await-async-事件循环



















































 