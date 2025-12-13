let arr=[1,2,3,4];
arr.forEach(function printValue(val){
 console.log(val);
});
let arr1=["Harsh","Raj","Kunal"];
arr1.forEach((val1,idx,arr1)=>{
        console.log(val1.toUpperCase(),idx,arr1);
    })