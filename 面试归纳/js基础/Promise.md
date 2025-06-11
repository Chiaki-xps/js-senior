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

## 3. 如何实现并发请求



















# temp

• 基于KrpanoJS自主研发全景交互系统，构建包含全景渲染引擎、动态交互组件、数据可视化模块的插件化架构，实现30%的性能优化提升
• 主导开发核心功能模块：
  - 高精度全景渲染引擎：支持4K级全景图加载与实时渲染，提供小行星开场、陀螺仪适配等特效
  - 智能户型交互系统：实现360°空间漫游、多楼层自动导航、户型结构动态调整功能，用户交互时长提升40%
  - 数据动态注入模块：通过XML Schema设计实现热更新能力，支持图文/视频/3D模型等多维信息动态加载
• 构建跨平台插件体系，封装标准化XML组件库（6大类32个组件），实现"一次开发多端适配"，已成功落地APP原生应用、微信H5、WebGL网页三端
• 创新采用声明式配置架构，通过可视化配置后台实现功能模块自由组合，降低80%二次开发成本，支撑20+项目快速复用
• 技术成果获公司级创新奖，相关方案使客户线上看房转化率提升25%，用户平均停留时长增加2.3分钟

（优化要点说明：1.突出技术深度 2.量化项目成果 3.体现架构设计能力 4.强调跨平台特性 5.展示商业价值 6.使用专业术语增强技术说服力）























