import {isEqual} from 'lodash'

const columns = ['a', 'b', 'c', 'd', 'e'];

const sourceObject = Array(5)
                .fill(0)
                .map((x, index) => ({[columns[index]]: index}))
                .reduce((a,b) => ({...a, ...b}));

const targetObject = Array(columns.length)
                .fill(0)
                .map((x, index) => ({[columns[columns.length-index-1]]: columns.length-index-1}))
                .reduce((a,b) => ({...a, ...b}));

console.log(sourceObject);
console.log(targetObject);

// 1) only correct when the orders of two array are same 
const jsonEqual = (src, dst) => (JSON.stringify(src) == JSON.stringify(dst));
console.log(jsonEqual(sourceObject, targetObject));

// 2) Always correct: lodash library
console.log(isEqual(sourceObject, targetObject));

// 3) Always correct: recursive implementation
function deepEqual(src, dst) {
    const isObject = (props) => (typeof props == "object" && props != null);
    // If src is object and dst is non-object, this condition returns true
    // Except the case src object is empty 
    if (Object.keys(src).length !== Object.keys(dst).length) return false;
    if (!isObject(src) || !isObject(dst)){
        return src === dst;
    }

    for(const key in src) {
        const [srcElement, dstElement] = [src[key], dst[key]]; 
        if (!(key in dst)) return false;
        if (isObject(srcElement)){
            if (!deepEqual(srcElement, dstElement)) return false;
        }
        else {
            if (srcElement !== dstElement) return false;
        }
    }
    return true;
}

console.log(deepEqual(sourceObject, targetObject));

// 1) Empty Case 
let [src, dst] = [{}, {}];
let result = deepEqual(src, dst);
console.log(result);

// 2) Empty & falsy value
[src, dst] = [{name: {}}, {name: 0}];
result = deepEqual(src, dst);
console.log(result);

// 3) Falsy values
[src, dst] = [{name: ""}, {name: 0}];
result = deepEqual(src, dst);

// 4) Nested
src = { name: "Judy", work: { company: "zootopia", since: { year: 2017, month: 1, day: 1 }, }, }; 
dst = { name: "Judy", work: { company: "zootopia", since: { year: 2017, month: 1, day: 1 }, }, };
result = deepEqual(src, dst);
console.log(result);

