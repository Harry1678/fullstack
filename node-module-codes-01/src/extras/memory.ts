const memory=process.memoryUsage();
console.table({
    rss:memory.rss,
    heapTotal:memory.heapTotal,
    heapUsed:memory.heapUsed,
    external:memory.external,
});
