function explodeBits(flags) {
  let flagsCopy = flags;
  const bits = [];

  let bit = 1;
  while (flagsCopy > 0) {
    if (flagsCopy & bit) {
      bits.push(bit);
      flagsCopy &= ~bit;
    }
    bit = bit << 1;
  }

  return bits;
}


console.log(explodeBits(0));
console.log(explodeBits(1));
console.log(explodeBits(2));
console.log(explodeBits(3));
console.log(explodeBits(4));
console.log(explodeBits(5));
console.log(explodeBits(6));
console.log(explodeBits(7));
console.log(explodeBits(8));
