'use strict';

// Primitive values
const string = "Hello world!";
const number = 123;
const boolean = true;

// Object values
const object_string = String("Hello world!");
const object_number = Number(123);
const object_boolean = Boolean(1);

// Empty values
const empty_null = null;
const empty_undefined = undefined;

// Call 
const unformatted_calc = number + Math.random() + 1;
const formatted_calc = (unformatted_calc).toFixed(2);

// Arrow function
const arrow_fn = () => "MEMES";

// Named functions

// TODO looks like this throws an error when I try to select the cell
// Probably because no '=' is involved
function named_fn_1 () {
  return "O";
}
const named_fn_2 = function () {
  return "HAI";
}

// Array of various types
const array = [ ['a', 'b'], {} ];

// Map
const map = new Map([
  	["first_name", "Chris"], 
  	["last_name", "Pearson"]
])

// Object
const object = {yo: "MAMA", so: "FAT"}

// Records (array of objects or maps)
// TODO auto-detect records?
const array_of_objects = [
  {name: "Chris", last_name: "Pearson"},
  {name: "Jade", last_name: "Derham"},
  {name: "Chris", last_name: "Derham"}
]

// Set
const set_iterator = new Set(array_of_objects.map(r => r.name))
// http://stackoverflow.com/a/28719692
const set_array = Array.from(set_iterator);
// alt: [...set_iterator];

if (sheet && sheet.attach) {

  let offset = 0;

  let indices = [0, 0]
  const primitives = [
    ["string", string],
    ["number", number],
    ["boolean", boolean]
  ]
  for (let data of primitives) {
    sheet.attach(data[0], data[1], indices);
    indices[0] = indices[0] + 1;
  }
  
  indices[0] = indices[0] + 1;
  
  const object_primitives = [
    ["object_string", object_string],
    ["object_number", object_number],
    ["object_boolean", object_boolean]
  ]
  for (let data of object_primitives) {
    sheet.attach(data[0], data[1], indices);
    indices[0] = indices[0] + 1;
  }
  
  indices[0] = indices[0] + 1;
  sheet.attach("unformatted_calc", unformatted_calc, indices);
  indices[0] = indices[0] + 1;
  sheet.attach("formatted_calc", formatted_calc, indices);
  indices[0] = indices[0] + 2;
  
  const nope_values = [
    ["empty_null", empty_null],
    ["empty_undefined", empty_undefined]
  ]
  for (let data of nope_values) {
    sheet.attach(data[0], data[1], indices);
    indices[0] = indices[0] + 1;
  }
  
  indices[0] = indices[0] + 1;
  
  const functions = [
    ["arrow_fn", arrow_fn],
    ["named_fn_1", named_fn_1],
    ["named_fn_2", named_fn_2]
  ]
  for (let data of functions) {
    sheet.attach(data[0], data[1], indices);
    indices[0] = indices[0] + 1;
  }
  
  indices = [0, 3];
  const key_value = [
    ["object", object],
  	["map", map],
    ["array_of_objects", array_of_objects]
  ];
  offset = 0;
  let length
  for (let data of key_value) {
    sheet.attach(data[0], data[1], [indices[0] + offset, indices[1]]);   
    
    if (data[1].size) {
      length = data[1].size;
    } else {
      length = Object.keys(data[1]).length;
    }
    // One extra for each of the name and the gap
    offset = offset + length + 2;
  }
  
  indices = [0, 6];
  const arrays = [
    ["array", array],
    ["set_array", set_array]
  ]
  offset = 0;
  for (let data of arrays) {
    sheet.attach(data[0], data[1], [indices[0] + offset, indices[1]]);
    offset = offset + data[1].length + 2;
  }

}