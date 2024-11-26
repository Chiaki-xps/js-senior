## 1.配置

```shell
npm i typescript -g

npm i -g ts-node

tsc --init

tsc -w
```

## 2. 基本类型

```typescript
// 1.基本数据类型（Tip：Symbol是基本数据类型的一种）
let str: string = "string";
let num: number = 1;
let bool: boolean = true;
let u: undefined = undefined;
let n: null = null;
let obj: object = { name: "chiaki" };
let big: bigint = 100n;
let sym: symbol = Symbol("me");
```

## 3. null 和 undefined 是所有类型的子类型

- 在`tsconfig.json`中设置`strictNullChecks":true`。这样 null 和 undefined 才可以作为子类型被使用。
- null 和 undefined 是所有类型的子类型。

```typescript
let num: number = null;

let isFlag: boolean = true;
isFlag = null;
isFlag = undefined;
```

## 4. number 和 bigint 的不兼容

```typescript
let num: number = 100;
let big: bigint = 100n;

big = num; // 报错
num = big; // 报错
```

## 5. 定义数组

```typescript
let arr: string[] = ["1", "2", "3"];
let arr1: number[] = [1, 2, 3];

let arr3: Array<string> = ["1", "2", "3"];

let arr4: (string | number)[] = ["1", 2];
```

## 6. 函数

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 没有返回值的函数
function foo(): void {}

// 定义函数接口
interface func {
  (num1: number, num2: number): number;
}

//  函数表达式
let mySum: (num1: number, num2: number) => number = function (x, y) {
  return x + y;
};
/**
 * 可以理解成，类型约束的格式是
 * (num1: number, num2: number) => number
 * 后面的等于号则是赋值
 * 所以 mySum被定义成一个函数的格式 mySum: (num1: number, num2: number) => number
 * 后面的等于号就是符合这个格式的赋值
 */

// 箭头函数
const add = (a: number, b: number): number => {
  return a + b;
};
const get = (): void => {};

// 可选参数,可选参数后面不能再出现其他必选参数
function myName(name?: string) {
  return name;
}

// 参数默认值
function myName1(name: string = "chiaki") {
  return name;
}

// 剩余参数，ES6的剩余参数是一个数组
function foo1(num: number, ...argNums: number[]) {}
```

### 6. 函数重载

- 函数重载：在一个作用域里定义了多个相同函数名的函数。要求函数的参数的个数或者类型不相同。引擎会根据参数个数类型等，选择正确的函数。

- js 引擎并没有实现函数重载。但是 ts 有对应的实现。

```typescript
type Types = number | string;
function add(x: string, y: string): string;
function add(x: Types, y: Types) {
  if (typeof x === "string" || typeof y === "string") {
    return x.toString() + y.toString();
  }
  return x + y;
}
```

- 类型约束，会导致原本 js 默认转化会变成警告，一般字符串也是可以相加，但是 ts 中字符串不能使用，导致增加了一些代码量，失去一些灵活性。

## 7. Tuple（元组）

- 元组的作用就是限制数组元素的个数和类型。意味着**元组类型个数，和每个元素的类型都是确定的**
- js 是没有元组，如果超出的解构，会被认为是 undefined,但是 TS 中会报错.赋值也同样

```typescript
let arr: [number, string] = [1, "xps"];

arr = [1, 2]; // Error
arr = [1]; // 目标两个元素
```

- **可选类型：**在类型后面加个`?`表示可选元素

```typescript
let arr: [number, string?] = [1, "xps"];

arr = [1]; // 正确
arr = [2, "chiaki"]; // 正确
arr = [2, 3]; // Error
```

- **剩余元素：**剩余元素语法`...arg`，此时`arg`是数组类型

```typescript
const arr: [number, ...string[]] = [1, "a", "b"];
```

- **只读元组：**`readonly`

```typescript
const arr: readonly number[] = [1, 2, 3];

arr[0] = 2; // 智能读，不能修改
```

## 8. void

void 表示没有类型，严格模式下，不能给任何类型赋值（null、undefined）。主要应用场景还是表示函数的返回值，表示没有返回值（即返回值为 undefined）。

```typescript
function foo(): void {}
foo();

function bar(): undefined {}
bar();
```

## 9. never

- never 类型表示的不存在的值的类型。（例如抛出异常、死循环永远没有返回值）
- never 类型和 null undefined 一样,都是任何类型的子类型,可以赋值给任何类型
- 但是没有类型是 never 的子类型,所以除了 never 类型可以赋值给 never,其他都不行,即使是 any

```typescript
function err(msg: string): never {
  throw new Error(msg);
}

function loop(): never {
  while (true) {}
}
```

- never 类型同 null 和 undefined 一样，也是任何类型的子类型。（主要用的场景：如果一个函数根据类型做对应操作，会在最后做一个 never 类型的处理。这样子后续 FOO 增加其他类型，也会有对应的处理）
  - 使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。

```typescript
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

## 10. any

- 任何类型都可以被归为 any 类型。any 类型是类型系统的顶级类型。
- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。
- 在 any 上访问任何属性的都是被允许的

## 11. unknown

- `unknown`与`any`的异同
  - 同：所有类型都可以分给 unknown 和 any
  - 异：`any`类型可以赋值给任意类型（除了`never`）。`unknown`类型只能赋值给`unknown`和`any`

```typescript
let any1: any;
let unknown1: unknown;

unknown1 = any1;

let any2: any;
let unknown2: unknown;
any2 = unknown2;
```

## 12. Number、String、Boolean、Symbol

- 基本类型（小写）：number、string、boolean、symbol
- 基本类型的包装器对象类型（大写）：Number、String、Boolean、Symbol
  - 两者是有区别的，一个是基本类型，一个是对象类型
  - 基本类型可以赋值给它对应的包装器对象。
  - 但是包装器对象类型不能赋值给它对应的基类
- 尽可能不要使用对象类型来注解值的类型

```typescript
let num: number = 1;
let Num: Number;
num = Num; // 报错

let num: number = 1;
let Num: Number;
Num = num; // OK
```

## 13. object、Object 和 {}

- object 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol 等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。
- 大 Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。
  - 大 Object 包含原始类型，小 object 仅包含非原始类型，所以大 Object 似乎是小 object 的父类型。实际上，大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型。
  - 尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。
- `{}`空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 `{}`
- {}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。

```typescript
let obj: object;
let Obj: Object = 1;
obj = Obj;

let obj: object = {};
let Obj: Object;
Obj = obj;
```

## 14. 类型断言`as`

```typescript
const arr: number[] = [1, 2, 3, 4];

// ts的类型校验在编译阶段起作用，并不参与运行
// 因此在ts解析器中，会跟觉find的回调函数判断返回值可能为undefined或number
const arr2: number = arr.find((num) => num > 2); // ts报错

// 解决一：增加类型
const arr3: number | undefined = arr.find((num) => num > 2);

// 如果你非常确定在这个代码执行中不会出现undefined，可以使用类型断言as
// 解决二：as
const arr4: number = arr.find((num) => num > 2) as number;

// 类型断言的两种语法
let value: any = "this is a string";
// 在变量前面使用尖括号,表示必定是 string 类型
let strLength: number = (<string>value).length;
// 在变量后面 as 指定, 必然是当前类型(推荐)
let strLength: number = (value as string).length;
```

```typescript
let a = "1" as const; // a的类型是字符串字面量 '1'
```

## 15. 非空断言`x!`

- 变量后面带感叹号,表示该变量是非空的
- `x!`表示变量 x 的值域排除`null`和`undefined`

```typescript
let age: number | undefined;
let height: number;
height = age!;
```

## 16. 确定赋值断言`!:`

- 和上面的`x!`不一样，`x!: 类型`的作用是告诉 TS 编译器，这个变量一定会被赋值过

```typescript
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}

// 报错的原因是因为解析阶段，ts认为没有给x赋值，但是实际代码执行是会有赋值的，但是ts执行不在运行阶段
// 因此我们可以修改成
let x!: number;
// 表示确定会在使用前明确赋值
```

## 17. 字面量类型

- 支持三种字面量,字符串 数字 布尔字面量

```typescript
let str: "xps" | "chiaki" | 1;

str = 1;
str = "xps";
str = 2; // 报错：不在字面量类型里
```

## 18. let 和 const 分析

- const 因为定义的是一个**不可变更**的常量，所以不定义类型的时候，TS 会跟觉值推断成字面量类型。
- let 定义的变量是**可变**的，所以会进行类型拓宽为它的父类型

```typescript
const str = "i am xps"; // 推断str的类型是'i am xps'

let str2 = "i am chiaki"; // 推断str2类型是 string
```

## 19. 类型拓宽(Type Widening)

- 没有指定类型，定义常量 TS 会解析为字面量类型。变量会进行类型拓宽到父类型
- 非严格模式下：如果没有显示声明类型，并且被赋值为 null 和 undefined。类型拓宽为 any。
- 严格模式下,null 和 undefined 不会被拓宽成 any

```typescript
let age; // 类型为any
age = 12; // 类型为any

let x = null; // 类型为null
x = "boy"; // 严格模式下报错，x类为null

let y = undefined;
y = 123; // 不能将类型“123”分配给类型“undefined”
```

```typescript
// 类型拓宽的bug
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

let x = "x";
let vec = { x: 10, y: 20, z: 30 };
// 类型“string”的参数不能赋给类型“"x" | "y" | "z"”的参数。
// 原因是传入的x类型是string，但是对于TS来说，期望是一个明确的字面量类型。所以报错
getComponent(vec, x); // Error
```

## 20. 类型缩小(Type Narrowing)

- TS 会根据上下文进行判断，比如通过 if 之类的，缩小类型。
- js 中 typeof null 结果是 object
- 空字符串和 0 属于 falsy 值

## 21. 联合类型`|`

- 通过`|`联合多个类型

```typescript
// 对于一些参数会通过联合类型加上undefined、null
function foo(arg: string[] | undefined) {}
```

## 22. 类型别名`type`

- 关键词`type`。

## 23. 交叉类型`&`

- `&`。更多用在接口的合并上

```typescript
type obj = { age: number } & { name: string };

const obj: obj = {
  age: 18,
  name: "xps",
};
```

```typescript
// 加入联合的对象有重复的key，并且类型不同会怎么样？
type obj = { age: number } & { age: string };

// 等价于,能够同时是两个基本类型的类型就只能是不存在类型即never, age:never
type obj1 = { age: number & string };

const obj: obj = {
  age: 18, // 报错：age的类型为never
};
```

## 24. 接口类型`interface`

- 面向对语言中，接口（interface）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
- TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]以外，也常用于对「对象的形状（Shape）」进行描述
  - 大白话就是，实现该接口的变量，属性必须和接口要求的属性一样多，不能多不能少。
  - 赋值的时候，变量的形状必须和接口的形状保持一致。

## 25. 可选｜只读属性`? | readonly`

```typescript
interface Person {
  readonly name: string; // 在属性前面加个readonly
  age?: number; // 此时的age的类型是 age: number | undefined
}

// TS提供了只读数组的方法 ReadonlyArray<T>
let roa: ReadonlyArray<number> = [1, 2, 3, 4];
```

## 26. 任意属性

- 利用索引签名，`[key: 类型]: any`
- 规则：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

// 所有确定属性的类型都必须是可选属性的子类型。
// 但是age是number类型
let tom: Person = {
  name: "Tom",
  age: 25, // 报错
  gender: "male",
};

// 解决办法，使用联合类型
```

```typescript
// 所以给可选类型改为联合类型[propName: string]: string | number;
interface Person {
  name: string;
  age?: number; // 报错，TS判断age类型为 number｜undefined
  [propName: string]: string | number;
}

// 因为你的age是可选类型。同时属于任意类型的子集
// 意类型的联合类型应该包含可选类型会出现的类型。因为age是可选的会有undefined的情况
// 所以：
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined;
}

// age?: number 等价于 age: number | undefined
```

## 27. 鸭子辨型法

- 在 TS 中，只要能满足像鸭子一样，他就是鸭子。

```typescript
interface Person {
  name: string;
}

function logName(person: Person) {
  console.log(person.name);
}
const xps = { name: "xps", age: 18 };
// 不报错，对于logName中person，需要的是name。你能提供name，即使你的类型不是Person，也会当作Person使用，然后绕开多余的检测
logName(xps);
```

## 28. 绕开额外属性检查的方式

1. 鸭子类型
2. 使用 any
3. 类型断言

- 当你使用类型断言的时候，相当于明确告诉 TS 你这是什么类型，TS 就不会做额外校验

```typescript
interface Person {
  name: string;
}

const xps = {
  name: "xps",
  age: 18,
} as Person; // 当作Person使用
```

3. 索引签名

```typescript
interface Props {
  name: string;
  [key: string]: any;
}

let p: Props = {
  name: "xps",

  // girl是任意属性，任意属性要求类型any
  girl: false,
};
```

## 29. 接口与类型别名的区别

- 大多数情况两者效果是等价的
- type 表示类型别名，用来起一个新名字，多用于基本类型、联合类型、交叉类型等起一个运用时起一个新名字
- 接口主要描述在对象的形状。
  - 接口可以重复定义，相当于给同一个接口进行联合。(type 不可以重复定义同一个名称)
- 类型别名通过交叉类型`&`进行拓展。而接口通过 extends 进行拓展

```typescript
// 重复定义
interface Point {
  x: number;
}
interface Point {
  y: number;
}
// 等价于
interface Point {
  x: number;
  y: number;
}
const point: Point = { x: 1, y: 2 };
```

```typescript
// 拓展接口
interface PointX {
  x: number;
}

interface Point extends PointX {
  y: number;
}

const point: Point = {
  x: 1,
  y: 1,
};
```

```typescript
// type拓展
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};

const point: Point = {
  x: 1,
  y: 1,
};
```

```typescript
interface PointX {
  x: number;
}
type Point = PointX & {
  y: number;
};
```

```typescript
interface PointX {
  x: number;
}
type Point = PointX & {
  y: number;
};
```

## 30. 泛型

- `函数名<T>`

```typescript
function identity<T，U>(x: T, y: T): T {
  return {x, y};
}

identity<number, string>(1, 'xps')

```

### 30.1 泛型约束

```typescript
// 正常来说，可以是被传入任意类型，相当于any，但是两者之间只有区别的

// 使用any不报错
function trace(arg: any) {
  console.log(arg.length);
}

// 使用泛型
function trace<T>(arg: T) {
  console.log(arg.length); // 对于泛型会进行类型校验，存在length不存在的可能性，报错
}

// 因此为了代码不报错，需要对泛型约束，描述泛型的范围
// 使用extends
function trace<T extends Sizeable>(arg: T) {
  console.log(arg.length);
}

interface Sizeable {
  length: number;
}
```

## 31. 泛型工具类型

### 1. typeof

- typeof 的主要用途是在类型上下文中获取变量或者属性的类型
- `typeof 变量（注意后面带的是属性或者变量，不是类型）`

```typescript
interface Animal {
  name: string;
}

const animal: Animal = { name: "动物" };

type Person = typeof animal;

// 获取函数类型，并传入
function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]
```

### 2. keyof

- `keyof 类型`
  - keyof 后面不能带变量，因为它是实际值，应该带的类型
  - 因为 TS 允许数字作为字符串索引的键类型。这是因为在 JavaScript 中，对象的属性名实际上是字符串，但可以使用数字作为字符串索引来访问属性
  - 因此在`keyof {[x: string]: string}`的时候，得到的键值类型是`string | number`

```typescript
interface Person {
  name: string;
  age: number;
  methods: {};
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat"...

const k1: K1 = "methods";
const k2: K2 = "length";

// type K3 = number | string
type K3 = keyof { [x: string]: string };

const k3: K3 = 123;

// 为啥K3的类型是字符串和数字？
// 因为TS允许数字作为字符串索引的键类型。这是因为在JavaScript中，对象的属性名实际上是字符串，但可以使用数字作为字符串索引来访问属性
```

- keyof 也可以操作获取基本类型。相当于获取基本类型里默认的属性和方法

```typescript
let K1: keyof boolean; // let K1: "valueOf"
let K2: keyof number; // let K2: "toString" | "toFixed" | "toExponential" | ...
let K3: keyof symbol; // let K1: "valueOf"
```

- 本来 JS 是高度动态的语言，但是在 TS 捕获某些操作的语义比较麻烦

```typescript
function prop(obj: object, key: string) {
  return obj[key];
}

// 编译报错
// object类型表示非基本类型，并且object类型里面没有一个字符串索引签名，也没有定义其他属性和方法
// 因此TS无法确定key是属于obj里的属性，因此TS报错

// 优化：
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

### 3. in

- 遍历枚举类型

```typescript
type Keys = "a" | "b" | "c";

type Obj = {
  [key in Keys]: any;
};
// 等价于

type Obj = {
  a: any;
  b: any;
  c: any;
};
```

### 4. extends 用法总结

- extend 在 TS 中主要两个用法，一个是接口继承和条件判断。

### 5. infer

- TS 中，infer 关键字用于在条件类型中推断类型。
- 常用的格式是`T extend infer U ? U : never`
  - `T extend infer U `是判断条件，例如`T extend <infer U>[]`
  - T 如何数组的格式，那么判断为 true，然后 infer 定义了一个变量 U（用来接收推断出来的结果），T 是数组，然后推断这个数组里的元素类型出来，然后赋值给 U。
  - 如果 U 存在返回 U，不存在 never

```typescript
// 数组中提取类型
type ElementType<T> = T extends (infer U)[] ? U : never;

type ItemType = ElementType<string[]>; // string
type AnotherItemType = ElementType<number[]>; // number
type NotArrayType = ElementType<number>; // never
```

```ts
// 函数中提取类型
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number, y: string) => boolean;

type Result = ReturnTypeOf<Fn>; // boolean
```

```ts
// 函数中提取类型
type ResolvedType<T> = T extends Promise<infer U> ? U : never;

type ResultType = ResolvedType<Promise<number>>; // number
```

### 6. extends

- 类型约束

```ts
// 约束T类型
function hasLength<T extends { length: number }>(item: T): number {
  return item.length;
}
```

- 继承接口或类

```ts
interface Animal {
  name: string;
  move(): void;
}

interface Dog extends Animal {
  bark(): void;
}
```

- 条件类型

```ts
// T 是 U的子类型。返回X，否则Y
T extends U ? X : Y
```

- 用来继承其他类型

### 7. 索引类型 T[K]

```ts
// 根据key拿到对象对应key的值
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K] {}
```

### 8. 映射类型

- 根据旧的类型创建出新的类型, 我们称之为映射类型

```ts
type OptionalTestInterface<T> = {
  [p in keyof T]+?: T[p];
};
```

### 9. partial

- 所有属性转成可选的

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 如果传入的是对象，会递归把对象里的也同样转成可选类型
type DeepPartial<T> = {
  // 如果是 object，则递归类型
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};
```

### 10. Required

- Required 将类型的属性变成必选

```ts
type Required<T> = {
  [P in keyof T]: T[P];
};
```

### 11. Readonly

- `Readonly<T>`的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

```ts
type Readonly<T> = {
  readonly [p in keyof T]: T[p];
};
```

### 12. Pick

- Pick 从某个类型中挑出一些属性出来

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 例子
type TodoPreview = Pick<Todo, "title" | "completed">;
```

### 13. Record

- `Record<K extends keyof any, T>` 的作用是将 `K` 中所有的属性的值转化为 `T` 类型。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 14. ReturnType

- 用来得到一个函数的返回值类型

```ts
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;

// 代码解释
// 1. 先把 type 结构看着这样 type ReturnType<A> = A
// 2. <T extends (...args: any[]) => any>
// 这里约束了 T 的类型必须是 函数类型
// 3. T extends (...args: any[]) => infer R 。T被约束成一个函数，然后infer定义了一个变量 R， 在函数的返回值位置上，所以R代表函数T的返回值。
// 4. 最后 extends，只要T符合extends携带的表达式，那么就返回R，
```

### 15. Exclude

- `Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。

```ts
type Exclude<T, U> = T extends U ? never : T;
```

### 16. Extract

- `Extract<T, U>` 的作用是从 `T` 中提取出 `U`。

```ts
type Extract<T, U> = T extends U ? T : never;
```

### 17. Omit

- `Omit<T, K extends keyof any>` 的作用是使用 `T` 类型中除了 `K` 类型的所有属性，来构造一个新的类型。
- 可以理解成从一个定义好的类型里排除某一个类型，然后得到一个新的类型

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Exclude将K类型从T中排除掉，得到的类型暂称A
// Pick从T中将A的类型挑出来
```

### 18. NonNullable

- `NonNullable<T>` 的作用是用来过滤类型中的 `null` 及 `undefined` 类型。

```ts
type NonNullable<T> = T extendsnull | undefined ? never : T;
```

### 19. Parameters

- `Parameters<T>` 的作用是用于获得函数的参数类型组成的元组类型。
- 事实上就是得到一个数字，里面的类型就是函数传入参数类型的集合。

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// 示例
type A = Parameters<() => void>; // []
type B = Parameters<typeof Array.isArray>; // [any]
type C = Parameters<typeof parseInt>; // [string, (number | undefined)?]
type D = Parameters<typeof Math.max>; // number[]
```

## 面试问题

- 什么是函数重载
- null 和 undefined 是所有类型的子类型。

## 遗留问题

```http
https://juejin.cn/post/7018805943710253086
```
