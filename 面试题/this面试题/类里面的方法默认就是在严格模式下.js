class App {
  foo() {
    console.log('this', this)
  }
}

// ew 操作符用于创建对象实例时，会执行构造函数中的代码，并且使得构造函数中的 this 关键字指向新创建的对象。
// 空对象的原型指向构造函数的原型
const app = new App()
app.foo()             // 隐式调用 App {}

const app1 = new App()
app1.foo()             // 隐式调用 App {}

const foo = app.foo
foo()                 // 默认调用 类的方法默认在严格模式下  undefined

