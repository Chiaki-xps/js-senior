console.log("begin");
setTimeout(() => {
  console.log("settimeout 111");

  Promise.resolve().then(() => {
    console.log("then");

    process.nextTick(() => {
      console.log("PromiseMicrotask nextTick");

      process.nextTick(() => {
        console.log("PromiseMicrotask nextTick aaaa");
      });
    });
  });

  queueMicrotask(() => {
    console.log("queueMicrotask");

    process.nextTick(() => {
      console.log("queueMicrotask nextTick");
    });
  });

  process.nextTick(() => {
    console.log("nextTick 1");

    process.nextTick(() => {
      console.log("nextTick 2");
    });
  });
}, 0);

setTimeout(() => {
  console.log("settimeout 222");
}, 0);

/**
 * 这道题考察的是，其他微任务队列正常执行的时候，遇到 process.nextTick() 的时候，是否会打断微任务队列的执行？
 * 不会的，因为本身微任务队列之间的切换也会消耗一些性能，所以微任务队列的执行是不会被打断的。所以当Promise.resolve().then后，会执行queueMicrotask，再去切换到process.nextTick的执行
 * 但是如果是宏任务队列的话，就会打断微任务队列的执行。因为本身宏任务可能处理的是耗时任务，所以愿意牺牲一些性能去切换到微任务队列中执行
 */
