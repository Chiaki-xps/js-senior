// 面试题,不通过中间变量交换数据
a = 10;
b = 11;
a = a^b;
b = b^a;
a = a^b;
console.log(a,b)