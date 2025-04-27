## 1. 打印 Promise

```js
const b = new Promise((resolve) => {});
console.log("🚀 ~ b:", b); // Promise {<pending>}

function test() {
  return new Promise((resolve) => {});
}

const c = test();
console.log("🚀 ~ c:", c); // Promise {<pending>}

const a = Promise.resolve(1);
console.log("🚀 ~ a:", a); // Promise {1}

function test2() {
  return Promise.resolve(1);
}

const d = test2();
console.log("🚀 ~ d:", d); // Promise {1}

function test3() {
  return new Promise((resolve) => {
    return 1;
  });
}

const e = test3();
console.log("🚀 ~ e:", e); // Promise {<pending>}
```

- `new Promise()` 返回的就是一个对象 Promise
- Promise 返回的结果和调用 resolve reject 有关，return 无关

## 2. 关于 resolve 中执行的 thenable

```js
Promise.resolve({
  then: function (resolve, reject) {
    console.log("then", 0);
    resolve(10);
  },
}).then((res) => {
  console.log("then", res);
});

console.log("a");

Promise.resolve(1).then((res) => {
  console.log("then", res);
});

// a 0 1 10
```

- 如果 resolve 处理的对象，实现了 thenable。就把这个 thenable 放入到微任务中

```js
function test() {
  return new Promise((resolve) => {
    const a = Promise.resolve(1).then((res) => {
      console.log("then", res);
      resolve(10);
    });
    console.log("🚀 ~ a ~ a:", a); // Promise { <pending> }
  });
}

const a = test();
console.log("🚀:", a); // Promise { <pending> }

setTimeout(() => {
  console.log("🚀", a); // Promise { 10 }
}, 0);

// 打印结果都是  Promise { <pending> }
```

- Promise 的执行是同步的，所以你 a 拿到的结果是一个 Promise {<pending>}
