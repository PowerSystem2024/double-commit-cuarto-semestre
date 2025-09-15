console.log("inicio programa");
setTimeout(() => {
    console.log("Primer timeout");
}, 3000);

setTimeout(() => {
    console.log("segundo timeout");
}, 0);

setTimeout(() => {
    console.log("tercero timeout");
}, 0);

console.log("fin programa");