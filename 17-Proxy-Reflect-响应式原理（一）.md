# 17. Proxy-Reflect-响应式原理（一）

## 1. 监听对象的操作

+ 需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程



+ `Object.defineProperty()`给传入的对象修改或新增属性，返回该对象。

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











