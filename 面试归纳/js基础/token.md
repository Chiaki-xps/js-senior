# token

- cookie 和 session 的方式有很多的缺点：
  - Cookie 会对所有合规的请求附加上 cookie，所以无形中增加了流量（事实上某些请求是不需要的）；
  - Cookie 是明文传递的，所以存在安全性的问题；
  - Cookie 的大小限制是 4KB，对于复杂的需求来说是不够的；
  - 对于浏览器外的其他客户端（比如 iOS、Android），必须手动的设置 cookie 和 session（比较麻烦）；
  - 对于分布式系统和服务器集群中如何可以保证其他系统也可以正确的解析 session？
  - 对于 java 来说解析 session 比较麻烦，实际写 node 的时候，加盐是一样的，所以可以直接解析，还好。
  - 总来来说分布式和集群解析 session 比较麻烦才是原因。
- 所以，在目前的前后端分离的开发过程中，使用 token 来进行身份验证的是最多的情况：
  - token 可以翻译为令牌；
  - 也就是在验证了用户账号和密码正确的情况，给用户颁发一个令牌；
  - 这个令牌作为后续用户访问一些接口或者资源的凭证；
  - 我们可以根据这个凭证来判断用户是否有权限来访问；
- 所以 token 的使用应该分成两个重要的步骤：
  - 生成 token：登录的时候，颁发 token； 
  - 验证 token：访问某些资源或者接口时，验证 token；

## 生成 token

- JWT 生成的 Token 由三部分组成（header 、payload、signature）：
  - header：由啊alg、typ组成的一个对象后经过base64转换后就是我们的header
    - alg：采用的加密算法，默认是 HMAC SHA256（HS256），采用同一个密钥进行 加密和解密；
    - typ：JWT，固定值，通常都写成 JWT 即可；
    - 会通过 base64Url 算法进行编码；
  - payload：
    - 携带的数据放到 payload 中；
    - 默认也会携带 iat（issued at），令牌的签发时间；
    - 我们也可以设置过期时间：exp（expiration time）；
    - 会通过 base64Url 算法进行编码
  - signature（签名）：
    - 设置一个 secretKey，通过将前两个的结果合并后进行 HMACSHA256 的算法；
    - signature = HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey);
    - HS256 是对称加密（它的密钥同时用于加密解密），所以 secretKey 暴露是一件非常危险的事情，因为之后就可以模拟颁发 token，也可以解密 token；
- 最终 token = header.payload.signature

- 对称加密，加密解密用的哦都是同一个 key，非对称加密反之。
- 一般颁发的时候使用的 secretKey 叫做私钥（privateKey）。解密用的叫做公钥（publicKey）,公钥只能做到解密，做不到加密颁发 token

```js
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const app = new Koa();
const testRouter = new Router();

const SECRET_KEY = 'abccba123';

// 登录接口
testRouter.post('/test', (ctx, next) => {
  const user = { id: 110, name: 'why' };
  // 1. 在token中header是有默认值的，所以jwt中没有让传，直接第一个传payload
  // 2. jwt中会自动给payload设置令牌签发时间，所以不需要给
  // 3. token中，需要一个secretKey,所以jwt中需要传出
  // 4. token中payload中要传入过期时间，在jwt中，作为第三个options中设置
  const token = jwt.sign(user, SECRET_KEY, {
    // 单位秒
    expiresIn: 10,
  });

  // 返回token
  ctx.body = token;
});

// 验证接口
testRouter.get('/demo', (ctx, next) => {
  // 拿到token
  const authorization = ctx.headers.authorization;
  // 正常的authorization会带上`Bearer `需要进行截取
  const token = authorization.replace('Bearer ', '');

  try {
    // jwt.verify用于验证token的有效性，需要传入SECRET_KEY
    // jwt如果验证失效，直接抛出错误。所以需要使用try catch
    const result = jwt.verify(token, SECRET_KEY);
    ctx.body = result;
  } catch (error) {
    console.log(error.message);
    ctx.body = 'token是无效的~';
  }
});

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务器启动成功~');
});
```

```shell
# 使用openssl生成密钥
# genrsa 表示根据rsa算法生成私钥
# -out 表示输出
# -in 表示输入
# private.key 表示输出的文件名
# 1024 可以指定生成的私钥长度
openssl genrsa -out private.key 1024

# 根据私钥生成公钥
openssl rsa -in private.key -pubout -out public.key
```

```js
// 与上面得代码的不同得是，需要指定加密算法 algorithm: 'RS256'
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { pathToFileURL } = require('url');

const app = new Koa();
const testRouter = new Router();

// 在项目中的任何一个地方的相对路径, 都是相对于process.cwd()
console.log(process.cwd());

const PRIVATE_KEY = fs.readFileSync('./keys/private.key');
const PUBLIC_KEY = fs.readFileSync('./keys/public.key');

// 登录接口
testRouter.post('/test', (ctx, next) => {
  const user = { id: 110, name: 'why' };
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: 10,
    // 需要指定算法
    algorithm: 'RS256',
  });

  ctx.body = token;
});

// 验证接口
testRouter.get('/demo', (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace('Bearer ', '');

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      // 解密得时候，也要记得传入解密得算法是rsa。这里传数组
      algorithms: ['RS256'],
    });
    ctx.body = result;
  } catch (error) {
    console.log(error.message);
    ctx.body = 'token是无效的~';
  }
});

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log('服务器启动成功~');
});
```

## 如何无感刷新 token
