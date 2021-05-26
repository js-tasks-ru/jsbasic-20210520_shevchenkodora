function factorial(n) {
  let sum = 1;
  for (let i = n; i >= 1; i--) {
    sum *= i;
  }
  if (n === 0 || n === 1) {
   return 1;
  }
  return sum;
}
