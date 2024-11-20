### 1. axios 请求暂停

- axios 本身不支持请求暂停。

### 2. axios 取消请求（CancelToken）

1. 创建取消令牌`const source = axios.CancelToken.source();`
2. `source.token`唯一的取消令牌
3. 配置到请求中`axios.get('接口', {cancelToken: source.token})`
4. 执行去请求`source.cancel(回调函数)`
5. 如果想要实现多个取消请求，就需要创建多个 source

### 3. 深度思考，我封装好了请求库，我怎么拿到 source 去做取消请求（取消指定请求）

1. 通过传入配置指定是否创建取消令牌。传入一个 cancelObj 则创建，不传则不创建
2. 依赖注入。我们调用 request 方法，传入配置中带有 cancelObj。cancelObj 就会被注入一个方法 cancel
3. 这个 cancel 方法来自我们每次调用 request 的时候，里面都会创建`axios.CancelToken.source()`实例。内部会是实现`cancelObj.cancel = source.cancel`
4. 这样子你就可以通过 cancelObj 随时取消
5. 主要仓库一开始没有考虑这个，默认返回的 data 数据了，其他项目上已经在用了。不可能去修改返回类型了。
6. 当时的想法是从配置项作为切入点，利用 cancelObj 注入方法，去拿到封装请求库里的实例。
7. 代码的角度，这么写不够线性。最后可以使用的方法结果应该通过 return，而不是注入到传入配置对象里。
8. 但觉得我这么写未来产品开发可以无感升级请求库版本。
9. 相当于把 request 请求做成了一个 IOC，你想要啥，你传啥，我给你装进去。

### 3. axios 请求中止（AbortController）

1. 实例化`controller = new AbortController()`
1. 得到一个 signal：`const signal = controller.signal;`
1. 传入 axios 配置中`{signal:signal}`
1. 执行暂停`controller.abort();`

### 4. 处理重复请求

- 优先使用 loading。其次再请求中处理

1. 每个请求建立创建一个唯一 key。请求方式+url+params 生成唯一 key
2. 建立一个 Map。将 key 存入。
3. 如果 key 存在，取消请求。重新发送请求（用最新的请求去请求最新的数据）
4. 接口放回无论结果 finally 去删除 Map 中的 key

### 5. 请求串行

1. 一般就是请求完成后接着请求下一个
2. 理论上应该是项目上自己去做，库一般实现的是一个固定的
3. 比如 登录 后拿到 token，token 之后去请求 license 是否过期，没过期再拿用户权限。
4. 用的场景比较少，一般都是产品自己去写请求串行。
5. 做的时候用了 reduce。每一个请求结果作为下一个请求的参数。

### 6. 请求幂等性

- 避免网络问题之类的，重复请求导致产生副作用。比如付款，点了很多次，总不能付很多次吧

1.  生成唯一 key（幂等性键）
1.  根据列表数据 组成一个唯一 key + 状态去请求。
1.  只要后台处理过，状态会变成 不可修改，就能保证不被重复处理

### 6. 并发并行

- 并发是交替执行
- 并行是同时执行

### 7. 请求并发

- 请求并行指的是同时执行。
- 如果用 Promise,用`Promise.allSettled`。

- `axios.all`+`axios.spread`一起。axios.spread 就是展开数组的一个方法
- 使用库`axios-extensions`
- 使用`p-limit`

```js
// axios.all 返回一个数组
axios.all([axios.get(), axios.get(), axios.get()]);
```

1. 建立一个请求队列。一开始 Promise.allSettled，或者直接 axios.all 请求最开始的 6 个。
2. 每一个请求完成之后，会去查当前运行池，没有超过就取请求队列的请求，继续请求。
