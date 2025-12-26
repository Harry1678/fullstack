//It is Very Dangerous To Handle it Will Give A system crash based on node version
// Promise.reject(new Error("DB Connection Failed"))
// console.log("Api Still Running.....")

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection caught:", reason);
  process.exit(1);
});

Promise.reject(new Error("DB connection failed"));
