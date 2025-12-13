//Sum of an array
let arr=[1,4,5,6,9];
let output=arr.reduce((res,curr)=>{
    return res+curr;
});
console.log(output);
//Largest of Number
let largest=arr.reduce((prev,curr) => {
    return prev>curr?prev:curr;
});
console.log(largest);
//Product Of an Array
let prod=arr.reduce((prev,curr) =>{
    return prev*curr;
});
console.log(prod);