export function countAndSay(n: number): string {
  return recurse3(1, n);
}

function recurse(i: number, n: number, s: string): string {
  if (i === 1) {
    return recurse(++i, n, "1");
  }

  let newString = "";
  let curChar = s[0];
  let curStreak = 0;

  for (let c = 0; c < s.length; ++c) {
    // Change in character or we hit the last character, record it.
    if (curChar !== s[c] || c === s.length - 1) {
      newString += String(curStreak) + curChar;
      curChar = s[c];
      curStreak = 0;
    } else {
      ++curStreak;
    }
  }

  if (i < n) {
    return recurse(++i, n, newString);
  } else {
    return newString;
  }
}

function recurse2(i: number, n: number, s: string): string {
  if (i === 1) {
    return recurse2(++i, n, "1");
  }

  let newString = "";
  let curChar = s[0];
  let curStreak = 0;

  for (let c = 0; c < s.length; ++c) {
    if (s[c] === curChar) {
      ++curStreak;
    } else {
      newString += String(curStreak) + curChar;
      curStreak = 0;
      curChar = s[c];
    }
  }
  // After the for-loop record the last instance.
  newString += String(curStreak + 1) + curChar;

  if (i < n) {
    return recurse2(++i, n, newString);
  } else {
    return newString;
  }
}

function recurse3(i: number, n: number, s = "1"): string {
  if (i === 1) {
    return recurse3(i + 1, n);
  }
  if (i > n) {
    return s;
  }

  let newString = "";
  let curChar = s[0];
  let curStreak = 0;

  for (let c = 0; c < s.length + 1; ++c) {
    if (c < s.length && s[c] === curChar) {
      ++curStreak;
    } else {
      newString += String(curStreak) + curChar;
      curStreak = 1;
      curChar = s[c];
    }
  }

  return recurse3(i + 1, n, newString);
}
