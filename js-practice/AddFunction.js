// const add=(num1,num2) => {
//    return num1+num2;
// }
// const mul=(num1,num2)=>{
//     return num1*num2;
// }
// let sum=add(3,4);
// let prod=mul(2,4);
// console.log(sum);
// console.log(prod);
const isPrime=(num1) =>{
    let den=2;
    while(den<=num1/2){
        if(num1%den==0){
            break;
        }
        den++;

    }
    if(den>num1/2){
        console.log(num1," Is prime");
    }
    else{
        console.log(num1," Is Not prime");
    }
}
isPrime(5);