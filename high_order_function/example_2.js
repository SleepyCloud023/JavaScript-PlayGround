const sourceObject = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
};

const targetObject = {
    aGroup: {
        a: 1,
        b: 2,
    },
    bGroup: {
        c: 3,
        d: 4,
        e: 5,
    }
};

const groupInfo = {
    aGroup: ['a', 'b'],
    bGroup: ['c', 'd', 'e'],
};

// sourceObject, groupInfo를 입력받아 그룹을 속성으로 하는 오브젝트로 변환

makeGroups = (source, group) => {
    // 애로우 함수에서 객체를 단축된 형식으로 사용하려면 괄호로 묶어주면 된다.
    // 기존: const merge = (a, b) => {return {...a, ...b}};
    // 변경:
    const merge = (a, b) => ({...a, ...b});
    return Object.keys(group)
                    .map((groupName) => 
                    ({[groupName]: group[groupName]
                                    .map((member) => ({[member]: source[member]}))
                                    .reduce(merge)
                    })
                ).reduce(merge);
};

const myResult = makeGroups(sourceObject, groupInfo);
console.log(myResult);


const keys = Object.keys(sourceObject);
const values = Object.values(sourceObject);
const entries = Object.entries(sourceObject);

console.log(keys);
console.log(values);
console.log(entries);

const myEntries = (keys.map((x, xi) => {
    return [x, values[xi]];
}));

console.log(typeof myEntries, myEntries);
console.log(typeof entries, entries);

// why?
console.log(myEntries == entries);

const stringSource = JSON.stringify(entries);
const stringTarget = JSON.stringify(myEntries);

console.log(stringSource);
console.log(stringTarget);
console.log(typeof stringTarget);

console.log(stringSource === stringTarget);


// Lodash 라이브러리를 알아보자
// 라이브러리를 사용하기 전에 Deep Equals 코드를 작성해보고 라이브러리 내부 코드 살펴보기