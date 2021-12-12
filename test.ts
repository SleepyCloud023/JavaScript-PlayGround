const check = (x) => Object.keys(x);

const jsonData= require('./testListData.json'); 
console.log(check(jsonData));
console.log(check(jsonData.crates).length);
console.log(check(jsonData.list).length);

console.log(jsonData.crates['664']);