function countDigits(value) {
  if (value === 0) return { wholePlaces: 0, decimalPlaces: 0 };

  var absValue = Math.abs(value); // -15.555 becomes 15.555
  var wholePlaces = 0;
  for (; wholePlaces <= 308; ++wholePlaces) { // Number.MAX_VALUE is 1.798e+308
    if (absValue < Math.pow(10, wholePlaces))
      break;
  }

  var decimalValue = absValue - Math.floor(absValue); // 15.555 - 15 = 0.555
  var decimalPlaces = 0;
  for (; decimalPlaces >= -323; --decimalPlaces) { // Number.MIN_VALUE is 5e-324
    var temp = (decimalValue / Math.pow(10, decimalPlaces)) + 0.09; // Adding 0.09 to counter float errors
    if (temp - Math.floor(temp) < 0.1)  // If the decimal remaining is smaller that 0.1, we've reached the end
      break;
  }
  decimalPlaces = Math.abs(decimalPlaces);
  console.log(value, {wholePlaces, decimalPlaces});
  return {
    wholePlaces,
    decimalPlaces,
  }
}

countDigits(0);         // { wholePlaces: 0, decimalPlaces: 0 }
countDigits(0.10);      // { wholePlaces: 0, decimalPlaces: 1 }
countDigits(-0.10);     // { wholePlaces: 0, decimalPlaces: 1 }
countDigits(0.10000);   // { wholePlaces: 0, decimalPlaces: 1 }
countDigits(-0.10000);  // { wholePlaces: 0, decimalPlaces: 1 }
countDigits(5);         // { wholePlaces: 1, decimalPlaces: 0 }
countDigits(-5);        // { wholePlaces: 1, decimalPlaces: 0 }
countDigits(15.555);    // { wholePlaces: 2, decimalPlaces: 3 }
countDigits(-15.555);   // { wholePlaces: 2, decimalPlaces: 3 }
countDigits(215.555);   // { wholePlaces: 3, decimalPlaces: 3 }
countDigits(-215.555);  // { wholePlaces: 3, decimalPlaces: 3 }
countDigits(1.55555e+4) // { wholePlaces: 5, decimalPlaces: 1 } (15555.5)

