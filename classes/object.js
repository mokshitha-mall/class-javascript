console.log("\n=====single dish object=====");
console.log("Use when you need one object,right now.\n");
{
    const dish =  { name:"Pasta", price:250 };
    console.log(dish);
}


console.log("\n====factor function ======");
console.log("Use when you need many objects, build the simple way\n");
{
   function createDish(name,price)
   {
       return{name,price};
   }
   const dishType=[
       ["Pizza",250],
       ["Burger",150],
       ["Noodles",100],
   ];
   const alldishes=dishType.map(([dish,type])=> createDish(dish,type));
   console.log(alldishes);

}


console.log("\n====3.construction function ======");
console.log("Use when you need many objects, build the new\n");
{
   function createdish(name,price)
   {
       this.name=name;
       this.price=price;
   }
   const dishType=[
       ["Pizza",250],
       ["Burger",150],
       ["Noodles",100],
   ];
   const alldishes=dishType.map(([dish,type])=> new createdish(dish,type));
   console.log(alldishes);

}


console.log("\n====4.ES6 class ======");
console.log("Use when same as constructor function, but clear syntax.\n");
{
    class createdish{
        constructor (name,price)
        {
            this.name=name;
            this.price=price;
        }
    }
    
    const dishType=[
       ["Pizza",250],
        ["Burger",150],
        ["Noodles",100],
    ];
    const alldishes=dishType.map(([dish,type])=> new createdish(dish,type));
    console.log(alldishes);

}





