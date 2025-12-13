let fullName="Harsh Tiwari  ";
let course="JavaScript Bootcamp";
//for Removing Clean Spaces with Using Trim() Function
fullName=fullName.trim();
//We Use This Command To Print Details
console.log('Full name : ',fullName);
console.log('Course : ',course);
//we can use toUppercase() And ToLowecase Function to captialze the words
console.log(fullName.toUpperCase());
console.log(fullName.length);
console.log(fullName.slice(0,5));
console.log(`Welcome ${fullName} to The ${course}`);