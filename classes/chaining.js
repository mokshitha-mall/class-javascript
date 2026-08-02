//plain java script
console.log("======Student Details=======");
//API
function getStudent(){
    return new Promise((resolve) => {
        setTimeout(() => resolve({id:101}),1000);
    });
}
//API 2
function getMarks(studentId){
    return new Promise((resolve) => {
        setTimeout(() => resolve({marks:95}),1000);
    });

}
//API Chaining
getStudent()
.then((student) => {
    console.log("Student Found");
    console.log(student);
    return getMarks(student);
})
.then((marks) => {
    console.log("Marks Found");
    console.log(marks);
})
.catch((error) => {
    console.log("Error:",error.message);
})
.finally(() => {
    console.log("Process Completed");
});