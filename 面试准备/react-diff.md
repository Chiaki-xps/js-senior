### 1. react key 作用

1. key 主要是为了复用，减少 ODM 操作产生的开销
2. 没有 key 一般按节点顺序对比。有 key 的话，再调和的时候，会走一个循环去挨个挨个找相同的 key
3. 然后还会比较类型 elementType（elementType 值：组件的话，就是组件名，标签就是标签名）
4. 相同的情况下就直接复用，新的 filer 的 props 直接给到旧的 fiber 里去，减少创建的过程
5. 不同的话，删除旧的节点，创建新的节点
6. key 的设计就是复用 DOM。
7. 单个节点,第一次遍历的同一层挨个比较key.
8. 多节点,在第二轮的时候,去身下的map集合里找.

```js
https://juejin.cn/post/7203254152189083705
```

### 2. react 中用 index 作为 key

举个例子：

1. 比如我们用一个数组，index 作为 key 的时候，进行 map 展示一列 input，defaultValue 是动态的，变成一个受控组件，
2. 然后数组这个时候插入一条数据，触发 render，重新渲染。
3. 进行 diff 的时候，找到相同的 index，elementType 也是相同的，直接复用原来的 DOM，在原来的基础上更新属性。
4. 这时候就有问题了，defaultValue 是在创建时候生效的，你虽然属性更新了，最新的值，但是因为是复用更新，所以不会展示最新的，还是原来复用的展示的效果。
5. 这就造成了你数组发生改变，但是界面上受控组件可能并没有发生变化。
6. 可以说是 bug 也可以说不是。只是说 react 希望你传一个稳定的 key 进行性能优化。
7. 而且就算不是 defaultValue，我们直接 input 输入数据，value 发生改变，在这个 input 前面插入一条数据，理想状态应该是输入的 input 向下移动，中间生成一个新的 input，但是也会，因为会复用
8. 插入的复用了输入的 input，输入的 input 去复用找到对应的 index。这也导致问题。
9. 不能说是 bug，因为复用逻辑就是这样。

总结：

- 列表发生重排
- 列表渲染的 UI 组件包含受控组件。

我觉 bug 让你理解源码，你踩的坑越多，对源码的一些边界逻辑越理解吧

### 3. react diff 算法

1. diff 就是当前的 fiber 树和 JSX 对象进行比较，生成进行的 fiber 树。（current Fiber Tree 和 workInProgress Fiber Tree）
2. react为了优化diff性能，做了一些diff限制
3. react 只做同层级的比较。（同层相当于兄弟节点）（降低比较复杂度）
4. 元素类型不同的话，直接重新创建

具体diff

1. 只有一个节点的diff：
   1. 通过一个循环兄弟节点，一个个比较key（没有设置key，值为null），再比较类型。相同复用。不能复用的旧标记DOM删除，返回一个新的fiber

1. 多个元素的diff

   1. 因为fiber最终形成链表，无法使用双指针优化
   2. 所以要做两轮遍历
   3. 第一轮处理更新节点
   4. 第二轮处理不剩下更新的节点

   + 第一轮遍历
     1. 相同位置遍历，直到不可复用位置。如果两边都存在没有遍历完成,标记一个lastPlacedIndex。
     2. 当两边都没遍历，就会开始第二轮，有key的话用key，没有key会用index，表示同一个位置的比较.
     3. 找到相同的key的,可以复用的fiber的index和比较留下的lastPlacedIndex比较.
     4. oldIndex比较lastPlacedIndex就不需要移动了.比他小就要移动.可以想象成一个成一个插入排序的感觉,就是一个一个抽出来比较.
     5. 这样做就可以减少节点的移动.

```http
https://juejin.cn/post/7390934048259768331

https://juejin.cn/post/6844904167472005134

https://juejin.cn/post/7407370502416891956

https://juejin.cn/post/7390934048259768331
```

### 4. react的diff和vue的diff

+ jsx中children最终会装成fiber，react的diff因为fiber的结构使用了单向链表。
+ 正常如果用数组遍历为了提高效率，会使用头尾指针
+ 但是单向链表是使用不了。
