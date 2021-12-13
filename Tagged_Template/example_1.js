const userName = "kim tae hyeong";
const bolder = text => `<b>${text}</b>`;
const funcInTemplate = (text) => {
    return `Any expressions can go between parenthesis! 
        ${((x) => x+1)(text)}`;
};

const functionCallInTemplate = (text) => {
    return `Any expressions can go between parenthesis! ${bolder(text)}`
};

// console.log(bolder(userName));
// console.log(funcInTemplate); // [lambda: funcInTemplate] 함수 그 자체가 출력된다. 함수는 반환값으로 계산될 수 있으므로.
console.log(funcInTemplate(5));
// console.log(bolder());

const [first, second, third] = ['Pet', 'Wallet', 'Phone'];

let templateStrings = `
first segment is ${first}
second segment is ${second}
third segment is ${third}
`;

function analyzeTemplate(strings, ...fns) {
    // console.log(strings);
    console.log(fns);
    return {strings, fns};
}

const result = analyzeTemplate`
first segment is ${first}
second segment is ${second}
third segment is ${third}
`;

console.log(result.strings);