function pipe(...functions) {
    return function (value) {
        return functions.reduce((result, fn) => fn(result), value);
    };
}

function trimName(name) {
    return name.trim();
}

function toLowerCase(name) {
    return name.toLowerCase();
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function addStatus(name) {
    return {
        name: name,
        status: "Available"
    };
}

const processProduct = pipe(
    trimName,
    toLowerCase,
    capitalize,
    addStatus
);

console.log(processProduct("   PIZZA   "));