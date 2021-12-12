function closure_foo(){
    let energy = 0;
    return (booster = 0) => {
        if (booster){
            energy += booster;
        }
        else{
            energy++;
        }
        return energy;
    }; 
}

function* generator_foo(){
    let energy = 1;
    while(true){
        const booster = yield energy;
        console.log(booster);

        if(booster){
            energy += booster;
        }
        else{
            energy++;
        }
    }
}

// const energy_accumulator_1 = closure_foo();

// for (let i = 0; i < 5; i++) {
//     console.log(energy_accumulator_1());
// }
// console.log(energy_accumulator_1(5));

const energy_accumulator_2 = generator_foo();

for (let i = 0; i < 5; i++) {
    console.log(energy_accumulator_2.next());
}
console.log(energy_accumulator_2.next(5));