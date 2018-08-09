const obj1 = {
  a: {
    b: {
      c: "cat",
    },
  },
};

const navigateObjectDots = (object, address) => {
  if (address.length === 0) {
    return object;
  }
  const addresses = typeof address === "string" ? address.split(".") : address;
  const currentAddress = addresses.shift();
  const currentObject = object[currentAddress];
  if (currentObject !== undefined) {
    return navigateObjectDots(currentObject, addresses);
  }
  return currentObject;
};

console.log(navigateObjectDots(obj1, "a.b.c"));
console.log(navigateObjectDots(obj1, "a.b.c.2"));
console.log(navigateObjectDots(obj1, "a.b.c.foo"));
console.log(navigateObjectDots(obj1, "a.b.c.foo.bar"));
console.log(navigateObjectDots(obj1, "a"));
