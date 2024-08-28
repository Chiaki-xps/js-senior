interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let Sen: Person = {
  name: 'sen',
  age: 18,
};

let Sen2: Person = {
  name: 'sen',
  age: 18,
  height: 180,
  sex: 'man',
};
