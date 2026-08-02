// setInterval(() => {
//     console.log("Station Announsment : Train is running....");
// },2000);

// setTimeout(() => {
//     console.log("Signal Turn Green: Train dispatch....");
// },1000);

// Promise.resolve("Chennai Parcel")
// .then((parcel => {
//     console.log("station 1 received:",parcel);
//     console.log("parcel destination changed to banglore");
//     return "Banglore Parcel";
// }))
// .then((parcel => {
//     console.log("station 2 received:",parcel);
//     console.log("repair the parcel");
//     throw new Error("getting delayed")
// })) 
// .catch((error) =>{
//     console.log("repair",error.message);
// })
// .finally(()=> {
//     console.log("successfully deliverd");
// })


console.log("Enter Restarant");
setInterval(() => {
    console.log("Time Intervel of pizza");
},1000);
setTimeout(() => {
    console.log("weiter comes to customer to take order");
},2000);
Promise.resolve("Pizza")
.then((item => {
    console.log("Chef pick Order",item);
    console.log("sessoings are changed to chees to vegies");
    return "Vegie Pizza";

}))
.then((item => {
    console.log("Changed the pizza to vegie",pizza);
    console.log("changing the session");
    throw new Error("getting delayed")
}))
.catch((error) =>{
    console.log("repair",error.message);
})
.finally(()=> {
    console.log("successfully deliverd Pizza");
})
