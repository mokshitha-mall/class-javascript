const defaultDish={
    spiceLevel:"midium",
    portion:"regular"
};
const customerChoice={
    spiceLevel:"extra hot"
};
const mydish= Object.assign({}, defaultDish, customerChoice);
//console.log(mydish); 
// Object.freeze(mydish);
// mydish.spiceLevel="mild";
// console.log(mydish.spiceLevel);
//console.log(Object.keys(mydish));
//console.log(Object.values(mydish));
//console.log(Object.entries(mydish));
//console.log(Object.entries(mydish)[1]);
console.log(mydish.portion);
 
