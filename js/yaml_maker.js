// Escape reserved words used to indicate boolean values.
// See https://yaml.org/type/bool.html
const _escapeReservedWords = (input) => {
  if (input === null) {
    return '';
  }
  if (typeof input === 'string') {
    const reserved = ['y', 'yes', 'n', 'no', 'true', 'false', 'on', 'off', 'null'];
    if (input.trim() === '' || reserved.includes(input.toLowerCase())) {
      return `'${input}'`;
    }
  }
  return input;
};

const _isObject = obj => {
  if (obj === null) {
    return false;
  }
  return obj.constructor.name === 'Object';
};


const _yamlBuildDict = (obj, initialIndentLevel, keepEmpties = true) => {
  const lines = [];

  // Recursive function uses "lines" and "path" arrays to construct the lines
  // of the YAML output. lines is pretty obvious, but path acts as a buffer
  // that tracks the levels the algorithm decends, and the path is only
  // finally added if a leaf is found.
  (function fn(obj, indentLevel, path = [], listLevel = 0) {
    const normalIndent = '  '.repeat(indentLevel);
    const listIndent = '  '.repeat(Math.max(indentLevel - listLevel, 0)) + '- '.repeat(Math.max(listLevel, 1));
    let indent = listLevel > 0 ? listIndent: normalIndent;

    for (const key in obj) {
      if (!keepEmpties && obj[key] === null) {
        continue; // Ignore null values.
      }

      // Array element.
      if (Array.isArray(obj[key])) {
        if (!keepEmpties && !obj[key].length) {
          continue; // Ignore empty arrays.
        }

        // Basic string or number list ([] notation).
        if (key !== '-' && obj[key].every(item => typeof item === 'string' || typeof item === 'number')) {
          lines.push(
            ...path,
            `${indent}${key}: [${obj[key]
              .map(value => _escapeReservedWords(value))
              .join(', ')}]`,
          );
        } else {  // Mixed list (- notation).
          if (key !== '-') {
            path.push(`${indent}${key}:`);
          }
          // Loop through this array, handling different types found within.
          obj[key].forEach((item, index) => {
            if (_isObject(item)) {
              fn(item, indentLevel + 1, path, 1);
            } else if (Array.isArray(item)) {
              // Make an artificial object for this array element.
              fn({'-': item}, indentLevel + 1, path, index === 0 ? listLevel + 1 : 1);
            } else if (item !== null || keepEmpties) {
              lines.push(
                ...path,
                `${
                  index === 0 && listLevel > 0 ? listIndent : normalIndent
                }- ${_escapeReservedWords(item)}`,
              );

              // Clear out path, we've added it to lines.
              if (path.length > 0) {
                path.splice(0, path.length);
              }
            }
          });
        }

      // Dictionary element.
      } else if (_isObject(obj[key])) {

        // Handle empty objects.
        if (keepEmpties && Object.entries(obj[key]).length === 0) {
          path.push(`${indent}${key}: {}`);
          lines.push(...path);
        } else {
          path.push(`${indent}${key}:`);
          fn(obj[key], indentLevel + 1, path);
        }

      // Leaf element.
      } else {
        lines.push(
          ...path,
          `${indent}${key}: ${_escapeReservedWords(obj[key])}`,
        );
      }

      // Empty the path array, this recursive branch has reached its end.
      if (indentLevel > 0) {
        path.splice(0, indentLevel);
      }

      indent = normalIndent;
    }
  })(obj, initialIndentLevel);

  return lines;
};

// Using www.json2yaml.com to check my work (that's why I double quote everything)
// Ignores empty arrays
const sample01 = {
  "name": "Kyle G",
  "age": 29,
  "alive": "yes",
  "long": {
    "chain": {
      "of": {
        "items": ["a", "b", "c"]
      }
    }
  },
  "letterList": ["a", "b", "c"],
  "numberList": [0, 1, 2],
  "bigNest0": [[[0]]],
  "bigNest1": [[[[0]]]],
  "bigNest2": [[[1, 2]]],
  "bigNest3": [0, [1, [2, [3, 4]]]],
  "bigNest4": [{"a": "apple"}, 0, [1, [2, 3]]],
  "bigNest5": [-1, 0, [1, [2, {"b": "bag", "c": "car"}, 3, [[4]]]]],
  "favorite": {
    "music": [
      {
        "artist": "Allah-Las",
        "album": "LAHS"
      },
      {
        "artist": "Khruangbin",
        "album": "The Universe Smiles Upon You"
      }
    ],
    "food": {
      "name": "pizza",
      "origin": "italy"
    },
    "colors": [
      "blue",
      "red",
      ""
    ],
    "places": [
      "home",
      {
        "title": "Work",
        "city": "Redmond"
      },
      "",
      1,
      0
    ],
    "words": [
      [
        "ant",
        "apple"
      ],
      [
        "bee",
        "bat",
        "boy"
      ]
    ],
    "movie": [
      {
        "title": "The Grand Budapest Hotel",
        "director": "Wes Anderson",
        "actors": {
          "lead": "Ralph Fiennes",
          "supporting": "Tony Revolori",
          "guests": [
            "Bill Murray",
            "Owen Wilson",
            {
              "name": "Saoirse Ronan",
              "character": "Agatha"
            }
          ]
        }
      }
    ]
  },
  "blank": "",
  "blanks": "  ",
  "zero": 0,
  "nullValue": null,
  "stringNull": "null",
  "emptyObject": {},
  "nestedEmptyObject": {
    "something": {
      "empty": {}
    }
  },
  "emptyList": []
};

const deviceContext = {
  "volume": null,
  "textEntries": [

  ],
  "pageId": null,
  "timezone": "America/Denver",
  "idCall": null
};

// There is a problem here.
const deviceContext2 = {
  "volumeLevel": null,
  "settings": {
    "isTest": null,
    "tiersOverride": {
      "agent": null
    },
    "logSeverity": null
  },
  "timerState": null,
  "speakableTextEntries": [],
  "timezone": "America/Denver",
  "userSelectedLocation": {
    "zipcode": null
  },
  "globalPickerOwner": null
};

const checkString = "sample:\n  name: Kyle G\n  age: 29\n  alive: 'yes'\n  long:\n    chain:\n      of:\n        items: [a, b, c]\n  letterList: [a, b, c]\n  numberList: [0, 1, 2]\n  bigNest0:\n  - - - 0\n  bigNest1:\n  - - - - 0\n  bigNest2:\n  - - - 1\n      - 2\n  bigNest3:\n  - 0\n  - - 1\n    - - 2\n      - - 3\n        - 4\n  bigNest4:\n  - a: apple\n  - 0\n  - - 1\n    - - 2\n      - 3\n  bigNest5:\n  - -1\n  - 0\n  - - 1\n    - - 2\n      - b: bag\n        c: car\n      - 3\n      - - - 4\n  favorite:\n    music:\n    - artist: Allah-Las\n      album: LAHS\n    - artist: Khruangbin\n      album: The Universe Smiles Upon You\n    food:\n      name: pizza\n      origin: italy\n    colors: [blue, red, '']\n    places:\n    - home\n    - title: Work\n      city: Redmond\n    - ''\n    - 1\n    - 0\n    words:\n    - - ant\n      - apple\n    - - bee\n      - bat\n      - boy\n    movie:\n    - title: The Grand Budapest Hotel\n      director: Wes Anderson\n      actors:\n        lead: Ralph Fiennes\n        supporting: Tony Revolori\n        guests:\n        - Bill Murray\n        - Owen Wilson\n        - name: Saoirse Ronan\n          character: Agatha\n  blank: ''\n  blanks: '  '\n  zero: 0\n  stringNull: 'null'";

// const sample01_lines = _yamlBuildDict(sample01, 0, true);
const sample01_lines = _yamlBuildDict({sample: sample01}, 0, false);
console.log(sample01_lines.join('\n'));
console.log(sample01_lines.join('\n') === checkString);
// const context_times1 = _yamlBuildDict({device_context: deviceContext}, 0, false);
// console.log(context_times1.join('\n'));
// const context_times2_all = _yamlBuildDict({device_context: deviceContext2}, 0, true);
// console.log(context_times2_all.join('\n'));
const context_times2 = _yamlBuildDict({device_context: deviceContext2}, 0, false);
console.log(context_times2.join('\n'));
