# Typescript 

## 1. TypeScript 的类型系统有哪些？

- **原始类型**（`boolean`, `number`, `string` 等）
- **复合类型**（数组、元组、对象）
- **特殊类型**（`any`, `unknown`, `void`, `never`）
- **高级类型**（联合、交叉、字面量、类型别名、接口）
- **工具类型**（`Partial`, `Pick`, 等）
- **泛型**（类型参数化）
- **自定义类型**（类、枚举）

## 2. unknown

+ 任意值都可以赋值类型为 unkonwn，意味着未知，在我们使用的时候，就需要进行类型检查，再进行使用。从而显著提高代码的类型安全性，是处理未知类型时比 `any` 更好的选择

+ `unknown` 类型是一种强类型，它需要进行类型检查才能进行操作

## 3. never

+ `never` 是 TypeScript 中表示 **永远不会发生** 的类型

  + 它代表程序流程中不可能存在的状态或永远不会返回的函数的返回值类型，不会正常结束的操作

  + 理解 `never` 的关键在于：**它表示代码的最终状态，而不是值的缺失或未知**。

+ **核心意义：**

1. **不可能的值**
   表示永远不可能被观察到的值，通常出现在：

   + 永不返回的函数

   - 抛出错误的函数
   - 死循环函数
   - 类型收窄后不可能出现的分支

2. **类型系统的底层类型**

   - **所有类型的子类型（可赋值给任何类型）**
   - 除 `never` 自身外，没有类型可赋值给 `never`（需用类型断言强制）（**任意类型不能直接赋值给 `never` 类型**，但 `never` 类型可以赋值给任意其他类型）
   - never类型可以赋值给never类型

+ **抛出错误的函数**：

**throw 语句本身具有 never 类型**，对于函数是没有返回，所以返回类型为never（没有返回结果，抛出错误，本身就是一种类型，就叫never）

```js
function fail(): never {
  throw new Error("error");
}
const c: never = fail();
```

+ **无限循环**：

```js
function loop(): never {
  while (true) {}
}
```

+ **类型收窄到不可能分支**：

```js
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): undefined {
  switch (shape) {
    case "circle": 
      return /* ... */;
    case "square": 
      return /* ... */;
    case "triangle":
      return /* ... */;
    default:
      // 此时 shape 类型被收窄为 never
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck; // 确保编译时报错
  }
}

function check(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    // x 此时是 never 类型
    const d: never = x; // ✅
  }
}
```

+ 一般**抛出错误的函数**使用 `never`作为返回类型，对于如果只是可能抛出错误的函数，一般使用返回实际类型（nerved是所有类型的子类型）

```ts
type T = string | never // striing
type U = string & never // never
```

+ **`never` 与其他类型的比较**

|       特性       |           `void`           |            `never`             |         `any`         |
| :--------------: | :------------------------: | :----------------------------: | :-------------------: |
|     **表示**     |   无返回值（但正常结束）   | 永不返回值（代码无法继续执行） |        任意值         |
|   **可赋值性**   | 可赋值给其他类型（需忽略） |    只能赋值给 `never` 类型     | 可赋值给/接受任何类型 |
| **典型使用场景** |       无返回值的函数       |    抛出异常的函数、穷尽检查    |     跳过类型检查      |

+ 没有返回值的函数，实际上返回的是 undefined。

+ **价值：**
  1. **代码安全** - 确保所有分支和情况都被处理
     + never的意义在于处理一些不可能存在的值，或者错误场景，避免错误赋值等
     + 用于穷尽检查。
  2. **意图传达** - 明确表示"此路不通"的代码路径
     + 处理不该发生的场景
  3. **类型纯度** - 在类型系统中表示逻辑不可能性
  4. **工具构建** - 创建健壮的类型实用工具

## 4. interface和type的区别？

+ 本质上也不是一个东西，一个接口，一个是类型别名。
+ `interface` 专门用于描述对象的形状（属性、方法等），而 `type` 是创建任意类型别名的通用工具，具备更广泛的能力。
+ 使用上也有一些区别，interface支持同名接口合并，但是type不支持重复申明，接口通过extends继承的方式拓展，type通过交叉类型&拓展。类型别名也可以是对象
+ 习惯上用interface描述对象，或者需要拓展性的代码（库的类型定义）
+ type适合给联合类型、元素、定义函数类型签名
+ 虽然interface有自己独有的特点，但是type如果是对象也能覆盖，只是在使用的时候，我们更参照开发时的直觉。

+ 区别：

| 特性                       | `interface`              | `type`                         |
| :------------------------- | :----------------------- | :----------------------------- |
| **声明合并**               | 同名接口自动合并         | ❌ 不允许重复声明               |
| **扩展方式**               | `extends` 关键字         | `&` 交叉类型                   |
| **实现类**                 | ✅ 可直接实现             | ❌ 需要对象类型                 |
| **描述范围**               | 仅对象类型               | 任意类型（原始、联合、元组等） |
| **函数类型**               | 可通过属性语法或调用签名 | 直接定义函数类型               |
| **映射类型**               | 仅可在对象内部           | ✅ 完整支持                     |
| **工具类型**               | ❌ 不直接支持             | ✅ 完整支持                     |
| **计算属性**               | 需对象包裹               | ✅ 直接支持                     |
| 定义联合/元组/原始类型别名 | ❌                        | ✅                              |

+ 定义函数类型签名，推荐使用type

## 5. 什么是类型签名（Type Signature）？

**类型签名**（Type Signature）是描述函数或方法的输入参数类型和返回值类型的规范。它定义了函数的"形状"——即函数接受什么类型的参数以及返回什么类型的值。

```ts
// 类型签名
(参数1类型, 参数2类型, ...) => 返回值类型
```

## 6. ts高级类型（工具类型）

|     工具类型     |     描述     |               示例                |
| :--------------: | :----------: | :-------------------------------: |
|   `Partial<T>`   | 所有属性可选 |          `Partial<User>`          |
|  `Required<T>`   | 所有属性必填 |      `Required<PartialUser>`      |
|  `Readonly<T>`   | 所有属性只读 |         `Readonly<User>`          |
|  `Record<K,T>`   |   键值映射   |     `Record<string, number>`      |
|   `Pick<T,K>`    |   选择属性   |       `Pick<User, 'name'>`        |
|   `Omit<T,K>`    |   排除属性   |        `Omit<User, 'id'>`         |
| `Parameters<T>`  |   函数参数   | `Parameters<(s: string) => void>` |
| `ReturnType<T>`  |   函数返回   |    `ReturnType<() => string>`     |
|   `Awaited<T>`   | Promise 解析 |     `Awaited<Promise<User>>`      |
|  `Exclude<T,U>`  | 排除联合成员 |           `Exclude<'a'            |
|  `Extract<T,U>`  | 提取联合成员 |           `Extract<'a'            |
| `NonNullable<T>` |   排除空值   |        `NonNullable<string        |

### 模板字符串工具

```js
type T3 = Uppercase<'hello'>;    // 'HELLO'
type T4 = Lowercase<'WORLD'>;     // 'world'
type T5 = Capitalize<'typescript'>;  // 'Typescript'
type T6 = Uncapitalize<'TypeScript'>; // 'typeScript'
```

## 7. TypeScript 类型操作

|  **操作类型**  |   **主要操作符**    | **典型应用场景** |
| :------------: | :-----------------: | :--------------: |
|  **查询访问**  | keyof, typeof, T[K] | 获取对象结构信息 |
|  **类型创建**  | in keyof, as, infer |   构建新的类型   |
|  **条件逻辑**  |  extends ?, infer   |   类型条件判断   |
| **字符串操作** | `${T}`, Uppercase等 | 字符串字面量操作 |
| **修饰符操作** |   readonly, ?, -    |   改变属性特征   |
|  **类型组合**  |                     |       , &        |
|  **类型断言**  |        as, !        |  开发者指定类型  |
|  **递归处理**  |      递归调用       |   处理嵌套结构   |

+ #### `keyof` （键查询）

  + 获取对象类型所有键名的联合类型

+ #### `typeof` - 类型查询

+ #### 索引访问 `T[K]` - 属性访问

+ #### `in` - 遍历枚举类型

+ #### `as` - 类型断言

+ #### `infer` - 类型推断

## 8. ts 类型断言 as，ES6 重命名 as

类型断言`as` 关键字的主要作用是：

1. **覆盖 TypeScript 的类型推断**
2. **告诉编译器你比它更了解某个值的类型**
3. **在类型检查无法覆盖的场景提供类型信息**

```ts
let value: any = "hello world";
let strLength: number = (value as string).length; // 断言 value 是 string 类型
```

ES6中也有 as 作为重命名关键字，在ts类型遍历的时候也可以用

```js
import {Button as btn} from 'xxx'

export { 
  a as b,
  c as d
};
```

```ts
type Getters<T> = {
  [P in keyof T as `get${<string & P>}`]: () => T[P]
};
```

## 9. 装饰器

+ 装饰器本质上就是一个函数
+ 和装饰器模式差不多，给描述的对象，方法、属性进行描述

# 单词

+ #### part：部分

+ #### Partial：部分的

+ #### record：记录、记载

+ #### Omit：忽略

+ #### parameters：参数

+ #### extract：提取

