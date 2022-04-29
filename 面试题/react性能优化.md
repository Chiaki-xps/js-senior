```js
常见的前端性能优化手段都有哪些？都有多大收益？ - 脑细胞的回答 - 知乎
https://www.zhihu.com/question/40505685/answer/2133733914
```



## 1. 优化技巧

+ 减少计算的量
+ 利用缓存
+ 精确重新计算的范围



## 2. React工作流





## 3. 减少计算量

+ 列表项使用key属性
+ Hooks尽量轻量，避免阻塞


+ PureComponent、React.memo
  + 父组件的更新会导致子组件的更新，但是子组件中props和state没有改变，我们应当减少子组件不必要的更新
  + PureComponent对类组件的Props和state进行浅比较
  + React.memo是对函数组件的Props进行比较
+ useMemo、useCallback实现稳定的的props值
  + 因为父组件传给子组件的状态每次都是新的引用，那么`PureComponent`、`React.memo`就会失效，所以用useMemo和useCallback返回一个稳定的值，结合子组件的`PureComponent`、`React.memo`实现性能优化。


+ `useMemo`减少组件`Render`过程中的耗时

  + 缓存昂贵的计算结果，避免每次执行计算

  ```jsx
  const renderTable = useMemo(() => {
    return (
    	<Table> 里面需要大量的耗时操作 </Table>
    )
  }, [依赖])

  ```

+ shouldComponentUpdate  进行深度比较

+ 批量更新，减少render次数

  + React管理的事件回调和生命周期中，setState是异步的，也就是setState在react的调度流程中就是异步的。这是因为react的调度中对setState是批量更新的，而在其他调度中属于立刻更新

  + `setTimeout` `setInterval` ，直接在 `DOM` 上绑定原生事件等。这些都不会走 `React` 的调度流程，你在这种情况下调用 `setState` ，那这次 `setState` 就是同步的。

  + 批量更新时，多次执行setState只会触发一次Render过程

  + 将多个State合并为单个State

  + React官方提供了`unstable_batchedUpdates`方法，传入多个要更新的setState。

    ```js
    unstable_batchedUpdates(() => {
      setState1(...)
      setState2(...)
    })
    ```

## 4. 精细化渲染阶段

+ 按优先级更新，及时相应用户
  + 优先相应用户行为，将耗时任务移动到下一个宏任务执行













