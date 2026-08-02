const deeplyNested = [1, [2, 3, [4, 5, [6, 7]]]];
const words = ["hello world", "  javascript  rocks", "flat map fun"];
// 1. flat() without any argument
const partialFlat = deeplyNested.flat();
console.log("Partial Flat:", partialFlat);
/*
flat() removes only one level of nesting. Default depth is 1. So some nested arrays still remain.
*/
// 2. Flatten all levels
const fullyFlat = deeplyNested.flat(Infinity);
console.log("Fully Flat:", fullyFlat);
/*
Infinity removes all nested arrays, no matter how deep they are.
*/
// 3. Using flatMap()
const allWords = words.flatMap(word =>
    word.trim().toLowerCase().split(/\s+/)
);
console.log("All Words:", allWords);
/*
flatMap() splits each sentence into words and joins them into one array.
It works here because split() creates only one level of arrays.
It is not enough for deeplyNested because that array has many nested levels.
*/
// 4. Difference between flatMap() and map().flat()
/*
flatMap(fn) = map(fn).flat(1)
Both give the same result for one level.
flatMap() is faster because it does mapping
and flattening together.*/