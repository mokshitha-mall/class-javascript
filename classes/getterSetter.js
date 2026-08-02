class car{
    constructor(brand){
        this.brand=brand;
        this._speed=0; //actual stored value
    }
    //setterv -> runs when assigning a value
    set speed(value){
        if(value<0 || value>120) {
            console.log("x speed must be between 0 and 120");
        }
        if(typeof value !== "number")
        {
            console.log("x speed must be a number");
            return;
        }
        this._speed=value;
    }
    //Getter -> runs when reading a value
    get speed() {
        return this.speed;
    }
}





const car = new car("BMW");
console.log(car)
car.speed=120;
console.log(car.speed);
car._speed="160"



