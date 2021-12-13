// 문자열을 받아서 카멜케이스 컨벤션 형식으로 변환하는 함수 작성

let myName = 'kim tae hyeong';

const camelCase = (originString) => {
    return originString.split(' ')
    .map((token, wi)=>{
        
        return (wi > 0 ? token[0].toUpperCase() : token[0].toLowerCase()) + String(token.substring(1,)).toLowerCase(); 
    })
    .join("");
};

const anotherCamel = (text, splitter = ' ') => text.split(splitter)
                    .map((word, wi) => word.split('')
                        .map((char, ci) => (wi > 0 && ci === 0) ? char.toUpperCase() : char.toLowerCase())
                        .join(''))
                    .join('');


const camelName = camelCase(myName);
// const camelName2 = anotherCamel(myName);

console.log(camelName);
// console.log(camelName2);

