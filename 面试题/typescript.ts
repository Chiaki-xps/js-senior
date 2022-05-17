interface vector3 {
  x: number;
  y: number;
  z: number;
}

function getComponent(vector: vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}
