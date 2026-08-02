class Car{
    constructor(brand){
        this.brand=brand;
    }
    start() {
        console.log('stock available');
    }
    stop() {
        console.log('stock not available');
    }
}
const c = new Car("Toyota");
//console.log(c)
//c.stop()
class Toyota extends Car {
    constructor(){
        super("Toyota");
    }
}
const t= new Toyota();
t.start();
t.stop();
