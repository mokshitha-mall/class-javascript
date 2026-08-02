const fields = [
    { name: "email", value: "a@b.com", valid: true },
    { name: "age", value: 0, valid: true },
    { name: "password", value: "", valid: false },
];

// 1. Check if form can be submitted
const canSubmit = fields.every(({ valid }) => valid);
console.log("Can Submit:", canSubmit);

// Check if there are any errors
const hasErrors = fields.some(({ valid }) => !valid);
console.log("Has Errors:", hasErrors);

// Find the first invalid field
const firstInvalid = fields.find(({ valid }) => !valid);
console.log("First Invalid:", firstInvalid);

// Destructure name and value while logging
if (firstInvalid) {
    const { name, value } = firstInvalid;
    console.log("Field Name:", name);
    console.log("Field Value:", value);
}

//2. Naive check using value

const wrongCheck = fields.every(({ value }) => value);
console.log("Naive Check:", wrongCheck);

//0 is a falsy value in JavaScript. So age (0) is treated as false even though it is valid. Use the valid property instead.
const correctCheck = fields.every(({ valid }) => valid);
console.log("Correct Check:", correctCheck);

//3. Get the first invalid field name in one line

const { name: firstInvalidName } = fields.find(({ valid }) => !valid) || {};
console.log("First Invalid Field Name:", firstInvalidName);

//4. Build summary object

const summary = {
    canSubmit: fields.every(({ valid }) => valid),

    invalidFieldNames: fields
        .filter(({ valid }) => !valid)
        .map(({ name }) => name)
};

console.log("Summary:", summary);