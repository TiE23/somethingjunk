
const basicGet = (cb, resource) => {
  fetch(`https://jsonplaceholder.typicode.com/${resource}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`Request rejected with status ${res.status}.`);
      }
    })
    .then(json => cb(json, null))
    .catch(error => cb(null, error));
};

export default {
  basicGet,
};
