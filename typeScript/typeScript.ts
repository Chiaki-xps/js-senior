interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat"...

const k1: K1 = 'name';
const k2: K2 = 'length';

type K3 = keyof { [x: string]: Person };

const k3: K3 = 123;
