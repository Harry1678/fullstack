//Drill 01


//____________Process id_______________
// console.log("Process Id : ",process.pid);
// console.log("Node Version : ",process.version);
//_____________________Process.argv()__________

// console.log(process.argv);
// const args=process.argv.slice(2);
// console.log("User Aruguements ",args);

//_____________System Exit()___________

// console.log("Exiting Succesfully");
// process.exit(0);

// console.error("Something went wrong ");
// process.exit(1);

//___________Current Working Directory______
// console.log("Current Working Directory ",process.cwd());

//____________Envoirnment Variables_____________

console.log(process.env);
console.log("NODE_ENV :",process.env.NODE_ENV);


