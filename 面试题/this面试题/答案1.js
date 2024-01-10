var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  sss();                    // window / undefined
  person.sayName();         // person
  (person.sayName)();       // person
  (b = person.sayName)();   // window / undefined
}
sayName();