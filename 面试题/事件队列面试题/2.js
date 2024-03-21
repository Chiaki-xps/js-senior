setTimeout(function () {
  console.log('setTimeout1');
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log('then4');
    });
    console.log('then2');
  });
});

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('then1');
});

setTimeout(function () {
  console.log('setTimeout2');
});

console.log(2);

queueMicrotask(() => {
  console.log('queueMicrotask1');
});

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log('then3');
});

// 这道题的细节在于触发then之后，里面的内容会放入到微任务队列中
// 每次执行宏任务前清空微任务
