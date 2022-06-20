var fib = function(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    var arr = fib(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return arr;
  }
};
console.log("Escribe un número");
var num = process.openStdin();

num.addListener("data", function(d) {
    var n = d.toString().trim();
    console.log(fib(n));
  });

