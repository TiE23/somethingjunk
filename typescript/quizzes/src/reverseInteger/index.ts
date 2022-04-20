export function reverse(x: number): number {
  return numberManip1(x);
}

export function stringManip(x: number): number {
  const result = Math.floor(Number(Math.abs(x).toString().split("").reverse().join(""))) * (x < 0 ? -1 : 1);
  return maxIntCheck(result);
}

export function numberManip1(x: number): number {
  const nums: number[] = [];
  const y = Math.abs(x);
  let firstNonZero = false;

  // Break the number into an array.
  for (let pow = 0; 10 ** pow < 2 ** 31 - 1; ++pow) {
    if (10 ** pow > y) {
      break;  // We're done.
    }
    const newNumber = Math.floor(y % 10 ** (pow + 1) / 10 ** pow);
    if (!firstNonZero && newNumber !== 0) {
      firstNonZero = true;
    }
    if (firstNonZero) {
      nums.push(newNumber);
    }
  }

  let result = 0;
  for (let pow = 0; pow < nums.length; ++pow) {
    result += nums[nums.length - 1 - pow] * 10 ** pow;
  }

  return maxIntCheck(result)* (x < 0 ? -1 : 1);
}

/**
 * Never mind, I don't think this can work.
 * Trying to do number manipulation in place (sorta) without an array.
 */
export function numberManip2(x: number): number {
  const y = Math.abs(x);
  let firstNonZero = false;
  let zeroDiscount = 0;

  let result = 0;

  // Break the number into an array.
  for (let pow = 0; 10 ** pow < 2 ** 31 - 1; ++pow) {
    if (10 ** pow > y) {
      break;  // We're done.
    }
    const newNumber = Math.floor(y % 10 ** (pow + 1) / 10 ** pow);
    if (!firstNonZero && newNumber !== 0) {
      firstNonZero = true;
    }
    if (!firstNonZero) {
      ++zeroDiscount;
    }

    if (firstNonZero) {
      result += newNumber * 10 ** (pow - zeroDiscount);
    }
  }

  return maxIntCheck(result) * (x < 0 ? -1 : 1);
}

function maxIntCheck(x: number): number {
  return (x > (2 ** 31 - 1) || x < -(2 ** 31)) ? 0 : x;
}
