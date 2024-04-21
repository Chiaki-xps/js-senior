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
let str: string = 'string';
let num: number = 1;
let bool: boolean = true;
let u: undefined = undefined;
let n: null = null;
let obj: object = { name: 'chiaki' };
let big: bigint = 100n;
let sym: symbol = Symbol('me');
```

## 3. null和undefined是所有类型的子类型

+ 在`tsconfig.json`中设置`strictNullChecks":true`。这样null和undefined才可以作为子类型被使用。

```typescript
let num: number = null;

let isFlag: boolean = true;
isFlag = null;
isFlag = undefined;
```

## 4. number和bigint的不兼容

```typescript
let num: number = 100;
let big: bigint = 100n;

big = num; // 报错
num = big; // 报错
```

## 5. 定义数组

```typescript
let arr: string[] = ['1', '2', '3'];
let arr1: number[] = [1, 2, 3];

let arr3: Array<string> = ['1', '2', '3'];

let arr4: (string | number)[] = ['1', 2];
```

##  6. 函数

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
let mySun: (num1: number, num2: number) => number = function (x, y) {
  return x + y;
};
/**
 * 可以理解成，类型约束的格式是
 * (num1: number, num2: number) => number
 * 后面的等于号则是负值ß
 */

// 可选参数,可选参数后面不能再出现其他必选参数
function myName(name?: string) {
  return name;
}

// 参数默认值
function myName1(name: string = 'chiaki') {
  return name;
}

// 剩余参数，ES6的剩余参数是一个数组
function foo1(num: number, ...argNums: number[]) {}
```

### 6. 函数重载

+ 函数重载：在一个作用域里定义了多个相同函数名的函数。要求函数的参数的个数或者类型不相同。引擎会根据参数个数类型等，选择正确的函数。

+ js引擎并没有实现函数重载。但是ts有对应的实现。

```typescript
type Types = number | string;
function add(x: string, y: string): string;
function add(x: Types, y: Types) {
  if (typeof x === 'string' || typeof y === 'string') {
    return x.toString() + y.toString();
  }
  return x + y;
}
```

+ 类型约束，会导致原本js默认转化会变成警告，一般字符串也是可以相加，但是ts中字符串不能使用，导致增加了一些代码量，失去一些灵活性。

## 7. Tuple（元组）

+ 元组的作用就是限制数组元素的个数和类型。意味着元组类型个数，和每个元素的类型都是确定的

```typescript
let arr: [number, string] = [1, 'xps'];

arr = [1, 2] // Error
arr = [1] // 目标两个元素
```

+ **可选类型：**在类型后面加个`?`表示可选元素

```typescript
let arr: [number, string?] = [1, 'xps'];

arr = [1]; // 正确
arr = [2, 'chiaki'] // 正确
arr = [2, 3] // Error
```

+ **剩余参数：**剩余元素语法`...arg`，此时`arg`是数组类型

```typescript
const arr: [number, ...string[]] = [1, 'a', 'b'];
```

+ **只读元组：**`readonly`

```typescript
const arr: readonly number[] = [1, 2, 3];

arr[0] = 2; // 智能读，不能修改
```

## void

void表示没有类型，严格模式下，不能给任何类型赋值（null、undefined）。主要应用场景还是表示函数的返回值，表示没有返回值（即返回值为undefined）。

```typescript
function foo(): void {}
foo();

function bar(): undefined {}
bar();
```

## never

+ never类型表示的




```typescript

```