class Car{
    constructor(brand){
        this.brand=brand;
        this.color="white";
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
        return this._speed;
    }
    set color(value){
        if(typeof value == "pink"  || value == "red"){
            console.log("color could not be pink and red");
            return;
        }
        if(typeof value !== "string"){
            console.log("color must not be a string");
            return;
        }
        this._color=value;
    }
    get color(){
        return this._color;
    }
}

const car = new Car("BMW");
console.log(car)
car.speed=120;
console.log(car.speed);
car.color="green";
console.log(car.color)
